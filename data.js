// ============================================================
// data.js — Single source of truth for all project data
// PRA Consulting — Lefrak/DEP PMO Playbook
// ============================================================

// ── FIREBASE CONFIG ──────────────────────────────────────────
export const FIREBASE_CONFIG = {
  apiKey:"AIzaSyChxeIV679J__iFyeYdVnu0wjHic_J9Tdc",
  authDomain:"pra-playbook-bdff6.firebaseapp.com",
  projectId:"pra-playbook-bdff6",
  storageBucket:"pra-playbook-bdff6.firebasestorage.app",
  messagingSenderId:"231877160609",
  appId:"1:231877160609:web:8d6f6a6b61adc9cab8cae0"
};

// ── API ──────────────────────────────────────────────────────
export const API_URL = 'https://pra-lefrak-playbook.vercel.app/api/claude';

// ── PROJECT META ─────────────────────────────────────────────
export const PROJECT = {
  client: 'Lefrak / DEP',
  pmo: 'PRA Consulting',
  buildings: [
    {
      id: 'hhe',
      name: '96-05 Horace Harding Exwy',
      short: 'HHE',
      type: 'Ground Floor Lobby — Slab Replacement + DCAS Reconstruction',
      phases: ['A1','B1','B2','A3','A4','A5'],
      gc: 'Blackbull (MBC)',
      faContractor: 'Scutum',
      elecContractor: 'Troon',
      eor: 'MGE',
      architect: 'AJA',
      permits: {
        gc_b1_b2_a4: 'Q00940195-L1-GC',
        gc_a3: 'Q00919587-I1-GC',
        plumbing_b2: 'Q01342765-I1-PL',
        elec_all: 'Q01300039I1EL',
      },
      gcPermitExpiry: '2026-05-20',
    },
    {
      id: 'jb',
      name: '59-17 Junction Blvd',
      short: 'JB',
      type: 'ACM Abatement + Rebuild — DEP Tenant',
      floors: ['3rd','10th','11th','12th'],
      gc: 'Blackbull (MBC)',
    }
  ]
};

// ── PERMIT EXPIRY WATCH ──────────────────────────────────────
export const PERMIT_EXPIRY = [
  {permit:'Q00940195-L1-GC', label:'B1/B2/A4 GC Permit', expires:'2026-05-20', area:'96-05 HHE'},
  {permit:'Q00919587-I1-GC', label:'A3 GC Permit', expires:'2026-05-20', area:'96-05 HHE'},
];

// ── WEEKLY MEETINGS ──────────────────────────────────────────
// day: 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
export const WEEKLY_MEETINGS = [
  {day:1, time:'12:30 PM', name:'Weekly Sign-Off — 96-05 HHE', id:'mtg-mon-1230'},
  {day:1, time:'1:30 PM',  name:'ACM Next Steps — DEP/ESG/ECC', id:'mtg-mon-130'},
  {day:2, time:'10:30 AM', name:'GC Update — HHE + JB', id:'mtg-tue-1030'},
  {day:2, time:'1:30 PM',  name:'Main DEP / DCAS / Lefrak Meeting', id:'mtg-tue-130'},
  {day:4, time:'11:00 AM', name:'INTERNAL DEP/PRA Biweekly (next: May 14)', id:'mtg-thu-biweekly'},
];

// ── STATUS ROWS ──────────────────────────────────────────────
// cls: bs=green, bw=amber, bd=red, bi=blue/info, bm=gray/upcoming
// Each row has: id (stable), item (label), status (text), cls, owner
// statusItemId links to action items and timeline steps for cross-referencing

