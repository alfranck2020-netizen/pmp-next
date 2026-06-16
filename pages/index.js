import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#09141F;--bg2:#0F1E2E;--bg3:#162840;--bg4:#1D3352;
  --indigo:#6366F1;--indigo-l:#A5B4FC;--gold:#F59E0B;--gold-l:#FCD34D;
  --green:#10B981;--green-l:#6EE7B7;--red:#EF4444;--purple:#8B5CF6;
  --slate-l:#94A3B8;--text:#F0F6FF;--text-2:#94A3B8;
  --border2:rgba(255,255,255,0.06);--r:14px;--r-sm:9px;
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);}
.app{min-height:100vh;display:flex;flex-direction:column;}
.topbar{background:var(--bg2);border-bottom:1px solid var(--border2);padding:0 16px;height:52px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.logo{font-family:'Fraunces',serif;font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px;}
.logo-badge{width:30px;height:30px;background:linear-gradient(135deg,var(--indigo),var(--purple));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}
.tb-right{display:flex;align-items:center;gap:8px;}
.pill{display:flex;align-items:center;gap:4px;border-radius:20px;padding:4px 10px;font-size:11px;font-weight:700;}
.pill-gold{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);color:var(--gold-l);}
.pill-indigo{background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);color:var(--indigo-l);}
.main{flex:1;padding:16px;padding-bottom:80px;}
.bot-nav{position:fixed;bottom:0;left:0;right:0;background:var(--bg2);border-top:1px solid var(--border2);display:flex;z-index:100;}
.bn-i{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border:none;background:transparent;color:var(--slate-l);font-size:10px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;cursor:pointer;transition:color 0.2s;}
.bn-i.active{color:var(--indigo-l);}
.bn-ico{font-size:18px;}
.btn{padding:10px 18px;border-radius:var(--r-sm);border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-primary{background:linear-gradient(135deg,var(--indigo),var(--purple));color:white;}
.btn-ghost{background:transparent;color:var(--slate-l);border:1px solid var(--border2);}
.btn-gold{background:linear-gradient(135deg,var(--gold),#D97706);color:#09141F;font-weight:700;}
.btn-sm{padding:6px 12px;font-size:12px;}
.btn:disabled{opacity:0.4;cursor:not-allowed;}
.card{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:16px;}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--indigo-l);margin-bottom:6px;}
.sec-title{font-family:'Fraunces',serif;font-size:22px;font-weight:700;margin-bottom:6px;line-height:1.2;}
.sec-desc{font-size:13px;color:var(--text-2);line-height:1.65;margin-bottom:16px;}
.ftabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}
.ftab{padding:6px 14px;border-radius:20px;border:1px solid var(--border2);background:transparent;color:var(--slate-l);font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.ftab.active{background:var(--indigo);border-color:var(--indigo);color:white;}

/* DASHBOARD */
.dash-hero{background:linear-gradient(135deg,#0F1E3A,#1A1040);border:1px solid rgba(99,102,241,0.15);border-radius:var(--r);padding:20px;margin-bottom:14px;}
.dh-title{font-family:'Fraunces',serif;font-size:22px;font-weight:700;line-height:1.2;margin-bottom:6px;}
.dh-title em{font-style:italic;color:var(--gold-l);}
.dh-sub{font-size:12px;color:var(--text-2);line-height:1.6;margin-bottom:14px;}
.circ-wrap{position:relative;width:80px;height:80px;}
.circ-svg{width:80px;height:80px;transform:rotate(-90deg);}
.circ-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.circ-pct{font-family:'Fraunces',serif;font-size:17px;font-weight:700;line-height:1;}
.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
.stat-c{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:14px;}
.stat-ico{font-size:17px;margin-bottom:5px;}
.stat-val{font-family:'Fraunces',serif;font-size:22px;font-weight:700;}
.stat-lbl{font-size:11px;color:var(--slate-l);margin-top:2px;}
.qa-item{display:flex;align-items:center;gap:10px;padding:12px;border:1px solid var(--border2);border-radius:var(--r-sm);cursor:pointer;transition:all 0.2s;background:transparent;width:100%;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;color:var(--text);margin-bottom:7px;}
.qa-ico{font-size:16px;width:28px;text-align:center;}
.qa-t{font-size:13px;font-weight:600;}
.qa-s{font-size:11px;color:var(--slate-l);margin-top:1px;}
.qa-arr{margin-left:auto;color:var(--indigo-l);}

/* GUIDE */
.guide-card{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:14px;margin-bottom:8px;cursor:pointer;transition:all 0.2s;}
.guide-card.mastered{border-color:rgba(16,185,129,0.3);}
.gc-num{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--indigo-l);letter-spacing:2px;margin-bottom:3px;}
.gc-title{font-family:'Fraunces',serif;font-size:15px;font-weight:600;margin-bottom:3px;}
.gc-short{font-size:12px;color:var(--text-2);line-height:1.5;}
.gc-bar{height:3px;background:var(--bg4);border-radius:2px;overflow:hidden;margin-top:10px;}
.gc-fill{height:100%;border-radius:2px;transition:width 0.4s;}

/* PANEL */
.det-panel{background:var(--bg2);border:1px solid rgba(99,102,241,0.2);border-radius:var(--r);padding:18px;margin-bottom:10px;animation:fadeIn 0.2s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.det-title{font-family:'Fraunces',serif;font-size:18px;font-weight:700;margin-bottom:12px;}
.det-body{font-size:13px;color:var(--text-2);line-height:1.8;margin-bottom:16px;}
.det-body p{margin-bottom:8px;}
.det-body strong{color:var(--text);}
.det-body em{color:var(--gold-l);font-style:normal;}
.lvl-box{border-radius:var(--r-sm);padding:10px 12px;margin:6px 0;}
.lvl-label{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;}
.lvl-g{background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);}
.lvl-g .lvl-label{color:var(--green-l);}
.lvl-y{background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);}
.lvl-y .lvl-label{color:var(--gold-l);}
.lvl-r{background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);}
.lvl-r .lvl-label{color:#FCA5A5;}
.lvl-txt{font-size:12px;color:var(--text-2);line-height:1.7;}
.obj-row{display:flex;align-items:center;gap:10px;padding:10px;border-radius:var(--r-sm);cursor:pointer;transition:background 0.15s;border:1px solid transparent;}
.obj-row:hover{background:rgba(99,102,241,0.05);border-color:rgba(99,102,241,0.1);}
.obj-chk{width:18px;height:18px;border:2px solid rgba(99,102,241,0.35);border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.2s;cursor:pointer;}
.obj-chk.on{background:var(--indigo);border-color:var(--indigo);}
.obj-txt{font-size:12px;color:var(--text-2);flex:1;line-height:1.5;}
.obj-txt.on{text-decoration:line-through;color:var(--slate-l);}
.obj-detail{padding:10px 12px 12px 38px;background:rgba(99,102,241,0.03);border-top:1px solid var(--border2);}

/* QUIZ */
.q-block{background:var(--bg3);border-radius:var(--r-sm);padding:16px;margin-bottom:10px;border:1px solid var(--border2);}
.q-scen{font-size:12px;color:var(--text-2);font-style:italic;line-height:1.65;padding:9px 11px;background:rgba(255,255,255,0.02);border-left:2px solid var(--indigo);border-radius:0 5px 5px 0;margin-bottom:10px;}
.q-text{font-size:13px;font-weight:600;color:var(--text);line-height:1.6;margin-bottom:14px;}
.q-opt{display:flex;align-items:flex-start;gap:10px;padding:11px 13px;border:1px solid rgba(255,255,255,0.07);border-radius:var(--r-sm);cursor:pointer;transition:all 0.18s;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;color:var(--text-2);text-align:left;width:100%;line-height:1.5;margin-bottom:6px;}
.q-opt:hover:not(:disabled){border-color:var(--indigo);color:var(--text);background:rgba(99,102,241,0.07);}
.q-opt.correct{border-color:var(--green);background:rgba(16,185,129,0.1);color:var(--green-l);}
.q-opt.wrong{border-color:var(--red);background:rgba(239,68,68,0.08);color:#FCA5A5;}
.q-letter{font-weight:700;font-size:11px;color:var(--indigo-l);flex-shrink:0;width:14px;margin-top:1px;}
.q-expl{display:none;margin-top:10px;padding:10px 12px;background:rgba(99,102,241,0.06);border-left:3px solid var(--indigo);border-radius:0 6px 6px 0;font-size:12px;color:var(--text-2);line-height:1.7;}
.q-expl.show{display:block;}

/* FLASHCARDS */
.card-scene{width:100%;height:240px;perspective:1000px;cursor:pointer;margin-bottom:14px;}
.card-3d{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(.4,0,.2,1);}
.card-3d.flipped{transform:rotateY(180deg);}
.card-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--r);padding:24px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;}
.card-front{background:linear-gradient(145deg,var(--bg2),var(--bg3));border:1px solid rgba(99,102,241,0.2);}
.card-back{background:linear-gradient(145deg,#0F2A1E,#162840);border:1px solid rgba(16,185,129,0.2);transform:rotateY(180deg);}
.fc-cat{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--indigo-l);margin-bottom:10px;}
.fc-q{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--text);line-height:1.35;margin-bottom:8px;}
.fc-formula{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;color:var(--gold-l);background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.18);padding:7px 14px;border-radius:7px;margin-bottom:8px;}
.fc-ans{font-size:12px;color:var(--text);line-height:1.75;white-space:pre-line;max-width:320px;}
.fc-hint{font-size:11px;color:var(--slate-l);}
.fc-nav{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:12px;}
.fc-nb{width:36px;height:36px;border-radius:50%;border:1px solid var(--border2);background:var(--bg2);color:var(--text);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.fc-nb:disabled{opacity:0.3;cursor:not-allowed;}
.fc-pos{font-size:12px;color:var(--slate-l);min-width:50px;text-align:center;}
.fc-rating{display:flex;gap:8px;justify-content:center;}
.rate-btn{padding:8px 16px;border-radius:var(--r-sm);border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;}
.rate-easy{background:rgba(16,185,129,0.12);color:var(--green-l);border:1px solid rgba(16,185,129,0.25);}
.rate-hard{background:rgba(245,158,11,0.1);color:var(--gold-l);border:1px solid rgba(245,158,11,0.22);}
.fc-prog{height:3px;background:var(--bg4);border-radius:2px;overflow:hidden;margin-bottom:12px;}
.fc-pf{height:100%;background:linear-gradient(90deg,var(--indigo),var(--purple));border-radius:2px;transition:width 0.4s;}

/* EXAM */
.exam-topbar{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:10px;}
.timer{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:var(--gold-l);}
.timer.urgent{color:var(--red);}
.ep-bar{flex:1;height:4px;background:var(--bg4);border-radius:2px;overflow:hidden;}
.ep-fill{height:100%;background:linear-gradient(90deg,var(--indigo),var(--purple));border-radius:2px;transition:width 0.3s;}
.result-hero{text-align:center;padding:32px 20px;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);margin-bottom:14px;}
.res-pct{font-family:'Fraunces',serif;font-size:60px;font-weight:700;line-height:1;}
.pass{color:var(--green);}
.fail{color:var(--red);}
.verdict{display:inline-block;padding:5px 16px;border-radius:20px;font-size:11px;font-weight:700;margin-top:8px;}
.v-pass{background:rgba(16,185,129,0.12);color:var(--green-l);border:1px solid rgba(16,185,129,0.25);}
.v-fail{background:rgba(239,68,68,0.1);color:#FCA5A5;border:1px solid rgba(239,68,68,0.2);}

/* PROGRESS */
.ipl-item{margin-bottom:10px;}
.ipl-top{display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-bottom:3px;}
.ipl-bar{height:4px;background:var(--bg4);border-radius:2px;overflow:hidden;}
.ipl-fill{height:100%;border-radius:2px;transition:width 0.7s ease;}
.badges-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.badge-i{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:12px;text-align:center;}
.badge-i.on{border-color:rgba(245,158,11,0.3);}
.badge-ico{font-size:24px;margin-bottom:5px;filter:grayscale(1);opacity:0.3;}
.badge-i.on .badge-ico{filter:none;opacity:1;}
.badge-name{font-size:11px;font-weight:700;color:var(--text-2);}
.badge-desc{font-size:10px;color:var(--slate-l);}

/* SPRINT 15 MIN */
.sprint-hero{background:linear-gradient(135deg,#1A0F3A,#0F2A1E);border:1px solid rgba(139,92,246,0.25);border-radius:var(--r);padding:20px;margin-bottom:14px;text-align:center;}
.sprint-timer{font-family:'Fraunces',serif;font-size:56px;font-weight:700;line-height:1;margin:10px 0;}
.sprint-timer.warning{color:var(--gold-l);}
.sprint-timer.danger{color:var(--red);animation:blink 1s ease-in-out infinite;}
@keyframes blink{50%{opacity:0.5;}}
.sprint-progress{height:6px;background:var(--bg4);border-radius:3px;overflow:hidden;margin:12px 0;}
.sprint-fill{height:100%;border-radius:3px;transition:width 1s linear;}
.sprint-stat{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;margin:4px;}
.sprint-themes{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;}
.sprint-theme-btn{background:var(--bg2);border:2px solid var(--border2);border-radius:var(--r);padding:14px 10px;cursor:pointer;transition:all 0.2s;font-family:'Plus Jakarta Sans',sans-serif;color:var(--text-2);text-align:center;}
.sprint-theme-btn:hover,.sprint-theme-btn.active{border-color:var(--purple);color:var(--text);background:rgba(139,92,246,0.08);}
.sprint-theme-ico{font-size:24px;margin-bottom:5px;}
.sprint-theme-name{font-size:12px;font-weight:600;}
.sprint-theme-desc{font-size:10px;color:var(--slate-l);margin-top:2px;}
.sprint-q-counter{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.sprint-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.sprint-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0;}
.sprint-result-item{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:12px;text-align:center;}

/* DIAG */
.diag-steps{display:flex;gap:4px;margin-bottom:20px;}
.diag-step{flex:1;height:3px;background:var(--bg4);border-radius:2px;}
.diag-step.done{background:var(--indigo);}
.diag-step.cur{background:var(--indigo-l);}
.diag-q{font-family:'Fraunces',serif;font-size:17px;font-weight:600;line-height:1.4;margin-bottom:18px;}
.diag-opt{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--border2);border-radius:var(--r-sm);cursor:pointer;transition:all 0.2s;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:var(--text-2);text-align:left;width:100%;margin-bottom:8px;}
.diag-opt:hover{border-color:var(--indigo);color:var(--text);background:rgba(99,102,241,0.07);}
.diag-ltr{width:26px;height:26px;border-radius:6px;background:rgba(99,102,241,0.1);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--indigo-l);flex-shrink:0;}

/* XP BAR */
.xp-wrap{background:var(--bg2);border-bottom:1px solid var(--border2);padding:8px 16px;display:flex;align-items:center;gap:10px;}
.xp-lvl{font-size:11px;font-weight:700;color:var(--gold-l);white-space:nowrap;}
.xp-bar{flex:1;height:4px;background:var(--bg4);border-radius:2px;overflow:hidden;}
.xp-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-l));border-radius:2px;transition:width 0.6s ease;}
.xp-pts{font-size:10px;color:var(--slate-l);white-space:nowrap;}

/* TOAST */
.toast{position:fixed;top:16px;right:16px;background:var(--bg2);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-sm);padding:10px 14px;font-size:12px;font-weight:600;color:var(--gold-l);z-index:999;transition:all 0.3s ease;}

