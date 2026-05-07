// ============================================================
// ai.js — AI assistant, briefing engine, system prompt
// ============================================================
import { API_URL } from './data.js';
import { state, getProjectState, applyStatusChanges, addAction, logUpdate, addContact, saveTimelineState } from './state.js';

// ── SYSTEM PROMPT ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an elite PMO AI for PRA Consulting, serving Zachary Trakas on Lefrak/DEP construction projects in Queens, NY.

CRITICAL: Respond ONLY with valid JSON. No preamble, no markdown fences, no explanation. Start with { end with }. Keep all string values under 120 chars. No paragraphs inside JSON strings. No internal item IDs in any user-facing text.

ACTION ITEM QUALITY RULES — every action item must be:
1. Fully self-contained — never start with "Upon", "Once", "After", "When" without specifying what
2. Specific — name the exact permit, phase, person (e.g. "B2 plumbing LOC Q01342765-I1-PL — get plumber to sign off" not "follow up on plumbing")
3. Actionable standalone — readable without any other context

═══════════════════════════════════════════════════
CONTEXT CLUE INFERENCE — infer from shorthand:
• "b2 fa done" → B2 FA pretest passed, update status
• "mge signed" → MGE signed as-builts, advance FDNY step
• "scutum called" → Scutum requested FDNY inspection
• "aja walk done" → AJA punchlist walk complete
• "a3 sc" → A3 substantial completion
• Phase codes alone (A1,B1,B2,A3,A4,A5) = 96-05 HHE ground floor
• Floor numbers alone (10,11,12,3) = 59-17 JB
• First names: Anita=Lefrak, Melissa=DCAS, Clayton=ECC, Javier=ESG, Kyle/Alex/David=Foremost, Ary/Muhammad=Blackbull

SCREENSHOT/PDF EXTRACTION:
1. Extract: permit numbers, dates, names, addresses, approval stamps, signatures
2. Ignore: letterhead, logos, boilerplate, footers, watermarks
3. Identify document type: inspection report? LOC? Email? Calendar? Permit? ARTS? DOB notice?
4. Map to project: Q00940195=B1/B2/A4 GC, 2025-TMFALM=B1 FA, ARTS TRU=floor-specific
5. Signal vs noise: "PASSED" + date + inspector name = signal. Boilerplate = noise.

CONFIDENCE: 80%+ → proceed + note assumption. 50-80% → change + flag. <50% → ask 1-2 specific questions.

═══════════════════════════════════════════════════
PROJECT — TWO BUILDINGS ONLY:

96-05 HHE (Horace Harding Exwy) — Ground floor only. Phases: A1,B1,B2,A3,A4,A5. GC: Blackbull (Astor & Stone out entirely). FA: Scutum (was Hi Rise). Elec: Troon. EOR: MGE. Arch: AJA.
Permits: B1/B2/A4 GC Q00940195-L1-GC (exp 5/20), A3 GC Q00919587-I1-GC (exp 5/20), B2 plumbing Q01342765-I1-PL, Elec Q01300039I1EL.
FA permits: B1 2025-TMFALM-007622-PLAN, B2 2025-TMFALM-00516, A4 20258-TMFALM-007621, A3 2023-TMFALM-007841.
FDNY: pretest → Troon+MGE sign as-builts → Scutum requests inspection → if date >30 days after request AND >30 days since pretest → self-certify.
B1: PAA filed 4/9/26 awaiting FDNY approval — cannot request inspection until approved.
B2: FA pretest needs devices installed (delivered 4/28). Plumbing LOC Q01342765-I1-PL unsigned. Structural LOC pending MBC.
A3: FDNY inspection requested 5/5/26. FA devices delivered 4/28, NOT YET INSTALLED — critical path blocker for SC May 15.
A1: FDNY inspection May 12.

59-17 JB (Junction Blvd) — ACM abatement + rebuild. DEP is tenant. Floors: 3rd,10th,11th,12th.
12th: occupied 2/2/26, ARTS TRU1253QN24 closed 4/17/26.
11th: V5 Variance approved 4/23/26 VAR#2487QN25. Soft demo underway. Abatement ~5/29/26. DEP occupies 9/28-9/29/26.
10th: DCAS & DEP approved drawings 5/4/26. GC CANNOT pull permits — blocked pending data center access agreement.
3rd: New ARTS filing needed, concurrent with 10th. Phase 1 ~9/4/26, Phase 2 ~10/2/26.