export const DEFAULT_STATUSES = {
  'hhe-b1': [
    {id:'dob_arch_loc',      item:'DOB Arch LOC — Q01225051',              status:'Received 3/19',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_mech_loc',      item:'DOB Mech LOC — Q01286750',              status:'Received 4/10',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_plumbing_loc',  item:'DOB Plumbing LOC',                      status:'N/A',                                                                   cls:'bm', owner:'Muhammad (MBC)'},
    {id:'fdny_loa',          item:'FDNY LOA — #2025-TMFALM-007622-PLAN',   status:'PAA filed 4/9/26 — awaiting FDNY approval before inspection can be requested', cls:'bd', owner:'Scutum / Ary'},
    {id:'elec_bec_bis',      item:'Electrical BEC BIS sign-off',           status:'Passed — full sign-off pending all phases done',                        cls:'bi', owner:'Ary (Blackbull)'},
    {id:'air_balance',       item:'Certified Air Balancing Report',        status:'Approved 3/27',                                                         cls:'bs', owner:'Ary (Blackbull)'},
    {id:'mep_asbuilts',      item:'MEP As-Builts (MGE)',                   status:'WIP',                                                                   cls:'bw', owner:'MGE'},
    {id:'arch_asbuilts',     item:'Arch As-Builts (AJA)',                  status:'Sent to AJA 3/27',                                                      cls:'bs', owner:'AJA'},
    {id:'mep_punchlist',     item:'MEP Punchlist Signoff',                 status:'Under review with EOR',                                                 cls:'bi', owner:'Blackbull / EOR'},
    {id:'arch_punchlist',    item:'Arch Punchlist Signoff',                status:'Under review with AOR',                                                 cls:'bi', owner:'Blackbull / AOR'},
    {id:'loc_gc_mech',       item:'LOC — GC + Mech',                      status:'Received',                                                              cls:'bs', owner:'Blackbull'},
    {id:'fa_pretest',        item:'FA Pretest (30-day clock)',             status:'Pretest passed 2/2026 — 30-day clock started',                          cls:'bs', owner:'Scutum'},
    {id:'emerg_light',       item:'Emergency Light Test',                  status:'Passed at FA pretest 2/2026',                                           cls:'bs', owner:'Blackbull'},
    {id:'sc_notice',         item:'Notice of Substantial Completion',      status:'Not yet issued — pending FDNY LOA',                                     cls:'bd', owner:'Anita Jhamb (Lefrak)'},
  ],
  'hhe-b2': [
    {id:'dob_arch_loc',      item:'DOB Arch LOC — Q00940195',              status:'Received 3/19',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_mech_loc',      item:'DOB Mech LOC — Q00940285',              status:'Received 4/10',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_plumbing_loc',  item:'DOB Plumbing LOC — Q01342765-I1-PL',   status:'Plumber has not signed off — Foremost to follow up',                   cls:'bd', owner:'Muhammad (MBC)'},
    {id:'fdny_loa',          item:'FDNY LOA — #2025-TMFALM-00516',         status:'As-builts sent to Troon 4/28 → MGE → Scutum → inspection request',    cls:'bw', owner:'MGE → Scutum'},
    {id:'elec_bec_bis',      item:'Electrical BEC BIS — Q01186589',        status:'Passed — full sign-off pending all phases done',                        cls:'bi', owner:'Ary (Blackbull)'},
    {id:'air_balance',       item:'Certified Air Balancing Report',        status:'Approved 3/27',                                                         cls:'bs', owner:'Ary (Blackbull)'},
    {id:'fa_pretest',        item:'FA Pretest',                            status:'Additional devices required — re-pretest TBD once installed',           cls:'bd', owner:'Blackbull / Scutum'},
    {id:'tr1_dob',           item:'TR-1 (DOB Post Permit)',                status:'WIP',                                                                   cls:'bw', owner:'Muhammad (MBC)'},
    {id:'mep_asbuilts',      item:'MEP As-Builts (MGE)',                   status:'WIP',                                                                   cls:'bw', owner:'MGE'},
    {id:'arch_asbuilts',     item:'Arch As-Builts (AJA)',                  status:'Sent to AJA 3/27',                                                      cls:'bs', owner:'AJA'},
    {id:'struct_loc',        item:'Structural LOC',                        status:'Pending sign-off — follow up with MBC',                                 cls:'bd', owner:'Muhammad (MBC)'},
    {id:'sc_notice',         item:'Notice of Substantial Completion',      status:'Not yet issued — pending FDNY + plumbing + pretest',                    cls:'bd', owner:'Anita Jhamb (Lefrak)'},
  ],
  'hhe-a4': [
    {id:'dob_arch_loc',      item:'DOB Arch LOC — Q01286541',              status:'Received 3/19',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_mech_loc',      item:'DOB Mech LOC — Q01286552',              status:'Received 4/10',                                                         cls:'bs', owner:'Muhammad (MBC)'},
    {id:'dob_plumbing_loc',  item:'DOB Plumbing LOC',                      status:'N/A',                                                                   cls:'bm', owner:'Muhammad (MBC)'},
    {id:'fdny_loa',          item:'FDNY LOA — #20258-TMFALM-007621',       status:'As-builts sent to Troon 4/28 → MGE → Scutum → inspection request',    cls:'bw', owner:'MGE → Scutum'},
    {id:'air_balance',       item:'Certified Air Balancing Report',        status:'Approved 3/27',                                                         cls:'bs', owner:'Ary (Blackbull)'},
    {id:'mep_asbuilts',      item:'MEP As-Builts (MGE)',                   status:'WIP',                                                                   cls:'bw', owner:'MGE'},
    {id:'arch_asbuilts',     item:'Arch As-Builts (AJA)',                  status:'Sent to AJA 3/27',                                                      cls:'bs', owner:'AJA'},
    {id:'fa_pretest',        item:'FA Pretest (30-day clock)',             status:'Pretest passed 2/2026 — 30-day clock started',                          cls:'bs', owner:'Scutum'},
    {id:'furniture',         item:'Furniture',                             status:'Relocated to A4 space',                                                 cls:'bs', owner:'DEP / DCAS'},
    {id:'sc_notice',         item:'Notice of Substantial Completion',      status:'Not yet issued — pending FDNY LOA',                                     cls:'bd', owner:'Anita Jhamb (Lefrak)'},
  ],
  'hhe-a3': [
    {id:'reconstruction',    item:'Reconstruction',                        status:'In progress. Glass arriving ~May 6. Dropbox expected 5/15.',            cls:'bi', owner:'Blackbull'},
    {id:'fa_pretest',        item:'FA Pretest — ⚠ BLOCKER',               status:'Devices delivered 4/28 but NOT YET INSTALLED. Must install → pretest → FDNY inspection. Confirm install schedule with Blackbull/Scutum.', cls:'bd', owner:'Blackbull / Scutum'},
    {id:'dob_arch_loc',      item:'DOB Arch LOC — Q00919587',              status:'WIP — not yet received',                                                cls:'bd', owner:'Muhammad (MBC)'},
    {id:'dob_mech_loc',      item:'DOB Mech LOC — Q00919605',              status:'WIP — not yet received',                                                cls:'bd', owner:'Muhammad (MBC)'},
    {id:'fdny_loa',          item:'FDNY LOA — #2023-TMFALM-007841',        status:'Inspection requested 5/5/26 — cannot proceed until FA pretest passes', cls:'bd', owner:'Scutum'},
    {id:'furniture_layout',  item:'Furniture layout',                      status:'Accepted by DCAS 4/21/26',                                              cls:'bs', owner:'DEP / DCAS'},
    {id:'lv_coord',          item:'LV / Connect-trac coordination',        status:'AJA coordinated with DFI. Melissa (DCAS) accepted updated quote. Complete.', cls:'bs', owner:'AJA / DFI'},
    {id:'glass_install',     item:'Glass partition installation',          status:'Glass arriving ~May 6. Installation follows delivery.',                  cls:'bw', owner:'Blackbull'},
    {id:'punchlist_walk',    item:'AJA Punchlist Walkthrough',             status:'Confirmed May 11 at 10:30am',                                           cls:'bw', owner:'AJA (Anthony Johnson / Janki Patel)'},
    {id:'sc_notice',         item:'Substantial Completion — May 15 target',status:'SC to be declared May 15, 2026. SC notice must be issued ≥10 business days prior.', cls:'bw', owner:'Anita Jhamb (Lefrak)'},
    {id:'acp21',             item:'ACP-5 / ACP-21',                       status:'Foremost to provide ACP-21 to DOB',                                     cls:'bw', owner:'ECC / D. Jenkins'},
    {id:'back_corridor',     item:'HHE back corridor — ceiling/HVAC',      status:'PAUSED 4/28 — Sheranne flagged ACM concern on ceiling grid removal. Donna had sampling done 4/28. Results pending. ECC involved.', cls:'bd', owner:'Donna Cappa / ECC'},
  ],
  'hhe-a5': [
    {id:'lobby_open',        item:'New lobby open + active',               status:'Open since 1/24/26',                                                    cls:'bs', owner:'Blackbull (MBC)'},
    {id:'lobby_desk',        item:'New lobby desk + plexiglass',           status:'Complete 4/21/26',                                                      cls:'bs', owner:'Lefrak'},
    {id:'under_counter',     item:'Under-counter storage',                 status:'Pending — date TBD',                                                    cls:'bw', owner:'Lefrak'},
    {id:'green_wall',        item:'Green wall + DEP signage',              status:'Donna Cappa asked Foremost about timeline 4/27 — no response yet',      cls:'bw', owner:'Foremost / Lefrak'},
  ],
  'jb-12': [
    {id:'dep_occupancy',     item:'DEP occupancy',                         status:'Operational since 2/2/26',                                              cls:'bs', owner:''},
    {id:'arts_tru',          item:'ARTS — TRU1253QN24',                    status:'Closed out 4/17/26',                                                    cls:'bs', owner:''},
    {id:'aja_punchlist',     item:'AJA + MEP punchlists',                  status:'Punchlist walk with AJA: May 11, 2026 at 10:30am',                     cls:'bw', owner:'AJA'},
    {id:'fa_pretest',        item:'FA Pretest certification',              status:'Completed 1/15/26 — sent to DCAS',                                      cls:'bs', owner:''},
    {id:'dcas_punchlist',    item:'DEP/DCAS formal punchlist',             status:'Remaining items — Foremost working through them',                       cls:'bw', owner:'Foremost'},
    {id:'restroom_saddle',   item:'AJA restroom saddle/slope',             status:'Confirmation pending from AJA',                                         cls:'bw', owner:'AJA'},
    {id:'lock_replacement',  item:'Lock replacement',                      status:'On backorder with Cardona Key Lock Services — awaiting delivery',        cls:'bw', owner:'Foremost / Cardona'},
  ],
  'jb-11': [
    {id:'arts_variance',     item:'ARTS — TRU1110QN25 V5 Variance',       status:'Approved 4/23/26 — VAR# 2487QN25',                                      cls:'bs', owner:''},
    {id:'dob_jobs',          item:'DOB job numbers',                       status:'Q01319665, Q01356141, Q01287581, Q01287674, Q01287693, Q01287704',       cls:'bi', owner:''},
    {id:'acp21',             item:'ACP-21 requirement',                   status:'1 ACP-21 required to DOB before sign-off per V5 variance conditions',    cls:'bw', owner:'ECC'},
    {id:'precon_notice',     item:'Pre-construction notification',         status:'Sent by ESG (Javier Catalan) 4/24/26',                                  cls:'bs', owner:'ESG'},
    {id:'lobby_notice',      item:'Notice posted in lobby + 11th fl',     status:'Posted 4/24/26 — proof sent to Sheranne (DEP)',                          cls:'bs', owner:'Zach Trakas'},
    {id:'dep_4wk_notice',    item:'DEP 4-week employee notice',            status:'Initiated. 4-week clock triggers abatement start.',                     cls:'bw', owner:'DEP'},
    {id:'soft_demo',         item:'Soft demo',                            status:'Underway',                                                               cls:'bi', owner:'Blackbull'},
    {id:'scope_revision',    item:'Scope revision (4/14 call)',            status:'FMC/Copy/File/BEPA rooms: walls out, VCT+ceilings+lights+wallpaper in', cls:'bs', owner:''},
    {id:'lv_shutdown',       item:'DEP low voltage shutdown',             status:'Coordination needed before abatement',                                   cls:'bw', owner:'DEP / Foremost'},
    {id:'abatement',         item:'Abatement',                            status:'Planned ~5/29/26 — follows 4-week notice',                               cls:'bm', owner:'ESG'},
    {id:'elevator_recon',    item:'Elevator crossover + reconstruction',  status:'Planned to follow abatement — ~6/4/26',                                  cls:'bm', owner:'Blackbull'},
    {id:'reoccupancy',       item:'Full floor re-occupancy',              status:'DEP target: 9/28–9/29/26',                                               cls:'bm', owner:'DEP'},
  ],
  'jb-10': [
    {id:'arts_drawings',     item:'ARTS drawings',                         status:'Submitted to DEP 4/21/26',                                              cls:'bs', owner:'PRA'},
    {id:'dep_review',        item:'DEP review of ARTS drawings',           status:'Awaiting DEP review',                                                    cls:'bw', owner:'DEP'},
    {id:'dcas_dep_approval', item:'DCAS & DEP drawing approval',           status:'Approved 5/4/26',                                                       cls:'bs', owner:'DCAS / DEP'},
    {id:'gc_permits',        item:'GC permit filing',                      status:'BLOCKED — approved 5/4/26 but cannot pull until Lefrak/Foremost + DEP/DCAS agree on data center access for abatement', cls:'bd', owner:'GC'},
    {id:'acm_scope',         item:'Known ACM scope',                       status:'Mastic at carpet/VCT, restrooms, corridor, columns',                    cls:'bi', owner:''},
    {id:'acm_testing',       item:'Additional ACM testing (corridor)',     status:'LL conducting week of 4/20/26',                                          cls:'bw', owner:''},
    {id:'arts_filing',       item:'ARTS filing',                           status:'To be filed after DEP drawing review and data center agreement',         cls:'bm', owner:'ECC / ESG'},
    {id:'construction',      item:'Construction',                          status:'Not started — follows abatement and ARTS approval',                      cls:'bm', owner:''},
  ],
  'jb-3': [
    {id:'prior_arts',        item:'Prior ARTS (TRU1253QN24)',              status:'Expired 9/23/25 — no longer active',                                    cls:'bm', owner:''},
    {id:'new_arts',          item:'New ARTS filing',                       status:'To be filed before construction — concurrent with 10th fl',             cls:'bm', owner:'ECC / ESG'},
    {id:'acm_testing',       item:'Additional ACM testing (corridor)',     status:'LL conducting week of 4/20/26',                                          cls:'bw', owner:''},
    {id:'phase1',            item:'Phase 1 construction',                  status:'Planned ~9/4/26 — crossover bridge, elevator lobby, restrooms',         cls:'bm', owner:'Two Tone GC'},
    {id:'phase2',            item:'Phase 2 construction',                  status:'Planned ~10/2/26 — elevator lobby + restroom rebuild',                  cls:'bm', owner:'Blackbull GC'},
  ],
};

// ── SEED ACTION ITEMS ────────────────────────────────────────
// Each action links to a statusKey + statusItemId for cross-referencing
export const SEED_ACTIONS = [
  {id:'a1',  action:'Push Scutum: what is FDNY inspection date for B1? PAA filed 4/9 — has FDNY approved it?', owner:'Zach / Scutum', area:'96-05 HHE — B1', statusKey:'hhe-b1', statusItemId:'fdny_loa', due:'2026-05-01', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a2',  action:'Install FA devices in B2, then schedule re-pretest with Scutum — devices delivered 4/28', owner:'Blackbull / Ary', area:'96-05 HHE — B2', statusKey:'hhe-b2', statusItemId:'fa_pretest', due:'2026-05-01', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a3',  action:'B2 plumbing LOC Q01342765-I1-PL — get plumber to sign off and file with DOB', owner:'Muhammad (MBC)', area:'96-05 HHE — B2', statusKey:'hhe-b2', statusItemId:'dob_plumbing_loc', due:'2026-04-30', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a4',  action:'Follow up with MGE on MEP as-builts for B1, B2, A4 — required before SC package', owner:'Zach / MGE', area:'96-05 HHE — B1', statusKey:'hhe-b1', statusItemId:'mep_asbuilts', due:'2026-05-01', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a5',  action:'Install FA devices in A3 and schedule pretest with Scutum — FDNY inspection cannot proceed without this', owner:'Blackbull / Scutum', area:'96-05 HHE — A3', statusKey:'hhe-a3', statusItemId:'fa_pretest', due:'2026-05-08', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a6',  action:'Confirm DEP 4-week employee notice for 11th fl has been issued — track start date', owner:'Zach / DEP', area:'59-17 JB — 11th fl', statusKey:'jb-11', statusItemId:'dep_4wk_notice', due:'2026-04-28', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a7',  action:'GC permits Q00940195 + Q00919587 expire 5/20/26 — confirm renewal or closeout plan with Foremost', owner:'Zach / Foremost', area:'96-05 HHE — B1', due:'2026-05-10', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a8',  action:'ACP-21 for A3: Foremost to provide to DOB per V5 variance condition', owner:'ECC / D. Jenkins', area:'96-05 HHE — A3', statusKey:'hhe-a3', statusItemId:'acp21', due:'2026-08-01', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a9',  action:'3rd fl corridor: LL to send 2016 ACM test results to DEP', owner:'Lefrak / Foremost', area:'59-17 JB — 3rd fl', statusKey:'jb-3', statusItemId:'acm_testing', due:'2026-04-28', status:'open', source:'system', created:'Apr 24, 2026'},
  {id:'a10', action:'A3: confirm Scutum requested FDNY inspection 5/5/26 — track response for inspection date', owner:'Zach / Scutum', area:'96-05 HHE — A3', statusKey:'hhe-a3', statusItemId:'fdny_loa', due:'2026-05-07', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a11', action:'A3 punchlist walkthrough with AJA — May 11 at 10:30am. Prepare punch list items.', owner:'Zach / AJA', area:'96-05 HHE — A3', statusKey:'hhe-a3', statusItemId:'punchlist_walk', due:'2026-05-11', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a12', action:'Issue A3 Substantial Completion notice ≥10 business days before May 15 target', owner:'Anita Jhamb (Lefrak)', area:'96-05 HHE — A3', statusKey:'hhe-a3', statusItemId:'sc_notice', due:'2026-05-15', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a13', action:'A1: attend FDNY inspection May 12 — confirm with Scutum', owner:'Zach / Scutum', area:'96-05 HHE — A1', due:'2026-05-12', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a14', action:'10th fl: resolve data center access agreement before GC pulls permits — push Lefrak/Foremost and DEP/DCAS', owner:'Zach / Foremost / DCAS', area:'59-17 JB — 10th fl', statusKey:'jb-10', statusItemId:'gc_permits', due:'2026-05-14', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a15', action:'B2 structural LOC — follow up with Muhammad (MBC) for sign-off', owner:'Muhammad (MBC)', area:'96-05 HHE — B2', statusKey:'hhe-b2', statusItemId:'struct_loc', due:'2026-05-08', status:'open', source:'system', created:'May 5, 2026'},
  {id:'a16', action:'Biweekly DEP/PRA meeting: Thursday May 14 at 11am — prep notes', owner:'Zach Trakas', area:'Both buildings', due:'2026-05-14', status:'open', source:'system', created:'May 5, 2026'},
];

// ── CONTACTS ─────────────────────────────────────────────────
export const DEFAULT_CONTACTS = [
  {id:'c1',  name:'Zachary Trakas',          role:'Project Coordinator',                      org:'PRA',             email:'ztrakas@pra-consulting.com',          notes:'(516) 350-7385'},
  {id:'c2',  name:'Krishnakant Maurya',      role:'Senior Manager',                           org:'PRA',             email:'kmaurya@pra-consulting.com',          notes:'Zach\'s direct manager. ACM meeting organizer.'},
  {id:'c3',  name:'Matthew Barlow',          role:'Director',                                 org:'PRA',             email:'mbarlow@pra-consulting.com',          notes:'Go-to for rejection handling and process escalation.'},
  {id:'c4',  name:'Cynthia Poulton',         role:'Exec Director — D&PM Real Estate',         org:'DCAS / DEP',      email:'cpoulton@dcas.nyc.gov',               notes:'(212) 386-0317'},
  {id:'c5',  name:'Melissa Rivera-Ferguson', role:'PM Real Estate Services',                  org:'DCAS / DEP',      email:'merferguson@dcas.nyc.gov',            notes:''},
  {id:'c6',  name:'Sheranne Wickham',        role:'Director EHS / Asbestos Lead & Mold',      org:'DCAS / DEP',      email:'shera nnew@dep.nyc.gov',              notes:'(C) 347-203-2058 | (O) 718-595-7241. Receives proof of pre-construction notice. Flagged ACM concern on HHE back corridor 4/28.'},
  {id:'c7',  name:'David Jenkins',           role:'Senior Managing Director',                  org:'Foremost',        email:'djenkins@foremostconstructionny.com', notes:'(212) 708-6228'},
  {id:'c8',  name:'Alejandro Orellana',      role:'Project Manager',                          org:'Foremost',        email:'aorellana@foremostconstructionny.com',notes:''},
  {id:'c9',  name:'Kyle Josefson',           role:'Project Coordinator',                      org:'Foremost',        email:'kjosefson@foremostconstructionny.com',notes:''},
  {id:'c10', name:'Brian Hopwood',           role:'Project Manager',                          org:'Foremost',        email:'bhopwood@foremostconstructionny.com', notes:'11th floor coordination.'},
  {id:'c11', name:'Anita Jhamb',             role:'SC Notice Issuer',                         org:'Lefrak',          email:'a.jhamb@lefrak.com',                  notes:'Issues Substantial Completion notices.'},
  {id:'c12', name:'Mike Leary',              role:'Lefrak',                                   org:'Lefrak',          email:'',                                    notes:''},
  {id:'c13', name:'Meredith Jackness',       role:'Lefrak',                                   org:'Lefrak',          email:'mjackness@lefrakcommercial.com',       notes:'Organizes biweekly DEP/PRA meeting.'},
  {id:'c14', name:'Donna Cappa',             role:'Building Manager — both buildings',        org:'Lefrak',          email:'',                                    notes:'Weekly update recipient. On-site building manager for 96-05 HHE and 59-17 JB.'},
  {id:'c15', name:'Andre Camacho',           role:'Lefrak Commercial Property Management',    org:'Lefrak',          email:'acamacho@lefrakcommercial.com',        notes:''},
  {id:'c16', name:'Clayton Long',            role:'Principal',                                org:'ECC',             email:'',                                    notes:'ECC prepares ACM drawings + ARTS filings. Works with ESG on every abatement project.'},
  {id:'c17', name:'Javier Catalan',          role:'Project Manager (covering Lisa Javier)',   org:'ESG',             email:'',                                    notes:'ESG performs abatement, writes means & methods, air monitoring. Runs Mon 1:30pm ACM meeting.'},
  {id:'c18', name:'Lisa Javier',             role:'Project Manager (maternity leave)',        org:'ESG',             email:'',                                    notes:'Usually leads ESG\'s work. On maternity leave — Javier Catalan covering.'},
  {id:'c19', name:'Felix Urena',             role:'ARTS Applicant',                           org:'ESG',             email:'',                                    notes:'Listed on TRU1110QN25 V5 Variance Approval.'},
  {id:'c20', name:'Costa Ioannou',           role:'Air Monitoring',                           org:'ESG',             email:'esgcosta@nyasbestos.com',              notes:''},
  {id:'c21', name:'Tomas Villegas',          role:'Abatement',                                org:'ESG',             email:'tomas@nyasbestos.com',                 notes:'11th floor abatement team.'},
  {id:'c22', name:'Ary Neto',                role:'PM',                                       org:'Blackbull (MBC)', email:'ary@blackbullbuilders.com',            notes:'GC PM — HHE and JB.'},
  {id:'c23', name:'Muhammad',                role:'Expeditor',                                org:'Blackbull (MBC)', email:'',                                    notes:'DOB permit filings + LOCs for all HHE phases.'},
  {id:'c24', name:'Nino Pjetri',             role:'Superintendent',                           org:'Blackbull (MBC)', email:'npjetri@blackbullbuilders.com',        notes:'11th floor.'},
  {id:'c25', name:'Frank Nikac',             role:'Superintendent',                           org:'Blackbull (MBC)', email:'fnikac@blackbullbuilders.com',         notes:'HHE and JB.'},
  {id:'c26', name:'Anthony Johnson',         role:'Principal Architect',                      org:'AJA',             email:'',                                    notes:'Lead architect. AJA prepares/stamps arch drawings, as-builts, DOB/DEP responses.'},
  {id:'c27', name:'Janki Patel',             role:'Architect',                                org:'AJA',             email:'',                                    notes:'Day-to-day coordination on drawings, punchlist walks, as-builts.'},
  {id:'c28', name:'Traven Tong',             role:'Architect',                                org:'Bauer Dermel',    email:'',                                    notes:'Added to 11th floor paint thread 4/29.'},
  {id:'c29', name:'Paul Belec',              role:'DEP Facilities Management',                org:'DCAS / DEP',      email:'pbelec@dep.nyc.gov',                  notes:'Confirmed A3 paint colors as building standard.'},
  {id:'c30', name:'Awymarie Riollano',       role:'DEP Facilities Management',                org:'DCAS / DEP',      email:'ariollano@dep.nyc.gov',               notes:'On DEP weekly Tuesday meeting.'},
  {id:'c31', name:'Elisa Velazquez',         role:'DEP Facilities Management',                org:'DCAS / DEP',      email:'evelazquez@dep.nyc.gov',              notes:''},
  {id:'c32', name:'Clifton Oates',           role:'DEP Facilities Management',                org:'DCAS / DEP',      email:'coates@dep.nyc.gov',                  notes:'Out of office returning 5/4/26.'},
  {id:'c33', name:'Mary Lam',                role:'Architect — NYC DEP Facilities',           org:'DCAS / DEP',      email:'maryl@dep.nyc.gov',                   notes:'Flagged 11th fl paint standard as Vanilla Ice Cream BM2154-70.'},
  {id:'c34', name:'Vitaly Tretyakov',        role:'DCAS',                                     org:'DCAS / DEP',      email:'vtretyakov@dcas.nyc.gov',             notes:'On DEP renovation project weekly meeting.'},
  {id:'c35', name:'Aldo Ciccotelli',         role:'MEP Engineer',                             org:'Cosentini Associates', email:'aciccotelli@cosentini.com',      notes:'On 11th floor DOB filing thread.'},
  {id:'c36', name:'Debbie Cepeda',           role:'MEP Engineer',                             org:'Cosentini Associates', email:'',                               notes:'On 11th floor filing threads.'},
  {id:'c37', name:'Chris Angi',              role:'MEP Engineer',                             org:'Cosentini Associates', email:'',                               notes:'On 11th floor filing threads.'},
  {id:'c38', name:'Cardona Key Lock Services', role:'Locksmith / Vendor',                     org:'Vendors',         email:'',                                    notes:'Lock replacement for JB 12th floor. Locks on backorder.'},
];

// ── PROCESSES ────────────────────────────────────────────────
// Each step has an id that matches a timeline step id for cross-referencing
export const DEFAULT_PROCESSES = [
  {
    id:'proc-fdny', icon:'🚒', title:'FDNY Fire Alarm Closeout', status:'active', statusLabel:'Active',
    subtitle:'Applies to: HHE B1, B2, A3, A4', tags:'fdny fire alarm fa pretest inspection paa',
    desc:'The FDNY closeout process requires a passing pretest and an inspection — or self-certification if the 30-day rule applies. B1 additionally requires PAA approval before inspection can even be requested.',
    steps:[
      {id:'fa_pretest', title:'Scutum + Troon perform FA pretest', detail:'FA contractor (Scutum) and electrical contractor (Troon) perform the pretest. All devices must be installed and operational. If any devices fail, additional devices are ordered and re-pretest is scheduled. The 30-day clock starts from the date the pretest is PASSED.', owner:'Scutum / Troon'},
      {id:'asbuilts_signed', title:'Troon and MGE sign FA as-built drawings', detail:'After pretest, Troon (elec contractor) signs the as-built drawings. Then drawings go to MGE (EOR/MEP engineer) for EOR signature and seal. Both signatures required before Scutum can submit to FDNY. Do NOT push Scutum until MGE has confirmed they have signed drawings in hand.', owner:'Troon → MGE'},
      {id:'fdny_request', title:'Scutum submits to FDNY and calls for inspection', detail:'Once Scutum has signed/sealed as-builts, they submit to FDNY and request an inspection date. B1 EXCEPTION: PAA #2025-TMFALM-007622-PLAN must be approved by FDNY first — Scutum cannot request B1 inspection until PAA is approved.', owner:'Scutum → FDNY'},
      {id:'thirty_day_rule', title:'30-day self-cert rule (if applicable)', detail:'If FDNY gives an inspection date MORE than 30 days after the date of requesting, AND 30 days have passed since the pretest was passed → Lefrak may self-certify the fire alarm. Self-cert is sufficient for closeout. If the FDNY date is within 30 days of the request → must pass FDNY inspection (no self-cert).', owner:'Lefrak / Scutum → FDNY'},
      {id:'fdny_inspection', title:'FDNY inspection or self-certification', detail:'Either FDNY conducts the inspection and issues a Letter of Approval (LOA), or Lefrak self-certifies per the 30-day rule above.', owner:'FDNY / Lefrak'},
    ],
    notes:[{text:'B2 FA pretest: additional devices required — must be installed before pretest can occur. Devices delivered 4/28.', type:'warn', date:'May 5, 2026'}, {text:'A3 FA pretest: same situation. Devices delivered 4/28, not yet installed. This is the critical path blocker for A3 SC on May 15.', type:'warn', date:'May 5, 2026'}, {text:'Hi Rise rebranded to Scutum. Use Scutum everywhere.', type:'info', date:'May 5, 2026'}]
  },
  {
    id:'proc-arts', icon:'🏗', title:'ARTS Filing + DEP Abatement Approval', status:'active', statusLabel:'Active',
    subtitle:'Applies to: JB 10th, 11th, 12th, 3rd floors', tags:'arts dep abatement acm asbestos variance',
    desc:'The ARTS process governs ACM abatement at 59-17 JB. Each floor requires its own ARTS filing and DEP approval before abatement can begin.',
    steps:[
      {id:'acm_survey', title:'ACM survey and scope identification', detail:'ECC conducts ACM survey and identifies all asbestos-containing materials in the scope. Testing may be required for additional areas flagged during walkthrough.', owner:'ECC'},
      {id:'arts_filing', title:'ARTS filing submitted to DEP', detail:'ECC prepares and submits ARTS filing to DEP. Filing includes scope of work, means & methods from ESG, and all required documentation. 10th and 3rd fl filings are concurrent — neither blocks the other.', owner:'ECC / ESG'},
      {id:'dep_review', title:'DEP reviews ARTS filing', detail:'DEP reviews the filing. May issue objections (rejections). Each objection requires a written response. Process repeats until DEP approves.', owner:'DEP'},
      {id:'variance', title:'Variance application (if required)', detail:'If DEP issues a variance requirement (e.g., V5 as on 11th floor), ECC must apply for the variance. This is a separate process that can add weeks to months.', owner:'ECC'},
      {id:'arts_approval', title:'ARTS approval received', detail:'DEP approves the ARTS filing. The TRU number is assigned. An approval triggers the pre-construction notification requirement.', owner:'DEP'},
      {id:'precon_notify', title:'Pre-construction notification posted', detail:'Notice must be posted in the building lobby and on the affected floor. Proof (photograph) must be sent to Sheranne Wickham (DEP). A 4-week employee notice is separately triggered by DEP.', owner:'ESG / Zach Trakas'},
      {id:'abatement', title:'Abatement performed', detail:'ESG executes the abatement per the approved means & methods. Air monitoring conducted throughout. Elevator bypass required if abatement area includes elevator lobby.', owner:'ESG'},
      {id:'air_clearance', title:'Air clearance', detail:'Post-abatement air clearance testing conducted by ESG. Must pass before reconstruction can begin.', owner:'ESG'},
    ],
    notes:[]
  },
  {
    id:'proc-sc', icon:'✅', title:'Substantial Completion Process', status:'active', statusLabel:'Active',
    subtitle:'Applies to: HHE all phases', tags:'substantial completion sc notice dcas walkthrough turnover closeout',
    desc:'The SC process is the formal turnover of a completed phase to DCAS/DEP. It requires notice, a walkthrough, and delivery of a full SC package.',
    steps:[
      {id:'sc_notice', title:'Issue SC Notice (≥10 business days before SC date)', detail:'Anita Jhamb (Lefrak) issues the Substantial Completion notice to DCAS at least 10 business days before the target SC date. This is a hard requirement — cannot waive.', owner:'Anita Jhamb (Lefrak)'},
      {id:'sc_package', title:'SC package delivered (within 5 days of notice)', detail:'SC package includes: all LOCs, as-builts, FDNY LOA, air balancing report, warranty documents, operation manuals, and any other required closeout documents.', owner:'Zach / GC / Consultants'},
      {id:'dcas_walk', title:'DCAS punchlist walkthrough (within 5 days of SC date)', detail:'DCAS and DEP walk the space with Lefrak/Foremost. Any punchlist items identified must be remediated. Foremost typically attends; PRA tracks and follows up.', owner:'DCAS / DEP / Lefrak / Foremost'},
      {id:'asbuilts_delivery', title:'As-built delivery (within 90 days of SC date)', detail:'Full as-built package from AJA (arch) and MGE (MEP) must be delivered within 90 days of the SC date. Track this deadline carefully.', owner:'AJA / MGE'},
    ],
    notes:[{text:'A3: SC target May 15, 2026. SC notice must be issued by May 1 (≥10 business days). AJA punchlist walk May 11.', type:'warn', date:'May 5, 2026'}]
  },
  {
    id:'proc-permit', icon:'📋', title:'Permit Renewal / Extension', status:'ref', statusLabel:'Reference',
    subtitle:'Applies to: all active permits', tags:'permit renewal extension expiry gc permit dob',
    desc:'GC permits expire and must be renewed if work is not complete. Track expiry dates carefully — a lapsed permit requires a new application which can set back closeout significantly.',
    steps:[
      {id:'check_expiry', title:'Identify expiry date and remaining work', detail:'Current GC permits: Q00940195-L1-GC (B1/B2/A4) and Q00919587-I1-GC (A3) both expire 5/20/26. Confirm with Foremost whether work will be complete by expiry. If not, renewal must be filed immediately.', owner:'Zach / Foremost'},
      {id:'renewal_filing', title:'File renewal with DOB', detail:'GC (Blackbull/Muhammad) files permit renewal with DOB. Required documents vary by permit type. PRA tracks the filing and confirmation.', owner:'Muhammad (MBC) / Foremost'},
      {id:'renewal_confirm', title:'Renewal confirmed', detail:'DOB confirms renewal and new expiry date is recorded. Update all tracking sheets.', owner:'Muhammad (MBC)'},
    ],
    notes:[{text:'B1/B2/A4 GC permit Q00940195 and A3 GC permit Q00919587 both expire May 20, 2026. Immediately confirm closeout or renewal plan with Foremost.', type:'warn', date:'May 5, 2026'}]
  },
  {
    id:'proc-design', icon:'📐', title:'Design Change Process', status:'ref', statusLabel:'Reference',
    subtitle:'Applies to: any scope or design changes', tags:'design change dcas approval aja scope material',
    desc:'Any change to approved scope, materials, or design requires formal DCAS/DEP approval before work proceeds. This process prevents costly rework.',
    steps:[
      {id:'change_identified', title:'Change identified and documented', detail:'Document the change clearly: what is changing, why, and what the original approved design was. Any change to materials, layout, or finishes that differs from approved drawings requires this process.', owner:'Zach / AJA'},
      {id:'aja_review', title:'AJA reviews and prepares revised drawings', detail:'AJA (architect) reviews the proposed change and prepares revised drawings or specifications. Changes must be reflected in as-builts eventually.', owner:'AJA'},
      {id:'dcas_approval', title:'Submit to DCAS/DEP for approval', detail:'Revised drawings submitted to Melissa (DCAS) and relevant DEP contacts. Wait for written approval before proceeding. Verbal approvals are not sufficient.', owner:'Zach / AJA → DCAS / DEP'},
      {id:'proceed', title:'Proceed with approved change', detail:'Work proceeds only after written DCAS/DEP approval. Document approval in update log with date and approver name.', owner:'Foremost / GC'},
    ],
    notes:[]
  },
];

// ── MEETINGS (full detail) ────────────────────────────────────
export const DEFAULT_MEETINGS = [
  {
    id:'mtg-mon-1230', day:'Monday', time:'12:30 pm', name:'Weekly Sign-Off — 96-05 Ground Floor',
    detail:'Run by PRA. Reviews permits + closeout items across all 96-05 HHE phases. Foremost permit matrix is reviewed — permit numbers are generally reliable but statuses sometimes lag.',
    tags:['96-05 HHE only','PRA leads','Permit matrix review'],
    prep:['Review Foremost permit matrix — flag any status discrepancies vs DOB/BIS','FDNY status: B2/A3/A4 — has MGE signed fire alarm drawings? B1 — has FDNY approved the PAA?','Update HHE closeout spreadsheet with anything closed since last week']
  },
  {
    id:'mtg-mon-130', day:'Monday', time:'1:30 pm', name:'ACM Next Steps — DEP/ESG/ECC',
    detail:'Run by ESG (Javier Catalan, covering for Lisa Javier on maternity leave). ECC (Clayton Long) also attends. Covers abatement scope, drawings, phasing, filings, and strategy. PRA role: receive updates, flag concerns, ask questions. KK organizes from PRA side.',
    tags:['Both buildings','ESG runs it','ECC attends','KK organizes'],
    prep:['Review latest ECC/ESG update on 10th + 3rd ARTS filing status','Check 11th fl abatement schedule — any changes?','Prepare questions for Clayton on scope/timeline']
  },
  {
    id:'mtg-tue-1030', day:'Tuesday', time:'10:30 am', name:'GC Update — HHE + JB',
    detail:'GC updates for all active phases. Blackbull on for all phases (Astor & Stone no longer working — Blackbull assumed their scope everywhere).',
    tags:['Both buildings','GC updates'],
    prep:['Know 11th fl schedule status — elevator bypass confirmed? Soft demo ready?','Know A3 glass arrival date and punchlist walk status (May 11 with AJA)','Any Blackbull RFIs in Procore pending response?']
  },
  {
    id:'mtg-tue-130', day:'Tuesday', time:'1:30 pm', name:'Main DEP / DCAS / Lefrak / Foremost Meeting',
    detail:'All ongoing projects and concerns. Can run 10 minutes to 3 hours. Zach sends meeting minutes per building via Stepflo after the call.',
    tags:['All parties','Zach sends minutes','Stepflo'],
    prep:['Open Stepflo — draft minutes for both buildings before the call','Review open action items from prior week\'s minutes','Draft Donna Cappa weekly update — finalize after the call','Anticipate Foremost needing a push — come with specific documented asks']
  },
  {
    id:'mtg-thu-biweekly', day:'Thursday', time:'11:00 am', name:'INTERNAL DEP / PRA Biweekly',
    detail:'Biweekly Thursday meeting. Organizer: Meredith Jackness (Lefrak). Microsoft Teams. 1 hour. Repeats every other week. Next: May 14, 2026.',
    tags:['Internal DEP/PRA','Biweekly','Microsoft Teams'],
    prep:['Review open items from prior session','Align on priorities for the coming two weeks']
  },
];

// ── TIMELINE DEFINITIONS ─────────────────────────────────────
// stepId links to: process step id + status item id for cross-referencing
export const TIMELINE_DEFS = {
  'hhe-b1b2a4': {
    label:'96-05 HHE — B1 / B2 / A4',
    phases: ['B1','B2','A4'],
    steps:[
      {id:'demo',        label:'Demo',               processRef:null},
      {id:'filings',     label:'DOB Filings',         processRef:'proc-permit'},
      {id:'abatement',   label:'Abatement',           processRef:'proc-arts'},
      {id:'slab',        label:'Slab Work',           processRef:null},
      {id:'reconstruction', label:'Reconstruction',   processRef:null},
      {id:'doc_locs',    label:'DOB LOCs',            processRef:null},
      {id:'asbuilts',    label:'As-Builts',           processRef:null},
      {id:'fa_pretest',  label:'FA Pretest',          processRef:'proc-fdny', statusKey:'hhe-b2', statusItemId:'fa_pretest'},
      {id:'fdny',        label:'FDNY LOA',            processRef:'proc-fdny', statusKey:'hhe-b1', statusItemId:'fdny_loa'},
      {id:'sc_notice',   label:'SC Notice',           processRef:'proc-sc',   statusKey:'hhe-b1', statusItemId:'sc_notice'},
      {id:'dcas_walk',   label:'DCAS Walkthrough',    processRef:'proc-sc'},
      {id:'turnover',    label:'Turnover',            processRef:null},
    ]
  },
  'hhe-a3': {
    label:'96-05 HHE — A3',
    phases: ['A3'],
    steps:[
      {id:'demo',        label:'Demo',               processRef:null},
      {id:'temp_lobby',  label:'Temp Lobby',         processRef:null},
      {id:'abatement',   label:'Abatement',          processRef:'proc-arts'},
      {id:'reconstruction', label:'Reconstruction',  processRef:null},
      {id:'fa_pretest',  label:'FA Pretest',         processRef:'proc-fdny', statusKey:'hhe-a3', statusItemId:'fa_pretest'},
      {id:'lv_coord',    label:'LV Coordination',    processRef:null, statusKey:'hhe-a3', statusItemId:'lv_coord'},
      {id:'dob_locs',    label:'DOB LOCs',           processRef:null},
      {id:'fdny',        label:'FDNY LOA',           processRef:'proc-fdny', statusKey:'hhe-a3', statusItemId:'fdny_loa'},
      {id:'sc_notice',   label:'SC Notice',          processRef:'proc-sc',   statusKey:'hhe-a3', statusItemId:'sc_notice'},
    ]
  },
  'hhe-a5': {
    label:'96-05 HHE — A5',
    phases: ['A5'],
    steps:[
      {id:'abatement',   label:'Abatement',          processRef:'proc-arts'},
      {id:'slab',        label:'Slab Work',          processRef:null},
      {id:'fitout',      label:'Fitout',             processRef:null},
      {id:'complete',    label:'Complete',           processRef:null},
    ]
  },
  'jb-12': {
    label:'59-17 JB — 12th Floor',
    phases: ['12th'],
    steps:[
      {id:'arts',        label:'ARTS Filing',        processRef:'proc-arts'},
      {id:'demo',        label:'Demo',               processRef:null},
      {id:'abatement',   label:'Abatement',          processRef:'proc-arts'},
      {id:'reconstruction', label:'Reconstruction',  processRef:null},
      {id:'punchlist',   label:'Punchlist',          processRef:'proc-sc'},
      {id:'occupied',    label:'DEP Occupied',       processRef:null},
    ]
  },
  'jb-11': {
    label:'59-17 JB — 11th Floor',
    phases: ['11th'],
    steps:[
      {id:'arts_file',   label:'ARTS Filing',        processRef:'proc-arts', statusKey:'jb-11', statusItemId:'arts_variance'},
      {id:'dob_review',  label:'DOB Review',         processRef:null},
      {id:'variance',    label:'V5 Variance',        processRef:'proc-arts'},
      {id:'preconstruction', label:'Pre-Con Notice', processRef:'proc-arts', statusKey:'jb-11', statusItemId:'precon_notice'},
      {id:'dep_notice',  label:'DEP 4-Week Notice',  processRef:'proc-arts', statusKey:'jb-11', statusItemId:'dep_4wk_notice'},
      {id:'demo',        label:'Soft Demo',          processRef:null, statusKey:'jb-11', statusItemId:'soft_demo'},
      {id:'lv',          label:'LV Shutdown',        processRef:null, statusKey:'jb-11', statusItemId:'lv_shutdown'},
      {id:'vacate',      label:'Vacate',             processRef:null},
      {id:'abatement',   label:'Abatement',          processRef:'proc-arts', statusKey:'jb-11', statusItemId:'abatement'},
      {id:'air_clearance', label:'Air Clearance',    processRef:'proc-arts'},
      {id:'reconstruction', label:'Reconstruction',  processRef:null, statusKey:'jb-11', statusItemId:'elevator_recon'},
      {id:'punchlist',   label:'Punchlist',          processRef:'proc-sc'},
      {id:'occupied',    label:'DEP Occupied',       processRef:null, statusKey:'jb-11', statusItemId:'reoccupancy'},
    ]
  },
  'jb-10': {
    label:'59-17 JB — 10th Floor',
    phases: ['10th'],
    steps:[
      {id:'walkthrough', label:'Walkthrough',        processRef:null},
      {id:'arts_drawings', label:'ARTS Drawings',    processRef:'proc-arts', statusKey:'jb-10', statusItemId:'arts_drawings'},
      {id:'dep_review',  label:'DEP Review',         processRef:'proc-arts', statusKey:'jb-10', statusItemId:'dep_review'},
      {id:'datacenter_agree', label:'Data Ctr Agreement', processRef:null, statusKey:'jb-10', statusItemId:'gc_permits'},
      {id:'arts_file',   label:'ARTS Filing',        processRef:'proc-arts', statusKey:'jb-10', statusItemId:'arts_filing'},
      {id:'arts_approval', label:'ARTS Approval',    processRef:'proc-arts'},
      {id:'notice',      label:'Pre-Con Notice',     processRef:'proc-arts'},
      {id:'demo',        label:'Demo',               processRef:null},
      {id:'abatement',   label:'Abatement',          processRef:'proc-arts'},
      {id:'reconstruction', label:'Reconstruction',  processRef:null},
      {id:'occupied',    label:'DEP Occupied',       processRef:null},
    ]
  },
  'jb-3': {
    label:'59-17 JB — 3rd Floor',
    phases: ['3rd'],
    steps:[
      {id:'acm_test',    label:'ACM Testing',        processRef:'proc-arts', statusKey:'jb-3', statusItemId:'acm_testing'},
      {id:'arts_drawings', label:'ARTS Drawings',    processRef:'proc-arts'},
      {id:'arts_file',   label:'ARTS Filing',        processRef:'proc-arts', statusKey:'jb-3', statusItemId:'new_arts'},
      {id:'arts_approval', label:'ARTS Approval',    processRef:'proc-arts'},
      {id:'phase1_demo', label:'Ph1 Demo',           processRef:null},
      {id:'phase1_abate', label:'Ph1 Abatement',     processRef:'proc-arts'},
      {id:'phase1_build', label:'Ph1 Reconstruction',processRef:null, statusKey:'jb-3', statusItemId:'phase1'},
      {id:'phase2_demo', label:'Ph2 Demo',           processRef:null},
      {id:'phase2_abate', label:'Ph2 Abatement',     processRef:'proc-arts'},
      {id:'phase2_build', label:'Ph2 Reconstruction',processRef:null, statusKey:'jb-3', statusItemId:'phase2'},
      {id:'occupied',    label:'Complete',           processRef:null},
    ]
  },
};

// ── SCHEDULE PHASES ───────────────────────────────────────────
export const SCHEDULE_PHASES = [
  {
    key:'jb-11', label:'59-17 JB — 11th Floor', color:'#1e3150',
    tasks:[
      {id:'t_11_vacate',     name:'Vacate + pack-out',                start:'4/14/26', finish:'5/14/26', pct:60},
      {id:'t_11_boxes',      name:'Box-up and label',                 start:'4/14/26', finish:'5/15/26', pct:50},
      {id:'t_11_condition',  name:'Condition assessments',            start:'4/14/26', finish:'5/15/26', pct:80},
      {id:'t_11_furniture',  name:'Furniture planning',               start:'4/14/26', finish:'5/15/26', pct:70},
      {id:'t_11_demo_lobby', name:'Soft demo — lobbies + corridor',   start:'5/18/26', finish:'5/20/26', pct:0},
      {id:'t_11_demo_carpet',name:'Carpet + VCT removal',             start:'5/18/26', finish:'5/20/26', pct:0},
      {id:'t_11_demo_restroom',name:'Restroom tile removal',          start:'5/18/26', finish:'5/20/26', pct:0},
      {id:'t_11_abatement',  name:'ACM Abatement (ESG)',              start:'5/29/26', finish:'6/1/26',  pct:0},
      {id:'t_11_recon_lobby',name:'Reconstruction — lobby',           start:'6/4/26',  finish:'7/31/26', pct:0},
      {id:'t_11_recon_restroom',name:'Reconstruction — restrooms',    start:'6/4/26',  finish:'7/31/26', pct:0},
      {id:'t_11_recon_ceiling1',name:'Ceiling grid + tile (east)',    start:'6/4/26',  finish:'7/15/26', pct:0},
      {id:'t_11_recon_ceiling2',name:'Ceiling grid + tile (west)',    start:'7/15/26', finish:'8/15/26', pct:0},
      {id:'t_11_carpet',     name:'Carpet installation',              start:'8/15/26', finish:'9/15/26', pct:0},
      {id:'t_11_inspect',    name:'Inspections + sign-off',           start:'9/1/26',  finish:'9/20/26', pct:0},
      {id:'t_11_punchlist',  name:'Punchlist',                        start:'9/10/26', finish:'9/25/26', pct:0},
      {id:'t_11_sc',         name:'Substantial Completion',           start:'9/25/26', finish:'9/25/26', pct:0},
      {id:'t_11_reinstall',  name:'DEP furniture reinstall',          start:'9/25/26', finish:'9/28/26', pct:0},
      {id:'t_11_occupy',     name:'DEP re-occupancy',                 start:'9/28/26', finish:'9/29/26', pct:0},
    ]
  },
  {
    key:'jb-10', label:'59-17 JB — 10th Floor', color:'#1e3150',
    tasks:[
      {id:'t_10_pack',       name:'Pack-out + vacate',                start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_demo_corridor',name:'Demo — corridor',                start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_demo_carpet',name:'Carpet + VCT removal',             start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_demo_restroom',name:'Restroom tile removal',          start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_abatement',  name:'ACM Abatement (ESG)',              start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_recon_restroom',name:'Reconstruction — restrooms',    start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_ceiling1',   name:'Ceiling grid + tile',              start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_carpet',     name:'Carpet installation',              start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_inspect',    name:'Inspections + sign-off',           start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_sc',         name:'Substantial Completion',           start:'TBD',     finish:'TBD',     pct:0},
      {id:'t_10_occupy',     name:'DEP re-occupancy',                 start:'TBD',     finish:'TBD',     pct:0},
    ]
  },
  {
    key:'jb-3', label:'59-17 JB — 3rd Floor', color:'#1e3150',
    tasks:[
      {id:'t_3_corridor_demo',  name:'Ph1 — Corridor demo',          start:'9/4/26',  finish:'9/8/26',  pct:0},
      {id:'t_3_corridor_acm',   name:'Ph1 — Corridor abatement',     start:'9/8/26',  finish:'9/18/26', pct:0},
      {id:'t_3_corridor_build', name:'Ph1 — Corridor reconstruction', start:'9/18/26', finish:'10/1/26', pct:0},
      {id:'t_3_lobby_demo',     name:'Ph2 — Lobby demo',             start:'10/2/26', finish:'10/6/26', pct:0},
      {id:'t_3_lobby_acm',      name:'Ph2 — Lobby abatement',        start:'10/6/26', finish:'10/16/26',pct:0},
      {id:'t_3_lobby_build',    name:'Ph2 — Lobby reconstruction',   start:'10/16/26',finish:'11/1/26', pct:0},
      {id:'t_3_restroom_open',  name:'Restrooms open',               start:'11/1/26', finish:'11/1/26', pct:0},
      {id:'t_3_sc',             name:'Substantial Completion',       start:'11/15/26',finish:'11/15/26',pct:0},
    ]
  },
];

// ── AREA ORDERING ────────────────────────────────────────────
export const HHE_PHASE_ORDER = ['96-05 HHE — A1','96-05 HHE — B1','96-05 HHE — A5','96-05 HHE — B2','96-05 HHE — A3','96-05 HHE — A4'];
export const JB_FLOOR_ORDER  = ['59-17 JB — 3rd fl','59-17 JB — 10th fl','59-17 JB — 11th fl','59-17 JB — 12th fl'];

// ── HARDCODED BLOCKERS (always surface in briefing) ──────────
export const HARDCODED_BLOCKERS = [
  {area:'96-05 HHE — A3', msg:'A3 FA devices delivered 4/28 — NOT YET INSTALLED. Critical path: install → pretest → FDNY inspection. SC target May 15 is at risk.'},
  {area:'96-05 HHE — B1', msg:'B1 PAA #2025-TMFALM-007622-PLAN awaiting FDNY approval. Cannot request inspection until approved.'},
  {area:'96-05 HHE — B2', msg:'B2 FA pretest needs additional devices installed. Re-pretest TBD.'},
  {area:'59-17 JB — 10th fl', msg:'10th fl GC permits blocked pending Lefrak/Foremost + DEP/DCAS data center access agreement.'},
  {area:'96-05 HHE', msg:'GC permits Q00940195 + Q00919587 expire May 20. Confirm renewal or closeout plan immediately.'},
];