/* LOADING */
.loading-box{text-align:center;padding:40px 20px;}
.spinner{width:36px;height:36px;border:3px solid rgba(99,102,241,0.15);border-top-color:var(--indigo);border-radius:50%;animation:spin 0.75s linear infinite;margin:0 auto 12px;}
@keyframes spin{to{transform:rotate(360deg);}}
`;

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════
const ITEMS = [
  {id:"p1",type:"principle",num:"P01",title:"Intendance (Stewardship)",short:"Être un gardien responsable et éthique des ressources et de la confiance accordée.",
   body:"<p>L'intendance signifie que le chef de projet agit en tant que <strong>gardien responsable</strong> : ressources, intégrité, impacts à long terme.</p><p>Ce principe englobe <strong>la responsabilité éthique</strong>, la transparence, et les impacts sur la société et l'environnement.</p>",
   objectives:[
    {text:"Expliquer la différence entre stewardship et simple gestion",detail:{beginner:"Imagine que tu gères la caisse d'une association. La stewardship, c'est ne pas seulement compter l'argent — c'est le protéger honnêtement. Le PM est un gardien : les ressources ne lui appartiennent pas.",intermediate:"La stewardship dépasse la gestion opérationnelle. Elle inclut la responsabilité fiduciaire, la conduite éthique, la durabilité et la transparence. Un PM steward prend des décisions dans l'intérêt à long terme.",advanced:"La distinction réside dans l'orientation temporelle. Le gestionnaire optimise pour le court terme. Le steward considère les externalités et les obligations éthiques au-delà du projet (Code of Ethics PMI)."}},
    {text:"Identifier les responsabilités éthiques selon le Code PMI",detail:{beginner:"Le PMI a établi un code basé sur 4 valeurs : Responsable, Respectueux, Équitable, Honnête. Ces valeurs guident toutes les décisions du chef de projet.",intermediate:"Le Code of Ethics PMI définit des standards obligatoires : ne jamais pratiquer la corruption, signaler les pratiques non-éthiques. À l'examen, la bonne réponse privilégie toujours l'honnêteté.",advanced:"Le Code distingue aspirational standards et mandatory standards. Face à un dilemme éthique, la hiérarchie est : 1) Intégrité, 2) Organisation, 3) Équipe, 4) Intérêts personnels."}},
    {text:"Appliquer le principe face à des conflits d'intérêts",detail:{beginner:"Un conflit d'intérêts survient quand tu es à la fois juge et partie. La bonne pratique : toujours déclarer le conflit et se retirer de la décision concernée.",intermediate:"Face à un conflit d'intérêts : 1) L'identifier et le déclarer, 2) Se récuser si nécessaire, 3) Documenter. À l'examen, la réponse est TOUJOURS la divulgation proactive.",advanced:"Les conflits d'intérêts peuvent être réels, apparents ou potentiels. La non-divulgation est une faute éthique grave pouvant entraîner la révocation de la certification PMP."}},
    {text:"Reconnaître les impacts environnementaux et sociaux",detail:{beginner:"Chaque décision de projet a des conséquences au-delà du projet. Un bon chef de projet pense à ces impacts AVANT de décider.",intermediate:"La stewardship moderne intègre les principes ESG (Environnement, Social, Gouvernance). Le PM considère : empreinte carbone, impact social, gouvernance et transparence.",advanced:"En PMBOK 7, l'évaluation des impacts ESG fait partie du Business Case. Les ODD (Objectifs de Développement Durable) de l'ONU sont des références couramment utilisées."}},
    {text:"Distinguer comportements éthiques et non-éthiques en situation PMP",detail:{beginner:"Comportement éthique : dire la vérité à son sponsor même si c'est une mauvaise nouvelle. Non-éthique : cacher un retard. Règle d'or : serais-je à l'aise si ce comportement était rendu public ?",intermediate:"À l'examen PMP, les comportements non-éthiques courants : falsification de rapports, divulgation d'informations confidentielles. La bonne réponse préserve toujours l'intégrité.",advanced:"La hiérarchie de décision éthique : 1) Respecter les lois, 2) Suivre le Code PMI, 3) Appliquer les politiques de l'organisation, 4) Jugement professionnel."}}
  ]},
  {id:"p2",type:"principle",num:"P02",title:"Équipe collaborative",short:"Créer un environnement favorisant la collaboration, le respect et la croissance partagée.",
   body:"<p>Ce principe reconnaît que <strong>la livraison de valeur est un effort collectif</strong>. Le PM crée un environnement où les membres se sentent en sécurité et motivés.</p><p><strong>Modèles clés :</strong> Tuckman (Forming→Storming→Norming→Performing→Adjourning), Hersey &amp; Blanchard.</p>",
   objectives:[
    {text:"Décrire les 5 phases du modèle Tuckman",detail:{beginner:"Au début (Forming) tout le monde est poli. Puis (Storming) les tensions émergent. L'équipe trouve ses règles (Norming). Elle devient efficace (Performing). Enfin elle se sépare (Adjourning).",intermediate:"Forming : dépendance au leader. Storming : conflits, résistance. Norming : cohésion, accords. Performing : haute productivité. Adjourning : dissolution, bilan. Le PM adapte son style à chaque phase.",advanced:"Le modèle est non-linéaire : une équipe peut régresser de Performing à Storming suite à un changement (nouveau membre, restructuration). Les équipes virtuelles progressent différemment."}},
    {text:"Appliquer le leadership situationnel de Hersey et Blanchard",detail:{beginner:"Différentes personnes ont besoin de différents types de management. Un débutant a besoin d'instructions précises. Un expert confirmé préfère l'autonomie. Le bon chef de projet s'adapte.",intermediate:"S1 Directing (faible compétence, forte motivation). S2 Coaching (compétence moyenne). S3 Supporting (haute compétence, faible confiance). S4 Delegating (haute compétence, haute motivation).",advanced:"Les erreurs fréquentes à l'examen : sur-déléguer à R1 ou micro-manager R4. La maturité est situationnelle, pas globale."}},
    {text:"Créer et utiliser un Team Charter efficace",detail:{beginner:"Un Team Charter, c'est les règles du jeu que toute l'équipe accepte au départ. Comment on prend nos décisions ? Comment on gère les désaccords ? Ça évite beaucoup de conflits plus tard.",intermediate:"Un Team Charter efficace définit : mission, valeurs, rôles, règles de communication, processus de décision. Il est co-créé par l'équipe entière.",advanced:"Le Team Charter est un artefact vivant, révisé à chaque étape clé. En agile, le Working Agreement joue un rôle similaire et est revu à chaque rétrospective."}},
    {text:"Gérer les conflits avec les 5 modes de Thomas-Kilmann",detail:{beginner:"5 façons de réagir à un conflit : Fuir (évitement), Céder (accommodement), Imposer (compétition), Compromis, Collaborer (gagnant-gagnant). La collaboration est généralement la meilleure approche.",intermediate:"Selon 2 axes (assertivité vs coopérativité) : Competing (urgence), Collaborating (idéal), Compromising, Avoiding, Accommodating. À l'examen, Collaborating est presque toujours la bonne réponse.",advanced:"Choisir selon le contexte : Competing pour décision rapide. Avoiding si enjeu trivial. Accommodating si vous réalisez avoir tort. Collaborating si deux enjeux sont trop importants."}},
    {text:"Favoriser la psychologie de sécurité dans l'équipe",detail:{beginner:"La psychologie de sécurité, c'est quand chaque membre peut prendre des risques, poser des questions, avouer des erreurs, sans avoir peur d'être jugé. C'est le facteur N°1 des équipes performantes.",intermediate:"Amy Edmondson : la conviction partagée que l'équipe est sûre pour prendre des risques interpersonnels. Le PM la développe en modélisant la vulnérabilité.",advanced:"Les recherches (Project Aristotle, Google) confirment que la psychological safety est le prédicteur le plus fiable de la performance d'équipe."}}
  ]},
  {id:"p3",type:"principle",num:"P03",title:"Engagement des parties prenantes",short:"S'engager proactivement pour comprendre les besoins, intérêts et attentes de toutes les parties prenantes.",
   body:"<p>Les projets réussissent ou échouent souvent en fonction de <strong>la qualité de l'engagement avec les parties prenantes</strong>. L'identification est un exercice continu.</p><p><strong>Outils :</strong> Matrice Pouvoir/Intérêt, Registre des parties prenantes, Plan d'engagement.</p>",
   objectives:[
    {text:"Identifier et analyser avec la matrice Pouvoir/Intérêt",detail:{beginner:"La matrice divise les parties prenantes en 4 groupes. Fort pouvoir + fort intérêt → gérer de près. Faible pouvoir + faible intérêt → surveiller. Fort pouvoir + faible intérêt → satisfaire.",intermediate:"4 quadrants : Gérer de près (communication fréquente). Satisfaire (informer sur les impacts). Impliquer activement (écouter et intégrer). Surveiller (communication minimale).",advanced:"Le positionnement des parties prenantes change — réévaluer trimestriellement minimum. Modèle Saillance (Power + Legitimacy + Urgency) pour priorisation avancée."}},
    {text:"Utiliser les 5 niveaux d'engagement des parties prenantes",detail:{beginner:"5 niveaux : Uninformed (ne sait pas), Resistant (résiste), Neutral (neutre), Supportive (soutient), Leading (champion actif). Le PM fait monter chaque personne vers le haut.",intermediate:"Stakeholder Engagement Assessment Matrix : C = état Current, D = état Desired. Gap C→D = stratégie requise. En agile : évaluation à chaque Sprint Review.",advanced:"L'analyse dynamique : certaines parties prenantes changent de position au fil du projet. La théorie des jeux peut anticiper les comportements stratégiques."}},
    {text:"Développer des stratégies d'engagement différenciées",detail:{beginner:"Pas une seule stratégie pour tout le monde. Pour le sponsor : rapport hebdomadaire. Pour l'équipe : réunion quotidienne. Pour les utilisateurs : ateliers participatifs.",intermediate:"Le Communication Management Plan définit : qui a besoin de quoi, méthode de diffusion, fréquence et format, gestion des retours.",advanced:"Les modèles de communication efficace guident la conception. Les barrières (culturelles, linguistiques) doivent être identifiées et adressées."}},
    {text:"Gérer les parties prenantes résistantes",detail:{beginner:"Une partie prenante hostile a souvent peur de perdre quelque chose. La première étape : COMPRENDRE pourquoi elle résiste. Ensuite, adresser ses vraies craintes.",intermediate:"Stratégies : écoute active, communication transparente, impliquer dans la solution, identifier des champions internes. Ne jamais ignorer une partie prenante hostile.",advanced:"La résistance suit des patterns prévisibles (Kübler-Ross). Force Field Analysis (Lewin) pour analyser les forces pour et contre le changement."}},
    {text:"Escalader les problèmes de parties prenantes au bon moment",detail:{beginner:"Escalader, c'est savoir quand un problème dépasse ton autorité. Si une partie prenante importante bloque le projet et que tu ne peux pas résoudre ça seul, tu DOIS en parler à ton sponsor.",intermediate:"Le seuil d'escalade dépend de l'impact sur les objectifs (scope, délais, budget, qualité) et de ton niveau d'autorité. Documenter les tentatives de résolution avant d'escalader.",advanced:"L'escalade efficace inclut : description factuelle, impact quantifié, options de résolution, recommandation claire. Éviter l'escalade excessive (dilue la crédibilité)."}}
  ]},
  {id:"p4",type:"principle",num:"P04",title:"Création de valeur",short:"Se concentrer sur la livraison de résultats qui créent de la valeur réelle et durable.",
   body:"<p>Le PMBOK 7 opère un glissement : <strong>de la livraison des livrables à la création de valeur</strong>. Un projet peut livrer dans les délais et le budget et pourtant échouer si les bénéfices attendus ne sont pas réalisés.</p>",
   objectives:[
    {text:"Distinguer outputs, outcomes et benefits",detail:{beginner:"Output = ce qu'on livre (une app mobile). Outcome = ce qui change grâce à cette livraison (les clients commandent plus facilement). Benefit = la valeur créée (les ventes augmentent de 20%).",intermediate:"La chaîne de valeur : Output → Outcome → Benefit. Le PM est responsable de l'output mais doit faciliter la réalisation des outcomes et benefits.",advanced:"Le Benefits Realization Plan définit : quels bénéfices, comment les mesurer (KPIs), quand ils seront réalisés, qui en est responsable."}},
    {text:"Construire et évaluer un Business Case orienté valeur",detail:{beginner:"Le Business Case répond à : pourquoi fait-on ce projet ? Il compare les coûts aux bénéfices. Si les bénéfices sont inférieurs aux coûts, le projet ne devrait pas être lancé.",intermediate:"Un Business Case solide inclut : analyse du problème, options considérées, coûts (CAPEX+OPEX), bénéfices quantifiés, calcul du ROI/NPV/Payback Period, risques et hypothèses.",advanced:"Techniques financières : ROI = (Bénéfices-Coûts)/Coûts×100. NPV = valeur actuelle des flux futurs actualisés. Un NPV positif = valeur créée."}},
    {text:"Mesurer la création de valeur pendant et après le projet",detail:{beginner:"Dès le début, définir des indicateurs concrets. Le succès signifie que dans 6 mois, nos coûts ont baissé de 15%. Puis mesurer régulièrement si on se dirige bien vers cet objectif.",intermediate:"Métriques financières (ROI, économies) et non-financières (satisfaction client NPS, qualité). La mesure commence PENDANT le projet et continue APRÈS.",advanced:"Le Benefits Realization Dashboard suit en temps réel. La distinction entre leading indicators et lagging indicators est critique pour la gouvernance proactive."}},
    {text:"Appliquer la Sunk Cost Fallacy aux décisions d'arrêt",detail:{beginner:"Parfois, continuer un projet coûte plus cher que de l'arrêter. L'argent déjà dépensé est perdu qu'on continue ou non. La vraie question : est-ce que continuer va créer de la valeur ?",intermediate:"La Sunk Cost Fallacy pousse à continuer un projet déficitaire car on a trop investi pour arrêter. Un PM rationnel ignore les coûts passés et évalue uniquement les coûts et bénéfices FUTURS.",advanced:"La gouvernance de portefeuille inclut des revues régulières (Stage Gates) où chaque projet est réévalué. Le PM doit maintenir un Business Case à jour."}},
    {text:"Aligner les décisions sur la stratégie organisationnelle",detail:{beginner:"Un projet doit contribuer aux objectifs de l'organisation. Si l'organisation veut conquérir un nouveau marché et ton projet n'y contribue pas, peut-être qu'il ne devrait pas avoir la priorité.",intermediate:"L'alignement stratégique se vérifie à travers le Business Case et la gestion de portefeuille. En cas de changement stratégique, le PM réévalue la pertinence du projet.",advanced:"Le Balanced Scorecard (Kaplan & Norton) aligne les projets sur 4 perspectives : Financière, Client, Processus internes, Apprentissage & Croissance."}}
  ]},
  {id:"p5",type:"principle",num:"P05",title:"Pensée systémique",short:"Reconnaître et répondre aux interactions complexes au sein et autour du système projet.",
   body:"<p>Les projets s'inscrivent dans des <strong>systèmes complexes et adaptatifs</strong>. La pensée systémique permet de comprendre les interactions, les boucles de rétroaction et les effets non-linéaires.</p>",
   objectives:[
    {text:"Identifier les interdépendances dans l'environnement systémique",detail:{beginner:"Un projet dépend d'autres projets, équipes, fournisseurs, décisions politiques. La pensée systémique, c'est toujours se demander : qui d'autre est impacté ? Qu'est-ce qui peut affecter mon projet ?",intermediate:"Les interdépendances peuvent être techniques (dépendances entre livrables), organisationnelles (partage de ressources) ou externes (fournisseurs, réglementations).",advanced:"La théorie des systèmes complexes adaptatifs (CAS) décrit les projets modernes. L'outil SNA (Social Network Analysis) cartographie les interdépendances humaines."}},
    {text:"Appliquer la loi de Brooks et ses implications",detail:{beginner:"La loi de Brooks : ajouter des gens à un projet en retard le retarde davantage. Les nouveaux membres doivent être formés, et ça crée plus de communication nécessaire.",intermediate:"Coûts cachés de l'ajout de ressources : formation, augmentation exponentielle des canaux de communication (n×(n-1)/2), restructuration des tâches.",advanced:"La formule : n×(n-1)/2 canaux de communication. Équipe de 5 → 10 canaux. Équipe de 10 → 45 canaux. Solution : décomposer en sous-équipes autonomes."}},
    {text:"Analyser les problèmes avec les outils systémiques",detail:{beginner:"Quand un problème survient, ne cherche pas le coupable — cherche la CAUSE RACINE. Le diagramme d'Ishikawa (arête de poisson) explore toutes les causes possibles.",intermediate:"Outils : Ishikawa (5M : Méthode, Matière, Milieu, Matériel, Main-d'oeuvre), 5 Pourquoi, Iceberg Model.",advanced:"Les archétypes systémiques (Peter Senge) décrivent des patterns récurrents. Reconnaître ces patterns permet d'anticiper les dynamiques."}},
    {text:"Reconnaître les boucles de rétroaction",detail:{beginner:"Boucle positive : amplifie un phénomène (boule de neige). Boucle négative : le régule (thermostat). En projet, comprendre ces boucles aide à anticiper ce qui va s'amplifier.",intermediate:"Boucle positive : un projet en retard accumule de la dette technique qui crée plus de retard. Boucle négative : les indicateurs EVM signalent les dérives pour qu'on les corrige.",advanced:"La modélisation avec les diagrammes de causalité (Causal Loop Diagrams) visualise la dynamique systémique."}},
    {text:"Prendre des décisions en tenant compte des effets systémiques",detail:{beginner:"Avant de décider, demande-toi : et si je fais ça, qu'est-ce qui se passe ailleurs ? Accélérer une phase peut retarder une autre.",intermediate:"L'analyse d'impact évalue les effets d'une décision sur 3 niveaux : direct, indirect et systémique. La matrice de traçabilité des exigences aide à comprendre les impacts.",advanced:"La théorie de la décision systémique intègre les externalités, les délais de rétroaction et l'incertitude."}}
  ]},
  {id:"p6",type:"principle",num:"P06",title:"Leadership",short:"Démontrer des comportements de leadership qui motivent, inspirent et guident vers les objectifs.",
   body:"<p>Le leadership en gestion de projet n'est pas lié à une position hiérarchique. <strong>Styles :</strong> Servant Leadership, Transformational, Transactional. <strong>Théories :</strong> Maslow, Herzberg, McGregor X/Y, Goleman.</p>",
   objectives:[
    {text:"Distinguer leadership et management",detail:{beginner:"Le management, c'est gérer les choses (processus, budgets, planning). Le leadership, c'est inspirer les gens. Un bon chef de projet fait les deux selon le contexte.",intermediate:"Kotter : Management = planifier, organiser, diriger, contrôler (stabilité). Leadership = établir une direction, aligner, motiver (changement).",advanced:"Leadership transformationnel vs transactionnel. Les 4I : Idealized Influence, Inspirational Motivation, Intellectual Stimulation, Individual Consideration."}},
    {text:"Appliquer les théories de la motivation",detail:{beginner:"Maslow : les gens ont des besoins dans un ordre. D'abord survivre (salaire), puis être en sécurité, puis appartenir, puis être reconnu, enfin s'accomplir.",intermediate:"Maslow (pyramide), Herzberg (hygiène vs motivateurs), McGregor (X vs Y), Vroom (Expectancy Theory), McClelland (accomplissement, affiliation, pouvoir).",advanced:"Self-Determination Theory (Deci & Ryan) : 3 besoins fondamentaux : Autonomy, Competence, Relatedness. Les pratiques agiles sont conçues pour satisfaire ces 3 besoins."}},
    {text:"Adapter son style de leadership selon le contexte",detail:{beginner:"Il n'y a pas un seul bon style. Parfois il faut être directif (urgence). Parfois il faut être coach (développer les compétences). Parfois il faut déléguer (équipe experte).",intermediate:"Prédictif/stable → Management par les processus. Incertain/complexe → Leadership adaptatif. Équipe junior → Style directif puis coaching.",advanced:"Leadership Ambidexterity : alterner entre styles exploratoire (innovation) et exploitatif (optimisation)."}},
    {text:"Développer l'intelligence émotionnelle (IE)",detail:{beginner:"L'IE, c'est la capacité à reconnaître et gérer ses émotions ET celles des autres. Un PM avec une haute IE remarque que son équipe est stressée avant même qu'on lui dise quoi que ce soit.",intermediate:"Goleman : Self-awareness, Self-management, Social awareness (empathie), Relationship management. L'IE est un meilleur prédicteur du succès en leadership que le QI.",advanced:"Les neurosciences confirment que le stress chronique détériore les fonctions cognitives supérieures. Le PM qui maintient un environnement psychologiquement sûr favorise les meilleures performances."}},
    {text:"Pratiquer le servant leadership en environnement agile",detail:{beginner:"Le servant leadership : le leader est AU SERVICE de son équipe. Au lieu de dire faites ça, il demande de quoi avez-vous besoin pour réussir ? C'est le modèle de leadership promu par Scrum.",intermediate:"Greenleaf (1977) : Listen, Empathize, Heal, Aware, Persuade, Conceptualize, Foresee, Stewardship, Commit to growth, Build community. En Scrum, le Scrum Master est le servant leader.",advanced:"La tension entre servant leadership et autorité formelle est récurrente. Dans une structure matricielle, le PM n'a souvent pas d'autorité hiérarchique — le servant leadership devient le seul levier d'influence réelle."}}
  ]},
  {id:"p7",type:"principle",num:"P07",title:"Adaptation (Tailoring)",short:"Adapter délibérément l'approche, la gouvernance et les processus au contexte spécifique.",
   body:"<p>Il n'existe pas de méthode universelle. Le tailoring consiste à <strong>ajuster intentionnellement</strong> les processus en fonction du contexte unique : taille, complexité, industrie, culture organisationnelle.</p>",
   objectives:[
    {text:"Identifier les facteurs qui guident les décisions de tailoring",detail:{beginner:"Le tailoring, c'est choisir les bons outils pour le bon travail. Les facteurs clés : taille du projet, complexité, niveau d'innovation, culture de l'organisation.",intermediate:"Facteurs : Caractéristiques du projet (taille, complexité, durée), Environnement organisationnel (culture, maturité), Caractéristiques de l'équipe, Exigences des parties prenantes.",advanced:"PMBOK 7 : tailoring en 4 étapes : 1) Select initial approach. 2) Tailor for organization. 3) Tailor for project. 4) Implement ongoing improvement."}},
    {text:"Choisir l'approche adaptée selon le contexte",detail:{beginner:"Prédictif (Waterfall) : quand tu sais exactement ce que tu veux. Agile : quand les exigences vont évoluer. Hybride : mélange des deux pour les projets complexes.",intermediate:"Critères : Clarté des exigences, Stabilité du scope, Niveau d'innovation, Réglementation. À l'examen : environ 50% des questions portent sur Agile ou Hybride.",advanced:"Le Stacey Matrix cartographie la complexité des exigences vs la certitude technologique. Les frameworks hybrides modernes : Disciplined Agile (DA), SAFe, LeSS."}},
    {text:"Adapter les cérémonies agiles à une organisation traditionnelle",detail:{beginner:"Quand une organisation habituée au Waterfall commence l'Agile, il faut s'adapter progressivement. On peut garder certains rapports traditionnels tout en introduisant des sprints.",intermediate:"Identifier quels processus créent de la valeur vs lesquels sont bureaucratiques. Introduire les pratiques agiles progressivement. Maintenir la gouvernance formelle requise.",advanced:"Obstacles à l'adoption agile : résistance culturelle, processus de gouvernance rigides, métriques inadaptées. Solutions : Agile Stage Gates, Portfolio Kanban, OKRs."}},
    {text:"Justifier les choix de tailoring devant les parties prenantes",detail:{beginner:"Si tu décides d'utiliser une approche agile, tu dois expliquer POURQUOI à ton sponsor. On fait des sprints car les exigences vont changer souvent et on veut s'adapter rapidement.",intermediate:"La justification s'appuie sur : risques réduits, valeur accélérée, flexibilité. Documenter les choix dans le Plan de Management ou l'Agile Charter.",advanced:"La négociation avec les parties prenantes institutionnelles (PMO, Direction, Auditeurs) requiert des arguments basés sur les données."}},
    {text:"Reconnaître les anti-patterns de tailoring",detail:{beginner:"Les anti-patterns sont les erreurs courantes. Ex: utiliser des processus agiles sans les comprendre (Fake Agile), ou sur-compliquer un petit projet simple.",intermediate:"Anti-patterns : Cargo cult Agile (adopter les cérémonies sans la culture), Wagile mal fait (sprints sans vraie itération), sur-ingénierie.",advanced:"Dark Scrum (Ron Jeffries) : sprints utilisés pour pression plutôt que livraison de valeur, Product Owner sans pouvoir décisionnel, rétrospectives sans actions suivies."}}
  ]},
  {id:"p8",type:"principle",num:"P08",title:"Qualité",short:"Intégrer la qualité dans les processus et livrables pour répondre aux attentes des parties prenantes.",
   body:"<p>La qualité se construit tout au long du cycle de vie. <strong>COQ :</strong> Prevention + Appraisal + Failure costs. Prévenir coûte moins cher que corriger.</p><p><strong>Outils :</strong> Pareto (80/20), diagrammes de contrôle, Six Sigma, Lean, TQM.</p>",
   objectives:[
    {text:"Distinguer qualité et grade",detail:{beginner:"Qualité = le produit fait exactement ce pour quoi il a été conçu, sans défauts. Grade = le niveau de sophistication. Low quality = toujours un problème. Low grade = peut être acceptable.",intermediate:"Qualité : conformité aux exigences. Grade : niveau de caractéristiques. Un logiciel de grade élevé peut être de mauvaise qualité (plein de bugs).",advanced:"Définition ISO de la qualité. Le modèle de Kano identifie 3 types d'attributs : Must-be, One-dimensional (plus = mieux), Attractive (inattendus = enchantement)."}},
    {text:"Calculer et analyser le Coût de la Qualité (COQ)",detail:{beginner:"Le COQ englobe TOUT ce qu'on dépense en lien avec la qualité. Règle d'or : 1 euro dépensé en prévention évite 10 euros de correction.",intermediate:"COQ = Cost of Conformance + Cost of Non-Conformance. Conformance : Prevention (formation) + Appraisal (tests). Non-Conformance : Internal failure (reprise) + External failure (garanties).",advanced:"Six Sigma vise 3,4 défauts par million d'opportunités (DPMO). À l'examen : calculer les composantes du COQ dans des scénarios."}},
    {text:"Appliquer les 7 outils qualité de base",detail:{beginner:"Les 7 outils qualité de base. Le plus connu : diagramme de Pareto. 80% des problèmes viennent de 20% des causes. En identifiant ces 20%, on résout 80% des problèmes !",intermediate:"Les 7 outils : Ishikawa, Pareto, Histogramme, Diagramme de contrôle, Diagramme de dispersion, Feuille de collecte, Stratification.",advanced:"Le contrôle statistique des processus (SPC) identifie : variation commune et variation spéciale. DMAIC pour amélioration, DMADV pour conception."}},
    {text:"Distinguer assurance qualité (QA) et contrôle qualité (QC)",detail:{beginner:"L'assurance qualité (QA), ce n'est pas vérifier les livrables — c'est vérifier que les PROCESSUS sont bons. Si tes processus sont bons, tes livrables seront bons automatiquement.",intermediate:"QA = audit des processus (proactif, préventif). QC = inspection des livrables (réactif). En agile : les revues de code, TDD et Definition of Done sont des mécanismes intégrés.",advanced:"L'amélioration continue (Kaizen). TQM étend la responsabilité qualité à toute l'organisation. Les principes de Deming (PDCA, 14 points) restent fondamentaux."}},
    {text:"Appliquer les principes Lean et Six Sigma",detail:{beginner:"Six Sigma vise à réduire les défauts jusqu'à presque zéro. Lean vise à éliminer tous les gaspillages. Ensemble (Lean Six Sigma), c'est très puissant.",intermediate:"Lean : 8 gaspillages (TIMWOODS) : Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects, Skills. Outils : Value Stream Mapping, Kanban, 5S.",advanced:"Lean Six Sigma dans les projets : le Value Stream Mapping identifie les gaspillages dans les processus projet eux-mêmes. Le lead time peut être réduit de 30-50%."}}
  ]},
  {id:"p9",type:"principle",num:"P09",title:"Complexité",short:"Évaluer et naviguer en permanence la complexité pour permettre au projet de réussir.",
   body:"<p>La complexité diffère de la difficulté. Le modèle <strong>Cynefin</strong> est central : Simple (bonnes pratiques), Compliqué (expertise), Complexe (expérimentation), Chaotique (action immédiate).</p>",
   objectives:[
    {text:"Utiliser le modèle Cynefin pour classifier les situations",detail:{beginner:"Cynefin classe les situations en 4 catégories. Simple : suivre les étapes suffit. Compliqué : besoin d'un expert. Complexe : essayer, apprendre, adapter. Chaotique : agir d'abord.",intermediate:"Simple → sense-categorize-respond → bonnes pratiques. Compliqué → sense-analyze-respond → expertise. Complexe → probe-sense-respond → émergent. Chaotique → act-sense-respond.",advanced:"Sous-estimer la complexité (traiter du Complexe comme du Compliqué) est une erreur fréquente et coûteuse. La plupart des projets d'innovation opèrent dans le domaine Complexe."}},
    {text:"Identifier les sources de complexité d'un projet",detail:{beginner:"Un projet peut être complexe car : nombreuses équipes différentes, technologie nouvelle, exigences pas claires, ou environnement politique compliqué.",intermediate:"Sources : Humaine/Relationnelle (dynamiques politiques), Systémique (interdépendances), Technique (technologies nouvelles), Environnementale (réglementations changeantes).",advanced:"Le Complexity Assessment Tool PMI évalue 4 dimensions : humaine, systémique, ambiguïté, dynamisme. Un score élevé indique qu'une approche adaptative est plus appropriée."}},
    {text:"Appliquer probe-sense-respond en contexte complexe",detail:{beginner:"Probe-Sense-Respond : au lieu de planifier tout à l'avance, on fait une petite expérience (probe), on observe (sense), et on adapte (respond). C'est ce que fait une équipe agile avec ses sprints.",intermediate:"Application : Probe = lancer un pilote ou spike. Sense = analyser les résultats. Respond = amplifier, atténuer ou abandonner. Les rétrospectives agiles sont des moments formels de sense-respond.",advanced:"Les organisations excellant dans probe-sense-respond développent : sensing capabilities, seizing capabilities, reconfiguring capabilities."}},
    {text:"Gérer l'ambiguïté sans fausse certitude",detail:{beginner:"Face à l'ambiguïté, beaucoup cherchent une fausse certitude : faire un plan très détaillé alors qu'on ne sait pas ce qui va se passer. La vraie compétence, c'est être à l'aise avec l'incertitude.",intermediate:"Stratégies : Décomposer l'ambiguïté, définir des hypothèses et les valider rapidement, utiliser des ranges plutôt que des estimations ponctuelles.",advanced:"La théorie de la décision distingue : Risque (probabilités connues), Incertitude (probabilités inconnues), Ambiguïté profonde. Techniques : Real Options Analysis, Scenario Planning."}},
    {text:"Choisir des stratégies adaptées à chaque niveau Cynefin",detail:{beginner:"Pour un projet simple : utiliser des processus standard. Pour compliqué : faire appel à des experts. Pour complexe : expérimenter en petit. Pour une crise : agir vite pour stabiliser.",intermediate:"Stratégies : Simple → Standardiser. Compliqué → Experts, analyse. Complexe → Expériences safe-to-fail, amplifier ce qui marche. Chaotique → Ordre d'abord.",advanced:"La tolérance à l'échec (fail fast, learn fast) est une nécessité dans le domaine Complexe."}}
  ]},
  {id:"p10",type:"principle",num:"P10",title:"Risques & Opportunités",short:"Identifier et répondre proactivement aux risques et opportunités pour maximiser le succès.",
   body:"<p><strong>Menaces :</strong> Éviter, Transférer, Atténuer, Accepter. <strong>Opportunités :</strong> Exploiter, Partager, Améliorer, Accepter.</p><p><em>Outils :</em> VME/EMV, Arbre de décision, Monte Carlo, Réserve d'aléas vs Réserve de gestion.</p>",
   objectives:[
    {text:"Appliquer les 5 processus de gestion des risques",detail:{beginner:"La gestion des risques, c'est être proactif. Les 5 étapes : 1) Identifier les risques. 2) Analyser leur probabilité et impact. 3) Planifier les réponses. 4) Mettre en oeuvre. 5) Surveiller constamment.",intermediate:"Processus PMBOK : Plan → Identify → Qualitative → Quantitative → Plan Responses → Implement → Monitor.",advanced:"La maturité évolue de réactive à proactive à prédictive. Les Early Warning Indicators (EWI) permettent de détecter les risques avant qu'ils ne se matérialisent."}},
    {text:"Analyser qualitativement et quantitativement les risques",detail:{beginner:"Analyse qualitative : on évalue chaque risque sur une échelle simple (faible/moyen/élevé) pour sa probabilité ET son impact. Puis on les positionne dans une matrice pour prioriser.",intermediate:"Qualitative : Matrice P x I. Score = Probabilité × Impact. Quantitative : EMV = Probabilité × Impact monétaire. Simulation Monte Carlo.",advanced:"Limites de l'analyse qualitative : anchoring, biais de disponibilité, groupthink. Monte Carlo génère des milliers de scénarios pour une distribution de probabilités."}},
    {text:"Choisir la stratégie de réponse appropriée",detail:{beginner:"Pour les menaces : Éviter (changer le plan), Transférer (assurance), Atténuer (réduire), Accepter (surveiller). Pour les opportunités : Exploiter, Partager, Améliorer, Accepter.",intermediate:"Choisir selon le contexte : Éviter si risque critique et évitable. Transférer si financier. Atténuer si réductible à coût acceptable. Escalate si au-delà de l'autorité du PM.",advanced:"La sélection optimale intègre : coût de la réponse vs coût du risque, risques secondaires, risques résiduels."}},
    {text:"Distinguer réserve d'aléas et réserve de gestion",detail:{beginner:"Réserve d'aléas : budget pour les risques qu'on a identifiés. Gérée par le PM. Réserve de gestion : budget pour les surprises complètes qu'on n'avait pas anticipées. Gérée par la direction.",intermediate:"Réserve d'aléas (Contingency Reserve) : risques connus-inconnus. Dans la baseline du coût. Gérée par le PM. Réserve de gestion (Management Reserve) : risques inconnus-inconnus. Nécessite approbation hiérarchique.",advanced:"La baseline de coût inclut la réserve d'aléas. Le budget total inclut la réserve de gestion. L'utilisation de la réserve de gestion déclenche une révision du Business Case."}},
    {text:"Identifier et exploiter les opportunités",detail:{beginner:"Un risque n'est pas toujours une mauvaise chose ! Un concurrent qui quitte le marché est une opportunité. L'objectif est aussi de maximiser les opportunités.",intermediate:"Opportunités = risques positifs. Stratégies : Exploit (garantir que l'opportunité se réalise). Enhance (augmenter probabilité ou impact positif). Share (partager). Accept (être prêt).",advanced:"Le management proactif des opportunités requiert une culture qui récompense leur identification. Techniques : Reverse Risk Analysis, Pre-mortem positif."}}
  ]},
  {id:"p11",type:"principle",num:"P11",title:"Adaptabilité & résilience",short:"Construire l'adaptabilité et la résilience dans les approches organisationnelles et d'équipe.",
   body:"<p>Adaptabilité = capacité à répondre aux changements. Résilience = capacité à absorber les chocs et se rétablir. Ces qualités sont essentielles dans un environnement VUCA.</p>",
   objectives:[
    {text:"Distinguer adaptabilité et résilience",detail:{beginner:"Adaptabilité : changer de direction quand le vent tourne. Résilience : tenir bon quand la tempête frappe puis rebondir. Un projet adaptable change son plan. Un projet résilient survit à une crise.",intermediate:"Adaptabilité : capacité proactive à modifier les approches. Mécanismes : revues fréquentes, gestion du backlog. Résilience : capacité réactive. Mécanismes : redondance, slack time.",advanced:"Weick & Sutcliffe : 5 caractéristiques des organisations hautement fiables. Le principe d'antifragilité (Taleb) : construire des systèmes qui bénéficient de la variabilité."}},
    {text:"Mettre en place des mécanismes d'apprentissage continu",detail:{beginner:"L'apprentissage continu : ne jamais faire deux fois la même erreur. Après chaque sprint ou phase, se demander : qu'est-ce qui a bien marché ? Mal marché ? Et APPLIQUER les changements.",intermediate:"Mécanismes formels : Rétrospectives (agile), Lessons Learned (prédictif), Post-Implementation Review, Communities of Practice (CoP).",advanced:"Les organisations apprenantes (Peter Senge) développent 5 disciplines. La double boucle d'apprentissage (Argyris & Schön)."}},
    {text:"Construire une équipe polyvalente avec un haut Bus Factor",detail:{beginner:"Bus Factor = combien de personnes doivent partir pour bloquer le projet. L'idéal : Bus Factor le plus haut possible ! Si une seule personne connaît quelque chose de critique, c'est dangereux.",intermediate:"Stratégies : Cross-training, Pair working, Rotation des responsabilités, Documentation systématique, Matrice des compétences.",advanced:"T-shaped skills : largeur = compétences transversales. Profondeur = expertise dans un domaine. Les profils en M (double expertise) sont les plus précieux."}},
    {text:"Gérer le changement de scope de manière flexible",detail:{beginner:"La gestion flexible ne veut pas dire dire oui à tout — ça veut dire avoir un processus clair pour évaluer et intégrer les changements de manière contrôlée.",intermediate:"Integrated Change Control : demande documentée, analysée, approuvée par le CCB, puis implémentée. En agile : les nouvelles stories sont ajoutées au backlog.",advanced:"Fixed Date, Fixed Budget, Variable Scope contracts sont une réponse agile aux contrats traditionnels."}},
    {text:"Utiliser les métriques agiles pour piloter l'adaptabilité",detail:{beginner:"Le burndown chart montre combien de travail il reste. La vélocité mesure combien de travail l'équipe accomplit par sprint. Ces mesures aident à prédire quand le projet sera terminé.",intermediate:"Métriques agiles : Velocity, Burndown Chart, Release Burndown, Cumulative Flow Diagram, Cycle Time, Lead Time.",advanced:"L'analyse prédictive agile combine velocity trend analysis et Monte Carlo agile. Little's Law : Lead Time = WIP / Throughput."}}
  ]},
  {id:"p12",type:"principle",num:"P12",title:"Changement organisationnel",short:"Accompagner le changement organisationnel pour faciliter l'adoption des livrables du projet.",
   body:"<p>Livrer un système ne suffit pas si personne ne l'utilise. <strong>Modèles :</strong> ADKAR, Kotter (8 étapes), Courbe de Kübler-Ross adaptée.</p>",
   objectives:[
    {text:"Appliquer le modèle ADKAR",detail:{beginner:"ADKAR : A = Awareness, D = Desire, K = Knowledge, A = Ability, R = Reinforcement. Séquentiel : bloquer une étape bloque toutes les suivantes.",intermediate:"Diagnostic ADKAR : Awareness gap → communication. Desire gap → engagement. Knowledge gap → formation. Ability gap → accompagnement pratique. Reinforcement gap → reconnaissance.",advanced:"L'intégration d'ADKAR dans le projet : le Change Manager réalise une évaluation ADKAR de chaque groupe de parties prenantes régulièrement."}},
    {text:"Identifier et répondre aux sources de résistance",detail:{beginner:"La résistance au changement est NORMALE. Les gens ont peur de perdre quelque chose. Comprendre la peur qui se cache derrière la résistance est la première étape.",intermediate:"Sources courantes : peur de l'incompétence, de l'inconnu, perte de contrôle, mauvaises expériences passées. Stratégies : écoute active, communication transparente, implication.",advanced:"Le modèle SCARF (David Rock) : Status, Certainty, Autonomy, Relatedness, Fairness. Un changement qui menace une de ces dimensions active une réponse de stress."}},
    {text:"Utiliser le modèle de Kotter en 8 étapes",detail:{beginner:"Kotter : 8 étapes. 1) Créer l'urgence. 2) Former une coalition. 3) Créer une vision. 4) Communiquer la vision. 5) Lever les obstacles. 6) Générer des succès rapides. 7) Consolider. 8) Ancrer dans la culture.",intermediate:"Quick wins → choisir des victoires rapides visibles dans les 6 premiers mois. Coalition → identifier sponsors et champions.",advanced:"Kotter 2.0 (2014) : dual operating system — la hiérarchie traditionnelle pour les opérations + un réseau agile pour le changement."}},
    {text:"Intégrer la gestion du changement dans le plan projet",detail:{beginner:"La gestion du changement doit être planifiée dès le début, avec un budget, des ressources, et des activités dans le planning.",intermediate:"Plan OCM intégré : Stakeholder Change Impact Assessment, Communication Plan, Training Plan, Change Network (champions), Readiness Assessment avant le go-live.",advanced:"L'intégration OCM-PMO crée un centre d'excellence. Change Saturation Analysis évalue si l'organisation peut absorber les changements simultanés."}},
    {text:"Mesurer l'adoption avec des indicateurs pertinents",detail:{beginner:"Le succès ne se mesure pas à la livraison du système — ça se mesure au TAUX D'UTILISATION réelle. Si 80% des gens continuent d'utiliser l'ancienne façon, le projet a échoué.",intermediate:"Leading indicators : participation aux formations, taux de complétion. Lagging indicators : taux d'utilisation, volume de transactions, workarounds.",advanced:"Le Benefit Dependency Network (Ward & Daniel) visualise la chaîne causale entre adoption → outcomes → bénéfices."}}
  ]},
  // DOMAINES
  {id:"d1",type:"domain",num:"D01",title:"Parties prenantes",short:"Identifier, comprendre et engager efficacement toutes les parties prenantes.",
   body:"<p>Identification, analyse et engagement continu des personnes et groupes affectant ou affectés par le projet.</p>",
   objectives:[
    {text:"Construire et maintenir un registre des parties prenantes",detail:{beginner:"Le registre est une liste de toutes les personnes qui comptent pour ton projet. Pour chaque personne : qui sont-elles, quel est leur rôle, qu'est-ce qu'elles attendent, quel est leur pouvoir.",intermediate:"Le registre inclut : Identification (nom, organisation, rôle). Évaluation (pouvoir, intérêt, influence). Classification (quadrant P/I). Il est confidentiel.",advanced:"Techniques d'identification avancées : Stakeholder Mapping en cercles concentriques. Snowball sampling. Systems Thinking."}},
    {text:"Analyser les parties prenantes avec différents outils",detail:{beginner:"La matrice Pouvoir/Intérêt divise les parties prenantes en 4 groupes selon leur pouvoir et leur intérêt dans le projet. C'est l'outil de base pour prioriser tes efforts.",intermediate:"Matrice Pouvoir/Intérêt, Matrice Pouvoir/Influence, Modèle Saillance (Power + Legitimacy + Urgency). Le positionnement change — réévaluer régulièrement.",advanced:"L'analyse dynamique : les coalitions entre parties prenantes créent des dynamiques systémiques."}},
    {text:"Développer des stratégies d'engagement différenciées",detail:{beginner:"Pas une seule stratégie pour tout le monde. Pour le sponsor : rapport hebdomadaire. Pour l'équipe : réunion quotidienne. Pour les utilisateurs : ateliers participatifs.",intermediate:"Le Communication Management Plan définit : qui a besoin de quoi, méthode de diffusion, fréquence et format, gestion des retours.",advanced:"Les modèles de communication efficace guident la conception. Les barrières (culturelles, linguistiques) doivent être identifiées et adressées."}},
    {text:"Gérer les conflits entre parties prenantes",detail:{beginner:"Parfois deux parties prenantes veulent des choses opposées. Le PM facilite la résolution de ces conflits. Il est le médiateur entre des intérêts divergents.",intermediate:"Techniques : Facilitation neutre, Médiation (tiers neutre), Consensus building, Trade-off analysis. Escalade au sponsor quand le conflit ne peut être résolu.",advanced:"La négociation raisonnée (Fisher & Ury) : séparer les personnes du problème, se concentrer sur les intérêts (pas les positions), générer des options pour un gain mutuel."}},
    {text:"Mesurer l'efficacité de l'engagement",detail:{beginner:"Comment savoir si tes efforts d'engagement fonctionnent ? Mesure : participent-elles aux réunions ? Répondent-elles rapidement ? Soutiennent-elles le projet publiquement ?",intermediate:"Indicateurs : taux de participation, délai de réponse, évolution de la matrice d'engagement, satisfaction par sondages.",advanced:"Net Promoter Score adapté : recommanderiez-vous ce projet comme une initiative bénéfique ? Un NPS positif indique un engagement sain."}}
  ]},
  {id:"d2",type:"domain",num:"D02",title:"Équipe",short:"Établir et maintenir une équipe de projet performante et orientée résultats.",
   body:"<p>Composition, développement et leadership. En agile, l'équipe est <strong>auto-organisée et pluridisciplinaire</strong>.</p>",
   objectives:[
    {text:"Créer et utiliser une matrice RACI",detail:{beginner:"RACI clarifie qui fait quoi. R = Responsible (qui fait le travail). A = Accountable (un seul par tâche !). C = Consulted (qui on consulte). I = Informed (qui on tient au courant).",intermediate:"Règles du RACI : un seul A par ligne. Au moins un R par ligne. Pas de R sans A. Éviter trop de C (ralentit les décisions).",advanced:"Patterns RACI problématiques : trop d'A pour une personne (goulot décisionnel). Même personne R et A (auto-contrôle)."}},
    {text:"Appliquer les modèles de développement d'équipe",detail:{beginner:"Les équipes passent par des étapes prévisibles : Forming, Storming, Norming, Performing, Adjourning. C'est normal — le PM accompagne chaque étape.",intermediate:"Forming : PM directif. Storming : PM coach. Norming : PM facilitateur. Performing : PM délégant. Adjourning : PM célèbre les succès.",advanced:"La vélocité instable = souvent signe de Storming. Les interventions précoces de team building virtuel accélèrent le Norming."}},
    {text:"Mettre en place des accords de travail (Working Agreements)",detail:{beginner:"Les accords de travail sont les règles que l'équipe se donne. Comment on se réunit ? Comment on prend des décisions ? Qu'est-ce qu'on fait si quelqu'un ne tient pas ses engagements ?",intermediate:"Éléments : valeurs partagées, normes de communication, processus de décision, gestion des conflits. Co-créé et co-révisé régulièrement.",advanced:"Les Working Agreements sont plus efficaces quand : créés par l'équipe, courts et mémorables, révisés aux rétrospectives, affichés visiblement."}},
    {text:"Gérer la performance individuelle et collective",detail:{beginner:"Gérer la performance, c'est donner du feedback régulier, reconnaître les succès, et adresser les problèmes rapidement et respectueusement.",intermediate:"Cadre : Définir des attentes claires (SMART). Feedback régulier (Situation-Behaviour-Impact). Reconnaissance. Adresser la sous-performance rapidement.",advanced:"Les recherches Gallup : feedback fréquent et spécifique est plus efficace que les évaluations annuelles. La reconnaissance non-monétaire est souvent plus motivante que les primes."}},
    {text:"Construire une équipe agile auto-organisée",detail:{beginner:"Une équipe auto-organisée prend ses propres décisions sur COMMENT accomplir le travail. Le Scrum Master crée les conditions pour que l'équipe trouve sa propre façon d'atteindre les objectifs.",intermediate:"Caractéristiques : décisions techniques collectives, allocation des tâches choisie par l'équipe, plan de sprint co-construit. Conditions : objectifs clairs, compétences complètes.",advanced:"Requisite Variety (Ashby's Law) : la complexité de l'équipe doit correspondre à la complexité de l'environnement."}}
  ]},
  {id:"d3",type:"domain",num:"D03",title:"Approche & Cycle de vie",short:"Établir l'approche, la cadence et la structure du cycle de vie du projet.",
   body:"<p>Choix délibéré de l'approche la plus adaptée : prédictive, itérative, incrémentale, agile, ou hybride.</p>",
   objectives:[
    {text:"Sélectionner l'approche selon les facteurs contextuels",detail:{beginner:"La bonne approche dépend du projet. Si les exigences sont claires et stables : Waterfall. Si elles vont changer : Agile. Si c'est un mélange : Hybride.",intermediate:"Critères : Clarté des exigences, Stabilité du scope, Niveau d'innovation, Réglementation. À l'examen : environ 50% des questions portent sur Agile ou Hybride.",advanced:"Le Stacey Matrix et le Cynefin guident le choix. Les frameworks de sélection incluent le Project Complexity Model (PCM) du PMI."}},
    {text:"Définir phases, jalons et critères de passage",detail:{beginner:"Les jalons sont des checkpoints — des étapes clés qui confirment qu'on est sur la bonne voie avant de continuer.",intermediate:"Phase Gate (Stage Gate) : revue formelle à la fin de chaque phase. Go / No-Go / Hold. Les critères de passage (exit criteria) sont définis dès le début.",advanced:"Modèles hybrides : Phase Waterfall avec exécution Agile. Agile à gates. La synchronisation des cadences est le principal défi."}},
    {text:"Concevoir un cycle de vie hybride",detail:{beginner:"Le cycle de vie hybride combine structure du Waterfall avec flexibilité de l'Agile. Ex: planifier les grandes phases à l'avance mais exécuter chaque phase avec des sprints.",intermediate:"Exemples : Wagile basique, Waterfall-Scrum, Bimodal. Chaque hybride doit être justifié par les contraintes du projet.",advanced:"Le Disciplined Agile (DA) Delivery fournit un toolkit complet. SAFe fournit une architecture hybride avec Program Increment (PI) Planning."}},
    {text:"Aligner la cadence de livraison avec les attentes",detail:{beginner:"Si ton client s'attend à voir des résultats tous les 15 jours, un projet Waterfall de 2 ans sans livraison intermédiaire va créer de l'anxiété.",intermediate:"Types de cadences : Continue, Itérative (sprints), Périodique (trimestrielle), Unique. Facteurs : complexité de déploiement, capacité d'absorption des utilisateurs.",advanced:"La cadence optimale minimise le WIP et maximise le feedback. Le minimum marketable release (MMR) définit la plus petite livraison créant une valeur perceptible."}},
    {text:"Mettre en place une gouvernance adaptée à l'approche",detail:{beginner:"La gouvernance, c'est le système de règles et de contrôles qui s'assure que le projet va dans la bonne direction.",intermediate:"Éléments de gouvernance : Décisions escaladées, Reporting et transparence, Gestion des risques et changements, Revues de performance.",advanced:"La gouvernance adaptative combine : Oversight by exception, Outcome-based accountability, Lightweight documentation."}}
  ]},
  {id:"d4",type:"domain",num:"D04",title:"Planification",short:"Organiser, élaborer et coordonner les composants du plan pour livrer les résultats attendus.",
   body:"<p>La planification est <strong>itérative et adaptative</strong>. Techniques : CPM, PERT, Monte Carlo, EVM, Agile Release Planning.</p>",
   objectives:[
    {text:"Créer une WBS (Work Breakdown Structure)",detail:{beginner:"La WBS décompose le projet en morceaux de plus en plus petits jusqu'à ce qu'ils soient faciles à gérer. La 100% Rule : la WBS doit représenter 100% du travail — ni plus, ni moins.",intermediate:"La WBS est décomposée jusqu'au niveau des work packages. Le dictionnaire décrit chaque élément : description, livrables, critères d'acceptance, responsable, estimation d'effort.",advanced:"Les erreurs courantes : confondre WBS (livrables) et OBS (organisational breakdown structure). La Control Account (CA) = intersection WBS x OBS."}},
    {text:"Développer un chronogramme avec le CPM",detail:{beginner:"Le chemin critique, c'est la séquence de tâches la plus longue du projet — ça détermine la date de fin. Si une tâche sur le chemin critique prend du retard, tout le projet prend du retard.",intermediate:"CPM : 1) Définir les activités. 2) Estimer les durées. 3) Identifier les dépendances (FS, SS, FF, SF). 4) Construire le réseau. 5) Calculer ES, EF, LS, LF. Float = LS-ES. Chemin critique = Float = 0.",advanced:"Compression du planning : Fast tracking (paralléliser — risque accru). Crashing (ajouter des ressources sur le critique — coût accru). Critical Chain (Goldratt)."}},
    {text:"Estimer les coûts avec les techniques appropriées",detail:{beginner:"Plusieurs façons d'estimer : Par analogie (ce projet ressemble à un autre). Paramétrique (unités x coût par unité). Bottom-up (additionner les coûts de chaque petite tâche).",intermediate:"Techniques et précision : ROM : -25% à +75%. Budget : -10% à +25%. Definitive : -5% à +10%. Three-point (PERT) intègre l'incertitude.",advanced:"Biais à éviter : Anchoring, Optimism bias, Planning fallacy. Reference class forecasting (Flyvbjerg) : utiliser les données historiques de projets similaires."}},
    {text:"Maîtriser les formules EVM essentielles",detail:{beginner:"L'EVM répond à 3 questions : Avance-t-on ? (SPI). Est-on dans le budget ? (CPI). Comment ça va finir ? (EAC). Il utilise : PV (prévu), EV (réalisé), AC (dépensé).",intermediate:"Formules : SV=EV-PV. CV=EV-AC. SPI=EV/PV. CPI=EV/AC. EAC=BAC/CPI. ETC=EAC-AC. TCPI=(BAC-EV)/(BAC-AC). VAC=BAC-EAC. Mémoriser toutes ces formules est indispensable.",advanced:"EVM avancé : Earned Schedule (ES) theory. EVM + Monte Carlo pour projections probabilistes (P50, P80)."}},
    {text:"Adapter la planification selon l'approche choisie",detail:{beginner:"En Waterfall, on planifie tout au début. En Agile, on planifie juste assez pour commencer et on affine au fur et à mesure (rolling wave).",intermediate:"Rolling Wave Planning : planification détaillée du prochain horizon, haute niveau du reste. Agile Release Planning : vision produit, épiques et features, sprints basés sur la vélocité.",advanced:"Impact Mapping pour aligner le backlog sur les objectifs business. Story Mapping pour visualiser le parcours utilisateur. OKRs pour connecter la planification agile à la stratégie."}}
  ]},
  {id:"d5",type:"domain",num:"D05",title:"Travail du projet",short:"Établir des processus efficaces, gérer les ressources et maintenir un environnement propice.",
   body:"<p>Exécution quotidienne du projet. <strong>En agile :</strong> Daily standups, backlog refinement, sprint planning, gestion des impediments.</p>",
   objectives:[
    {text:"Mettre en place des processus de travail efficaces",detail:{beginner:"Les processus de travail, c'est comme une recette pour l'équipe. Comment on crée un livrable ? Qui le review ? Qui l'approuve ? Un processus clair évite les malentendus.",intermediate:"Processus clés : gestion des demandes (workflow), revue et approbation, gestion des problèmes. En agile : le workflow Kanban (To Do → In Progress → Review → Done) visualise l'état.",advanced:"L'optimisation utilise les principes Lean : Value Stream Mapping, WIP limits, Little's Law."}},
    {text:"Gérer les achats et contrats",detail:{beginner:"Quand on a besoin de fournisseurs externes : choisir le bon fournisseur, négocier un bon contrat, s'assurer qu'il livre ce qui est prévu, et clôturer la relation proprement.",intermediate:"Processus : Plan → Conduct → Control → Close Procurement. Types : Fixed Price (risque fournisseur), Time & Material (risque acheteur), Cost Reimbursable.",advanced:"Stratégies avancées : Make vs Buy analysis. Les contrats agiles : Target Cost contracts (partage des gains/pertes)."}},
    {text:"Faciliter le transfert de connaissances",detail:{beginner:"Si une seule personne connaît quelque chose d'important et qu'elle part, c'est un problème grave. La gestion des connaissances, c'est s'assurer que ce que sait une personne est accessible à toute l'équipe.",intermediate:"Mécanismes : Documentation (wikis), Pair working, Communities of Practice, Rétrospectives et Lessons Learned, Formation croisée.",advanced:"KM Theory distingue : connaissance explicite (documentable) vs tacite (difficile à formaliser). SECI model (Nonaka) : Socialization, Externalization, Combination, Internalization."}},
    {text:"Faciliter des réunions efficaces",detail:{beginner:"Une bonne réunion a : un objectif clair, un ordre du jour envoyé à l'avance, les bonnes personnes, un facilitateur, et un compte-rendu avec actions et responsables.",intermediate:"Règles : définir l'objectif (information, décision, idées), inviter seulement les personnes nécessaires, timebox strict, facilitation active, actions documentées (who/what/when).",advanced:"Les réunions de plus de 7 personnes sont dominées par 3-4 personnes (Cognitive Load Theory). Les techniques de facilitation (Six Thinking Hats) permettent d'impliquer toutes les voix."}},
    {text:"Identifier et lever les obstacles à la productivité",detail:{beginner:"En agile, on appelle les obstacles des impediments. Le rôle du Scrum Master est de les enlever pour que l'équipe avance vite.",intermediate:"Processus : identification (Daily Scrum ou impediment backlog), Priorisation (impact vs urgence), Résolution (dans son cercle d'influence), Escalade (si hors de portée).",advanced:"L'analyse systémique révèle souvent des patterns : impediments récurrents = problèmes structurels. Sources systémiques courantes : dépendances inter-équipes, architecture technique rigide."}}
  ]},
  {id:"d6",type:"domain",num:"D06",title:"Livraison",short:"Livrer les livrables et résultats attendus en répondant aux exigences définies.",
   body:"<p>Gestion des exigences, contrôle du scope, et qualité des livrables. <strong>Concepts :</strong> DoD, DoR, critères d'acceptance, scope creep vs gold plating.</p>",
   objectives:[
    {text:"Gérer les exigences avec les user stories",detail:{beginner:"Les exigences décrivent ce que le client veut. Les user stories décrivent les exigences du point de vue de l'utilisateur : En tant que [qui], je veux [quoi] pour [pourquoi].",intermediate:"User Stories INVEST : Independent, Negotiable, Valuable, Estimable, Small, Testable. Techniques d'élicitation : interviews, ateliers, prototypage. Priorisation : MoSCoW.",advanced:"Hypothesis-Driven Development : chaque user story est une hypothèse à valider. ATDD : critères d'acceptance écrits AVANT le développement."}},
    {text:"Contrôler le scope pour éviter le scope creep",detail:{beginner:"Le scope creep : le projet grossit peu à peu sans que personne ne s'en rende vraiment compte. La défense : avoir un processus clair pour évaluer et approuver tous les changements.",intermediate:"Scope Creep = ajouts non autorisés (problème). Gold Plating = l'équipe ajoute des fonctionnalités non demandées (aussi un problème). Le processus Change Control est la barrière.",advanced:"La Scope Baseline = WBS + WBS Dictionary + Project Scope Statement. En agile : le scope est intentionnellement flexible, mais budget et délai sont fixes."}},
    {text:"Définir et appliquer la Definition of Done (DoD)",detail:{beginner:"La DoD, c'est la liste des critères qu'une fonctionnalité doit remplir pour être VRAIMENT terminée. Ex: code écrit, code reviewé, tests passés, documentation mise à jour.",intermediate:"Différence DoD vs Critères d'Acceptance : DoD = standard universel. Critères = spécifiques à une user story. Une story ne peut être Done que si elle remplit ses critères ET respecte la DoD.",advanced:"Une DoD trop légère accumule de la dette technique. Les équipes performantes évoluent leur DoD progressivement pour inclure tests d'intégration, de performance, revues de sécurité."}},
    {text:"Gérer les demandes de changement avec l'Integrated Change Control",detail:{beginner:"Dans tout projet, les besoins évoluent. La clé : avoir un processus clair. 1) Le changement est proposé par écrit. 2) On analyse l'impact. 3) Le CCB décide. 4) Si approuvé, on met à jour le plan.",intermediate:"Integrated Change Control : tout changement passe par le même processus. Change Request → Impact Analysis → CCB Review → Update Documents → Implement.",advanced:"La gestion proactive anticipe les demandes. Les réclamations (Claims) = demandes rejetées par une partie mais imposées par l'autre — résolution formelle requise."}},
    {text:"Distinguer Verification et Validation",detail:{beginner:"Avant de livrer, vérifier que le livrable répond aux attentes. Les tests d'acceptance (UAT) permettent au client de vérifier avant la livraison officielle.",intermediate:"Verification = are we building the product right ? (conformité aux spécifications). Validation = are we building the right product ? (adéquation au besoin).",advanced:"Shift-left testing (tester le plus tôt possible). Test Automation. CI/CD. La Verification & Validation Matrix aligne chaque exigence avec son test."}}
  ]},
  {id:"d7",type:"domain",num:"D07",title:"Mesure",short:"Évaluer la performance du projet et mettre en place des actions correctives.",
   body:"<p><strong>EVM :</strong> PV, EV, AC, SV, CV, SPI, CPI, EAC, ETC, TCPI. Burndown, Velocity, CFD.</p>",
   objectives:[
    {text:"Maîtriser toutes les formules EVM",detail:{beginner:"Les formules EVM mesurent la santé du projet. SV = EV-PV (en avance ou retard ?). CV = EV-AC (dans le budget ?). CPI = EV/AC (efficacité coût). SPI = EV/PV (efficacité planning).",intermediate:"Formules complètes : SV=EV-PV. CV=EV-AC. SPI=EV/PV. CPI=EV/AC. EAC=BAC/CPI. ETC=EAC-AC. TCPI=(BAC-EV)/(BAC-AC). VAC=BAC-EAC.",advanced:"EVM statistique : le CPI après 20% d'avancement est stable à +/-10% jusqu'à la fin. TCPI > 1.1 est généralement irréaliste."}},
    {text:"Interpréter les burndown charts et la vélocité",detail:{beginner:"Un burndown chart descend. Au début du sprint, beaucoup de travail (haut). Chaque jour le travail diminue. Si la courbe descend plus vite que prévu : en avance.",intermediate:"Velocity = story points complétés par sprint. Stable = équipe calibrée. Décroissante = problème (dette technique). Burndown plat = impediment non résolu.",advanced:"Flow metrics (alternative) : Cycle Time, Lead Time, Throughput, WIP. CFD (Cumulative Flow Diagram) visualise simultanément WIP, throughput et cycle time."}},
    {text:"Choisir des KPIs pertinents pour différents types de projets",detail:{beginner:"Un KPI mesure ce qui compte vraiment. Les bons KPIs sont SMART. Éviter les KPIs qui mesurent l'activité plutôt que le résultat.",intermediate:"KPIs par type : IT = on-time delivery, defect density, user adoption. Construction = safety incidents, budget variance. Transformation = adoption rate, benefits realization.",advanced:"Goodhart's Law : when a measure becomes a target, it ceases to be a good measure. Des métriques mal choisies créent des comportements pervers."}},
    {text:"Distinguer indicateurs avancés et retardés",detail:{beginner:"Leading indicator : te dit ce qui va se passer. Lagging indicator : te dit ce qui s'est passé. Les leading indicators permettent d'agir avant que le problème n'arrive.",intermediate:"Leading : impediments non résolus (prédit les retards), turnover, dette technique. Lagging : CPI, SPI, taux de défauts.",advanced:"Les organisations qui excellent en prévisibilité utilisent 2-3 fois plus de leading indicators. Les Early Warning Indicators (EWI) les plus prédictifs viennent des rétrospectives."}},
    {text:"Préparer des rapports d'avancement actionnables",detail:{beginner:"Un bon rapport d'avancement répond à 3 questions : Où en est-on ? Y a-t-il des problèmes ? Qu'est-ce qu'on fait ? Il est écrit pour le lecteur — pas pour le rédacteur.",intermediate:"Structure Executive Summary : Statut global (RAG : Red/Amber/Green), Accomplissements, Points d'attention et risques, Prochaines étapes, Actions demandées.",advanced:"Principes de Tufte appliqués aux rapports : data-ink ratio élevé, sparklines pour les tendances. One-page dashboard (A3 Thinking)."}}
  ]},
  {id:"d8",type:"domain",num:"D08",title:"Incertitude",short:"Adresser l'incertitude, l'ambiguïté et la complexité de manière proactive.",
   body:"<p>Modèle <strong>VUCA</strong> : Volatile (agilité), Uncertain (information), Complex (expérimentation), Ambiguous (clarification).</p>",
   objectives:[
    {text:"Appliquer le cadre VUCA",detail:{beginner:"VUCA décrit notre monde moderne : Volatile (les choses changent vite), Uncertain (on ne sait pas ce qui va se passer), Complex (tout est interconnecté), Ambiguous (situations difficiles à interpréter).",intermediate:"Réponses VUCA : Volatility → Vision stable + Agilité. Uncertainty → Understanding + collecte d'information. Complexity → Clarity + Expérimentation. Ambiguity → Agility + prototypage.",advanced:"VUCA Prime (Bob Johansen) : Vision, Understanding, Clarity, Agility. L'organisation VUCA-ready développe des Dynamic Capabilities : sensing, seizing, reconfiguring."}},
    {text:"Distinguer les trois catégories de risques",detail:{beginner:"Trois types d'inconnues : Choses qu'on sait qu'on sait (Known-Knowns). Choses qu'on sait qu'on ne sait pas (Known-Unknowns). Choses qu'on ne sait pas qu'on ne sait pas (Unknown-Unknowns).",intermediate:"Known-Knowns → registre des risques. Known-Unknowns → réserves d'aléas. Unknown-Unknowns → réserves de gestion et résilience organisationnelle.",advanced:"La théorie de l'incertitude radicale (Kay & King) affirme que les Unknown-Unknowns dominent en réalité les projets complexes. L'antifragilité (Taleb)."}},
    {text:"Construire un registre des risques complet",detail:{beginner:"Le registre liste tous les risques du projet. Pour chaque risque : Quoi (description), Probabilité, Impact, Plan de réponse, Propriétaire. Il doit être mis à jour régulièrement.",intermediate:"Contenu : ID unique, Description (event → consequence), Catégorie, Probabilité et Impact, Score P×I, Stratégie, Plan d'action, Risk Owner, Trigger, Date de révision, Statut.",advanced:"Risk Breakdown Structure (RBS) : Technical, External, Organizational, Project Management. Techniques avancées : SWIFT, HAZOP, Fault Tree Analysis (FTA), FMEA."}},
    {text:"Utiliser la simulation Monte Carlo",detail:{beginner:"Monte Carlo teste des milliers de scénarios. Au lieu de dire le projet durera 12 mois, elle dit il y a 80% de chances que le projet dure entre 10 et 15 mois. Beaucoup plus réaliste !",intermediate:"Monte Carlo : 1) Définir les inputs incertains. 2) Définir des distributions de probabilités. 3) Simuler des milliers de combinaisons. 4) Analyser P50, P80, P90 selon la tolérance au risque.",advanced:"Paramètres : minimum 10.000 itérations pour convergence. Corrélation entre activités importante à modéliser. Outputs : S-curve, sensitivity analysis (tornado chart)."}},
    {text:"Intégrer la gestion de l'incertitude dans les approches agiles",detail:{beginner:"L'agile est né pour gérer l'incertitude ! L'idée centrale : au lieu de prétendre qu'on sait tout au départ, on reconnaît qu'on apprendra en faisant. Chaque sprint réduit l'incertitude progressivement.",intermediate:"Mécanismes agiles : Sprint Review (feedback client régulier), Retrospective, Planning Poker, Definition of Ready, Spikes (exploration technique timeboxée).",advanced:"Cone of Uncertainty (McConnell) : l'incertitude est maximale au début. En agile, le cone se rétrécit plus vite. Last Responsible Moment (LRM) : retarder les décisions irréversibles."}}
  ]}
];

const FLASHCARDS = [
  {id:"f1",cat:"evm",category:"EVM & Formules",q:"Quelle est la formule du Cost Variance (CV) ?",formula:"CV = EV − AC",a:"CV = EV − AC\n▸ EV = valeur budgétisée du travail réalisé\n▸ AC = coût réel engagé\n▸ CV > 0 : sous budget ✓\n▸ CV < 0 : sur budget ✗"},
  {id:"f2",cat:"evm",category:"EVM & Formules",q:"Quelle est la formule du Schedule Variance (SV) ?",formula:"SV = EV − PV",a:"SV = EV − PV\n▸ PV = valeur budgétisée planifiée\n▸ SV > 0 : en avance ✓\n▸ SV < 0 : en retard ✗"},
  {id:"f3",cat:"evm",category:"EVM & Formules",q:"Comment calculer le CPI ?",formula:"CPI = EV / AC",a:"CPI = EV / AC\n▸ CPI > 1 : sous budget ✓\n▸ CPI < 1 : sur budget ✗\n▸ CPI = 1 : exactement dans le budget"},
  {id:"f4",cat:"evm",category:"EVM & Formules",q:"Comment calculer le SPI ?",formula:"SPI = EV / PV",a:"SPI = EV / PV\n▸ SPI > 1 : en avance ✓\n▸ SPI < 1 : en retard ✗\n▸ SPI = 1 : dans le planning"},
  {id:"f5",cat:"evm",category:"EVM & Formules",q:"Quelle est la formule EAC la plus courante ?",formula:"EAC = BAC / CPI",a:"EAC = BAC / CPI\nSuppose que la tendance passée continuera.\n\nVariantes :\n▸ EAC = AC + ETC\n▸ EAC = AC + (BAC−EV)/CPI"},
  {id:"f6",cat:"evm",category:"EVM & Formules",q:"Qu'est-ce que le TCPI ?",formula:"TCPI = (BAC−EV)/(BAC−AC)",a:"Mesure l'efficacité NÉCESSAIRE pour le reste.\n▸ TCPI > 1 : il faut faire mieux qu'avant\n▸ TCPI < 1 : objectif facilement atteignable\n▸ TCPI > 1.1 : généralement irréaliste"},
  {id:"f7",cat:"evm",category:"EVM & Formules",q:"Comment calculer la Variance At Completion (VAC) ?",formula:"VAC = BAC − EAC",a:"VAC = BAC − EAC\n▸ VAC > 0 : projet terminera sous budget\n▸ VAC < 0 : projet terminera sur budget"},
  {id:"f8",cat:"models",category:"Modèles & Théories",q:"Quelles sont les 5 phases du modèle Tuckman ?",a:"Forming → Storming → Norming → Performing → Adjourning\n\n▸ Forming : dépendance au leader\n▸ Storming : conflits, résistance\n▸ Norming : cohésion, accords\n▸ Performing : productivité maximale\n▸ Adjourning : dissolution, bilan"},
  {id:"f9",cat:"models",category:"Modèles & Théories",q:"Décris le modèle ADKAR de gestion du changement",a:"A — Awareness (conscience du besoin)\nD — Desire (envie de changer)\nK — Knowledge (savoir comment)\nA — Ability (capacité à faire)\nR — Reinforcement (maintenir le changement)\n\nSéquentiel : bloquer une étape bloque toutes les suivantes."},
  {id:"f10",cat:"models",category:"Modèles & Théories",q:"Explique le modèle Cynefin et ses 4 domaines",a:"▸ Simple : cause-effet évident → bonnes pratiques\n▸ Compliqué : analysable → expertise\n▸ Complexe : rétrospectif → expérimentation\n▸ Chaotique : aucun → action immédiate\n\nLa plupart des projets modernes = Complexe."},
  {id:"f11",cat:"models",category:"Modèles & Théories",q:"Quelles sont les 8 étapes du modèle de Kotter ?",a:"1. Créer un sentiment d'urgence\n2. Former une coalition directrice\n3. Développer une vision\n4. Communiquer la vision\n5. Lever les obstacles\n6. Générer des victoires rapides\n7. Consolider l'accélération\n8. Ancrer dans la culture"},
  {id:"f12",cat:"models",category:"Modèles & Théories",q:"Deux facteurs de Herzberg : quelle différence ?",a:"Facteurs d'hygiène (absence = insatisfaction) :\nSalaire, conditions, sécurité, relations\n\nFacteurs de motivation (présence = satisfaction) :\nAccomplissement, reconnaissance, responsabilité\n\nConclusion : augmenter le salaire ne suffit pas !"},
  {id:"f13",cat:"agile",category:"Agile & Scrum",q:"Quels sont les 3 piliers de Scrum ?",a:"▸ Transparence : rendre visible ce qui compte\n▸ Inspection : examiner régulièrement\n▸ Adaptation : ajuster si les résultats dérivent\n\nCes 3 piliers sont interdépendants."},
  {id:"f14",cat:"agile",category:"Agile & Scrum",q:"Durées des cérémonies Scrum pour un sprint de 2 semaines ?",a:"▸ Sprint Planning : max 8h\n▸ Daily Scrum : 15 min (chaque jour)\n▸ Sprint Review : max 4h\n▸ Sprint Retrospective : max 3h\n\nTotal : ~15h de cérémonies par sprint."},
  {id:"f15",cat:"agile",category:"Agile & Scrum",q:"Différence entre DoD et critères d'acceptance ?",a:"DoD (Definition of Done) :\nStandard universel pour TOUS les livrables\n\nCritères d'acceptance :\nSpécifiques à UNE user story\n\nLes deux doivent être remplis pour qu'une story soit Done."},
  {id:"f16",cat:"agile",category:"Agile & Scrum",q:"Qu'est-ce que la vélocité et comment l'utiliser ?",a:"Vélocité = story points complétés par sprint\n\nUsages :\n▸ Prédire combien de sprints pour livrer le backlog\n▸ Identifier les tendances\n▸ Alimenter la Release Planning\n\n⚠️ Ne pas comparer entre équipes différentes !"},
  {id:"f17",cat:"risk",category:"Risques & Incertitude",q:"Quelles sont les 4 stratégies de réponse aux menaces ?",a:"▸ Éviter : changer le plan pour éliminer le risque\n▸ Transférer : reporter sur un tiers (assurance)\n▸ Atténuer : réduire probabilité ou impact\n▸ Accepter : passif (rien) ou actif (réserve)\n\n+ Escalader si au-delà de l'autorité du PM"},
  {id:"f18",cat:"risk",category:"Risques & Incertitude",q:"Différence réserve d'aléas vs réserve de gestion ?",a:"Réserve d'aléas :\n▸ Pour risques CONNUS-INCONNUS\n▸ Dans la baseline du coût\n▸ Gérée par le PM\n\nRéserve de gestion :\n▸ Pour risques INCONNUS-INCONNUS\n▸ Hors baseline\n▸ Nécessite approbation du sponsor"},
  {id:"f19",cat:"risk",category:"Risques & Incertitude",q:"Qu'est-ce que la VME (Valeur Monétaire Attendue) ?",formula:"EMV = Probabilité × Impact",a:"EMV = P × I (en €)\n\nExemple :\nRisque A : P=30%, Impact=-50k€ → EMV = -15k€\nOpportunité B : P=20%, Impact=+80k€ → EMV = +16k€\n\nSomme des EMV → dimensionner la réserve d'aléas."},
  {id:"f20",cat:"risk",category:"Risques & Incertitude",q:"Que signifie VUCA et comment y répondre ?",a:"V — Volatile → Vision + Agilité\nU — Uncertain → Understanding + Information\nC — Complex → Clarity + Expérimentation\nA — Ambiguous → Agility + Prototypage\n\nLe PMBOK 7 est conçu pour naviguer l'environnement VUCA."}
];

const DIAG_QS = [
  {q:"Qu'est-ce que le CPI en gestion de projet ?",opts:["Je ne sais pas du tout","J'en ai vaguement entendu parler","Cost Performance Index — je connais la formule","Je peux l'expliquer et l'interpréter facilement"],score:[0,1,2,3]},
  {q:"Avez-vous déjà travaillé sur un projet professionnel ?",opts:["Jamais","J'ai participé en tant que membre d'équipe","J'ai coordonné des projets sans formation formelle","J'ai géré des projets avec une méthode structurée"],score:[0,1,2,3]},
  {q:"Quelle est la différence entre Agile et Waterfall ?",opts:["Je ne connais pas ces termes","J'ai une vague idée mais pas certain","Je comprends les principes de base des deux","Je peux expliquer et choisir l'approche selon le contexte"],score:[0,1,2,3]},
  {q:"Connaissez-vous le modèle Tuckman ?",opts:["Non","J'en ai entendu parler","Je connais les 5 phases","Je peux l'appliquer à des situations réelles"],score:[0,1,2,3]},
  {q:"Qu'est-ce que la gestion des risques en projet ?",opts:["Je ne sais pas","C'est éviter les problèmes","C'est identifier, analyser et planifier des réponses","Je maîtrise l'analyse qualitative et quantitative"],score:[0,1,2,3]},
  {q:"Avez-vous utilisé des outils de gestion de projet ?",opts:["Non","Excel / Word uniquement","MS Project, Jira, ou similaire","Plusieurs outils avancés en contexte professionnel"],score:[0,1,2,3]},
  {q:"Connaissez-vous les domaines d'examen du PMP ?",opts:["Non, c'est la première fois","J'en ai entendu parler","Je connais leur pondération","Je suis en cours de préparation PMP"],score:[0,1,2,3]},
  {q:"Quelle est votre motivation principale ?",opts:["Découvrir la gestion de projet","Me préparer à la certification PMP","Renforcer mes compétences existantes","Me rafraîchir la mémoire avant l'examen"],score:[1,3,2,3]}
];

const LEVELS = [
  {name:"🥉 Junior PM",xpNext:100},
  {name:"🥈 Project Manager",xpNext:250},
  {name:"🥇 Senior PM",xpNext:500},
  {name:"💎 PMP Candidate",xpNext:900},
  {name:"🏆 PMP Master",xpNext:9999}
];

// ═══════════════════════════════════════════════════
// COMPOSANTS
// ═══════════════════════════════════════════════════

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

function XPBar({ xp, streak }) {
  const lvl = LEVELS.reduce((a, l, i) => xp >= (i === 0 ? 0 : LEVELS[i-1].xpNext) ? l : a, LEVELS[0]);
  const lvlIdx = LEVELS.indexOf(lvl);
  const prev = lvlIdx === 0 ? 0 : LEVELS[lvlIdx-1].xpNext;
  const pct = Math.min(100, Math.round(((xp - prev) / (lvl.xpNext - prev)) * 100));
  return (
    <div className="xp-wrap">
      <span className="xp-lvl">{lvl.name}</span>
      <div className="xp-bar"><div className="xp-fill" style={{width: pct + "%"}} /></div>
      <span className="xp-pts">⭐{xp} · 🔥{streak}j</span>
    </div>
  );
}

// ── DASHBOARD ──
function Dashboard({ state, goTo }) {
  const total = ITEMS.length;
  const done = Object.values(state.completed).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const circ = 200, r = 40, offset = circ - (circ * pct / 100);
  return (
    <div>
      <div className="dash-hero">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
          <div style={{flex:1}}>
            <div className="eyebrow">PMBOK 7 · PMI 2021</div>
            <div className="dh-title">Ton espace<br /><em>de maîtrise PMP</em></div>
            <div className="dh-sub">Parcours adaptatif — 12 principes, 8 domaines, flashcards SRS, simulateur d'examen IA.</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn btn-primary btn-sm" onClick={() => goTo("guide")}>Guide PMBOK 7 →</button>
              <button className="btn btn-ghost btn-sm" onClick={() => goTo("diagnostic")}>🎯 Mon niveau</button>
            </div>
          </div>
          <div className="circ-wrap">
            <svg className="circ-svg" viewBox="0 0 100 100" style={{transform:"rotate(-90deg)"}}>
              <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
              <circle fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="8" cx="50" cy="50" r="40"/>
              <circle fill="none" stroke="url(#cg)" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" strokeDasharray={circ} strokeDashoffset={offset} style={{transition:"stroke-dashoffset 1s ease"}}/>
            </svg>
            <div className="circ-label"><div className="circ-pct">{pct}%</div><div style={{fontSize:9,color:"var(--slate-l)"}}>complété</div></div>
          </div>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-c"><div className="stat-ico">✅</div><div className="stat-val">{done}</div><div className="stat-lbl">Sections maîtrisées</div></div>
        <div className="stat-c"><div className="stat-ico">⭐</div><div className="stat-val">{state.xp}</div><div className="stat-lbl">Points XP</div></div>
        <div className="stat-c"><div className="stat-ico">📝</div><div className="stat-val">{state.examCount}</div><div className="stat-lbl">Examens simulés</div></div>
        <div className="stat-c"><div className="stat-ico">🎯</div><div className="stat-val">{state.bestScore ? state.bestScore + "%" : "—"}</div><div className="stat-lbl">Meilleur score</div></div>
      </div>
      <div style={{marginBottom:8,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)"}}>⚡ Actions rapides</div>
      {[
        {ico:"🎯",page:"diagnostic",t:"Diagnostic de niveau",s:"Personnalise ton parcours"},
        {ico:"📚",page:"guide",t:"Guide PMBOK 7",s:"12 principes + 8 domaines"},
        {ico:"⚡",page:"sprint",t:"Sprint 15 min",s:"Entraînement intensif · +15 XP/bonne réponse"},
        {ico:"🃏",page:"flashcards",t:"Flashcards SRS",s:"Mémorisation intelligente"},
        {ico:"⏱️",page:"exam",t:"Simulateur examen",s:"Questions style PMP réel"},
        {ico:"📊",page:"progress",t:"Ma progression",s:"Badges, prédiction, plan"},
      ].map(a => (
        <button key={a.page} className="qa-item" onClick={() => goTo(a.page)}>
          <div className="qa-ico">{a.ico}</div>
          <div><div className="qa-t">{a.t}</div><div className="qa-s">{a.s}</div></div>
          <div className="qa-arr">→</div>
        </button>
      ))}
    </div>
  );
}

// ── DIAGNOSTIC ──
function Diagnostic({ state, onFinish, goTo }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (state.diagDone) {
    const lvlLabel = state.userLevel === "advanced" ? "🔴 Avancé" : state.userLevel === "intermediate" ? "🟡 Intermédiaire" : "🟢 Débutant";
    return (
      <div style={{textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:48,marginBottom:14}}>🎯</div>
        <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,marginBottom:8}}>Diagnostic complété !</div>
        <div style={{fontSize:14,color:"var(--text-2)",marginBottom:20}}>Ton niveau détecté : <strong style={{color:"var(--text)"}}>{lvlLabel}</strong></div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn btn-primary" onClick={() => goTo("guide")}>📚 Accéder au guide →</button>
          <button className="btn btn-ghost" onClick={() => onFinish(null, true)}>↺ Refaire</button>
        </div>
      </div>
    );
  }

  const q = DIAG_QS[step];
  const letters = ["A","B","C","D"];
  return (
    <div style={{maxWidth:560,margin:"0 auto"}}>
      <div className="diag-steps">
        {DIAG_QS.map((_,i) => <div key={i} className={"diag-step"+(i<step?" done":i===step?" cur":"")} />)}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:"var(--slate-l)",marginBottom:8}}>Question {step+1} sur {DIAG_QS.length}</div>
      <div className="card">
        <div className="diag-q">{q.q}</div>
        {q.opts.map((opt,i) => (
          <button key={i} className="diag-opt" onClick={() => {
            const newAns = [...answers, q.score[i]];
            if (step + 1 >= DIAG_QS.length) {
              const total = newAns.reduce((a,b) => a+b, 0);
              const pct = (total / (DIAG_QS.length * 3)) * 100;
              const lvl = pct >= 66 ? "advanced" : pct >= 33 ? "intermediate" : "beginner";
              onFinish(lvl);
            } else {
              setAnswers(newAns);
              setStep(step + 1);
            }
          }}>
            <div className="diag-ltr">{letters[i]}</div>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── GUIDE ──
function Guide({ state, onToggleObj, addXP }) {
  const [tab, setTab] = useState("overview");
  const [openPanel, setOpenPanel] = useState(null);
  const [openObjDetail, setOpenObjDetail] = useState(null);
  const [quizData, setQuizData] = useState({});
  const [quizLoading, setQuizLoading] = useState({});

  const principles = ITEMS.filter(i => i.type === "principle");
  const domains = ITEMS.filter(i => i.type === "domain");

  const getPct = (item) => {
    const checked = item.objectives.filter((_, i) => state.checked[item.id + "_" + i]).length;
    return Math.round((checked / item.objectives.length) * 100);
  };

  const startQuiz = async (item) => {
    const key = item.id;
    setQuizLoading(q => ({...q, [key]: true}));
    const lvlInstr = state.userLevel === "advanced" ? "Niveau avancé, situations complexes." : state.userLevel === "intermediate" ? "Niveau intermédiaire." : "Niveau accessible pour débutants.";
    try {
      const resp = await fetch("/api/claude", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{role: "user", content: `Tu es un expert certifié PMP créant des questions d'examen officielles.\n\nCrée 3 questions situationnelles pour le thème : "${item.title}"\nNiveau : ${lvlInstr}\n\nRÈGLES :\n- Scénario réaliste 2-3 phrases\n- 4 options (A,B,C,D), une seule correcte\n- Explication concise\n- En français\n\nRéponds UNIQUEMENT avec JSON valide sans backticks :\n{"questions":[{"scenario":"...","question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correct":"B","explanation":"..."}]}`}]
        })
      });
      const data = await resp.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setQuizData(q => ({...q, [key]: {questions: parsed.questions, answers: {}}}));
      addXP(10, "Quiz lancé");
    } catch(e) {
      setQuizData(q => ({...q, [key]: {error: true}}));
    }
    setQuizLoading(q => ({...q, [key]: false}));
  };

  const answerQ = (itemId, qi, sel, correct) => {
    setQuizData(q => {
      const copy = {...q};
      copy[itemId] = {...copy[itemId], answers: {...(copy[itemId]?.answers||{}), [qi]: {sel, correct, ok: sel===correct}}};
      return copy;
    });
    if (sel === correct) addXP(30, "Bonne réponse ✓");
  };

  const ItemPanel = ({ item }) => {
    const quiz = quizData[item.id];
    return (
      <div className="det-panel">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div className="det-title">{item.title}</div>
          <button onClick={() => setOpenPanel(null)} style={{background:"rgba(255,255,255,0.05)",border:"none",color:"var(--slate-l)",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div className="det-body" dangerouslySetInnerHTML={{__html: item.body}} />
        <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:10}}>OBJECTIFS D'APPRENTISSAGE</div>
        {item.objectives.map((obj, i) => {
          const on = state.checked[item.id + "_" + i];
          const detKey = item.id + "_" + i;
          const isOpen = openObjDetail === detKey;
          return (
            <div key={i} style={{borderRadius:"var(--r-sm)",overflow:"hidden",border:"1px solid transparent",marginBottom:2}}>
              <div className="obj-row">
                <div className={"obj-chk" + (on ? " on" : "")} onClick={() => onToggleObj(item.id, i)} />
                <span className={"obj-txt" + (on ? " on" : "")} style={{flex:1}} onClick={() => setOpenObjDetail(isOpen ? null : detKey)}>{obj.text}</span>
                <span onClick={() => setOpenObjDetail(isOpen ? null : detKey)} style={{fontSize:11,color:"var(--slate-l)",transform: isOpen ? "rotate(180deg)" : "none",transition:"transform 0.2s"}}>▼</span>
              </div>
              {isOpen && (
                <div className="obj-detail">
                  <div className="lvl-box lvl-g"><div className="lvl-label">🟢 DÉBUTANT</div><div className="lvl-txt">{obj.detail.beginner}</div></div>
                  <div className="lvl-box lvl-y"><div className="lvl-label">🟡 INTERMÉDIAIRE</div><div className="lvl-txt">{obj.detail.intermediate}</div></div>
                  <div className="lvl-box lvl-r"><div className="lvl-label">🔴 AVANCÉ</div><div className="lvl-txt">{obj.detail.advanced}</div></div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{marginTop:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"var(--gold)"}}>QUIZ IA STYLE EXAMEN PMP</div>
            <button className="btn btn-gold btn-sm" disabled={quizLoading[item.id]} onClick={() => startQuiz(item)}>
              {quizLoading[item.id] ? "Génération…" : quiz ? "↺ Nouveau quiz" : "Générer le quiz →"}
            </button>
          </div>
          {quiz?.error && <div style={{color:"var(--red)",fontSize:12,padding:12,background:"rgba(239,68,68,0.06)",borderRadius:"var(--r-sm)"}}>Erreur. Vérifie ta connexion et réessaie.</div>}
          {quiz?.questions && quiz.questions.map((q, qi) => {
            const ans = quiz.answers?.[qi];
            return (
              <div key={qi} className="q-block">
                <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:10,color:"var(--indigo-l)",letterSpacing:"2px",marginBottom:8}}>QUESTION {qi+1} / {quiz.questions.length}</div>
                <div className="q-scen">{q.scenario}</div>
                <div className="q-text">{q.question}</div>
                {["A","B","C","D"].map(l => (
                  <button key={l} className={"q-opt" + (ans?.sel === l ? (l === q.correct ? " correct" : " wrong") : l === q.correct && ans ? " correct" : "")} disabled={!!ans} onClick={() => answerQ(item.id, qi, l, q.correct)}>
                    <span className="q-letter">{l}.</span><span>{q.options[l]}</span>
                  </button>
                ))}
                {ans && <div className={"q-expl show"}><strong>{ans.ok ? "✓ Bonne réponse !" : "✗ La bonne réponse était " + q.correct + "."}</strong> {q.explanation}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderItems = (items) => items.map(item => {
    const pct = getPct(item);
    const done = state.completed[item.id];
    const isOpen = openPanel === item.id;
    return (
      <div key={item.id}>
        <div className={"guide-card" + (done ? " mastered" : "")} onClick={() => { setOpenPanel(isOpen ? null : item.id); if (!isOpen) addXP(5, "Section explorée"); }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div className="gc-num">{item.num} · {item.type === "principle" ? "PRINCIPE" : "DOMAINE"}</div>
              <div className="gc-title">{item.title}</div>
              <div className="gc-short">{item.short}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontFamily:"Fraunces,serif",fontSize:16,fontWeight:700,color: done ? "var(--green)" : "var(--indigo-l)"}}>{pct}%</div>
              <div style={{fontSize:10,color:"var(--slate-l)"}}>{item.objectives.filter((_,i) => state.checked[item.id+"_"+i]).length}/{item.objectives.length} obj.</div>
            </div>
          </div>
          <div className="gc-bar"><div className="gc-fill" style={{width: pct+"%", background: done ? "var(--green)" : "var(--indigo)"}}/></div>
        </div>
        {isOpen && <ItemPanel item={item} />}
      </div>
    );
  });

  return (
    <div>
      <div className="eyebrow">Apprentissage adaptatif</div>
      <div className="sec-title">Guide PMBOK 7</div>
      <div className="sec-desc">Clique sur chaque section pour les explications détaillées et le quiz IA.</div>
      <div className="ftabs">
        {[["overview","Vue d'ensemble"],["principles","12 Principes"],["domains","8 Domaines"]].map(([t,l]) => (
          <button key={t} className={"ftab"+(tab===t?" active":"")} onClick={() => setTab(t)}>{l}</button>
        ))}
      </div>
      {tab === "overview" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {t:"Pourquoi PMBOK 7 ?", c:"Le PMBOK 6 listait 49 processus rigides. Le PMBOK 7 répond à un monde VUCA en proposant des <strong>principes directeurs</strong> flexibles.<br><br>La question n'est plus <em>\"comment faire ?\"</em> mais <em>\"vers quoi et pourquoi ?\"</em>"},
            {t:"L'examen PMP en chiffres", c:"<strong>180 questions</strong> · 230 minutes<br><strong>~50%</strong> des questions : Agile & Hybride<br><strong>Personnes 42%</strong> · Processus 50% · Business 8%<br><strong>Passing score</strong> : environ 61%<br><strong>Pearson VUE</strong> : centre ou domicile"},
            {t:"3 approches de développement", c:"<strong>Prédictif (Waterfall)</strong> — Scope défini à l'avance, livraison en fin de projet.<br><br><strong>Agile/Itératif</strong> — Livraisons fréquentes, feedback continu.<br><br><strong>Hybride</strong> — Combinaison selon les besoins."},
            {t:"PMBOK 7 vs PMBOK 6", c:"<strong>PMBOK 6</strong> : 49 processus rigides, approche prédictive uniquement.<br><br><strong>PMBOK 7</strong> : 12 principes + 8 domaines de performance. Couvre toutes les approches.<br><br>L'examen PMP depuis 2021 est basé sur le PMBOK 7."},
          ].map(({t,c}) => (
            <div key={t} className="card">
              <div style={{fontFamily:"Fraunces,serif",fontSize:15,fontWeight:700,marginBottom:8}}>{t}</div>
              <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.75}} dangerouslySetInnerHTML={{__html:c}} />
            </div>
          ))}
        </div>
      )}
      {tab === "principles" && renderItems(principles)}
      {tab === "domains" && renderItems(domains)}
    </div>
  );
}

// ── FLASHCARDS ──
function Flashcards({ state, onRate, addXP }) {
  const [cat, setCat] = useState("all");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = cat === "all" ? FLASHCARDS : FLASHCARDS.filter(f => f.cat === cat);
  const sorted = [...cards].sort((a,b) => {
    const ah = state.fcHard[a.id]||0, bh = state.fcHard[b.id]||0;
    const ae = state.fcEasy[a.id]?1:0, be = state.fcEasy[b.id]?1:0;
    return (bh-ah)||(ae-be);
  });
  const card = sorted[Math.min(idx, sorted.length-1)];

  useEffect(() => { setFlipped(false); setIdx(0); }, [cat]);

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
      if (!state.fcSeen[card.id]) addXP(5, "Flashcard vue");
    }
  };

  return (
    <div>
      <div className="eyebrow">Mémorisation SRS</div>
      <div className="sec-title">Flashcards</div>
      <div className="sec-desc">Algorithme de répétition espacée. Les cartes difficiles reviennent plus souvent.</div>
      <div className="ftabs">
        {[["all","Toutes"],["evm","EVM"],["models","Modèles"],["agile","Agile"],["risk","Risques"]].map(([c,l]) => (
          <button key={c} className={"ftab"+(cat===c?" active":"")} onClick={() => setCat(c)}>{l}</button>
        ))}
      </div>
      <div className="fc-prog"><div className="fc-pf" style={{width: ((idx+1)/sorted.length*100)+"%"}} /></div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:12,color:"var(--slate-l)"}}>{idx+1} / {sorted.length}</span>
        <span style={{fontSize:11,color:"var(--slate-l)"}}>Clique pour révéler</span>
      </div>
      <div className="card-scene" onClick={handleFlip}>
        <div className={"card-3d"+(flipped?" flipped":"")}>
          <div className="card-face card-front">
            <div className="fc-cat">{card?.category}</div>
            <div className="fc-q">{card?.q}</div>
            <div className="fc-hint">👆 Clique pour révéler</div>
          </div>
          <div className="card-face card-back">
            {card?.formula && <div className="fc-formula">{card.formula}</div>}
            <div className="fc-ans">{card?.a}</div>
          </div>
        </div>
      </div>
      {flipped && (
        <div className="fc-rating">
          <button className="rate-btn rate-easy" onClick={() => { onRate(card.id, "easy"); setIdx(i => Math.min(i+1, sorted.length-1)); setFlipped(false); }}>✓ Bien mémorisé</button>
          <button className="rate-btn rate-hard" onClick={() => { onRate(card.id, "hard"); setIdx(i => Math.min(i+1, sorted.length-1)); setFlipped(false); }}>↺ À revoir</button>
        </div>
      )}
      <div className="fc-nav">
        <button className="fc-nb" disabled={idx===0} onClick={() => { setIdx(i => i-1); setFlipped(false); }}>←</button>
        <span className="fc-pos">{idx+1} / {sorted.length}</span>
        <button className="fc-nb" disabled={idx===sorted.length-1} onClick={() => { setIdx(i => i+1); setFlipped(false); }}>→</button>
      </div>
    </div>
  );
}