STATUS KEYS: hhe-b1, hhe-b2, hhe-a4, hhe-a3, hhe-a5 | jb-12, jb-11, jb-10, jb-3
STATUS ITEM IDs:
hhe-b1: dob_arch_loc, dob_mech_loc, dob_plumbing_loc, fdny_loa, elec_bec_bis, air_balance, mep_asbuilts, arch_asbuilts, mep_punchlist, arch_punchlist, loc_gc_mech, fa_pretest, emerg_light, sc_notice
hhe-b2: dob_arch_loc, dob_mech_loc, dob_plumbing_loc, fdny_loa, elec_bec_bis, air_balance, fa_pretest, tr1_dob, mep_asbuilts, arch_asbuilts, struct_loc, sc_notice
hhe-a4: dob_arch_loc, dob_mech_loc, dob_plumbing_loc, fdny_loa, air_balance, mep_asbuilts, arch_asbuilts, fa_pretest, furniture, sc_notice
hhe-a3: reconstruction, fa_pretest, dob_arch_loc, dob_mech_loc, fdny_loa, furniture_layout, lv_coord, glass_install, punchlist_walk, sc_notice, acp21, back_corridor
hhe-a5: lobby_open, lobby_desk, under_counter, green_wall
jb-12: dep_occupancy, arts_tru, aja_punchlist, fa_pretest, dcas_punchlist, restroom_saddle, lock_replacement
jb-11: arts_variance, dob_jobs, acp21, precon_notice, lobby_notice, dep_4wk_notice, soft_demo, scope_revision, lv_shutdown, abatement, elevator_recon, reoccupancy
jb-10: arts_drawings, dep_review, dcas_dep_approval, gc_permits, acm_scope, acm_testing, arts_filing, construction
jb-3: prior_arts, new_arts, acm_testing, phase1, phase2

TIMELINE KEYS: hhe-b1b2a4, hhe-a3, hhe-a5, jb-12, jb-11, jb-10, jb-3
Step states: done, active, warn, blocked, todo

PROCESS IDs: proc-fdny, proc-arts, proc-sc, proc-permit, proc-design

PEOPLE (first name shortcuts):
Zach=Zach Trakas(PRA), KK=Krishnakant Maurya(PRA), Matt=Matthew Barlow(PRA)
Cynthia=Cynthia Poulton(DCAS), Melissa=Melissa Rivera-Ferguson(DCAS)
David=David Jenkins(Foremost), Alex=Alejandro Orellana(Foremost), Kyle=Kyle Josefson(Foremost)
Anita=Anita Jhamb(Lefrak), Mike=Michael Leary(Lefrak), Meredith=Meredith Jackness(Lefrak), Donna=Donna Cappa(Lefrak)
Clayton=Clayton Long(ECC), Javier=Javier Catalan(ESG)
Ary=Ary Neto(Blackbull), Muhammad=Muhammad(Blackbull expeditor)
Anthony/Janki=AJA architects

ORG CHAIN: PRA→DCAS/DEP(tenant)→Lefrak(owner)→Foremost(GC sub)→ECC(ACM)→ESG(abatement)→Blackbull/MBC(GC)→Scutum(FA)→Troon(elec)→MGE(EOR)→AJA(arch)

RESPONSE JSON:
{
  "questions":["max 2, only if genuinely ambiguous"],
  "analysis":"what you understood + extracted + assumptions",
  "status_updates":[{"key":"hhe-b2","itemId":"fa_pretest","itemMatch":"FA Pretest","newStatus":"Passed 5/6/26","newCls":"bs"}],
  "timeline_updates":[{"phaseKey":"hhe-b1b2a4","stepId":"fa_pretest","state":"done","detail":"passed 5/6/26","date":"5/6/26"}],
  "new_action_items":[{"action":"specific self-contained action","owner":"named person","area":"96-05 HHE — B2","statusKey":"hhe-b2","statusItemId":"fa_pretest","due":"YYYY-MM-DD"}],
  "new_contacts":[{"name":"Full Name","role":"role","org":"org","email":"if found","notes":"context"}],
  "next_steps":["implied next step"],
  "log_entry":{"date":"May 7, 2026","area":"96-05 HHE — B2","headline":"short summary","detail":"full detail with permit numbers and dates","person":"Zach Trakas"},
  "ready_to_apply":true
}

