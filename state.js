// ============================================================
// state.js — Live application state + Firebase sync
// All data flows through here. Nothing reads Firebase directly.
// ============================================================
import { DEFAULT_STATUSES, SEED_ACTIONS, DEFAULT_CONTACTS, HARDCODED_BLOCKERS, PERMIT_EXPIRY, WEEKLY_MEETINGS } from './data.js';

// ── LIVE STATE ───────────────────────────────────────────────
export const state = {
  db: null,
  statuses: JSON.parse(JSON.stringify(DEFAULT_STATUSES)),
  actions: [],
  contacts: [],
  log: [],
  timelineStates: {},
  scheduleData: {},
  processOverlays: {},
  meetingOverlays: {},
  syncStatus: 'connecting', // connecting | ok | saving | local | err
  actionFilter: 'open',
};

// ── COMPUTED STATE ───────────────────────────────────────────
// Single function all features consume. This is the core of cross-referencing.
export function getProjectState() {
  const today = new Date(); today.setHours(0,0,0,0);
  const sevenDaysAgo = new Date(today); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const openActions = state.actions.filter(a => a.status !== 'done');
  const overdueActions = openActions.filter(a => a.due && new Date(a.due) < today);
  const dueSoonActions = openActions.filter(a => {
    if (!a.due) return false;
    const d = new Date(a.due);
    return d >= today && (d - today) <= 3 * 86400000;
  });

  // All blocked/pending status items
  const blockers = [];
  const pendingItems = [];
  Object.entries(state.statuses).forEach(([key, rows]) => {
    rows.forEach(row => {
      if (row.cls === 'bd') blockers.push({ key, ...row });
      else if (row.cls === 'bw') pendingItems.push({ key, ...row });
    });
  });

  // Permit warnings
  const permitWarnings = PERMIT_EXPIRY.map(p => {
    const days = Math.ceil((new Date(p.expires) - new Date()) / 86400000);
    return { ...p, daysLeft: days, critical: days <= 7, warning: days <= 14 };
  }).filter(p => p.daysLeft <= 30);

  // Today's meetings
  const todayMeetings = WEEKLY_MEETINGS.filter(m => m.day === new Date().getDay());

  // Cross-reference: action items linked to status rows
  const linkedItems = state.actions.map(a => {
    if (!a.statusKey || !a.statusItemId) return a;
    const statusRow = (state.statuses[a.statusKey] || []).find(r => r.id === a.statusItemId);
    return { ...a, _linkedStatus: statusRow || null };
  });

  // Cross-reference flags
  const xrefFlags = buildCrossRefFlags(blockers, openActions, overdueActions, today, sevenDaysAgo);

  return {
    today,
    openActions,
    overdueActions,
    dueSoonActions,
    blockers,
    pendingItems,
    permitWarnings,
    todayMeetings,
    linkedItems,
    xrefFlags,
    hardcodedBlockers: HARDCODED_BLOCKERS,
    recentLog: state.log.slice(0, 8),
  };
}