// ── EXAM ──
function Exam({ state, addXP, onExamDone }) {
  const [phase, setPhase] = useState("setup");
  const [n, setN] = useState(20);
  const [theme, setTheme] = useState("mixed");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [secs, setSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (phase !== "active") return;
    const t = setInterval(() => setSecs(s => s+1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const THEMES = {
    mixed:["Principes PMBOK 7","Domaines de performance","Agile & Hybride","EVM & Mesure","Gestion des risques"],
    principles:["Stewardship","Équipe collaborative","Engagement parties prenantes","Création de valeur","Leadership","Tailoring","Qualité","Complexité","Risques"],
    domains:["Parties prenantes","Équipe","Cycle de vie","Planification","Travail du projet","Livraison","Mesure","Incertitude"],
    agile:["Scrum & Sprints","Kanban","User stories","Vélocité","Rétrospectives","Definition of Done","Servant leadership"],
    evm:["Earned Value","Cost Variance","Schedule Variance","CPI & SPI","EAC & ETC","TCPI"],
    risk:["Identification des risques","Analyse qualitative","Stratégies de réponse","Réserves","Monte Carlo","Opportunités"]
  };

  const startExam = async () => {
    setLoading(true);
    const topics = THEMES[theme];
    const lvlInstr = state.userLevel === "advanced" ? "Niveau avancé, situations complexes." : state.userLevel === "intermediate" ? "Niveau intermédiaire." : "Niveau accessible.";
    try {
      const resp = await fetch("/api/claude", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{role: "user", content: `Tu es expert certifié PMP.\n\nCrée ${n} questions situationnelles style examen PMP pour ces thèmes : ${topics.slice(0,5).join(", ")}.\n\nNiveau : ${lvlInstr}\n\nRÈGLES :\n- Scénario réaliste 2-3 phrases\n- 4 options (A,B,C,D), une seule correcte\n- Explication concise (2 phrases max)\n- Varier les thèmes\n- En français\n\nRéponds UNIQUEMENT avec JSON valide sans backticks :\n{"questions":[{"domain":"nom du domaine","scenario":"...","question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correct":"B","explanation":"..."}]}`}]
        })
      });
      const data = await resp.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setQuestions(parsed.questions);
      setAnswers({});
      setCurrentQ(0);
      setSecs(0);
      setPhase("active");
    } catch(e) {
      alert("Erreur lors de la génération. Vérifie ta connexion et réessaie.");
    }
    setLoading(false);
  };

  const selectAnswer = (sel, correct, expl) => {
    if (answers[currentQ]) return;
    setAnswers(a => ({...a, [currentQ]: {sel, correct, ok: sel===correct, expl}}));
    if (sel === correct) addXP(30, "Bonne réponse d'examen ✓");
  };

  const endExam = () => {
    const total = questions.length;
    const correct = Object.values(answers).filter(a => a.ok).length;
    const pct = Math.round((correct/total)*100);
    const pass = pct >= 61;
    setResult({pct, correct, total, pass, secs});
    onExamDone(pct);
    addXP(pass ? 150 : 50, pass ? "Simulation réussie ! 🎯" : "Simulation terminée");
    setPhase("result");
  };

  const q = questions[currentQ];
  const ans = answers[currentQ];
  const m = Math.floor(secs/60).toString().padStart(2,"0");
  const s = (secs%60).toString().padStart(2,"0");

  if (loading) return <div className="loading-box"><div className="spinner"/><div style={{fontSize:13,color:"var(--text-2)"}}>Génération de {n} questions style PMP réel…</div></div>;

  if (phase === "setup") return (
    <div style={{maxWidth:500,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:14}}>⏱️</div>
      <div className="eyebrow" style={{display:"flex",justifyContent:"center"}}>Simulateur officiel</div>
      <div className="sec-title" style={{textAlign:"center"}}>Examen PMP</div>
      <div className="sec-desc" style={{textAlign:"center",margin:"0 auto 20px"}}>Questions situationnelles générées par IA, style Pearson VUE. Chronomètre réel.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16,textAlign:"left"}}>
        <div className="card"><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--slate-l)",marginBottom:4}}>Questions</div><div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,color:"var(--indigo-l)"}}>{n}</div></div>
        <div className="card"><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--slate-l)",marginBottom:4}}>Durée</div><div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,color:"var(--indigo-l)"}}>{Math.round(n*230/180)} min</div></div>
      </div>
      {[
        {label:"Nombre de questions",ctrl:<select className="eo-sel" value={n} onChange={e => setN(+e.target.value)}><option value={10}>10 (mini)</option><option value={20}>20 (rapide)</option><option value={30}>30 (approfondi)</option></select>},
        {label:"Thème",ctrl:<select className="eo-sel" value={theme} onChange={e => setTheme(e.target.value)}><option value="mixed">Mixte (recommandé)</option><option value="principles">Principes PMBOK 7</option><option value="domains">Domaines</option><option value="agile">Agile & Hybride</option><option value="evm">EVM & Mesure</option><option value="risk">Risques</option></select>},
      ].map(({label,ctrl}) => (
        <div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:"var(--r-sm)",padding:"11px 15px",fontSize:13,color:"var(--text-2)",marginBottom:8}}>
          <span>{label}</span>{ctrl}
        </div>
      ))}
      <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:14,marginTop:8}} onClick={startExam}>🚀 Démarrer la simulation</button>
    </div>
  );

  if (phase === "result") return (
    <div style={{maxWidth:500,margin:"0 auto"}}>
      <div className="result-hero">
        <div className={"res-pct " + (result.pass ? "pass" : "fail")}>{result.pct}%</div>
        <div style={{fontSize:13,color:"var(--text-2)",margin:"7px 0"}}>{result.correct} bonne{result.correct>1?"s":""} réponse{result.correct>1?"s":""} sur {result.total}</div>
        <div className={"verdict " + (result.pass ? "v-pass" : "v-fail")}>{result.pass ? "🎯 SIMULATION RÉUSSIE" : "📚 Continue à étudier"}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[["✅",result.correct+"/"+result.total,"Bonnes réponses"],["⏱️",Math.floor(result.secs/60)+"m "+(result.secs%60)+"s","Temps total"],["🎯",result.pct+"%","Score"]].map(([ico,val,lbl]) => (
          <div key={lbl} className="card" style={{textAlign:"center"}}><div style={{fontSize:18,marginBottom:4}}>{ico}</div><div style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,color:"var(--indigo-l)"}}>{val}</div><div style={{fontSize:11,color:"var(--slate-l)",marginTop:2}}>{lbl}</div></div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        <button className="btn btn-primary" onClick={() => setPhase("setup")}>↺ Nouvelle simulation</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="exam-topbar">
        <div>
          <div className={"timer" + (secs > n*60 ? " urgent" : "")}>{m}:{s}</div>
          <div style={{fontSize:10,color:"var(--slate-l)",marginTop:1}}>Temps écoulé</div>
        </div>
        <div className="ep-bar"><div className="ep-fill" style={{width: ((currentQ+1)/questions.length*100)+"%"}} /></div>
        <div style={{fontSize:12,color:"var(--slate-l)"}}>Q <strong style={{color:"var(--text)"}}>{currentQ+1}</strong> / <strong style={{color:"var(--text)"}}>{questions.length}</strong></div>
        <button className="btn btn-sm" style={{background:"rgba(239,68,68,0.12)",color:"#FCA5A5",border:"1px solid rgba(239,68,68,0.2)"}} onClick={endExam}>Terminer</button>
      </div>
      {q && (
        <div className="card" style={{marginBottom:14}}>
          <div style={{display:"inline-block",fontSize:9,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--indigo-l)",background:"rgba(99,102,241,0.1)",padding:"3px 10px",borderRadius:20,marginBottom:10}}>{q.domain||"PMBOK 7"}</div>
          <div className="q-scen">{q.scenario}</div>
          <div className="q-text">{q.question}</div>
          {["A","B","C","D"].map(l => (
            <button key={l} className={"q-opt" + (ans?.sel===l ? (l===q.correct?" correct":" wrong") : l===q.correct&&ans?" correct":"")} disabled={!!ans} onClick={() => selectAnswer(l, q.correct, q.explanation)}>
              <span className="q-letter">{l}.</span><span>{q.options[l]}</span>
            </button>
          ))}
          {ans && <div className="q-expl show"><strong>{ans.ok ? "✓ Bonne réponse !" : "✗ La bonne réponse était " + q.correct + "."}</strong> {ans.expl}</div>}
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button className="btn btn-ghost" onClick={() => { setAnswers(a => ({...a, [currentQ]: {sel:"",correct:"",ok:false,skipped:true}})); setCurrentQ(i => Math.min(i+1, questions.length-1)); }}>Passer →</button>
        <button className="btn btn-primary" disabled={!ans} onClick={() => { if (currentQ < questions.length-1) { setCurrentQ(i => i+1); } else endExam(); }}>
          {currentQ < questions.length-1 ? "Question suivante →" : "Terminer l'examen →"}
        </button>
      </div>
    </div>
  );
}

// ── SPRINT 15 MIN ──
const SPRINT_THEMES = [
  {id:"mixed",    ico:"🎯", name:"Mixte",       desc:"Tous les domaines",        color:"var(--indigo)",  topics:["Principes PMBOK 7","Domaines de performance","Agile & Hybride","EVM & Mesure","Gestion des risques","Leadership"]},
  {id:"evm",      ico:"📊", name:"EVM",          desc:"Formules & indicateurs",   color:"var(--gold)",    topics:["Earned Value Management","Cost Variance","Schedule Variance","CPI & SPI","EAC & ETC","TCPI","Analyse de tendances EVM"]},
  {id:"agile",    ico:"⚡", name:"Agile",        desc:"Scrum, Kanban, Hybride",   color:"var(--green)",   topics:["Scrum & Sprints","Kanban","User stories","Vélocité","Rétrospectives","Definition of Done","Servant leadership","Planning agile"]},
  {id:"risk",     ico:"⚠️", name:"Risques",      desc:"Identification & réponses",color:"var(--red)",     topics:["Identification des risques","Analyse qualitative","Analyse quantitative","Stratégies de réponse","Réserves d'aléas","Monte Carlo","Opportunités"]},
  {id:"people",   ico:"👥", name:"Leadership",   desc:"Équipes & parties prenantes",color:"var(--purple)", topics:["Leadership situationnel","Tuckman","Motivation","Intelligence émotionnelle","Servant leadership","Gestion des conflits","Parties prenantes"]},
  {id:"planning", ico:"📅", name:"Planification",desc:"CPM, WBS, Estimations",    color:"var(--cyan)",    topics:["WBS & Work packages","Chemin critique (CPM)","Estimations des coûts","Three-point estimation","Fast tracking & Crashing","Planification agile"]},
];

const SPRINT_DURATION = 15 * 60; // 15 minutes en secondes

function Sprint15({ state, addXP }) {
  const [phase, setPhase]       = useState("setup");   // setup | loading | active | result
  const [theme, setTheme]       = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({});
  const [timeLeft, setTimeLeft] = useState(SPRINT_DURATION);
  const [history, setHistory]   = useState([]);         // historique des sprints

  // Compte à rebours
  useEffect(() => {
    if (phase !== "active") return;
    if (timeLeft <= 0) { endSprint(); return; }
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { clearInterval(t); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  // Auto-terminer quand le temps est écoulé
  useEffect(() => {
    if (phase === "active" && timeLeft === 0) endSprint();
  }, [timeLeft, phase]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return m + ":" + sec;
  };

  const timerClass = timeLeft <= 60 ? "danger" : timeLeft <= 180 ? "warning" : "";
  const fillColor  = timeLeft <= 60 ? "var(--red)" : timeLeft <= 180 ? "var(--gold)" : "var(--purple)";
  const fillPct    = (timeLeft / SPRINT_DURATION) * 100;

  const startSprint = async () => {
    if (!theme) return;
    setPhase("loading");
    const t = SPRINT_THEMES.find(t => t.id === theme);
    const lvl = state.userLevel === "advanced" ? "Niveau avancé, situations complexes." : state.userLevel === "intermediate" ? "Niveau intermédiaire." : "Niveau accessible.";
    try {
      const resp = await fetch("/api/claude", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{role: "user", content:
            `Tu es expert certifié PMP. Crée 20 questions ULTRA-COURTES style Sprint PMP pour le thème "${t.name}" (${t.topics.slice(0,4).join(", ")}).\n\nNiveau : ${lvl}\n\nRÈGLES STRICTES :\n- Scénario MAX 1 phrase courte\n- Question directe et précise\n- 4 options courtes (A,B,C,D), une seule correcte\n- Explication en 1 phrase max\n- Conçu pour être répondu en 30-45 secondes\n- Varier les sous-thèmes\n- En français\n\nRéponds UNIQUEMENT avec JSON valide sans backticks :\n{"questions":[{"scenario":"...","question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correct":"B","explanation":"..."}]}`
          }]
        })
      });
      const data = await resp.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setQuestions(parsed.questions);
      setAnswers({});
      setCurrentQ(0);
      setTimeLeft(SPRINT_DURATION);
      setPhase("active");
    } catch(e) {
      alert("Erreur lors de la génération. Vérifie ta connexion.");
      setPhase("setup");
    }
  };

  const selectAnswer = (sel) => {
    if (answers[currentQ]) return;
    const q = questions[currentQ];
    const ok = sel === q.correct;
    setAnswers(a => ({...a, [currentQ]: {sel, correct: q.correct, ok, expl: q.explanation}}));
    if (ok) addXP(15, "Bonne réponse Sprint ✓");
    // Auto-avance après 1.2s
    setTimeout(() => {
      if (currentQ < questions.length - 1) setCurrentQ(i => i + 1);
      else endSprint();
    }, 1200);
  };

  const endSprint = () => {
    const total     = Object.keys(answers).length;
    const correct   = Object.values(answers).filter(a => a.ok).length;
    const pct       = total > 0 ? Math.round((correct / total) * 100) : 0;
    const elapsed   = SPRINT_DURATION - timeLeft;
    const avgTime   = total > 0 ? Math.round(elapsed / total) : 0;
    const t         = SPRINT_THEMES.find(t => t.id === theme);
    const bonus     = pct >= 80 ? 100 : pct >= 60 ? 50 : 20;
    addXP(bonus, `Sprint ${t.name} terminé !`);
    const entry = { theme: t.name, themeIco: t.ico, pct, correct, total, elapsed, avgTime, date: new Date().toLocaleDateString("fr-FR") };
    setHistory(h => [entry, ...h].slice(0, 5));
    setPhase("result");
  };

  const q = questions[currentQ];
  const ans = answers[currentQ];
  const correct = Object.values(answers).filter(a => a.ok).length;
  const answered = Object.keys(answers).length;

  // ── SETUP ──
  if (phase === "setup") return (
    <div>
      <div className="eyebrow">Entraînement intensif</div>
      <div className="sec-title">Sprint 15 min ⚡</div>
      <div className="sec-desc">20 questions ultra-courtes sous contrainte de temps. Développe tes réflexes PMP. Chaque bonne réponse = +15 XP.</div>

      {/* Info */}
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[["⏱️","15 minutes","Chrono strict"],["❓","20 questions","Ultra-courtes"],["⚡","45 sec/Q","Rythme examen"],["🎯","Thème ciblé","1 domaine"]].map(([ico,val,lbl]) => (
          <div key={lbl} style={{flex:1,minWidth:80,background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:"var(--r-sm)",padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:3}}>{ico}</div>
            <div style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{val}</div>
            <div style={{fontSize:10,color:"var(--slate-l)"}}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Choix du thème */}
      <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)",marginBottom:10}}>Choisis ton thème</div>
      <div className="sprint-themes">
        {SPRINT_THEMES.map(t => (
          <button key={t.id} className={"sprint-theme-btn"+(theme===t.id?" active":"")} onClick={() => setTheme(t.id)}
            style={theme===t.id?{borderColor:t.color,background:`${t.color}15`}:{}}>
            <div className="sprint-theme-ico">{t.ico}</div>
            <div className="sprint-theme-name" style={{color:theme===t.id?t.color:"var(--text)"}}>{t.name}</div>
            <div className="sprint-theme-desc">{t.desc}</div>
          </button>
        ))}
      </div>

      <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:14,fontSize:14,background:theme?`linear-gradient(135deg,var(--purple),var(--indigo))`:"",opacity:theme?1:0.5}}
        disabled={!theme} onClick={startSprint}>
        ⚡ Lancer le Sprint →
      </button>

      {/* Historique */}
      {history.length > 0 && (
        <div style={{marginTop:20}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)",marginBottom:10}}>🏆 Derniers sprints</div>
          {history.map((h,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:"var(--r-sm)",padding:"10px 14px",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18}}>{h.themeIco}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:600}}>{h.theme}</div>
                  <div style={{fontSize:10,color:"var(--slate-l)"}}>{h.date} · {h.correct}/{h.total} bonnes · {h.avgTime}s/Q</div>
                </div>
              </div>
              <div style={{fontFamily:"Fraunces,serif",fontSize:18,fontWeight:700,color:h.pct>=80?"var(--green-l)":h.pct>=60?"var(--gold-l)":"var(--red)"}}>{h.pct}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── LOADING ──
  if (phase === "loading") return (
    <div className="loading-box">
      <div className="spinner" />
      <div style={{fontSize:13,color:"var(--text-2)",marginBottom:6}}>Génération de 20 questions Sprint…</div>
      <div style={{fontSize:12,color:"var(--slate-l)"}}>Questions ultra-courtes style PMP réel</div>
    </div>
  );

  // ── ACTIVE ──
  if (phase === "active") return (
    <div>
      {/* Timer hero */}
      <div className="sprint-hero">
        <div style={{fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"var(--purple)",marginBottom:4}}>
          ⚡ SPRINT — {SPRINT_THEMES.find(t=>t.id===theme)?.name.toUpperCase()}
        </div>
        <div className={"sprint-timer " + timerClass}>{formatTime(timeLeft)}</div>
        <div className="sprint-progress">
          <div className="sprint-fill" style={{width: fillPct+"%", background: fillColor}} />
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:14,fontSize:12,color:"var(--slate-l)"}}>
          <span>✅ {correct} bonnes</span>
          <span>❓ {answered} répondues</span>
          <span>📋 {questions.length - answered} restantes</span>
        </div>
      </div>

      {/* Question */}
      {q && (
        <div className="card" style={{marginBottom:12}}>
          <div className="sprint-q-counter">
            <div className="sprint-badge" style={{background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.2)",color:"var(--purple)"}}>
              Q {currentQ + 1} / {questions.length}
            </div>
            {ans && (
              <div className="sprint-badge" style={{background: ans.ok?"rgba(16,185,129,0.1)":"rgba(239,68,68,0.1)", border:`1px solid ${ans.ok?"rgba(16,185,129,0.25)":"rgba(239,68,68,0.2)"}`, color: ans.ok?"var(--green-l)":"#FCA5A5"}}>
                {ans.ok ? "✓ Correct !" : "✗ " + q.correct + " — " + q.options[q.correct]}
              </div>
            )}
          </div>

          {q.scenario && (
            <div style={{fontSize:12,color:"var(--text-2)",fontStyle:"italic",lineHeight:1.6,padding:"8px 10px",background:"rgba(255,255,255,0.02)",borderLeft:"2px solid var(--purple)",borderRadius:"0 5px 5px 0",marginBottom:10}}>
              {q.scenario}
            </div>
          )}
          <div style={{fontSize:14,fontWeight:600,color:"var(--text)",lineHeight:1.6,marginBottom:12}}>{q.question}</div>

          {["A","B","C","D"].map(l => {
            let cls = "q-opt";
            if (ans) {
              if (l === q.correct) cls += " correct";
              else if (l === ans.sel) cls += " wrong";
            }
            return (
              <button key={l} className={cls} disabled={!!ans} onClick={() => selectAnswer(l)}>
                <span className="q-letter">{l}.</span><span>{q.options[l]}</span>
              </button>
            );
          })}
        </div>
      )}

      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <button className="btn btn-ghost btn-sm" onClick={endSprint}>Terminer le sprint</button>
      </div>
    </div>
  );

  // ── RESULT ──
  const lastEntry = history[0] || {};
  const pct = lastEntry.pct || 0;
  const medal = pct >= 80 ? "🥇" : pct >= 60 ? "🥈" : "🥉";
  const t = SPRINT_THEMES.find(t => t.id === theme);
  return (
    <div>
      <div className="sprint-hero" style={{marginBottom:14}}>
        <div style={{fontSize:48,marginBottom:8}}>{medal}</div>
        <div style={{fontFamily:"Fraunces,serif",fontSize:48,fontWeight:700,color:pct>=80?"var(--green-l)":pct>=60?"var(--gold-l)":"var(--red)",lineHeight:1}}>{pct}%</div>
        <div style={{fontSize:13,color:"var(--text-2)",margin:"6px 0"}}>{lastEntry.correct} bonnes réponses sur {lastEntry.total} répondues</div>
        <div style={{fontSize:12,fontWeight:700,color:"var(--purple)"}}>Sprint {t?.ico} {t?.name}</div>
      </div>

      <div className="sprint-result-grid">
        {[
          ["⚡",lastEntry.avgTime+"s","Temps/question"],
          ["✅",lastEntry.correct+"/"+lastEntry.total,"Bonnes réponses"],
          ["🏆",pct>=80?"Excellent":pct>=60?"Bien":"À retravailler","Performance"],
        ].map(([ico,val,lbl]) => (
          <div key={lbl} className="sprint-result-item">
            <div style={{fontSize:20,marginBottom:4}}>{ico}</div>
            <div style={{fontFamily:"Fraunces,serif",fontSize:16,fontWeight:700,color:"var(--indigo-l)"}}>{val}</div>
            <div style={{fontSize:10,color:"var(--slate-l)",marginTop:2}}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Conseil personnalisé */}
      <div className="card" style={{marginBottom:14,borderColor:"rgba(139,92,246,0.2)"}}>
        <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--purple)",marginBottom:8}}>💡 Conseil</div>
        <div style={{fontSize:13,color:"var(--text-2)",lineHeight:1.7}}>
          {pct >= 80
            ? `Excellent sprint sur ${t?.name} ! Tu maîtrises bien ce domaine. Essaie un autre thème pour diversifier ta préparation, ou vise 90%+ pour consolider.`
            : pct >= 60
            ? `Bon sprint sur ${t?.name} ! ${lastEntry.total - lastEntry.correct} questions à retravailler. Consulte le Guide PMBOK 7 sur ce thème, puis relance un sprint pour progresser.`
            : `Ce thème ${t?.name} demande plus de travail. Commence par le Guide PMBOK 7 et les Flashcards sur ce domaine, puis reviens faire ce sprint.`
          }
        </div>
      </div>

      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button className="btn btn-primary" style={{flex:1,justifyContent:"center",background:"linear-gradient(135deg,var(--purple),var(--indigo))"}} onClick={() => { setPhase("setup"); }}>
          ↺ Nouveau sprint
        </button>
        <button className="btn btn-ghost" style={{flex:1,justifyContent:"center"}} onClick={() => { setTheme(theme); startSprint(); }}>
          🔁 Rejouer ce thème
        </button>
      </div>
    </div>
  );
}

// ── PROGRESS ──
function Progress({ state }) {
  const princItems = ITEMS.filter(i => i.type === "principle");
  const domItems = ITEMS.filter(i => i.type === "domain");
  const getPct = item => Math.round((item.objectives.filter((_,i) => state.checked[item.id+"_"+i]).length / item.objectives.length) * 100);
  const done = Object.values(state.completed).filter(Boolean).length;
  const total = ITEMS.length;
  const pctTotal = Math.round((done/total)*100);
  const daysLeft = done >= 3 ? Math.max(7, Math.round((100-pctTotal)*0.8)) : null;
  const allScores = ITEMS.map(item => ({title: item.title, pct: getPct(item)}));
  const best = allScores.reduce((a,b) => a.pct>b.pct?a:b, allScores[0]);
  const worst = allScores.reduce((a,b) => a.pct<b.pct?a:b, allScores[0]);
  const fcSeen = Object.keys(state.fcSeen).length;
  const BADGES = [
    {ico:"🚀",name:"Premier pas",desc:"Commence ton parcours",on:done>=1},
    {ico:"📚",name:"Étudiant assidu",desc:"5 sections maîtrisées",on:done>=5},
    {ico:"🏆",name:"Expert PMBOK",desc:"Tous les principes maîtrisés",on:princItems.every(i=>state.completed[i.id])},
    {ico:"🃏",name:"Maître des cartes",desc:"20 flashcards vues",on:fcSeen>=20},
    {ico:"⏱️",name:"Simulateur pro",desc:"3 examens simulés",on:state.examCount>=3},
    {ico:"🎯",name:"Score 80+",desc:"80%+ à une simulation",on:state.bestScore&&state.bestScore>=80},
    {ico:"💎",name:"PMP Candidate",desc:"500 XP atteints",on:state.xp>=500},
    {ico:"🌟",name:"PMP Master",desc:"Tout complété !",on:pctTotal===100},
  ];
  return (
    <div>
      <div className="eyebrow">Analyse & Prédiction</div>
      <div className="sec-title">Ma progression</div>
      <div className="card" style={{background:"linear-gradient(135deg,#1A1040,#0F2A1E)",border:"1px solid rgba(99,102,241,0.15)",marginBottom:14}}>
        <div style={{fontFamily:"Fraunces,serif",fontSize:17,fontWeight:700,marginBottom:4}}>🤖 Analyse prédictive</div>
        <div style={{fontSize:12,color:"var(--text-2)",marginBottom:14}}>
          {done >= 3 ? `Basé sur ta progression actuelle (${pctTotal}% complété), tu seras prêt pour l'examen dans environ ${daysLeft} jours si tu continues à ce rythme.` : "Complète au moins 3 sections pour voir ta prédiction personnalisée."}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[
            {val:daysLeft?daysLeft+"j":"—",lbl:"Jours estimés"},
            {val:done>=3?best.title.split(" ")[0]:"—",lbl:"Point fort"},
            {val:done>=3?worst.title.split(" ")[0]:"—",lbl:"À renforcer"},
          ].map(({val,lbl}) => (
            <div key={lbl} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,color:"var(--gold-l)"}}>{val}</div>
              <div style={{fontSize:10,color:"var(--slate-l)",marginTop:2}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div className="card">
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)",marginBottom:12}}>Principes (12)</div>
          {princItems.map(item => {
            const pct = getPct(item);
            return <div key={item.id} className="ipl-item"><div className="ipl-top"><span style={{fontSize:11}}>{item.title.split(" ")[0]}</span><span>{pct}%</span></div><div className="ipl-bar"><div className="ipl-fill" style={{width:pct+"%",background:"linear-gradient(90deg,var(--indigo),var(--indigo-l))"}}/></div></div>;
          })}
        </div>
        <div className="card">
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)",marginBottom:12}}>Domaines (8)</div>
          {domItems.map(item => {
            const pct = getPct(item);
            return <div key={item.id} className="ipl-item"><div className="ipl-top"><span style={{fontSize:11}}>{item.title.split(" ")[0]}</span><span>{pct}%</span></div><div className="ipl-bar"><div className="ipl-fill" style={{width:pct+"%",background:"linear-gradient(90deg,var(--gold),var(--gold-l))"}}/></div></div>;
          })}
        </div>
      </div>
      <div className="card">
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--slate-l)",marginBottom:14}}>🏆 Badges & Réussites</div>
        <div className="badges-grid">
          {BADGES.map(b => (
            <div key={b.name} className={"badge-i"+(b.on?" on":"")}>
              <div className="badge-ico">{b.ico}</div>
              <div className="badge-name">{b.name}</div>
              <div className="badge-desc">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [state, setState] = useState({
    checked: {}, completed: {}, xp: 0, streak: 0,
    fcSeen: {}, fcEasy: {}, fcHard: {},
    examCount: 0, bestScore: null,
    diagDone: false, userLevel: "beginner"
  });

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }, []);

  const addXP = useCallback((pts, label) => {
    setState(s => ({...s, xp: s.xp + pts}));
    showToast("+" + pts + " XP — " + label);
  }, [showToast]);

  const onToggleObj = useCallback((itemId, idx) => {
    setState(s => {
      const key = itemId + "_" + idx;
      const newChecked = {...s.checked, [key]: !s.checked[key]};
      const item = ITEMS.find(i => i.id === itemId);
      const allDone = item.objectives.every((_,i) => newChecked[itemId+"_"+i]);
      const wasCompleted = s.completed[itemId];
      const newCompleted = {...s.completed, [itemId]: allDone};
      let xpGain = newChecked[key] ? 20 : 0;
      if (allDone && !wasCompleted) xpGain += 100;
      if (xpGain > 0) setTimeout(() => showToast("+" + xpGain + " XP"), 0);
      return {...s, checked: newChecked, completed: newCompleted, xp: s.xp + xpGain};
    });
  }, [showToast]);

  const onRate = useCallback((cardId, rating) => {
    setState(s => {
      const newEasy = {...s.fcEasy};
      const newHard = {...s.fcHard};
      const newSeen = {...s.fcSeen, [cardId]: true};
      if (rating === "easy") { newEasy[cardId] = true; delete newHard[cardId]; }
      else { newHard[cardId] = (newHard[cardId]||0) + 1; delete newEasy[cardId]; }
      return {...s, fcEasy: newEasy, fcHard: newHard, fcSeen: newSeen, xp: s.xp + (rating==="easy"?10:0)};
    });
    if (rating === "easy") showToast("+10 XP — Carte mémorisée ✓");
  }, [showToast]);

  const onDiagFinish = useCallback((lvl, reset) => {
    if (reset) { setState(s => ({...s, diagDone: false, userLevel: "beginner"})); return; }
    setState(s => ({...s, diagDone: true, userLevel: lvl, xp: s.xp + 50}));
    showToast("+50 XP — Diagnostic complété !");
  }, [showToast]);

  const onExamDone = useCallback((pct) => {
    setState(s => ({...s, examCount: s.examCount + 1, bestScore: Math.max(s.bestScore||0, pct)}));
  }, []);

  const PAGES = [
    {id:"dashboard",  ico:"🏠", lbl:"Accueil"},
    {id:"guide",      ico:"📚", lbl:"Guide"},
    {id:"flashcards", ico:"🃏", lbl:"Cartes"},
    {id:"sprint",     ico:"⚡", lbl:"Sprint"},
    {id:"exam",       ico:"⏱️", lbl:"Examen"},
    {id:"progress",   ico:"📊", lbl:"Progrès"},
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div className="logo">
            <div className="logo-badge">P7</div>
            PMP Master Academy
          </div>
          <div className="tb-right">
            <div className="pill pill-gold">🔥 {state.streak}j</div>
            <div className="pill pill-indigo">⭐ {state.xp} XP</div>
          </div>
        </div>
        <XPBar xp={state.xp} streak={state.streak} />
        <div className="main">
          {page === "dashboard" && <Dashboard state={state} goTo={setPage} />}
          {page === "diagnostic" && <Diagnostic state={state} onFinish={onDiagFinish} goTo={setPage} />}
          {page === "guide" && <Guide state={state} onToggleObj={onToggleObj} addXP={addXP} />}
          {page === "flashcards" && <Flashcards state={state} onRate={onRate} addXP={addXP} />}
          {page === "sprint" && <Sprint15 state={state} addXP={addXP} />}
          {page === "exam" && <Exam state={state} addXP={addXP} onExamDone={onExamDone} />}
          {page === "progress" && <Progress state={state} />}
        </div>
        <nav className="bot-nav">
          {PAGES.map(p => (
            <button key={p.id} className={"bn-i"+(page===p.id?" active":"")} onClick={() => setPage(p.id)}>
              <div className="bn-ico">{p.ico}</div>
              {p.lbl}
            </button>
          ))}
        </nav>
        <Toast msg={toast} />
      </div>
    </>
  );
}
