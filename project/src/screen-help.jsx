// src/screen-help.jsx — Centro de ayuda unificado → window.HelpScreen
const { useState: useStateHelp } = React;

function HelpScreen({ onNavigate }) {
  const { Icon, Card, Badge, Button } = window;
  const { HELP_CATEGORIES, HELP_POPULAR, SERVICE_STATUS } = window.DATA;
  const [q, setQ] = useStateHelp('');
  const [active, setActive] = useStateHelp(null);

  const filtered = HELP_POPULAR.filter((p) => p.toLowerCase().includes(q.toLowerCase()));
  const statusTone = { operativo: 'ok', degradado: 'medium', caido: 'high' };
  const statusLabel = { operativo: 'Operativo', degradado: 'Intermitente', caido: 'No disponible' };
  const anyIssue = SERVICE_STATUS.some((s) => s.estado !== 'operativo');

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Hero ayuda */}
      <div className="anim-fade-up relative rounded-3xl overflow-hidden p-7 sm:p-10 text-white mb-6" style={{ background: 'linear-gradient(140deg, #0e4fb8 0%, #0c3f93 100%)' }}>
        <div className="absolute inset-0 opacity-[0.13]" style={{ backgroundImage: 'repeating-linear-gradient(125deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)' }}></div>
        <div className="absolute -right-12 -top-16 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: .45 }}></div>
        <div className="relative z-10 max-w-2xl">
          <Badge tone="accent"><Icon name="sparkle" size={13} strokeWidth={2.2} /> Centro de ayuda</Badge>
          <h1 className="font-display font-extrabold text-[clamp(1.7rem,4vw,2.5rem)] leading-tight tracking-tight mt-3">¿En qué te ayudamos hoy?</h1>
          <p className="text-white/80 text-[15px] mt-2">Guías rápidas, trámites y soporte directo. Todo en un solo lugar.</p>
          <div className="mt-5 flex items-center gap-3 h-14 px-5 rounded-2xl bg-white shadow-float">
            <Icon name="search" size={21} className="text-primary" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Describe tu problema o busca un trámite…" className="flex-1 bg-transparent outline-none text-ink text-[15px] font-medium placeholder:text-faint" style={{ color: 'var(--text)' }} />
          </div>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {q && (
        <Card className="mb-6 anim-fade-in">
          <p className="text-[12.5px] font-bold text-faint uppercase tracking-wide mb-2">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          <div className="space-y-1">
            {filtered.length === 0 && <p className="text-muted text-[14px] py-2">No encontramos coincidencias. Prueba con otras palabras o contacta al chat de soporte.</p>}
            {filtered.map((p, i) => (
              <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-2 text-left transition-colors" style={{ minHeight: 44 }}>
                <Icon name="file" size={17} className="text-primary shrink-0" />
                <span className="text-ink font-medium text-[14px] flex-1">{p}</span>
                <Icon name="arrowRight" size={16} className="text-faint" />
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Categorías */}
          <section className="anim-fade-up">
            <h2 className="font-display font-bold text-ink text-[18px] mb-4">Explora por categoría</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {HELP_CATEGORIES.map((cat, i) => (
                <button key={cat.id} onClick={() => setActive(active === cat.id ? null : cat.id)}
                  className="text-left bg-surface border border-line rounded-2xl p-4 shadow-card hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 group anim-fade-up" style={{ animationDelay: `${i * .04}s`, minHeight: 44 }}>
                  <div className="flex items-start gap-3.5">
                    <div className="grid place-items-center rounded-xl shrink-0 transition-transform group-hover:scale-105" style={{ width: 44, height: 44, background: `color-mix(in srgb, ${cat.color} 13%, transparent)` }}>
                      <Icon name={cat.icon} size={21} style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-ink text-[15px] group-hover:text-primary transition-colors">{cat.titulo}</h3>
                      <p className="text-faint text-[12.5px] leading-snug mt-0.5">{cat.desc}</p>
                      <span className="inline-block text-[11.5px] font-bold text-muted mt-2">{cat.articulos} guías →</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Preguntas frecuentes */}
          <section className="anim-fade-up">
            <h2 className="font-display font-bold text-ink text-[18px] mb-3">Preguntas frecuentes</h2>
            <Card pad={false}>
              <div className="divide-y divide-[var(--border)]">
                {HELP_POPULAR.map((p, i) => (
                  <FaqRow key={i} q={p} />
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Lateral: soporte + estado */}
        <div className="space-y-6">
          <Card className="anim-fade-up bg-primary text-white border-transparent" style={{ background: 'var(--primary)' }}>
            <div className="grid place-items-center rounded-2xl bg-white/15 mb-3" style={{ width: 48, height: 48 }}><Icon name="chat" size={24} /></div>
            <h3 className="font-display font-extrabold text-[18px]">Chatea con soporte</h3>
            <p className="text-white/80 text-[13.5px] leading-relaxed mt-1">Atención en línea de lunes a viernes, 08:00 a 22:00. Tiempo de respuesta promedio: 4 min.</p>
            <button className="mt-4 w-full h-12 rounded-xl bg-white text-primary font-bold text-[14px] flex items-center justify-center gap-2 hover:brightness-95 transition-all active:scale-[.98]" style={{ minHeight: 44 }}>
              <Icon name="chat" size={18} /> Iniciar conversación
            </button>
            <div className="flex items-center gap-2 mt-3 text-white/75 text-[12px] font-medium justify-center">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span> 3 agentes en línea ahora
            </div>
          </Card>

          {/* Estado de servicios */}
          <Card className="anim-fade-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-ink text-[15px]">Estado de servicios</h3>
              <Badge tone={anyIssue ? 'medium' : 'ok'} icon={anyIssue ? 'alert' : 'checkCircle'}>{anyIssue ? 'Incidencia' : 'Todo OK'}</Badge>
            </div>
            <div className="space-y-2.5">
              {SERVICE_STATUS.map((s) => (
                <div key={s.servicio} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.estado === 'operativo' ? 'var(--ok)' : s.estado === 'degradado' ? 'var(--medium)' : 'var(--high)' }}></span>
                  <span className="text-ink text-[13.5px] font-medium flex-1">{s.servicio}</span>
                  <span className="text-[11.5px] font-bold" style={{ color: s.estado === 'operativo' ? 'var(--ok)' : s.estado === 'degradado' ? 'var(--medium)' : 'var(--high)' }}>{statusLabel[s.estado]}</span>
                </div>
              ))}
            </div>
            <p className="text-faint text-[11.5px] mt-3 pt-3 border-t border-line">Actualizado hace 2 min · Notificaremos cualquier cambio.</p>
          </Card>

          <Card className="anim-fade-up">
            <h3 className="font-display font-bold text-ink text-[15px] mb-2">Otros canales</h3>
            <div className="space-y-1">
              {[{ i: 'mail', t: 'soporte@duocuc.cl' }, { i: 'pin', t: 'Punto estudiantil · Sede' }, { i: 'globe', t: 'Reglamentos y normativa' }].map((c) => (
                <button key={c.t} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-2 transition-colors text-left" style={{ minHeight: 44 }}>
                  <Icon name={c.i} size={17} className="text-primary" /><span className="text-ink text-[13.5px] font-medium flex-1">{c.t}</span><Icon name="chevronRight" size={15} className="text-faint" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FaqRow({ q }) {
  const { Icon } = window;
  const [open, setOpen] = useStateHelp(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface-2 transition-colors" style={{ minHeight: 44 }}>
        <Icon name="support" size={18} className="text-primary shrink-0" />
        <span className="text-ink font-semibold text-[14px] flex-1">{q}</span>
        <Icon name="chevronDown" size={17} className={`text-faint shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pl-[52px] anim-fade-in">
          <p className="text-muted text-[13.5px] leading-relaxed">Sigue la guía paso a paso desde tu panel. Si el problema persiste, inicia una conversación con el equipo de soporte y te ayudaremos en minutos.</p>
          <button className="mt-2 text-[12.5px] font-bold text-primary flex items-center gap-1">Ver guía completa <Icon name="arrowRight" size={13} /></button>
        </div>
      )}
    </div>
  );
}

window.HelpScreen = HelpScreen;