// ── CROSS-REFERENCE ENGINE ───────────────────────────────────
function buildCrossRefFlags(blockers, openActions, overdueActions, today, sevenDaysAgo) {
  const flags = [];
  const skipItems = ['new lobby','under-counter','green wall','dep signage','furniture','acp-5','acp-21 req','notice of substantial','full floor re-occupancy','dep occupancy','scope revision'];

  // 1. Red blocker with no linked action item
  blockers.forEach(row => {
    const itemLower = (row.item || '').toLowerCase();
    if (skipItems.some(s => itemLower.includes(s))) return;
    const hasAction = openActions.some(a => a.statusKey === row.key && a.statusItemId === row.id);
    const hasFuzzyAction = !hasAction && openActions.some(a => {
      const areaMatch = (a.area || '').includes(row.key.startsWith('hhe') ? 'HHE' : 'JB');
      const textMatch = (a.action || '').toLowerCase().includes(itemLower.substring(0, 12));
      return areaMatch && textMatch;
    });
    if (!hasAction && !hasFuzzyAction) {
      flags.push({ type: 'missing_action', key: row.key, item: row.item, statusItemId: row.id,
        msg: `No action item for blocker: "${row.item}" (${row.key})` });
    }
  });

  // 2. Log suggests done but status still blocked
  const doneWords = ['passed','approved','received','signed','complete','done','closed','issued'];
  state.log.slice(0, 6).forEach(entry => {
    const detail = ((entry.headline || '') + ' ' + (entry.detail || '')).toLowerCase();
    if (!doneWords.some(k => detail.includes(k))) return;
    const areaKey = Object.keys(state.statuses).find(k =>
      (entry.area || '').toLowerCase().includes(k.replace('hhe-', '').replace('jb-', ''))
    );
    if (!areaKey) return;
    (state.statuses[areaKey] || []).forEach(row => {
      if (row.cls !== 'bd') return;
      const word = (row.item || '').toLowerCase().split(/[\s—]/)[0];
      if (word.length < 5) return;
      if (detail.includes(word)) {
        flags.push({ type: 'log_mismatch', key: areaKey, item: row.item,
          msg: `Log suggests "${row.item}" may be done — verify and update status` });
      }
    });
  });

  // 3. Overdue actions with no recent log entry (max 5)
  overdueActions.slice(0, 5).forEach(a => {
    const hasLog = state.log.some(e => {
      const d = new Date(e.date);
      return d >= sevenDaysAgo && (e.headline || '').toLowerCase().includes((a.action || '').substring(0, 15).toLowerCase());
    });
    if (!hasLog) {
      flags.push({ type: 'overdue_no_log', actionId: a.id,
        msg: `Overdue, no recent update: "${(a.action || '').substring(0, 70)}" (due ${a.due})` });
    }
  });

  return flags;
}

// ── FIREBASE LISTENERS ───────────────────────────────────────
export function initListeners(db, onReady) {
  state.db = db;

  // Statuses
  db.collection('statuses').doc('current').onSnapshot(snap => {
    if (snap.exists) {
      const data = snap.data();
      Object.keys(data).forEach(k => {
        if (DEFAULT_STATUSES[k]) state.statuses[k] = data[k];
      });
    } else {
      db.collection('statuses').doc('current').set(JSON.parse(JSON.stringify(DEFAULT_STATUSES)));
    }
    window.dispatchEvent(new CustomEvent('pra:statuses-updated'));
  }, () => { window.dispatchEvent(new CustomEvent('pra:statuses-updated')); });

  // Actions
  db.collection('actions').doc('list').onSnapshot(snap => {
    if (snap.exists && snap.data().items) {
      state.actions = snap.data().items.map(normalizeAction);
      const raw = snap.data().items;
      const norm = raw.map(normalizeAction);
      const changed = raw.some((r, i) => r.area !== norm[i].area || r.action !== norm[i].action);
      if (changed) db.collection('actions').doc('list').set({ items: norm });
    } else {
      state.actions = [...SEED_ACTIONS];
      db.collection('actions').doc('list').set({ items: SEED_ACTIONS });
    }
    window.dispatchEvent(new CustomEvent('pra:actions-updated'));
  }, () => { state.actions = [...SEED_ACTIONS]; window.dispatchEvent(new CustomEvent('pra:actions-updated')); });

  // Log
  db.collection('updates').orderBy('timestamp', 'desc').limit(20).onSnapshot(snap => {
    state.log = snap.docs.map(d => d.data());
    window.dispatchEvent(new CustomEvent('pra:log-updated'));
  });

  // Contacts
  db.collection('contacts').doc('directory').onSnapshot(snap => {
    if (snap.exists && snap.data().contacts) {
      state.contacts = snap.data().contacts;
    } else {
      state.contacts = [...DEFAULT_CONTACTS];
      db.collection('contacts').doc('directory').set({ contacts: DEFAULT_CONTACTS });
    }
    window.dispatchEvent(new CustomEvent('pra:contacts-updated'));
  }, () => { state.contacts = [...DEFAULT_CONTACTS]; });

  // Timeline states
  db.collection('timeline_states').doc('current').onSnapshot(snap => {
    state.timelineStates = snap.exists ? (snap.data() || {}) : {};
    window.dispatchEvent(new CustomEvent('pra:timeline-updated'));
  });

  // Schedule
  db.collection('schedule').doc('current').onSnapshot(snap => {
    state.scheduleData = snap.exists ? (snap.data() || {}) : {};
    window.dispatchEvent(new CustomEvent('pra:schedule-updated'));
  });

  if (onReady) onReady();
}