Set ready_to_apply false ONLY if critical info is missing. new_action_items: always populate if input implies follow-up. Omit empty arrays.`;

// ── BRIEFING ENGINE ──────────────────────────────────────────
export async function generateBriefing() {
  await new Promise(r => setTimeout(r, 300)); // Let Firebase settle
  const ps = getProjectState();
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

  // Build status summary — all blocked + pending items
  const statusSummary = Object.entries(state.statuses).map(([k, rows]) => {
    const issues = rows.filter(r => r.cls === 'bd' || r.cls === 'bw');
    return issues.length ? `${k}:\n${issues.map(r => `  [${r.cls==='bd'?'BLOCKED':'PENDING'}] ${r.item}: ${r.status.substring(0,100)}`).join('\n')}` : null;
  }).filter(Boolean).join('\n\n');

  // Build actions summary
  const actionsSummary = ps.openActions.reduce((acc, a) => {
    const area = a.area || 'General';
    if (!acc[area]) acc[area] = [];
    acc[area].push(`${a.action}${a.owner ? ' — ' + a.owner : ''}${a.due ? ' (due '+a.due+')' : ''}`);
    return acc;
  }, {});

  const crossRefSummary = ps.xrefFlags.map(f => `[${f.type}] ${f.msg}`).join('\n') || 'None';
  const recentLog = ps.recentLog.map(e => `[${e.date}] ${e.area}: ${e.headline}`).join('\n') || 'None';
  const blockerSummary = ps.hardcodedBlockers.map(b => `${b.area}: ${b.msg}`).join('\n');

  const prompt = `Generate a sharp daily briefing for Zachary Trakas — ${todayStr}.

HARDCODED BLOCKERS (always surface these):
${blockerSummary}

STATUS — BLOCKED/PENDING:
${statusSummary || 'All items green'}

OPEN ACTIONS (${ps.openActions.length} open, ${ps.overdueActions.length} overdue):
${Object.entries(actionsSummary).map(([area, items]) => `${area}:\n${items.slice(0,3).map(i=>'  • '+i).join('\n')}`).join('\n\n')}

CROSS-REFERENCE FLAGS:
${crossRefSummary}

RECENT LOG:
${recentLog}

PERMITS: ${ps.permitWarnings.map(p=>`${p.permit} expires in ${p.daysLeft} days`).join(' | ') || 'None expiring soon'}

Surface EVERYTHING that matters. Cross-reference all sources. Hardcoded blockers MUST appear.

Return ONLY valid JSON, no fences, no preamble. Keep strings under 100 chars each. Max 5 items per array:
{"headline":"string","urgent":["string"],"push_today":["who + what exactly"],"watch":["string"],"positive":"string"}`;

  const resp = await callClaude(prompt, 1500);
  return { briefing: resp, projectState: ps, todayStr, todayMeetings: ps.todayMeetings };
}

// ── DONNA DRAFT ──────────────────────────────────────────────
export async function generateDonnaDraft() {
  const ps = getProjectState();
  const statusSummary = Object.entries(state.statuses).map(([k, rows]) => {
    const issues = rows.filter(r => r.cls === 'bd' || r.cls === 'bw');
    return issues.length ? `${k}: ${issues.map(r => r.item + ': ' + r.status.substring(0, 60)).join('; ')}` : null;
  }).filter(Boolean).join('\n');

  const prompt = `Write a concise weekly update email to Donna Cappa (Lefrak building manager) from Zach Trakas (PRA Consulting).

Format exactly:
Dear Donna,

59-17 Junction Blvd
• [bullet]
• [bullet]

96-05 Horace Harding Exwy
• [bullet]
• [bullet]

Best,
Zach

Current project issues:
${statusSummary}

