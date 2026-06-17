import { useState } from "react";

// ═══════════════════════════════════════════════════
// STYLES SCHÉMAS
// ═══════════════════════════════════════════════════
export const schemaCSS = `
.schema-wrap{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:16px;margin-bottom:14px;}
.schema-title{font-family:'Fraunces',serif;font-size:15px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:8px;}
.schema-desc{font-size:12px;color:var(--slate-l);margin-bottom:12px;line-height:1.6;}
.schema-svg-wrap{width:100%;overflow-x:auto;margin-bottom:12px;}
.schema-info{background:var(--bg3);border:1px solid rgba(99,102,241,0.15);border-radius:var(--r-sm);padding:12px;margin-bottom:10px;animation:fadeIn 0.2s ease;}
.schema-info-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--indigo-l);margin-bottom:6px;}
.schema-info-body{font-size:12px;color:var(--text-2);line-height:1.7;}
.schema-refs{margin-top:10px;padding-top:10px;border-top:1px solid var(--border2);}
.schema-refs-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--slate-l);margin-bottom:6px;}
.schema-ref-item{display:flex;align-items:flex-start;gap:6px;font-size:11px;color:var(--text-2);margin-bottom:4px;line-height:1.5;}
.schema-ref-ico{flex-shrink:0;font-size:12px;}
.schema-ref-link{color:var(--indigo-l);text-decoration:none;}
.schema-ref-link:hover{text-decoration:underline;}
.schema-tabs{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;}
.schema-tab{padding:5px 12px;border-radius:20px;border:1px solid var(--border2);background:transparent;color:var(--slate-l);font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.schema-tab.active{background:var(--indigo);border-color:var(--indigo);color:white;}
.schema-hint{font-size:10px;color:var(--slate-l);text-align:center;margin-top:6px;font-style:italic;}
`;

// ═══════════════════════════════════════════════════
// RÉFÉRENCES COMMUNES
// ═══════════════════════════════════════════════════
const REFS = {
  pmbok7: {ico:"📖", text:"PMBOK Guide 7th Edition — PMI, 2021", link:"https://www.pmi.org/pmbok-guide-standards/foundational/pmbok"},
  agile: {ico:"📖", text:"Agile Practice Guide — PMI & Agile Alliance, 2017", link:"https://www.pmi.org/pmbok-guide-standards/practice-guides/agile"},
  pmiEthics: {ico:"🔗", text:"PMI Code of Ethics and Professional Conduct", link:"https://www.pmi.org/about/ethics/code"},
  tuckman: {ico:"📄", text:"Tuckman, B.W. (1965). Developmental sequence in small groups. Psychological Bulletin, 63(6)", link:"https://doi.org/10.1037/h0022100"},
  maslow: {ico:"📖", text:"Maslow, A.H. (1943). A Theory of Human Motivation. Psychological Review", link:"https://psychclassics.yorku.ca/Maslow/motivation.htm"},
  herzberg: {ico:"📖", text:"Herzberg, F. (1968). One More Time: How Do You Motivate Employees? Harvard Business Review", link:"https://hbr.org/2003/01/one-more-time-how-do-you-motivate-employees"},
  cynefin: {ico:"📄", text:"Snowden, D. & Boone, M. (2007). A Leader's Framework for Decision Making. HBR", link:"https://hbr.org/2007/11/a-leaders-framework-for-decision-making"},
  adkar: {ico:"📖", text:"Hiatt, J. (2006). ADKAR: A Model for Change in Business, Government and Community. Prosci", link:"https://www.prosci.com/adkar"},
  kotter: {ico:"📖", text:"Kotter, J.P. (1996). Leading Change. Harvard Business School Press", link:"https://www.kotterinc.com/methodology/8-steps/"},
  scrum: {ico:"📖", text:"Schwaber, K. & Sutherland, J. (2020). The Scrum Guide", link:"https://scrumguides.org/scrum-guide.html"},
  evm: {ico:"📄", text:"PMI Practice Standard for Earned Value Management, 2nd Ed.", link:"https://www.pmi.org/pmbok-guide-standards/practice-guides/evm"},
  yt_pmp: {ico:"🎥", text:"YouTube: PMP Exam Prep — David McLachlan", link:"https://www.youtube.com/@DavidMcLachlan1"},
  yt_scrum: {ico:"🎥", text:"YouTube: Scrum Master Training — Agile Coach", link:"https://www.youtube.com/@AgileCoach"},
  hersey: {ico:"📖", text:"Hersey, P. & Blanchard, K. (1969). Life Cycle Theory of Leadership. Training & Development Journal", link:"https://situational.com/leadership-style/"},
};