// ── SAVE FUNCTIONS ───────────────────────────────────────────
export async function saveStatuses() {
  if (!state.db) return;
  setSyncStatus('saving');
  try {
    await state.db.collection('statuses').doc('current').set(state.statuses);
    setSyncStatus('ok');
  } catch(e) { setSyncStatus('err'); }
}

export async function saveActions() {
  if (!state.db) { setSyncStatus('local'); return; }
  setSyncStatus('saving');
  try {
    await state.db.collection('actions').doc('list').set({ items: state.actions });
    setSyncStatus('ok');
  } catch(e) { setSyncStatus('err'); }
}

export async function saveContacts() {
  if (!state.db) return;
  setSyncStatus('saving');
  try {
    await state.db.collection('contacts').doc('directory').set({ contacts: state.contacts });
    setSyncStatus('ok');
  } catch(e) { setSyncStatus('err'); }
}

export async function logUpdate(entry) {
  // Always update local state immediately
  state.log = [entry, ...state.log].slice(0, 50);
  if (!state.db) return;
  setSyncStatus('saving');
  try {
    await state.db.collection('updates').add({
      ...entry,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setSyncStatus('ok');
  } catch(e) { setSyncStatus('err'); }
}

export async function saveTimelineState(updates) {
  Object.assign(state.timelineStates, updates);
  if (!state.db) return;
  try { await state.db.collection('timeline_states').doc('current').set(state.timelineStates); }
  catch(e) {}
}

export async function saveScheduleTask(phaseKey, taskId, updates) {
  if (!state.scheduleData[phaseKey]) state.scheduleData[phaseKey] = {};
  if (!state.scheduleData[phaseKey][taskId]) state.scheduleData[phaseKey][taskId] = {};
  Object.assign(state.scheduleData[phaseKey][taskId], updates);
  if (!state.db) return;
  try { await state.db.collection('schedule').doc('current').set(state.scheduleData); }
  catch(e) {}
}

// ── ACTION MUTATIONS ─────────────────────────────────────────
export async function addAction(data) {
  const today = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  const action = normalizeAction({ id:'act_'+Date.now()+'_'+Math.random().toString(36).substr(2,4), ...data, status:'open', created: today });
  state.actions = [...state.actions, action];
  await saveActions();
  return action;
}

export async function updateAction(id, updates) {
  state.actions = state.actions.map(a => a.id === id ? { ...a, ...updates } : a);
  await saveActions();
}

export async function completeAction(id) {
  const date = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  await updateAction(id, { status:'done', completedDate: date });
}

export async function dismissAction(id) {
  state.actions = state.actions.filter(a => a.id !== id);
  await saveActions();
}

// Auto-complete action items when a linked status row turns green
export async function autoCompleteLinkedActions(statusKey, statusItemId) {
  const linked = state.actions.filter(a => a.statusKey === statusKey && a.statusItemId === statusItemId && a.status !== 'done');
  if (!linked.length) return;
  const date = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  state.actions = state.actions.map(a =>
    (a.statusKey === statusKey && a.statusItemId === statusItemId && a.status !== 'done')
      ? { ...a, status:'done', completedDate: date, autoCompleted: true }
      : a
  );
  await saveActions();
  return linked.length;
}

// ── STATUS MUTATIONS ─────────────────────────────────────────
export async function updateStatusRow(key, itemId, newStatus, newCls) {
  const rows = state.statuses[key];
  if (!rows) return false;
  const idx = rows.findIndex(r => r.id === itemId);
  if (idx < 0) return false;
  state.statuses[key][idx] = { ...rows[idx], status: newStatus, cls: newCls };
  // If turning green, auto-complete linked action items
  if (newCls === 'bs') {
    const count = await autoCompleteLinkedActions(key, itemId);
    if (count) window.showToast(`✓ ${count} linked action item${count > 1 ? 's' : ''} auto-completed`);
  }
  await saveStatuses();
  return true;
}

export async function applyStatusChanges(changes) {
  if (!changes?.length) return 0;
  let matched = 0;
  changes.forEach(c => {
    const rows = state.statuses[c.key];
    if (!rows) return;
    let idx = -1;
    if (c.itemId) idx = rows.findIndex(r => r.id === c.itemId);
    if (idx < 0 && c.itemMatch) idx = rows.findIndex(r => r.item.toLowerCase().includes(c.itemMatch.toLowerCase()));
    if (idx < 0 && c.itemMatch) {
      const words = c.itemMatch.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      idx = rows.findIndex(r => words.some(w => r.item.toLowerCase().includes(w)));
    }
    if (idx >= 0) {
      state.statuses[c.key][idx] = { ...rows[idx], status: c.newStatus, cls: c.newCls || rows[idx].cls };
      matched++;
      if (c.newCls === 'bs') autoCompleteLinkedActions(c.key, rows[idx].id);
    }
  });
  if (matched) await saveStatuses();
  return matched;
}

// ── CONTACT MUTATIONS ────────────────────────────────────────
export async function addContact(data) {
  const contact = { id:'c_'+Date.now(), ...data };
  state.contacts = [...state.contacts, contact];
  await saveContacts();
  return contact;
}

export async function updateContact(id, data) {
  state.contacts = state.contacts.map(c => c.id === id ? { ...c, ...data } : c);
  await saveContacts();
}

export async function deleteContact(id) {
  state.contacts = state.contacts.filter(c => c.id !== id);
  await saveContacts();
}

// ── NORMALIZERS ──────────────────────────────────────────────
function normalizeAction(item) {
  // Clean action text
  let action = (item.action || '')
    .replace(/\(itemId:\s*[a-z0-9_]+\)/gi, '')
    .replace(/\b[a-z]+_[a-z]+_[a-z0-9_]{6,}\b/g, '')
    .replace(/\s{2,}/g, ' ').trim();

  // Fix vague openers
  const vague = /^(upon both complete|once (both|this|done|complete|in hand|received|approved|signed)|after (this|both|completion)|when (complete|done|ready))/i;
  if (vague.test(action) && item.area) {
    action = `[${item.area.replace('96-05 HHE — ','').replace('59-17 JB — ','')}] ${action}`;
  }

  // Normalize area
  let area = (item.area || '').trim();
  const hhePhase = area.match(/\b(A1|B1|B2|A3|A4|A5)\b/);
  const isHHE = /96.05|horace harding|HHE/i.test(area);
  const isJB = /59.17|junction blvd|JB/i.test(area);
  if (isHHE && hhePhase) area = `96-05 HHE — ${hhePhase[1]}`;
  else if (isJB) {
    if (/11th/i.test(area)) area = '59-17 JB — 11th fl';
    else if (/12th/i.test(area)) area = '59-17 JB — 12th fl';
    else if (/10th/i.test(area)) area = '59-17 JB — 10th fl';
    else if (/3rd/i.test(area)) area = '59-17 JB — 3rd fl';
  } else {
    const short = {'A1':'96-05 HHE — A1','B1':'96-05 HHE — B1','B2':'96-05 HHE — B2','A3':'96-05 HHE — A3','A4':'96-05 HHE — A4','A5':'96-05 HHE — A5','3rd fl':'59-17 JB — 3rd fl','10th fl':'59-17 JB — 10th fl','11th fl':'59-17 JB — 11th fl','12th fl':'59-17 JB — 12th fl'};
    if (short[area]) area = short[area];
  }
  if (area.includes('|')) area = normalizeAction({ ...item, area: area.split('|')[0].trim() }).area;

  return { ...item, action, area };
}

// ── SYNC STATUS ──────────────────────────────────────────────
function setSyncStatus(s) {
  state.syncStatus = s;
  window.dispatchEvent(new CustomEvent('pra:sync-updated', { detail: s }));
}