Rules: professional, factual, under 150 words, plain text only, no subject line, 2-3 bullets per building.`;

  return await callClaude(prompt, 600, false); // Returns raw text, not JSON
}

// ── AI ASSISTANT ─────────────────────────────────────────────
export async function submitToAI(userText, attachedFile, attachedFileData) {
  const ps = getProjectState();
  const xrefContext = ps.xrefFlags.length ? `\nCROSS-REF FLAGS:\n${ps.xrefFlags.map(f=>f.msg).join('\n')}` : '';
  const recentContext = state.log.slice(0,3).map(e=>`[${e.date}] ${e.area}: ${e.headline}`).join('\n');

  let userContent;
  if (attachedFile && attachedFileData) {
    const isImage = attachedFile.type.startsWith('image/');
    const isPDF = attachedFile.type === 'application/pdf';
    if (isImage) {
      userContent = [
        { type:'image', source:{ type:'base64', media_type:attachedFile.type, data:attachedFileData } },
        { type:'text', text: userText || 'Analyze this image and extract all relevant project information.' }
      ];
    } else if (isPDF) {
      userContent = [
        { type:'document', source:{ type:'base64', media_type:'application/pdf', data:attachedFileData } },
        { type:'text', text: userText || 'Analyze this document and extract all relevant project information.' }
      ];
    }
  } else {
    userContent = userText;
  }

  const systemWithContext = SYSTEM_PROMPT +
    `\n\nRECENT LOG:\n${recentContext}${xrefContext}`;

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: systemWithContext,
    messages: [{ role:'user', content: userContent }]
  };

  const resp = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message || data.error);
  const raw = (data.content || []).map(c => c.text || '').join('');
  return safeParseJSON(raw);
}

// ── APPLY AI CHANGES ─────────────────────────────────────────
export async function applyAIChanges(parsed) {
  const results = { statusUpdates:0, timelineUpdates:0, actionsAdded:0, contactsAdded:0 };

  if (parsed.status_updates?.length) {
    results.statusUpdates = await applyStatusChanges(parsed.status_updates);
  }

  if (parsed.timeline_updates?.length) {
    const tl = {};
    parsed.timeline_updates.forEach(u => {
      if (!tl[u.phaseKey]) tl[u.phaseKey] = {};
      tl[u.phaseKey][u.stepId] = { state:u.state, detail:u.detail, date:u.date };
    });
    await saveTimelineState(tl);
    results.timelineUpdates = parsed.timeline_updates.length;
  }

  if (parsed.new_action_items?.length) {
    for (const item of parsed.new_action_items) {
      await addAction({ action:item.action, owner:item.owner, area:item.area, statusKey:item.statusKey, statusItemId:item.statusItemId, due:item.due, source:'ai' });
      results.actionsAdded++;
    }
  }

  if (parsed.new_contacts?.length) {
    for (const c of parsed.new_contacts) {
      if (c.name && !state.contacts.find(x => x.name.toLowerCase() === c.name.toLowerCase())) {
        await addContact({ name:c.name, role:c.role, org:c.org||'Other', email:c.email||'', notes:c.notes||'' });
        results.contactsAdded++;
      }
    }
  }

  if (parsed.log_entry) {
    await logUpdate({ ...parsed.log_entry, source:'ai', timestamp:new Date().toISOString() });
  }

  return results;
}

// ── ASK A QUESTION ───────────────────────────────────────────
export async function askQuestion(question) {
  const ps = getProjectState();

  const context = `PROJECT STATUS (current):
${Object.entries(state.statuses).map(([k,rows]) =>
  `${k}:\n${rows.map(r=>`  ${r.cls==='bs'?'✓':r.cls==='bd'?'✗':r.cls==='bw'?'⚠':'○'} ${r.item}: ${r.status.substring(0,100)}`).join('\n')}`
).join('\n\n')}

OPEN ACTIONS: ${ps.openActions.slice(0,10).map(a=>`${a.area}: ${a.action}`).join(' | ')}
RECENT LOG: ${state.log.slice(0,5).map(e=>`[${e.date}] ${e.area}: ${e.headline}`).join(' | ')}
PERMITS: ${ps.permitWarnings.map(p=>`${p.permit} expires ${p.daysLeft} days`).join(', ') || 'None expiring soon'}

HARDCODED BLOCKERS: ${ps.hardcodedBlockers.map(b=>`${b.area}: ${b.msg}`).join(' | ')}`;

  const prompt = `${context}\n\nAnswer this question about the project: ${question}\n\nBe specific and concise. Reference exact permit numbers, dates, and names. If you don't have the answer in the context, say so.`;

  return await callClaude(prompt, 800, false);
}

// ── HELPERS ──────────────────────────────────────────────────
async function callClaude(prompt, maxTokens = 1000, parseJSON = true) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:maxTokens, messages:[{ role:'user', content:prompt }] })
  });
  if (!resp.ok) throw new Error(`API ${resp.status}`);
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message || String(data.error));
  const raw = (data.content || []).map(c => c.text || '').join('');
  return parseJSON ? safeParseJSON(raw) : raw.trim();
}

function safeParseJSON(raw) {
  if (!raw) throw new Error('Empty response');
  let clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const f = clean.indexOf('{');
  if (f === -1) throw new Error('No JSON found');
  let str = clean.substring(f);
  const l = str.lastIndexOf('}');
  if (l !== -1) {
    try { return JSON.parse(str.substring(0, l+1)); } catch(e) {}
    try { return JSON.parse(str.substring(0,l+1).replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"')); } catch(e) {}
  }
  // Recover truncated JSON
  try {
    let partial = str.replace(/,?\s*"[^"]*$/, '');
    let opens = 0, squares = 0;
    for (const ch of partial) { if(ch==='{')opens++; else if(ch==='}')opens--; else if(ch==='[')squares++; else if(ch===']')squares--; }
    for (let i=0;i<squares;i++) partial += '"]';
    for (let i=0;i<opens;i++) partial += '}';
    return JSON.parse(partial);
  } catch(e) { throw new Error('JSON parse failed: ' + clean.substring(f, f+200)); }
}