function RefList({ refs }) {
  return (
    <div className="schema-refs">
      <div className="schema-refs-title">📚 Références & Ressources</div>
      {refs.map((r, i) => (
        <div key={i} className="schema-ref-item">
          <span className="schema-ref-ico">{r.ico}</span>
          <span>{r.link ? <a href={r.link} target="_blank" rel="noopener noreferrer" className="schema-ref-link">{r.text}</a> : r.text}</span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 1. COURBE EVM (S-CURVE)
// ═══════════════════════════════════════════════════
export function SchemaEVM() {
  const [active, setActive] = useState(null);
  const info = {
    PV: {title:"PV — Planned Value (Valeur Planifiée)", body:"Budget prévu pour le travail planifié jusqu'à une date donnée. C'est votre baseline : ce que vous aviez prévu de dépenser. Si PV=100k€ et que vous êtes à mi-projet, vous aviez prévu de dépenser 100k€ jusqu'ici."},
    EV: {title:"EV — Earned Value (Valeur Acquise)", body:"Valeur budgétisée du travail RÉELLEMENT accompli. Mesure l'avancement en termes financiers. Si EV=80k€ alors que PV=100k€ → vous avez accompli 80% de ce qui était prévu (SV = -20k€, en retard)."},
    AC: {title:"AC — Actual Cost (Coût Réel)", body:"Ce que vous avez réellement dépensé pour accomplir le travail. Si AC=90k€ et EV=80k€ → vous avez dépensé plus que prévu pour ce travail (CV = -10k€, sur budget). CPI = EV/AC = 0.89."},
    BAC: {title:"BAC — Budget At Completion", body:"Le budget total prévu pour l'ensemble du projet. Toutes les formules EVM partent de BAC. EAC = BAC/CPI donne la prévision du coût final basée sur la tendance actuelle."},
    EAC: {title:"EAC — Estimate At Completion", body:"Prévision du coût total final. Formule principale : EAC = BAC/CPI. Si CPI=0.89, EAC = BAC/0.89 → le projet coûtera 12% de plus que prévu. TCPI = (BAC-EV)/(BAC-AC) mesure l'efficacité nécessaire pour terminer dans le budget."},
  };

  // Points de la courbe S
  const pvPoints = "20,180 60,160 100,130 140,100 180,70 220,45 260,25 300,15";
  const evPoints = "20,180 60,170 100,150 140,125 180,100 220,80 260,65 300,55";
  const acPoints = "20,180 60,165 100,140 140,110 180,85 220,65 260,50 300,40";

  return (
    <div className="schema-wrap">
      <div className="schema-title">📊 Courbe en S — Earned Value Management (EVM)</div>
      <div className="schema-desc">Clique sur chaque indicateur pour comprendre sa signification. L'EVM est le système de mesure de performance le plus utilisé en gestion de projet.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 340 200" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
          {/* Grille */}
          {[40,80,120,160].map(y => <line key={y} x1="20" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
          {[80,140,200,260].map(x => <line key={x} x1={x} y1="15" x2={x} y2="185" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
          {/* Axes */}
          <line x1="20" y1="185" x2="310" y2="185" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="20" y1="185" x2="20" y2="10" stroke="#94A3B8" strokeWidth="1.5"/>
          {/* Labels axes */}
          <text x="165" y="198" fill="#94A3B8" fontSize="9" textAnchor="middle">Temps →</text>
          <text x="8" y="100" fill="#94A3B8" fontSize="9" textAnchor="middle" transform="rotate(-90,8,100)">Coût →</text>
          {/* Courbes */}
          <polyline points={pvPoints} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeDasharray="6,3"/>
          <polyline points={evPoints} fill="none" stroke="#10B981" strokeWidth="2.5"/>
          <polyline points={acPoints} fill="none" stroke="#F59E0B" strokeWidth="2.5"/>
          {/* Points cliquables */}
          {[
            {id:"PV", x:220, y:45, color:"#6366F1", label:"PV"},
            {id:"EV", x:220, y:80, color:"#10B981", label:"EV"},
            {id:"AC", x:220, y:65, color:"#F59E0B", label:"AC"},
            {id:"BAC", x:300, y:15, color:"#A5B4FC", label:"BAC"},
            {id:"EAC", x:300, y:40, color:"#FCD34D", label:"EAC"},
          ].map(p => (
            <g key={p.id} onClick={() => setActive(active===p.id?null:p.id)} style={{cursor:"pointer"}}>
              <circle cx={p.x} cy={p.y} r={active===p.id?8:6} fill={p.color} opacity={active===p.id?1:0.8}/>
              <text x={p.x+10} y={p.y+4} fill={p.color} fontSize="10" fontWeight="700">{p.label}</text>
            </g>
          ))}
          {/* Légende */}
          <line x1="25" y1="25" x2="50" y2="25" stroke="#6366F1" strokeWidth="2" strokeDasharray="4,2"/>
          <text x="54" y="29" fill="#A5B4FC" fontSize="9">PV (prévu)</text>
          <line x1="25" y1="38" x2="50" y2="38" stroke="#10B981" strokeWidth="2"/>
          <text x="54" y="42" fill="#6EE7B7" fontSize="9">EV (acquis)</text>
          <line x1="25" y1="51" x2="50" y2="51" stroke="#F59E0B" strokeWidth="2"/>
          <text x="54" y="55" fill="#FCD34D" fontSize="9">AC (réel)</text>
          {/* Flèches SV et CV */}
          <line x1="180" y1="70" x2="180" y2="100" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrow)"/>
          <text x="185" y="87" fill="#EF4444" fontSize="8">SV</text>
          <line x1="200" y1="80" x2="200" y2="65" stroke="#EF4444" strokeWidth="1.5"/>
          <text x="205" y="74" fill="#EF4444" fontSize="8">CV</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur un point pour l'explication</div>
      {active && info[active] && (
        <div className="schema-info">
          <div className="schema-info-title">{info[active].title}</div>
          <div className="schema-info-body">{info[active].body}</div>
          <div style={{marginTop:8,padding:"8px 10px",background:"rgba(99,102,241,0.08)",borderRadius:6,fontSize:11,color:"var(--indigo-l)"}}>
            <strong>Formules clés :</strong> SV=EV-PV · CV=EV-AC · SPI=EV/PV · CPI=EV/AC · EAC=BAC/CPI · TCPI=(BAC-EV)/(BAC-AC)
          </div>
        </div>
      )}
      <RefList refs={[REFS.evm, REFS.pmbok7, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 2. DIAGRAMME DE PARETO
// ═══════════════════════════════════════════════════
export function SchemaPareto() {
  const [active, setActive] = useState(null);
  const data = [
    {label:"Bugs critiques", val:38, cum:38, color:"#EF4444"},
    {label:"Config réseau", val:22, cum:60, color:"#F59E0B"},
    {label:"Formation", val:16, cum:76, color:"#F59E0B"},
    {label:"Doc manquante", val:12, cum:88, color:"#10B981"},
    {label:"Autres", val:12, cum:100, color:"#10B981"},
  ];
  const maxVal = 40;
  const barW = 40;
  const gap = 12;
  const startX = 35;

  return (
    <div className="schema-wrap">
      <div className="schema-title">📉 Diagramme de Pareto — Règle 80/20</div>
      <div className="schema-desc">80% des problèmes viennent de 20% des causes. Identifier et traiter ces causes prioritaires résout la majorité des problèmes.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 320 200" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
          {/* Grille horizontale */}
          {[0,25,50,75,100].map(v => {
            const y = 170 - (v/100)*140;
            return <g key={v}>
              <line x1="35" y1={y} x2="285" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
              <text x="30" y={y+4} fill="#64748B" fontSize="8" textAnchor="end">{v}%</text>
            </g>;
          })}
          {/* Ligne 80% */}
          <line x1="35" y1={170-(80/100)*140} x2="285" y2={170-(80/100)*140} stroke="#6366F1" strokeWidth="1" strokeDasharray="4,3"/>
          <text x="287" y={170-(80/100)*140+4} fill="#A5B4FC" fontSize="8">80%</text>
          {/* Barres */}
          {data.map((d, i) => {
            const x = startX + i*(barW+gap);
            const h = (d.val/maxVal)*140;
            const y = 170 - h;
            const isActive = active === i;
            return (
              <g key={i} onClick={() => setActive(isActive?null:i)} style={{cursor:"pointer"}}>
                <rect x={x} y={y} width={barW} height={h} fill={d.color} opacity={isActive?1:0.7} rx="3"/>
                <text x={x+barW/2} y={y-4} fill={d.color} fontSize="9" textAnchor="middle" fontWeight="700">{d.val}%</text>
                <text x={x+barW/2} y="185" fill="#94A3B8" fontSize="7" textAnchor="middle">{d.label.split(" ")[0]}</text>
              </g>
            );
          })}
          {/* Courbe cumulative */}
          <polyline
            points={data.map((d,i) => `${startX+i*(barW+gap)+barW/2},${170-(d.cum/100)*140}`).join(" ")}
            fill="none" stroke="#A5B4FC" strokeWidth="2"/>
          {data.map((d,i) => (
            <circle key={i} cx={startX+i*(barW+gap)+barW/2} cy={170-(d.cum/100)*140} r="3" fill="#6366F1"/>
          ))}
          {/* Axes */}
          <line x1="35" y1="170" x2="285" y2="170" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="35" y1="30" x2="35" y2="170" stroke="#94A3B8" strokeWidth="1.5"/>
        </svg>
      </div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">{data[active].label} — {data[active].val}% des problèmes</div>
          <div className="schema-info-body">
            Cette cause représente <strong>{data[active].val}%</strong> des problèmes totaux. Cumulé avec les causes précédentes : <strong>{data[active].cum}%</strong> des problèmes sont couverts.
            {data[active].cum <= 80 ? " ✅ Cette cause fait partie des 20% à traiter en priorité pour résoudre 80% des problèmes." : " ℹ️ Cette cause est dans les 80% restants — à traiter après les causes critiques."}
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginTop:8}}>
        <strong style={{color:"var(--text)"}}>Application PMP :</strong> En qualité, le Pareto guide la priorisation des actions correctives. En gestion des risques, il identifie les risques qui méritent le plus d'attention. Outil clé pour les décisions basées sur les données.
      </div>
      <RefList refs={[REFS.pmbok7, {ico:"📖", text:"Juran, J.M. (1951). Quality Control Handbook. McGraw-Hill", link:"https://en.wikipedia.org/wiki/Pareto_principle"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 3. MODÈLE TUCKMAN
// ═══════════════════════════════════════════════════
export function SchemaTuckman() {
  const [active, setActive] = useState(null);
  const phases = [
    {id:0, name:"Forming", ico:"🌱", color:"#6366F1", x:30, desc:"Formation de l'équipe. Politesse, dépendance au leader. Les membres se découvrent, cherchent leur place. Performance faible.", style_pm:"Style PM recommandé : DIRECTIF. Donner des instructions claires, établir les objectifs et les règles.", perf:"20%"},
    {id:1, name:"Storming", ico:"⚡", color:"#EF4444", x:90, desc:"Conflits et résistance. Les personnalités s'affrontent, les rôles sont contestés. Période difficile mais normale et nécessaire.", style_pm:"Style PM recommandé : COACH. Faciliter la résolution des conflits, maintenir le cap sur les objectifs.", perf:"35%"},
    {id:2, name:"Norming", ico:"🤝", color:"#F59E0B", x:150, desc:"Cohésion et accords. L'équipe établit ses règles de fonctionnement, la confiance s'installe, la collaboration s'améliore.", style_pm:"Style PM recommandé : FACILITATEUR. Soutenir l'équipe, encourager la prise d'initiative.", perf:"65%"},
    {id:3, name:"Performing", ico:"🚀", color:"#10B981", x:210, desc:"Haute performance. L'équipe est autonome, efficace, créative. Les membres se soutiennent mutuellement. Performance maximale.", style_pm:"Style PM recommandé : DÉLÉGANT. Protéger l'équipe des perturbations extérieures, fixer les objectifs.", perf:"90%"},
    {id:4, name:"Adjourning", ico:"🎯", color:"#8B5CF6", x:270, desc:"Dissolution. Le projet se termine. Célébrer les succès, faire le bilan, faciliter la transition des membres vers de nouveaux projets.", style_pm:"Style PM recommandé : CÉLÉBRANT. Reconnaître les contributions, organiser le transfert de connaissances.", perf:"—"},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🔀 Modèle Tuckman — Développement de l'équipe</div>
      <div className="schema-desc">Les 5 phases inévitables de tout groupe. La progression n'est pas toujours linéaire — un changement dans l'équipe peut faire régresser vers Storming.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 340 160" style={{width:"100%",maxWidth:540,display:"block",margin:"0 auto"}}>
          {/* Courbe de performance */}
          <defs>
            <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <path d="M30,130 C60,125 75,110 90,100 C110,88 120,70 150,60 C180,50 195,35 210,25 C240,20 260,22 300,25 L300,140 L30,140 Z" fill="url(#perfGrad)"/>
          <path d="M30,130 C60,125 75,110 90,100 C110,88 120,70 150,60 C180,50 195,35 210,25 C240,20 260,22 300,25" fill="none" stroke="#10B981" strokeWidth="2"/>
          {/* Axe X */}
          <line x1="20" y1="140" x2="320" y2="140" stroke="#94A3B8" strokeWidth="1"/>
          <text x="170" y="155" fill="#64748B" fontSize="8" textAnchor="middle">Temps →</text>
          {/* Axe Y */}
          <line x1="20" y1="140" x2="20" y2="15" stroke="#94A3B8" strokeWidth="1"/>
          <text x="8" y="80" fill="#64748B" fontSize="8" textAnchor="middle" transform="rotate(-90,8,80)">Performance</text>
          {/* Phases */}
          {phases.map(p => (
            <g key={p.id} onClick={() => setActive(active===p.id?null:p.id)} style={{cursor:"pointer"}}>
              <circle cx={p.x} cy={p.id===4?25:p.id===3?25:p.id===2?60:p.id===1?100:130} r={active===p.id?14:10} fill={p.color} opacity={active===p.id?1:0.8}/>
              <text x={p.x} y={p.id===4?30:p.id===3?30:p.id===2?65:p.id===1?105:135} fill="white" fontSize="10" textAnchor="middle">{p.ico}</text>
              <text x={p.x} y="152" fill={active===p.id?p.color:"#94A3B8"} fontSize="8" textAnchor="middle" fontWeight={active===p.id?"700":"400"}>{p.name}</text>
            </g>
          ))}
          {/* Flèche régression */}
          <path d="M210,30 C240,15 270,15 285,30" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arrowRed)"/>
          <text x="250" y="12" fill="#EF4444" fontSize="7" textAnchor="middle">Régression possible</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur une phase pour les détails</div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">{phases[active].ico} {phases[active].name} {phases[active].perf !== "—" ? `— Performance : ${phases[active].perf}` : ""}</div>
          <div className="schema-info-body">{phases[active].desc}</div>
          <div style={{marginTop:6,fontSize:12,color:"var(--indigo-l)",fontWeight:600}}>{phases[active].style_pm}</div>
        </div>
      )}
      <RefList refs={[REFS.tuckman, REFS.pmbok7, {ico:"📄", text:"Tuckman & Jensen (1977). Stages of Small-Group Development Revisited. Group & Organization Studies", link:"https://doi.org/10.1177/105960117700200404"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 4. PYRAMIDE DE MASLOW
// ═══════════════════════════════════════════════════
export function SchemaMaslow() {
  const [active, setActive] = useState(null);
  const levels = [
    {id:4, name:"Accomplissement", sub:"Self-actualization", color:"#8B5CF6", examples:"Créativité, innovation, leadership, maîtrise. Un PM qui repousse ses limites, qui innove.", pm:"Donner des projets challengeants, favoriser la créativité, encourager l'innovation."},
    {id:3, name:"Estime", sub:"Esteem", color:"#6366F1", examples:"Reconnaissance, statut, responsabilité, prestige. Promotion, certification PMP, leadership d'équipe.", pm:"Reconnaître publiquement les succès, attribuer des responsabilités, célébrer les jalons."},
    {id:2, name:"Appartenance", sub:"Social/Love", color:"#10B981", examples:"Équipe solidaire, relations de travail, culture d'entreprise, sentiment d'appartenance.", pm:"Team building, créer une culture positive, encourager la collaboration et la communication."},
    {id:1, name:"Sécurité", sub:"Safety", color:"#F59E0B", examples:"Sécurité de l'emploi, contrat stable, environnement de travail sûr, processus clairs.", pm:"Clarifier les rôles et responsabilités, assurer la stabilité du projet, communiquer clairement."},
    {id:0, name:"Besoins physiologiques", sub:"Physiological", color:"#EF4444", examples:"Salaire suffisant, conditions de travail, pauses, équipement de travail adéquat.", pm:"Assurer une rémunération équitable, des conditions de travail correctes, du matériel adapté."},
  ];

  const totalH = 180;
  const levels_visual = levels.map((l, i) => ({
    ...l,
    y: 10 + i * (totalH/5),
    h: totalH/5 - 2,
    w: 60 + i * 40,
    x: 170 - (60 + i*40)/2,
  }));

  return (
    <div className="schema-wrap">
      <div className="schema-title">📈 Pyramide de Maslow — Théorie de la motivation</div>
      <div className="schema-desc">Les besoins humains sont hiérarchisés. Un besoin d'ordre supérieur ne peut motiver que si les besoins inférieurs sont satisfaits. Essentiel pour comprendre la motivation de ton équipe.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 340 200" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
          {levels_visual.map((l, i) => {
            const isActive = active === l.id;
            const w = 300 - i * 50;
            const x = 20 + i * 25;
            const y = 10 + (4-i) * 36;
            const h = 34;
            return (
              <g key={l.id} onClick={() => setActive(isActive?null:l.id)} style={{cursor:"pointer"}}>
                <rect x={x} y={y} width={w} height={h} fill={l.color} opacity={isActive?1:0.75} rx="4"/>
                <text x={x+w/2} y={y+h/2-4} fill="white" fontSize="10" textAnchor="middle" fontWeight="700">{l.name}</text>
                <text x={x+w/2} y={y+h/2+7} fill="rgba(255,255,255,0.8)" fontSize="8" textAnchor="middle">{l.sub}</text>
              </g>
            );
          })}
          {/* Flèche */}
          <text x="325" y="105" fill="#94A3B8" fontSize="20" textAnchor="middle">↑</text>
          <text x="325" y="120" fill="#64748B" fontSize="7" textAnchor="middle">Croissance</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur un niveau pour les détails</div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">{levels[4-active]?.name} — Niveau {active+1}/5</div>
          <div className="schema-info-body">
            <strong>Exemples en contexte projet :</strong> {levels[4-active]?.examples}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Action PM :</strong> {levels[4-active]?.pm}
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginTop:8}}>
        <strong style={{color:"var(--text)"}}>⚠️ Piège à l'examen :</strong> Herzberg distingue facteurs d'hygiène (besoins 1-2 de Maslow) des motivateurs (besoins 3-5). Augmenter le salaire (hygiène) supprime l'insatisfaction mais ne crée pas de motivation !
      </div>
      <RefList refs={[REFS.maslow, REFS.herzberg, REFS.pmbok7, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 5. LEADERSHIP SITUATIONNEL (HERSEY & BLANCHARD)
// ═══════════════════════════════════════════════════
export function SchemaHersey() {
  const [active, setActive] = useState(null);
  const quadrants = [
    {id:"S2", name:"S2 — Coaching", x:165, y:40, color:"#F59E0B", comp:"Faible→Moyenne", motiv:"Haute", desc:"L'équipier veut bien faire mais manque de compétences. Il a besoin d'être guidé ET encouragé. Ex: Nouveau membre motivé mais inexpérimenté.", action:"Expliquer le pourquoi, montrer comment faire, donner du feedback positif fréquent, impliquer dans les décisions."},
    {id:"S1", name:"S1 — Directif", x:55, y:40, color:"#EF4444", comp:"Faible", motiv:"Haute", desc:"L'équipier est enthousiaste mais inexpérimenté. Il a besoin d'instructions claires et précises. Ex: Stagiaire motivé, nouveau dans le domaine.", action:"Définir les tâches précisément, superviser de près, donner des instructions step-by-step, vérifier régulièrement."},
    {id:"S3", name:"S3 — Soutien", x:165, y:120, color:"#10B981", comp:"Haute", motiv:"Variable", desc:"L'équipier est compétent mais manque de confiance ou de motivation. Il a besoin de soutien émotionnel. Ex: Expert qui doute de lui.", action:"Écouter activement, encourager, impliquer dans les décisions, donner de l'autonomie progressive, reconnaître les succès."},
    {id:"S4", name:"S4 — Délégation", x:55, y:120, color:"#8B5CF6", comp:"Haute", motiv:"Haute", desc:"L'équipier est compétent ET motivé. Il peut travailler de façon autonome. Ex: Expert senior engagé et expérimenté.", action:"Fixer les objectifs, déléguer la responsabilité totale, intervenir seulement si demandé, faire confiance."},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🧭 Leadership situationnel — Hersey & Blanchard</div>
      <div className="schema-desc">Le style de leadership optimal dépend du niveau de maturité de l'équipier (compétence + motivation). Il n'y a pas un seul bon style !</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 280 200" style={{width:"100%",maxWidth:480,display:"block",margin:"0 auto"}}>
          {/* Fond quadrants */}
          <rect x="10" y="10" width="115" height="90" fill="rgba(239,68,68,0.05)" rx="6"/>
          <rect x="130" y="10" width="140" height="90" fill="rgba(245,158,11,0.05)" rx="6"/>
          <rect x="10" y="105" width="115" height="90" fill="rgba(139,92,246,0.05)" rx="6"/>
          <rect x="130" y="105" width="140" height="90" fill="rgba(16,185,129,0.05)" rx="6"/>
          {/* Axes */}
          <line x1="10" y1="100" x2="270" y2="100" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="125" y1="10" x2="125" y2="195" stroke="#94A3B8" strokeWidth="1.5"/>
          {/* Labels axes */}
          <text x="140" y="197" fill="#64748B" fontSize="8">Compétence élevée →</text>
          <text x="10" y="197" fill="#64748B" fontSize="8">← Faible compétence</text>
          <text x="6" y="55" fill="#64748B" fontSize="8" transform="rotate(-90,6,55)">Motivation haute</text>
          <text x="6" y="160" fill="#64748B" fontSize="8" transform="rotate(-90,6,160)">Motivation basse</text>
          {/* Quadrants cliquables */}
          {quadrants.map(q => (
            <g key={q.id} onClick={() => setActive(active===q.id?null:q.id)} style={{cursor:"pointer"}}>
              <circle cx={q.x} cy={q.y} r={active===q.id?22:18} fill={q.color} opacity={active===q.id?1:0.8}/>
              <text x={q.x} y={q.y-5} fill="white" fontSize="9" textAnchor="middle" fontWeight="700">{q.id}</text>
              <text x={q.x} y={q.y+7} fill="white" fontSize="7" textAnchor="middle">{q.name.split("—")[1]?.trim()}</text>
            </g>
          ))}
          {/* Courbe de leadership */}
          <path d="M10,180 Q70,160 125,100 Q180,40 270,20" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,3"/>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur un quadrant pour les détails</div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">{quadrants.find(q=>q.id===active)?.name}</div>
          <div className="schema-info-body">
            <strong>Compétence :</strong> {quadrants.find(q=>q.id===active)?.comp} · <strong>Motivation :</strong> {quadrants.find(q=>q.id===active)?.motiv}<br/><br/>
            {quadrants.find(q=>q.id===active)?.desc}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Action PM :</strong> {quadrants.find(q=>q.id===active)?.action}
          </div>
        </div>
      )}
      <RefList refs={[REFS.hersey, REFS.pmbok7, {ico:"🔗", text:"Situational Leadership — Ken Blanchard Group", link:"https://situational.com/"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 6. HERZBERG — HYGIENE VS MOTIVATION
// ═══════════════════════════════════════════════════
export function SchemaHerzberg() {
  const [active, setActive] = useState(null);
  const hygiene = ["Salaire & avantages", "Sécurité de l'emploi", "Conditions de travail", "Relations avec collègues", "Politique d'entreprise", "Supervision"];
  const motivators = ["Accomplissement", "Reconnaissance", "Responsabilité", "Avancement & promotion", "Travail lui-même", "Croissance personnelle"];

  return (
    <div className="schema-wrap">
      <div className="schema-title">⚡ Modèle Herzberg — Facteurs d'hygiène vs Motivateurs</div>
      <div className="schema-desc">Deux catégories distinctes. Les facteurs d'hygiène évitent l'insatisfaction mais ne créent pas de motivation. Seuls les motivateurs créent une vraie satisfaction.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"12px 0"}}>
        <div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"var(--r-sm)",padding:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"#FCA5A5",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>😐 Facteurs d'hygiène</div>
          <div style={{fontSize:10,color:"var(--text-2)",marginBottom:8,fontStyle:"italic"}}>Absence = insatisfaction<br/>Présence = pas d'insatisfaction</div>
          {hygiene.map((h,i) => (
            <div key={i} onClick={() => setActive(active===`h${i}`?null:`h${i}`)}
              style={{padding:"5px 8px",borderRadius:5,marginBottom:4,cursor:"pointer",background:active===`h${i}`?"rgba(239,68,68,0.15)":"transparent",border:`1px solid ${active===`h${i}`?"rgba(239,68,68,0.4)":"transparent"}`,fontSize:12,color:"var(--text-2)"}}>
              {h}
            </div>
          ))}
        </div>
        <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"var(--r-sm)",padding:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"var(--green-l)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>😊 Motivateurs</div>
          <div style={{fontSize:10,color:"var(--text-2)",marginBottom:8,fontStyle:"italic"}}>Présence = satisfaction<br/>Absence = pas d'insatisfaction</div>
          {motivators.map((m,i) => (
            <div key={i} onClick={() => setActive(active===`m${i}`?null:`m${i}`)}
              style={{padding:"5px 8px",borderRadius:5,marginBottom:4,cursor:"pointer",background:active===`m${i}`?"rgba(16,185,129,0.15)":"transparent",border:`1px solid ${active===`m${i}`?"rgba(16,185,129,0.4)":"transparent"}`,fontSize:12,color:"var(--text-2)"}}>
              {m}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:"var(--r-sm)",padding:10,fontSize:12,color:"var(--text-2)",lineHeight:1.7}}>
        <strong style={{color:"var(--indigo-l)"}}>⚠️ Piège classique à l'examen :</strong> Augmenter le salaire (hygiène) supprime l'insatisfaction mais ne crée PAS de motivation. Pour motiver ton équipe, tu dois agir sur les motivateurs : donner plus de responsabilités, reconnaître les succès, permettre la croissance.
      </div>
      <RefList refs={[REFS.herzberg, REFS.maslow, REFS.pmbok7, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 7. MODÈLE CYNEFIN
// ═══════════════════════════════════════════════════
export function SchemaCynefin() {
  const [active, setActive] = useState(null);
  const domains = [
    {id:"simple", name:"Simple / Obvious", x:180, y:50, color:"#10B981", approach:"Sense → Categorize → Respond", desc:"Cause-effet évident. Les bonnes pratiques s'appliquent directement. Ex: projets de construction répétitifs, processus standards.", action:"Utiliser les procédures standard. Automatiser. Déléguer. ⚠️ Danger : sur-simplification, complaisance."},
    {id:"complicated", name:"Compliqué", x:50, y:50, color:"#6366F1", approach:"Sense → Analyze → Respond", desc:"Cause-effet existe mais nécessite une expertise. Plusieurs bonnes réponses possibles. Ex: développement logiciel complexe, projets d'ingénierie.", action:"Faire appel à des experts. Analyser les options. Appliquer les meilleures pratiques du domaine."},
    {id:"complex", name:"Complexe", x:50, y:140, color:"#F59E0B", approach:"Probe → Sense → Respond", desc:"Cause-effet rétrospectif seulement. Les pratiques émergent de l'expérimentation. Ex: projets d'innovation, transformation organisationnelle.", action:"Expérimenter en sécurité (safe-to-fail). Observer les résultats. Amplifier ce qui marche. Méthodes agiles."},
    {id:"chaotic", name:"Chaotique", x:180, y:140, color:"#EF4444", approach:"Act → Sense → Respond", desc:"Pas de cause-effet perceptible. Crise. Action immédiate nécessaire pour stabiliser. Ex: cyberattaque, catastrophe, crise majeure.", action:"Agir immédiatement pour stabiliser. Établir l'ordre. Ensuite passer vers Complexe ou Compliqué."},
    {id:"disorder", name:"Désordre", x:115, y:95, color:"#64748B", approach:"Zone de confusion", desc:"On ne sait pas dans quel domaine on est. Danger : chacun interprète selon sa vision du monde.", action:"Sortir du désordre en fragmentant la situation pour identifier les composantes dans leurs domaines respectifs."},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🧠 Modèle Cynefin — Cadre de prise de décision</div>
      <div className="schema-desc">Développé par Dave Snowden (IBM, 1999). Aide à choisir la bonne approche selon la nature du problème. La plupart des projets d'innovation sont dans le domaine Complexe.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 260 200" style={{width:"100%",maxWidth:460,display:"block",margin:"0 auto"}}>
          {/* Fond 4 quadrants */}
          <rect x="10" y="10" width="115" height="85" fill="rgba(99,102,241,0.06)" rx="6"/>
          <rect x="130" y="10" width="120" height="85" fill="rgba(16,185,129,0.06)" rx="6"/>
          <rect x="10" y="100" width="115" height="90" fill="rgba(245,158,11,0.06)" rx="6"/>
          <rect x="130" y="100" width="120" height="90" fill="rgba(239,68,68,0.06)" rx="6"/>
          {/* Axes */}
          <line x1="10" y1="95" x2="250" y2="95" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="125" y1="10" x2="125" y2="190" stroke="#94A3B8" strokeWidth="1.5"/>
          {/* Labels quadrants */}
          <text x="67" y="22" fill="#A5B4FC" fontSize="9" textAnchor="middle" fontWeight="700">Compliqué</text>
          <text x="190" y="22" fill="#6EE7B7" fontSize="9" textAnchor="middle" fontWeight="700">Simple</text>
          <text x="67" y="112" fill="#FCD34D" fontSize="9" textAnchor="middle" fontWeight="700">Complexe</text>
          <text x="190" y="112" fill="#FCA5A5" fontSize="9" textAnchor="middle" fontWeight="700">Chaotique</text>
          {/* Domaines cliquables */}
          {domains.map(d => (
            <g key={d.id} onClick={() => setActive(active===d.id?null:d.id)} style={{cursor:"pointer"}}>
              <circle cx={d.x} cy={d.y} r={active===d.id?16:12} fill={d.color} opacity={active===d.id?1:0.8}/>
              <text x={d.x} y={d.y+4} fill="white" fontSize="8" textAnchor="middle" fontWeight="700">
                {d.id==="simple"?"✓":d.id==="complicated"?"🔬":d.id==="complex"?"🌀":d.id==="chaotic"?"⚡":"?"}
              </text>
            </g>
          ))}
          {/* Labels axes */}
          <text x="130" y="197" fill="#64748B" fontSize="7" textAnchor="middle">← Non ordonné · Ordonné →</text>
          <text x="3" y="53" fill="#64748B" fontSize="7" transform="rotate(-90,3,53)">Prévisible</text>
          <text x="3" y="150" fill="#64748B" fontSize="7" transform="rotate(-90,3,150)">Imprévisible</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur un domaine pour les détails</div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">{domains.find(d=>d.id===active)?.name}</div>
          <div className="schema-info-body">
            <strong style={{color:"var(--gold-l)"}}>Approche :</strong> {domains.find(d=>d.id===active)?.approach}<br/><br/>
            {domains.find(d=>d.id===active)?.desc}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Action recommandée :</strong> {domains.find(d=>d.id===active)?.action}
          </div>
        </div>
      )}
      <RefList refs={[REFS.cynefin, {ico:"🔗", text:"Cynefin Framework — cognitive-edge.com", link:"https://cynefin.io/"}, REFS.pmbok7, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 8. MATRICE PROBABILITÉ / IMPACT (RISQUES)
// ═══════════════════════════════════════════════════
export function SchemaRiskMatrix() {
  const [active, setActive] = useState(null);
  const cells = [
    {prob:"Haute", impact:"Faible", color:"#F59E0B", level:"MOYEN", x:1, y:0, strategy:"Atténuer ou Accepter activement. Surveiller de près."},
    {prob:"Haute", impact:"Moyen", color:"#EF4444", level:"ÉLEVÉ", x:2, y:0, strategy:"Éviter ou Atténuer en priorité. Plan de réponse détaillé requis."},
    {prob:"Haute", impact:"Élevé", color:"#7F1D1D", level:"CRITIQUE", x:3, y:0, strategy:"ÉVITER absolument ou Transférer. Escalader au sponsor immédiatement."},
    {prob:"Moyenne", impact:"Faible", color:"#10B981", level:"FAIBLE", x:1, y:1, strategy:"Accepter passivement. Surveiller occasionnellement."},
    {prob:"Moyenne", impact:"Moyen", color:"#F59E0B", level:"MOYEN", x:2, y:1, strategy:"Atténuer. Plan de contingence recommandé."},
    {prob:"Moyenne", impact:"Élevé", color:"#EF4444", level:"ÉLEVÉ", x:3, y:1, strategy:"Éviter ou Atténuer. Plan de réponse détaillé."},
    {prob:"Faible", impact:"Faible", color:"#10B981", level:"FAIBLE", x:1, y:2, strategy:"Accepter. Aucune action immédiate requise."},
    {prob:"Faible", impact:"Moyen", color:"#10B981", level:"FAIBLE", x:2, y:2, strategy:"Accepter activement avec réserve d'aléas."},
    {prob:"Faible", impact:"Élevé", color:"#F59E0B", level:"MOYEN", x:3, y:2, strategy:"Atténuer l'impact. Plan de contingence."},
  ];

  const cellW = 70, cellH = 40, startX = 60, startY = 20;

  return (
    <div className="schema-wrap">
      <div className="schema-title">🎲 Matrice Probabilité / Impact — Analyse qualitative des risques</div>
      <div className="schema-desc">Priorisation visuelle des risques. Chaque risque est positionné selon sa probabilité d'occurrence et son impact potentiel. Clique sur une cellule pour la stratégie recommandée.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 300 180" style={{width:"100%",maxWidth:460,display:"block",margin:"0 auto"}}>
          {/* Labels probabilité */}
          {["Haute","Moyenne","Faible"].map((p,i) => (
            <text key={p} x="55" y={startY+i*cellH+cellH/2+4} fill="#94A3B8" fontSize="9" textAnchor="end">{p}</text>
          ))}
          {/* Labels impact */}
          {["Faible","Moyen","Élevé"].map((imp,i) => (
            <text key={imp} x={startX+i*cellW+cellW/2} y="170" fill="#94A3B8" fontSize="9" textAnchor="middle">{imp}</text>
          ))}
          {/* Titre axes */}
          <text x="20" y="90" fill="#64748B" fontSize="8" textAnchor="middle" transform="rotate(-90,20,90)">Probabilité</text>
          <text x="175" y="178" fill="#64748B" fontSize="8" textAnchor="middle">Impact →</text>
          {/* Cellules */}
          {cells.map((c,i) => {
            const x = startX + c.x * cellW - cellW;
            const y = startY + c.y * cellH;
            const isActive = active === i;
            return (
              <g key={i} onClick={() => setActive(isActive?null:i)} style={{cursor:"pointer"}}>
                <rect x={x} y={y} width={cellW-2} height={cellH-2} fill={c.color} opacity={isActive?1:0.7} rx="3"/>
                <text x={x+cellW/2-1} y={y+cellH/2+4} fill="white" fontSize="9" textAnchor="middle" fontWeight="700">{c.level}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">Risque {cells[active]?.level} — Probabilité {cells[active]?.prob} × Impact {cells[active]?.impact}</div>
          <div className="schema-info-body">
            <strong style={{color:"var(--indigo-l)"}}>Stratégie recommandée :</strong> {cells[active]?.strategy}<br/><br/>
            <strong>Rappel des 4 stratégies (menaces) :</strong><br/>
            🔴 <strong>Éviter</strong> — Changer le plan pour éliminer le risque<br/>
            🟡 <strong>Transférer</strong> — Reporter sur un tiers (assurance, sous-traitance)<br/>
            🟢 <strong>Atténuer</strong> — Réduire probabilité ou impact<br/>
            ⚪ <strong>Accepter</strong> — Passif (rien) ou Actif (réserve d'aléas)
          </div>
        </div>
      )}
      <RefList refs={[REFS.pmbok7, {ico:"📄", text:"PMI Practice Standard for Project Risk Management", link:"https://www.pmi.org/pmbok-guide-standards/practice-guides/risk"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 9. MATRICE POUVOIR / INTÉRÊT
// ═══════════════════════════════════════════════════
export function SchemaPowerInterest() {
  const [active, setActive] = useState(null);
  const quadrants = [
    {id:"A", name:"Gérer de près", x:200, y:40, color:"#EF4444", pouvoir:"Élevé", interet:"Élevé", desc:"Parties prenantes les plus importantes. Communication fréquente, implication dans les décisions clés.", exemples:"Sponsor, Client principal, Directeur concerné", freq:"Quotidienne ou hebdomadaire"},
    {id:"B", name:"Satisfaire", x:200, y:140, color:"#F59E0B", pouvoir:"Élevé", interet:"Faible", desc:"Ont le pouvoir de bloquer le projet mais peu d'intérêt. Les informer suffisamment pour ne pas les contrarier.", exemples:"Direction générale, Régulateurs, Comité de gouvernance", freq:"Mensuelle ou sur jalons"},
    {id:"C", name:"Impliquer activement", x:70, y:40, color:"#6366F1", pouvoir:"Faible", interet:"Élevé", desc:"Très intéressées mais peu d'influence. Écouter leurs retours — ils peuvent devenir des champions ou des détracteurs.", exemples:"Utilisateurs finaux, Équipe opérationnelle, Experts métier", freq:"Hebdomadaire"},
    {id:"D", name:"Surveiller", x:70, y:140, color:"#10B981", pouvoir:"Faible", interet:"Faible", desc:"Peu d'influence et peu d'intérêt. Communication minimale mais surveiller en cas de changement de position.", exemples:"Fournisseurs secondaires, Médias, Public général", freq:"Mensuelle ou trimestrielle"},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🔵 Matrice Pouvoir / Intérêt — Analyse des parties prenantes</div>
      <div className="schema-desc">Outil fondamental pour prioriser l'engagement. Position dynamique — une partie prenante peut changer de quadrant au cours du projet.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 280 195" style={{width:"100%",maxWidth:460,display:"block",margin:"0 auto"}}>
          {/* Quadrants */}
          <rect x="10" y="10" width="120" height="85" fill="rgba(99,102,241,0.06)" rx="6"/>
          <rect x="135" y="10" width="135" height="85" fill="rgba(239,68,68,0.06)" rx="6"/>
          <rect x="10" y="100" width="120" height="85" fill="rgba(16,185,129,0.06)" rx="6"/>
          <rect x="135" y="100" width="135" height="85" fill="rgba(245,158,11,0.06)" rx="6"/>
          {/* Axes */}
          <line x1="10" y1="95" x2="270" y2="95" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="130" y1="10" x2="130" y2="185" stroke="#94A3B8" strokeWidth="1.5"/>
          {/* Labels axes */}
          <text x="140" y="192" fill="#64748B" fontSize="8">→ Intérêt élevé</text>
          <text x="10" y="192" fill="#64748B" fontSize="8">← Faible intérêt</text>
          <text x="6" y="55" fill="#64748B" fontSize="7" transform="rotate(-90,6,55)">Pouvoir élevé</text>
          <text x="6" y="155" fill="#64748B" fontSize="7" transform="rotate(-90,6,155)">Pouvoir faible</text>
          {/* Quadrant labels */}
          <text x="70" y="22" fill="#A5B4FC" fontSize="8" textAnchor="middle" fontWeight="700">Impliquer</text>
          <text x="200" y="22" fill="#FCA5A5" fontSize="8" textAnchor="middle" fontWeight="700">Gérer de près</text>
          <text x="70" y="112" fill="#6EE7B7" fontSize="8" textAnchor="middle" fontWeight="700">Surveiller</text>
          <text x="200" y="112" fill="#FCD34D" fontSize="8" textAnchor="middle" fontWeight="700">Satisfaire</text>
          {/* Points cliquables */}
          {quadrants.map(q => (
            <g key={q.id} onClick={() => setActive(active===q.id?null:q.id)} style={{cursor:"pointer"}}>
              <circle cx={q.x} cy={q.y} r={active===q.id?18:14} fill={q.color} opacity={active===q.id?1:0.8}/>
              <text x={q.x} y={q.y-4} fill="white" fontSize="9" textAnchor="middle" fontWeight="700">{q.id}</text>
              <text x={q.x} y={q.y+8} fill="white" fontSize="7" textAnchor="middle">{q.name.split(" ")[0]}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur un quadrant pour les détails</div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">Quadrant {active} — {quadrants.find(q=>q.id===active)?.name}</div>
          <div className="schema-info-body">
            <strong>Pouvoir :</strong> {quadrants.find(q=>q.id===active)?.pouvoir} · <strong>Intérêt :</strong> {quadrants.find(q=>q.id===active)?.interet}<br/><br/>
            {quadrants.find(q=>q.id===active)?.desc}<br/><br/>
            <strong>Exemples :</strong> {quadrants.find(q=>q.id===active)?.exemples}<br/>
            <strong style={{color:"var(--indigo-l)"}}>Fréquence de communication :</strong> {quadrants.find(q=>q.id===active)?.freq}
          </div>
        </div>
      )}
      <RefList refs={[REFS.pmbok7, {ico:"📄", text:"Freeman, R.E. (1984). Strategic Management: A Stakeholder Approach", link:"https://en.wikipedia.org/wiki/Stakeholder_theory"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 10. MODÈLE ADKAR
// ═══════════════════════════════════════════════════
export function SchemaADKAR() {
  const [active, setActive] = useState(null);
  const steps = [
    {id:0, letter:"A", name:"Awareness", fr:"Conscience", color:"#6366F1", desc:"Comprendre pourquoi le changement est nécessaire. Sans awareness, les gens résistent car ils ne voient pas le problème.", actions:"Communication claire sur : le contexte du changement, les risques de ne pas changer, les bénéfices attendus.", blocage:"Gap d'Awareness → Rumeurs, résistance passive, désinformation."},
    {id:1, letter:"D", name:"Desire", fr:"Désir", color:"#8B5CF6", desc:"Vouloir participer et soutenir le changement. L'awareness ne suffit pas — la personne doit VOULOIR changer.", actions:"Impliquer les personnes dans la conception du changement. Identifier les motivations individuelles. Champions internes.", blocage:"Gap de Desire → Sabotage, non-participation, résistance active."},
    {id:2, letter:"K", name:"Knowledge", fr:"Connaissance", color:"#10B981", desc:"Savoir comment changer — les compétences et les comportements requis. Formation et développement.", actions:"Plans de formation, coaching, documentation, guides utilisateur, support technique disponible.", blocage:"Gap de Knowledge → Erreurs, frustration, retours en arrière."},
    {id:3, letter:"A", name:"Ability", fr:"Capacité", color:"#F59E0B", desc:"Être capable d'implémenter les nouvelles compétences dans le travail quotidien. La connaissance ne suffit pas.", actions:"Pratique guidée, support on-the-job, retours d'expérience, environnement d'entraînement sécurisé.", blocage:"Gap d'Ability → Performance dégradée, contournements, démotivation."},
    {id:4, letter:"R", name:"Reinforcement", fr:"Ancrage", color:"#EF4444", desc:"Maintenir et soutenir le changement pour éviter le retour aux anciennes habitudes. Le changement n'est pas permanent naturellement.", actions:"Reconnaissance et récompenses, célébration des succès, mesure et feedback, correction des écarts.", blocage:"Gap de Reinforcement → Régression vers les anciennes pratiques."},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">📋 Modèle ADKAR — Gestion du changement individuel</div>
      <div className="schema-desc">Développé par Jeff Hiatt (Prosci). Le changement organisationnel réussit quand CHAQUE individu progresse à travers ces 5 étapes dans l'ordre. Un blocage à une étape bloque toutes les suivantes.</div>
      <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
        {steps.map((s,i) => (
          <div key={s.id} onClick={() => setActive(active===s.id?null:s.id)}
            style={{flex:1,minWidth:50,background:active===s.id?s.color:`${s.color}20`,border:`2px solid ${active===s.id?s.color:`${s.color}40`}`,borderRadius:"var(--r-sm)",padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
            <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,color:active===s.id?"white":s.color}}>{s.letter}</div>
            <div style={{fontSize:9,fontWeight:700,color:active===s.id?"white":s.color,marginTop:2}}>{s.fr}</div>
            {i < steps.length-1 && (
              <div style={{position:"absolute",right:-8,top:"50%",color:s.color,fontSize:16,fontWeight:700}}>→</div>
            )}
          </div>
        ))}
      </div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">{steps[active].letter} — {steps[active].name} ({steps[active].fr})</div>
          <div className="schema-info-body">
            {steps[active].desc}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Actions PM/Change Manager :</strong> {steps[active].actions}<br/><br/>
            <strong style={{color:"var(--red)"}}>⚠️ Si gap identifié :</strong> {steps[active].blocage}
          </div>
        </div>
      )}
      <div style={{background:"rgba(99,102,241,0.06)",borderRadius:"var(--r-sm)",padding:10,fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginTop:8}}>
        <strong style={{color:"var(--indigo-l)"}}>Comment diagnostiquer :</strong> Évaluer chaque personne sur une échelle 1-5 pour chaque étape ADKAR. Le score le plus bas indique où concentrer les efforts.
      </div>
      <RefList refs={[REFS.adkar, {ico:"🔗", text:"Prosci ADKAR Model — prosci.com", link:"https://www.prosci.com/adkar/adkar-model"}, REFS.pmbok7]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 11. 8 ÉTAPES DE KOTTER
// ═══════════════════════════════════════════════════
export function SchemaKotter() {
  const [active, setActive] = useState(null);
  const steps = [
    {id:0, num:"1", name:"Créer l'urgence", color:"#EF4444", phase:"Créer le climat", desc:"Montrer pourquoi le changement est impératif MAINTENANT. Utiliser les données de performance, la concurrence, les opportunités manquées.", exemple:"Présenter les statistiques de perte de parts de marché face aux concurrents qui ont déjà transformé leurs processus."},
    {id:1, num:"2", name:"Former une coalition", color:"#F59E0B", phase:"Créer le climat", desc:"Constituer une équipe de leaders influents qui guideront le changement. Pas seulement des managers — des leaders informels aussi.", exemple:"Recruter des champions dans chaque département, des experts reconnus, des early adopters enthousiastes."},
    {id:2, num:"3", name:"Développer une vision", color:"#F59E0B", phase:"Créer le climat", desc:"Créer une vision claire et inspirante de l'état futur. Simple à communiquer en 5 minutes.", exemple:"En 2 ans, nos processus seront entièrement digitaux, réduisant les délais de 40% et augmentant la satisfaction client."},
    {id:3, num:"4", name:"Communiquer la vision", color:"#10B981", phase:"Engager & habiliter", desc:"Communiquer la vision via tous les canaux disponibles, de façon répétée et cohérente. Les leaders doivent vivre la vision.", exemple:"Intégrer la vision dans toutes les réunions, emails, présentations. Les leaders modèlent les comportements attendus."},
    {id:4, num:"5", name:"Lever les obstacles", color:"#10B981", phase:"Engager & habiliter", desc:"Identifier et supprimer les barrières : structures, systèmes, processus, comportements qui bloquent le changement.", exemple:"Modifier les systèmes d'évaluation de performance, former les managers résistants, ajuster les processus qui freinent."},
    {id:5, num:"6", name:"Victoires rapides", color:"#6366F1", phase:"Engager & habiliter", desc:"Générer des succès visibles à court terme pour démontrer la valeur du changement et maintenir la motivation.", exemple:"Identifier un projet pilote qui peut montrer des résultats concrets en 3-6 mois. Célébrer et communiquer largement."},
    {id:6, num:"7", name:"Consolider", color:"#6366F1", phase:"Ancrer le changement", desc:"Utiliser la crédibilité des premières victoires pour changer les systèmes, structures et politiques qui ne soutiennent pas la vision.", exemple:"Élargir le programme pilote, recruter et promouvoir des agents du changement, renforcer les succès avec de nouveaux projets."},
    {id:7, num:"8", name:"Ancrer dans la culture", color:"#8B5CF6", phase:"Ancrer le changement", desc:"Rendre le changement permanent en l'intégrant dans la culture organisationnelle, les normes et les valeurs.", exemple:"Intégrer les nouveaux comportements dans les critères d'embauche et d'évaluation. Raconter les histoires de succès."},
  ];

  const phases = [
    {name:"Créer le\nClimat", color:"#EF4444", steps:[0,1,2]},
    {name:"Engager &\nHabiliter", color:"#10B981", steps:[3,4,5]},
    {name:"Ancrer le\nChangement", color:"#8B5CF6", steps:[6,7]},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🏗️ Modèle de Kotter — 8 étapes du changement</div>
      <div className="schema-desc">John Kotter (Harvard). Le modèle de changement organisationnel le plus utilisé en entreprise. Séquentiel mais avec des itérations possibles.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
        {steps.map((s,i) => (
          <div key={s.id} onClick={() => setActive(active===s.id?null:s.id)}
            style={{background:active===s.id?s.color:`${s.color}15`,border:`1px solid ${active===s.id?s.color:`${s.color}30`}`,borderRadius:"var(--r-sm)",padding:"8px 10px",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:active===s.id?"rgba(255,255,255,0.2)":s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white",flexShrink:0}}>{s.num}</div>
            <div style={{fontSize:11,fontWeight:600,color:active===s.id?"white":s.color,lineHeight:1.3}}>{s.name}</div>
          </div>
        ))}
      </div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">Étape {steps[active].num} — {steps[active].name}</div>
          <div className="schema-info-body">
            <strong style={{color:"var(--indigo-l)"}}>Phase :</strong> {steps[active].phase}<br/><br/>
            {steps[active].desc}<br/><br/>
            <strong>Exemple concret :</strong> {steps[active].exemple}
          </div>
        </div>
      )}
      <RefList refs={[REFS.kotter, {ico:"🔗", text:"Kotter International — kotterinc.com", link:"https://www.kotterinc.com/methodology/8-steps/"}, {ico:"📖", text:"Kotter, J.P. (2014). Accelerate. Harvard Business Review Press", link:"https://hbr.org/2012/11/accelerate"}]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 12. CYCLE DE VIE : PRÉDICTIF vs AGILE vs HYBRIDE
// ═══════════════════════════════════════════════════
export function SchemaCycleVie() {
  const [active, setActive] = useState("predictif");
  const approaches = {
    predictif: {
      name:"Prédictif (Waterfall)", color:"#6366F1", ico:"📐",
      desc:"Toutes les phases sont définies dès le début. La livraison se fait à la fin. Idéal quand les exigences sont stables et bien connues.",
      quand:["Exigences claires et stables","Technologie maîtrisée","Contraintes réglementaires fortes","Projet de construction ou infrastructure"],
      avantages:["Planification claire et prévisible","Documentation complète","Gouvernance formelle","Coûts et délais prévisibles"],
      risques:["Découverte tardive des problèmes","Peu de flexibilité","Valeur livrée seulement à la fin","Inadapté aux changements"],
      phases:["Initiation","Planification","Exécution","Contrôle","Clôture"]
    },
    agile: {
      name:"Agile / Itératif", color:"#10B981", ico:"🌀",
      desc:"Livraisons fréquentes et incrementales. Feedback continu. Idéal quand les exigences évoluent et que la rapidité de mise sur le marché est cruciale.",
      quand:["Exigences évolutives ou inconnues","Innovation et créativité requises","Feedback client fréquent nécessaire","Équipe expérimentée en agile"],
      avantages:["Valeur livrée rapidement","Adaptation aux changements","Feedback continu","Détection précoce des problèmes"],
      risques:["Périmètre difficile à fixer","Documentation légère","Gouvernance moins formelle","Peut sembler moins prévisible"],
      phases:["Sprint 1","Sprint 2","Sprint 3","Sprint N","Release"]
    },
    hybride: {
      name:"Hybride", color:"#F59E0B", ico:"🔀",
      desc:"Combine les avantages des deux approches. Structure prédictive pour la gouvernance, agilité pour l'exécution. Le plus répandu en entreprise aujourd'hui.",
      quand:["Contraintes réglementaires + innovation","Équipes mixtes (agile + waterfall)","Projets complexes multi-phases","Transformation progressive vers l'agile"],
      avantages:["Flexibilité avec structure","Gouvernance satisfaite","Livraisons intermédiaires","Meilleur des deux mondes"],
      risques:["Complexité de coordination","Risque de Wagile (agile de façade)","Nécessite maturité organisationnelle","Gestion des interfaces délicate"],
      phases:["Planification","Sprint 1","Sprint 2","Intégration","Déploiement"]
    }
  };
  const a = approaches[active];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🔄 Cycles de vie — Prédictif vs Agile vs Hybride</div>
      <div className="schema-desc">Le choix de l'approche est une des décisions les plus importantes. Environ 50% des questions PMP portent sur Agile ou Hybride.</div>
      <div className="schema-tabs">
        {Object.entries(approaches).map(([key,val]) => (
          <button key={key} className={"schema-tab"+(active===key?" active":"")}
            onClick={() => setActive(key)} style={active===key?{background:val.color,borderColor:val.color}:{}}>
            {val.ico} {val.name.split(" ")[0]}
          </button>
        ))}
      </div>
      {/* Phases visuelles */}
      <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto"}}>
        {a.phases.map((p,i) => (
          <div key={i} style={{flex:1,minWidth:60,background:`${a.color}20`,border:`1px solid ${a.color}40`,borderRadius:"var(--r-sm)",padding:"6px 4px",textAlign:"center",fontSize:10,color:a.color,fontWeight:600}}>
            {active==="agile"?<div style={{fontSize:14,marginBottom:2}}>🔄</div>:null}
            {p}
          </div>
        ))}
      </div>
      <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginBottom:10}}>{a.desc}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.15)",borderRadius:"var(--r-sm)",padding:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--green-l)",marginBottom:6,textTransform:"uppercase"}}>✅ Avantages</div>
          {a.avantages.map((av,i) => <div key={i} style={{fontSize:11,color:"var(--text-2)",marginBottom:3}}>• {av}</div>)}
        </div>
        <div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"var(--r-sm)",padding:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#FCA5A5",marginBottom:6,textTransform:"uppercase"}}>⚠️ Risques</div>
          {a.risques.map((r,i) => <div key={i} style={{fontSize:11,color:"var(--text-2)",marginBottom:3}}>• {r}</div>)}
        </div>
      </div>
      <div style={{background:`${a.color}10`,border:`1px solid ${a.color}30`,borderRadius:"var(--r-sm)",padding:10}}>
        <div style={{fontSize:10,fontWeight:700,color:a.color,marginBottom:6,textTransform:"uppercase"}}>🎯 Quand choisir cette approche</div>
        {a.quand.map((q,i) => <div key={i} style={{fontSize:11,color:"var(--text-2)",marginBottom:3}}>• {q}</div>)}
      </div>
      <RefList refs={[REFS.pmbok7, REFS.agile, {ico:"📖", text:"Disciplined Agile Delivery — Scott Ambler & Mark Lines", link:"https://www.pmi.org/disciplined-agile"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 13. CÉRÉMONIES SCRUM
// ═══════════════════════════════════════════════════
export function SchemaScrum() {
  const [active, setActive] = useState(null);
  const ceremonies = [
    {id:"planning", name:"Sprint Planning", duration:"Max 8h (sprint 4 sem)", ico:"📋", color:"#6366F1", desc:"L'équipe planifie le travail du sprint. Sélection des items du Product Backlog, décomposition en tâches, estimation.", who:"Product Owner + Scrum Master + Development Team", output:"Sprint Backlog + Sprint Goal"},
    {id:"daily", name:"Daily Scrum", duration:"15 minutes (chaque jour)", ico:"⚡", color:"#10B981", desc:"Synchronisation quotidienne. 3 questions : Qu'ai-je fait hier ? Que vais-je faire aujourd'hui ? Y a-t-il des obstacles ?", who:"Development Team (Scrum Master facilite)", output:"Plan de la journée + Impediments identifiés"},
    {id:"review", name:"Sprint Review", duration:"Max 4h (sprint 4 sem)", ico:"🎯", color:"#F59E0B", desc:"Démonstration des fonctionnalités terminées (Done) aux parties prenantes. Feedback et adaptation du Product Backlog.", who:"Toute l'équipe Scrum + Parties prenantes", output:"Incrément livré + Product Backlog mis à jour"},
    {id:"retro", name:"Rétrospective", duration:"Max 3h (sprint 4 sem)", ico:"🔄", color:"#8B5CF6", desc:"L'équipe réfléchit sur son fonctionnement. Quoi améliorer ? Points positifs à renforcer ? Actions concrètes pour le prochain sprint.", who:"Scrum Master + Development Team (PO optionnel)", output:"Plan d'amélioration avec actions concrètes"},
    {id:"refinement", name:"Backlog Refinement", duration:"Max 10% du sprint", ico:"✏️", color:"#EF4444", desc:"Affinage du Product Backlog. Clarification des items, estimation, découpage des grandes stories. Prépare le prochain sprint.", who:"Product Owner + Development Team", output:"Product Backlog affiné + stories estimées"},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🌀 Cérémonies Scrum — Structure du Sprint</div>
      <div className="schema-desc">Scrum est basé sur 3 piliers : Transparence, Inspection, Adaptation. Les cérémonies sont timeboxées — respecter la timebox est non négociable.</div>
      {/* Timeline visuelle */}
      <div style={{position:"relative",margin:"12px 0",padding:"10px 0"}}>
        <div style={{position:"absolute",left:12,right:12,top:"50%",height:2,background:"rgba(99,102,241,0.2)",transform:"translateY(-50%)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
          {ceremonies.map(c => (
            <div key={c.id} onClick={() => setActive(active===c.id?null:c.id)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",width:50}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:active===c.id?c.color:`${c.color}30`,border:`2px solid ${c.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginBottom:4,transition:"all 0.2s",transform:active===c.id?"scale(1.2)":"scale(1)"}}>
                {c.ico}
              </div>
              <div style={{fontSize:8,textAlign:"center",color:active===c.id?c.color:"var(--slate-l)",fontWeight:active===c.id?700:400,lineHeight:1.3}}>{c.name.split(" ")[0]}<br/>{c.name.split(" ")[1]||""}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Sprint box */}
      <div style={{border:"2px dashed rgba(99,102,241,0.3)",borderRadius:"var(--r)",padding:10,marginBottom:10,textAlign:"center"}}>
        <div style={{fontSize:11,color:"var(--indigo-l)",fontWeight:700}}>🔄 Sprint (1-4 semaines)</div>
        <div style={{fontSize:10,color:"var(--slate-l)",marginTop:3}}>Durée fixe · Objectif défini · Incrément potentiellement livrable à la fin</div>
      </div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">{ceremonies.find(c=>c.id===active)?.ico} {ceremonies.find(c=>c.id===active)?.name}</div>
          <div className="schema-info-body">
            <strong style={{color:"var(--gold-l)"}}>⏱️ Durée :</strong> {ceremonies.find(c=>c.id===active)?.duration}<br/><br/>
            {ceremonies.find(c=>c.id===active)?.desc}<br/><br/>
            <strong>Participants :</strong> {ceremonies.find(c=>c.id===active)?.who}<br/>
            <strong style={{color:"var(--green-l)"}}>Output :</strong> {ceremonies.find(c=>c.id===active)?.output}
          </div>
        </div>
      )}
      <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.15)",borderRadius:"var(--r-sm)",padding:10,fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginTop:8}}>
        <strong style={{color:"var(--green-l)"}}>3 Piliers Scrum :</strong> 🔍 <strong>Transparence</strong> (tout visible) · 🔎 <strong>Inspection</strong> (examiner régulièrement) · 🔄 <strong>Adaptation</strong> (ajuster si nécessaire)
      </div>
      <RefList refs={[REFS.scrum, {ico:"🔗", text:"Scrum.org — What is Scrum?", link:"https://www.scrum.org/learning-series/what-is-scrum"}, REFS.agile, REFS.yt_scrum]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 14. CHEMIN CRITIQUE (CPM)
// ═══════════════════════════════════════════════════
export function SchemaCPM() {
  const [active, setActive] = useState(null);
  const nodes = [
    {id:"A", name:"A\nDébut", x:30, y:90, dur:0, es:0, ef:0, ls:0, lf:0, float:0, critical:true},
    {id:"B", name:"B\n5j", x:90, y:40, dur:5, es:0, ef:5, ls:3, lf:8, float:3, critical:false},
    {id:"C", name:"C\n8j", x:90, y:140, dur:8, es:0, ef:8, ls:0, lf:8, float:0, critical:true},
    {id:"D", name:"D\n4j", x:165, y:40, dur:4, es:5, ef:9, ls:8, lf:12, float:3, critical:false},
    {id:"E", name:"E\n6j", x:165, y:140, dur:6, es:8, ef:14, ls:8, lf:14, float:0, critical:true},
    {id:"F", name:"F\n3j", x:240, y:90, dur:3, es:14, ef:17, ls:14, lf:17, float:0, critical:true},
  ];
  const links = [
    {from:"A",to:"B",critical:false},{from:"A",to:"C",critical:true},
    {from:"B",to:"D",critical:false},{from:"C",to:"E",critical:true},
    {from:"D",to:"F",critical:false},{from:"E",to:"F",critical:true},
  ];
  const getNode = id => nodes.find(n=>n.id===id);

  return (
    <div className="schema-wrap">
      <div className="schema-title">📅 Chemin Critique (CPM) — Réseau d'activités</div>
      <div className="schema-desc">Le chemin critique détermine la durée minimale du projet. Toute activité sur le chemin critique (float=0) qui prend du retard retarde le projet entier.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 290 190" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
          <defs>
            <marker id="arrow-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#EF4444"/></marker>
            <marker id="arrow-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#64748B"/></marker>
          </defs>
          {/* Liens */}
          {links.map((l,i) => {
            const from = getNode(l.from), to = getNode(l.to);
            return <line key={i}
              x1={from.x+20} y1={from.y}
              x2={to.x-20} y2={to.y}
              stroke={l.critical?"#EF4444":"#64748B"}
              strokeWidth={l.critical?2.5:1.5}
              strokeDasharray={l.critical?undefined:"4,3"}
              markerEnd={l.critical?"url(#arrow-r)":"url(#arrow-g)"}
            />;
          })}
          {/* Noeuds */}
          {nodes.map(n => (
            <g key={n.id} onClick={() => setActive(active===n.id?null:n.id)} style={{cursor:"pointer"}}>
              <circle cx={n.x} cy={n.y} r={active===n.id?20:16}
                fill={n.critical?"rgba(239,68,68,0.2)":"rgba(99,102,241,0.15)"}
                stroke={n.critical?"#EF4444":"#6366F1"}
                strokeWidth={active===n.id?2.5:1.5}/>
              <text x={n.x} y={n.y-3} fill={n.critical?"#FCA5A5":"#A5B4FC"} fontSize="9" textAnchor="middle" fontWeight="700">{n.id}</text>
              {n.dur>0 && <text x={n.x} y={n.y+7} fill={n.critical?"#FCA5A5":"#A5B4FC"} fontSize="8" textAnchor="middle">{n.dur}j</text>}
            </g>
          ))}
          {/* Légende */}
          <line x1="10" y1="175" x2="40" y2="175" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrow-r)"/>
          <text x="45" y="179" fill="#FCA5A5" fontSize="8">Chemin critique (Float=0)</text>
          <line x1="10" y1="186" x2="40" y2="186" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-g)"/>
          <text x="45" y="190" fill="#94A3B8" fontSize="8">Chemin non critique</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur une activité pour les détails EVM</div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">Activité {active} {nodes.find(n=>n.id===active)?.critical?"🔴 CHEMIN CRITIQUE":"🔵 Non critique"}</div>
          <div className="schema-info-body">
            {(() => {const n=nodes.find(nd=>nd.id===active);return n?<>
              <strong>Durée :</strong> {n.dur} jours · <strong>ES :</strong> {n.es} · <strong>EF :</strong> {n.ef}<br/>
              <strong>LS :</strong> {n.ls} · <strong>LF :</strong> {n.lf} · <strong>Float (marge) :</strong> {n.float} jours<br/><br/>
              {n.critical?"🔴 Cette activité est sur le chemin critique. Float = 0. Tout retard ici retarde le projet entier.":"🔵 Cette activité a "+n.float+" jours de marge. Un retard inférieur à cette marge n'impacte pas la date de fin du projet."}
            </>:null;})()}
          </div>
        </div>
      )}
      <div style={{background:"rgba(99,102,241,0.06)",borderRadius:"var(--r-sm)",padding:10,fontSize:12,color:"var(--text-2)",lineHeight:1.7,marginTop:8}}>
        <strong style={{color:"var(--indigo-l)"}}>Formules clés :</strong><br/>
        Float = LS - ES = LF - EF<br/>
        Chemin critique = séquence avec Float = 0<br/>
        Durée projet = durée du chemin critique = 17 jours ici
      </div>
      <RefList refs={[REFS.pmbok7, {ico:"📄", text:"Kelley, J.E. & Walker, M.R. (1959). Critical-Path Planning and Scheduling", link:"https://en.wikipedia.org/wiki/Critical_path_method"}, REFS.yt_pmp]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 15. VUCA — CADRE DE RÉPONSE
// ═══════════════════════════════════════════════════
export function SchemaVUCA() {
  const [active, setActive] = useState(null);
  const elements = [
    {id:"V", letter:"V", name:"Volatile", color:"#EF4444", x:80, y:60,
     def:"Les changements surviennent rapidement et de façon imprévisible. Le monde change plus vite qu'on ne peut planifier.",
     exemples:"Disruption technologique rapide, instabilité des marchés, pandémie, changements réglementaires fréquents.",
     reponse:"VISION — Avoir une direction claire et stable même si le chemin change. Planification adaptative. Releases fréquentes."},
    {id:"U", letter:"U", name:"Uncertain", color:"#F59E0B", x:200, y:60,
     def:"Manque d'information pour prédire l'avenir. Les causes et effets ne sont pas clairs.",
     exemples:"Nouveau marché inexploré, technologie émergente, résultat d'une décision politique incertain.",
     reponse:"UNDERSTANDING — Collecter plus d'information. Prototypage. Tests utilisateurs. Recherche active. Réduire l'incertitude par l'expérimentation."},
    {id:"C", letter:"C", name:"Complex", color:"#6366F1", x:80, y:140,
     def:"Multiples facteurs interconnectés. Les décisions ont des effets imprévisibles sur le système entier.",
     exemples:"Projets de transformation organisationnelle, systèmes d'information complexes, projets multi-parties prenantes.",
     reponse:"CLARITY — Décomposer la complexité. Expérimenter (probe-sense-respond). Méthodes agiles. Prise de décision distribuée."},
    {id:"A", letter:"A", name:"Ambiguous", color:"#8B5CF6", x:200, y:140,
     def:"Situations qui peuvent être interprétées de multiples façons. Manque de clarté sur la réalité.",
     exemples:"Exigences client vagues, périmètre flou, indicateurs contradictoires, signaux faibles du marché.",
     reponse:"AGILITY — Prototyper pour clarifier. Poser des hypothèses et les tester. Impliquer les parties prenantes pour clarifier ensemble."},
  ];

  return (
    <div className="schema-wrap">
      <div className="schema-title">🌪️ Cadre VUCA — Naviguer l'incertitude</div>
      <div className="schema-desc">Acronyme militaire US (1987) adapté au management. Décrit les caractéristiques du monde moderne. Le PMBOK 7 est conçu pour répondre au monde VUCA.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 280 200" style={{width:"100%",maxWidth:460,display:"block",margin:"0 auto"}}>
          {/* Fond */}
          <rect x="10" y="10" width="120" height="85" fill="rgba(239,68,68,0.05)" rx="8"/>
          <rect x="140" y="10" width="130" height="85" fill="rgba(245,158,11,0.05)" rx="8"/>
          <rect x="10" y="105" width="120" height="85" fill="rgba(99,102,241,0.05)" rx="8"/>
          <rect x="140" y="105" width="130" height="85" fill="rgba(139,92,246,0.05)" rx="8"/>
          {/* Axes */}
          <line x1="10" y1="98" x2="270" y2="98" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="135" y1="10" x2="135" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          {/* Éléments */}
          {elements.map(e => (
            <g key={e.id} onClick={() => setActive(active===e.id?null:e.id)} style={{cursor:"pointer"}}>
              <circle cx={e.x} cy={e.y} r={active===e.id?28:22} fill={e.color} opacity={active===e.id?0.9:0.7}/>
              <text x={e.x} y={e.y-8} fill="white" fontSize="18" textAnchor="middle" fontWeight="900">{e.letter}</text>
              <text x={e.x} y={e.y+8} fill="white" fontSize="8" textAnchor="middle" fontWeight="600">{e.name}</text>
            </g>
          ))}
          {/* VUCA Prime labels */}
          <text x="70" y="22" fill="rgba(239,68,68,0.6)" fontSize="7" textAnchor="middle">→ Vision</text>
          <text x="200" y="22" fill="rgba(245,158,11,0.6)" fontSize="7" textAnchor="middle">→ Understanding</text>
          <text x="70" y="117" fill="rgba(99,102,241,0.6)" fontSize="7" textAnchor="middle">→ Clarity</text>
          <text x="200" y="117" fill="rgba(139,92,246,0.6)" fontSize="7" textAnchor="middle">→ Agility</text>
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur chaque lettre pour les détails</div>
      {active && (
        <div className="schema-info">
          <div className="schema-info-title">{elements.find(e=>e.id===active)?.letter} — {elements.find(e=>e.id===active)?.name}</div>
          <div className="schema-info-body">
            {elements.find(e=>e.id===active)?.def}<br/><br/>
            <strong>Exemples :</strong> {elements.find(e=>e.id===active)?.exemples}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Réponse VUCA Prime :</strong> {elements.find(e=>e.id===active)?.reponse}
          </div>
        </div>
      )}
      <RefList refs={[REFS.pmbok7, {ico:"📖", text:"Bennett, N. & Lemoine, G.J. (2014). What VUCA Really Means for You. Harvard Business Review", link:"https://hbr.org/2014/01/what-vuca-really-means-for-you"}, {ico:"📖", text:"Johansen, B. (2012). Leaders Make the Future. Berrett-Koehler", link:"https://www.iftf.org/"}]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 16. TORNADO CHART — ANALYSE DE SENSIBILITÉ
// ═══════════════════════════════════════════════════
export function SchemaTornado() {
  const [active, setActive] = useState(null);
  const risks = [
    {name:"Retard fournisseur", low:-45, high:60, color:"#EF4444"},
    {name:"Dépassement budget", low:-38, high:42, color:"#F59E0B"},
    {name:"Ressources manquantes", low:-30, high:35, color:"#F59E0B"},
    {name:"Risque technique", low:-25, high:28, color:"#6366F1"},
    {name:"Scope creep", low:-20, high:22, color:"#6366F1"},
    {name:"Risque qualité", low:-14, high:18, color:"#10B981"},
    {name:"Turnover équipe", low:-10, high:12, color:"#10B981"},
  ];
  const maxVal = 65;
  const centerX = 155;
  const barH = 18;

  return (
    <div className="schema-wrap">
      <div className="schema-title">🌪️ Tornado Chart — Analyse de sensibilité</div>
      <div className="schema-desc">Identifie les risques ayant le plus grand impact sur l'objectif (coût ou délai). Les risques en haut ont le plus grand écart → traiter en priorité.</div>
      <div className="schema-svg-wrap">
        <svg viewBox="0 0 310 170" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
          {/* Ligne centrale */}
          <line x1={centerX} y1="5" x2={centerX} y2="155" stroke="#94A3B8" strokeWidth="1.5"/>
          <text x={centerX} y="165" fill="#94A3B8" fontSize="8" textAnchor="middle">Valeur de base</text>
          {/* Labels axes */}
          <text x="50" y="165" fill="#10B981" fontSize="8" textAnchor="middle">← Impact négatif</text>
          <text x="250" y="165" fill="#EF4444" fontSize="8" textAnchor="middle">Impact positif →</text>
          {/* Barres */}
          {risks.map((r,i) => {
            const y = 10 + i * (barH + 4);
            const lowW = Math.abs(r.low) / maxVal * (centerX - 60);
            const highW = r.high / maxVal * (centerX - 60);
            const isActive = active === i;
            return (
              <g key={i} onClick={() => setActive(isActive?null:i)} style={{cursor:"pointer"}}>
                {/* Barre négative */}
                <rect x={centerX-lowW} y={y} width={lowW} height={barH} fill={r.color} opacity={isActive?1:0.7} rx="2"/>
                {/* Barre positive */}
                <rect x={centerX} y={y} width={highW} height={barH} fill={r.color} opacity={isActive?0.6:0.5} rx="2"/>
                {/* Label */}
                <text x={centerX-lowW-4} y={y+barH/2+4} fill="#94A3B8" fontSize="8" textAnchor="end">{r.name}</text>
                {/* Valeurs */}
                <text x={centerX-lowW+4} y={y+barH/2+4} fill="white" fontSize="7">{r.low}%</text>
                <text x={centerX+highW-4} y={y+barH/2+4} fill="white" fontSize="7" textAnchor="end">+{r.high}%</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="schema-hint">👆 Clique sur une barre pour les détails</div>
      {active !== null && (
        <div className="schema-info">
          <div className="schema-info-title">{risks[active]?.name}</div>
          <div className="schema-info-body">
            Impact négatif maximum : <strong style={{color:"#10B981"}}>{risks[active]?.low}%</strong> sur le budget/délai<br/>
            Impact positif maximum : <strong style={{color:"#EF4444"}}>+{risks[active]?.high}%</strong> sur le budget/délai<br/><br/>
            <strong>Priorité de traitement :</strong> Rang {active+1} sur {risks.length} — {active<3?"🔴 Priorité HAUTE — traiter immédiatement":active<5?"🟡 Priorité MOYENNE — plan de réponse requis":"🟢 Priorité FAIBLE — surveiller"}<br/><br/>
            <strong style={{color:"var(--indigo-l)"}}>Utilisation :</strong> Ce graphique est utilisé dans l'analyse quantitative des risques (Monte Carlo) pour identifier les variables ayant le plus d'impact sur l'objectif du projet.
          </div>
        </div>
      )}
      <RefList refs={[REFS.pmbok7, REFS.evm, {ico:"📄", text:"PMI Practice Standard for Project Risk Management", link:"https://www.pmi.org/pmbok-guide-standards/practice-guides/risk"}]}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// CATALOGUE COMPLET DES SCHÉMAS
// ═══════════════════════════════════════════════════
export const SCHEMA_CATALOG = [
  {id:"evm", group:"EVM & Mesure", name:"Courbe EVM (S-Curve)", ico:"📊", component:SchemaEVM, principles:["p4","d7"]},
  {id:"pareto", group:"EVM & Mesure", name:"Diagramme de Pareto", ico:"📉", component:SchemaPareto, principles:["p8"]},
  {id:"tornado", group:"EVM & Mesure", name:"Tornado Chart", ico:"🌪️", component:SchemaTornado, principles:["p10","d8"]},
  {id:"tuckman", group:"Leadership & Équipe", name:"Modèle Tuckman", ico:"🔀", component:SchemaTuckman, principles:["p2","d2"]},
  {id:"maslow", group:"Leadership & Équipe", name:"Pyramide Maslow", ico:"📈", component:SchemaMaslow, principles:["p6"]},
  {id:"hersey", group:"Leadership & Équipe", name:"Leadership situationnel", ico:"🧭", component:SchemaHersey, principles:["p6"]},
  {id:"herzberg", group:"Leadership & Équipe", name:"Modèle Herzberg", ico:"⚡", component:SchemaHerzberg, principles:["p6"]},
  {id:"cynefin", group:"Complexité & Risques", name:"Modèle Cynefin", ico:"🧠", component:SchemaCynefin, principles:["p9","d8"]},
  {id:"riskmatrix", group:"Complexité & Risques", name:"Matrice P/I Risques", ico:"🎲", component:SchemaRiskMatrix, principles:["p10"]},
  {id:"vuca", group:"Complexité & Risques", name:"Cadre VUCA", ico:"🌪️", component:SchemaVUCA, principles:["p11","d8"]},
  {id:"powerinterest", group:"Parties prenantes", name:"Matrice Pouvoir/Intérêt", ico:"🔵", component:SchemaPowerInterest, principles:["p3","d1"]},
  {id:"adkar", group:"Changement", name:"Modèle ADKAR", ico:"📋", component:SchemaADKAR, principles:["p12"]},
  {id:"kotter", group:"Changement", name:"8 Étapes Kotter", ico:"🏗️", component:SchemaKotter, principles:["p12"]},
  {id:"cyclevie", group:"Approches & Cycles", name:"Prédictif vs Agile vs Hybride", ico:"🔄", component:SchemaCycleVie, principles:["p7","d3"]},
  {id:"scrum", group:"Approches & Cycles", name:"Cérémonies Scrum", ico:"🌀", component:SchemaScrum, principles:["p7","d3"]},
  {id:"cpm", group:"Approches & Cycles", name:"Chemin Critique (CPM)", ico:"📅", component:SchemaCPM, principles:["d4"]},
];

// ═══════════════════════════════════════════════════
// PAGE VISUELS — CATALOGUE COMPLET
// ═══════════════════════════════════════════════════
export function PageVisuels() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [activeSchema, setActiveSchema] = useState(null);

  const groups = ["all", ...new Set(SCHEMA_CATALOG.map(s=>s.group))];
  const filtered = activeGroup === "all" ? SCHEMA_CATALOG : SCHEMA_CATALOG.filter(s=>s.group===activeGroup);
  const ActiveComp = activeSchema ? SCHEMA_CATALOG.find(s=>s.id===activeSchema)?.component : null;

  return (
    <div>
      <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:10,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:6}}>Apprentissage visuel</div>
      <div style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,marginBottom:6}}>Schémas & Visuels 📐</div>
      <div style={{fontSize:13,color:"var(--text-2)",lineHeight:1.65,marginBottom:16}}>16 schémas interactifs avec explications détaillées, références bibliographiques et liens vers des ressources fiables.</div>

      {activeSchema ? (
        <div>
          <button onClick={() => setActiveSchema(null)}
            style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"1px solid var(--border2)",color:"var(--slate-l)",padding:"7px 14px",borderRadius:"var(--r-sm)",cursor:"pointer",fontFamily:"Plus Jakarta Sans,sans-serif",fontSize:12,marginBottom:14}}>
            ← Retour au catalogue
          </button>
          {ActiveComp && <ActiveComp />}
        </div>
      ) : (
        <>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,overflowX:"auto"}}>
            {groups.map(g => (
              <button key={g} className={"ftab"+(activeGroup===g?" active":"")} onClick={() => setActiveGroup(g)}>
                {g==="all"?"Tous":g}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.map(s => (
              <button key={s.id} onClick={() => setActiveSchema(s.id)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:"var(--r)",cursor:"pointer",textAlign:"left",fontFamily:"Plus Jakarta Sans,sans-serif",color:"var(--text)",transition:"all 0.2s",width:"100%"}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.ico}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{s.name}</div>
                  <div style={{fontSize:11,color:"var(--slate-l)"}}>{s.group}</div>
                </div>
                <div style={{color:"var(--indigo-l)",fontSize:14}}>→</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
