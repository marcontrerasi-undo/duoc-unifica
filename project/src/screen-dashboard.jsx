// src/screen-dashboard.jsx — Dashboard unificado → window.DashboardScreen
const { useState: useStateDash } = React;

function DashboardScreen({ student, onNavigate, onOpenSearch, notifications, onDismiss, onCourse }) {
  const { Icon, Card, Badge, Button, CourseGlyph, Progress, URGENCY } = window;
  const { COURSES, CALENDAR, QUICK_ACTIONS } = window.DATA;
  const [filterUrgent, setFilterUrgent] = useStateDash(false);

  const order = { alta: 0, media: 1, baja: 2 };
  const visibleNotifs = [...notifications]
    .filter((n) => (filterUrgent ? n.urgencia === 'alta' : true))
    .sort((a, b) => order[a.urgencia] - order[b.urgencia]);
  const altas = notifications.filter((n) => n.urgencia === 'alta').length;

  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Saludo */}
      <header className="anim-fade-up flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-muted font-medium text-[14px]">{saludo},</p>
          <h1 className="font-display font-extrabold tracking-tight text-ink text-[clamp(1.7rem,4vw,2.4rem)] leading-tight">{student.primerNombre} 👋</h1>
          <p className="text-faint text-[13.5px] mt-1 font-medium">{student.carrera} · {student.semestre} · {student.sede}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatChip icon="trending" label="Avance carrera" value={`${student.avance}%`} tone="primary" />
          <StatChip icon="award" label="Promedio" value="6,0" tone="ok" />
          <StatChip icon="clock" label="Pendientes" value="4" tone="medium" />
        </div>
      </header>

      {/* Búsqueda global */}
      <button data-tour="tour-search" onClick={onOpenSearch}
        className="anim-fade-up w-full flex items-center gap-3 h-14 px-5 rounded-2xl bg-surface border border-line shadow-card text-left hover:shadow-float hover:border-primary/40 transition-all duration-300 mb-7 group"
        style={{ animationDelay: '.05s' }}>
        <Icon name="search" size={21} className="text-primary" />
        <span className="text-faint text-[15px] font-medium flex-1">Busca cursos, trámites, recursos o personas…</span>
        <span className="hidden sm:flex items-center gap-1 text-[12px] font-bold text-faint px-2 py-1 rounded-lg bg-surface-2 border border-line">⌘K</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cursos */}
          <section data-tour="tour-courses" className="anim-fade-up" style={{ animationDelay: '.1s' }}>
            <SectionHead icon="book" title="Mis cursos" sub="Semestre en curso" action="Ver todos" onAction={() => onNavigate('cursos')} />
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {COURSES.map((c, i) => (
                <Card key={c.id} hover pad={false} onClick={() => onCourse(c.id)} className="p-4 group anim-fade-up" style={{ animationDelay: `${.12 + i * .04}s` }}>
                  <div className="flex items-start gap-3.5">
                    <CourseGlyph course={c} size={50} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-bold tracking-wide text-faint">{c.sigla} · {c.seccion}</span>
                        {c.nuevos > 0 && <Badge tone="high">{c.nuevos} nuevo{c.nuevos > 1 ? 's' : ''}</Badge>}
                      </div>
                      <h3 className="font-display font-bold text-ink text-[15px] leading-snug mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">{c.nombre}</h3>
                      <p className="text-faint text-[12.5px] mt-1 flex items-center gap-1.5"><Icon name="user" size={13} /> {c.docente}</p>
                    </div>
                  </div>
                  <div className="mt-3.5">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-muted mb-1.5">
                      <span>Progreso del curso</span><span style={{ color: c.color }}>{c.progreso}%</span>
                    </div>
                    <Progress value={c.progreso} color={c.color} />
                  </div>
                  <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-muted flex items-center gap-1.5"><Icon name="calendar" size={14} className="text-faint" /> {c.proxima}</span>
                    {c.tareasPendientes > 0
                      ? <Badge tone="medium" icon="clock">{c.tareasPendientes} por entregar</Badge>
                      : <Badge tone="ok" icon="check">Al día</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Trámites rápidos */}
          <section className="anim-fade-up" style={{ animationDelay: '.18s' }}>
            <SectionHead icon="grid" title="Trámites rápidos" sub="Lo administrativo, sin salir de aquí" action="Centro de ayuda" onAction={() => onNavigate('ayuda')} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {QUICK_ACTIONS.map((q) => (
                <button key={q.id} onClick={() => onNavigate('ayuda')}
                  className={`relative flex flex-col gap-2.5 p-4 rounded-2xl border text-left transition-all duration-300 active:scale-[.98] hover:-translate-y-0.5 focus-ring ${q.destacado ? 'bg-primary text-white border-transparent shadow-card' : 'bg-surface border-line hover:shadow-card'}`}
                  style={{ minHeight: 44 }}>
                  <div className={`grid place-items-center rounded-xl ${q.destacado ? 'bg-white/15' : 'bg-primary-soft'}`} style={{ width: 38, height: 38 }}>
                    <Icon name={q.icon} size={19} className={q.destacado ? 'text-white' : 'text-primary'} />
                  </div>
                  <div>
                    <div className={`text-[10.5px] font-bold tracking-wide uppercase ${q.destacado ? 'text-white/70' : 'text-faint'}`}>{q.categoria}</div>
                    <div className={`text-[13.5px] font-semibold leading-snug mt-0.5 ${q.destacado ? 'text-white' : 'text-ink'}`}>{q.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Notificaciones */}
          <section data-tour="tour-notifs" className="anim-fade-up" style={{ animationDelay: '.14s' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-ink text-[17px] flex items-center gap-2"><Icon name="bell" size={18} className="text-primary" /> Notificaciones</h2>
                {altas > 0 && <Badge tone="high">{altas} urgente{altas > 1 ? 's' : ''}</Badge>}
              </div>
              <button onClick={() => setFilterUrgent((v) => !v)} className={`text-[12px] font-bold px-2.5 py-1.5 rounded-lg transition-all ${filterUrgent ? 'bg-high-soft text-high' : 'text-faint hover:bg-surface-2'}`} style={{ minHeight: 32 }}>
                {filterUrgent ? 'Ver todas' : 'Solo urgentes'}
              </button>
            </div>
            <div className="space-y-2.5">
              {visibleNotifs.length === 0 && (
                <Card className="text-center py-8"><Icon name="checkCircle" size={30} className="text-[var(--ok)] mx-auto" /><p className="text-muted text-[14px] font-medium mt-2">¡Todo al día!</p></Card>
              )}
              {visibleNotifs.map((n) => {
                const u = URGENCY[n.urgencia];
                return (
                  <div key={n.id} className="group relative bg-surface border border-line rounded-2xl p-3.5 shadow-card hover:shadow-float transition-all duration-300 anim-fade-up overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: u.color }}></div>
                    <div className="flex items-start gap-3 pl-1.5">
                      <div className="grid place-items-center rounded-xl shrink-0 mt-0.5" style={{ width: 34, height: 34, background: `color-mix(in srgb, ${u.color} 14%, transparent)` }}>
                        <Icon name={u.icon} size={16} style={{ color: u.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5 min-w-0">
                          <span className="text-[10.5px] font-bold tracking-wide uppercase whitespace-nowrap" style={{ color: u.color }}>{n.tipo}</span>
                          <span className="text-faint text-[11px] whitespace-nowrap truncate">· {n.tiempo}</span>
                        </div>
                        <p className="text-ink font-semibold text-[13.5px] leading-snug">{n.titulo}</p>
                        <p className="text-muted text-[12.5px] leading-snug mt-1 line-clamp-2">{n.detalle}</p>
                        <button onClick={() => n.curso ? onCourse(n.curso) : onNavigate('ayuda')} className="mt-2 text-[12.5px] font-bold text-primary inline-flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap">
                          {n.accion} <Icon name="arrowRight" size={13} />
                        </button>
                      </div>
                      <button onClick={() => onDismiss(n.id)} aria-label="Descartar" className="opacity-0 group-hover:opacity-100 transition-opacity text-faint hover:text-high grid place-items-center rounded-lg hover:bg-high-soft shrink-0" style={{ width: 28, height: 28 }}>
                        <Icon name="close" size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Calendario unificado */}
          <section data-tour="tour-calendar" className="anim-fade-up" style={{ animationDelay: '.2s' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-ink text-[17px] flex items-center gap-2"><Icon name="calendar" size={18} className="text-primary" /> Agenda</h2>
              <span className="text-[12px] font-semibold text-faint">Junio 2026</span>
            </div>
            <Card pad={false} className="p-4">
              <div className="space-y-4">
                {CALENDAR.map((day) => (
                  <div key={day.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10.5px] font-bold tracking-wide px-2 py-0.5 rounded-md ${day.dia === 'HOY' ? 'bg-primary text-white' : 'bg-surface-2 text-faint'}`}>{day.dia}</span>
                      <span className="text-[12px] font-semibold text-muted">{day.fecha}</span>
                    </div>
                    <div className="space-y-2 pl-1">
                      {day.items.map((it, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="text-[12px] font-bold text-muted tabular-nums pt-0.5 w-11 shrink-0">{it.hora}</div>
                          <div className="relative pl-3.5 flex-1 min-w-0">
                            <span className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ background: it.color }}></span>
                            <p className="text-ink font-semibold text-[13px] leading-snug">{it.titulo}</p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-faint text-[11.5px] font-medium">{it.lugar}</span>
                              {it.alerta && <Badge tone={it.tipo === 'evaluacion' ? 'high' : 'medium'}>{it.alerta}</Badge>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatChip({ icon, label, value, tone }) {
  const { Icon } = window;
  const colors = { primary: 'var(--primary)', ok: 'var(--ok)', medium: 'var(--medium)' };
  return (
    <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface border border-line shadow-card">
      <div className="grid place-items-center rounded-lg" style={{ width: 32, height: 32, background: `color-mix(in srgb, ${colors[tone]} 13%, transparent)` }}>
        <Icon name={icon} size={16} style={{ color: colors[tone] }} />
      </div>
      <div className="leading-none">
        <div className="text-[16px] font-display font-extrabold text-ink">{value}</div>
        <div className="text-[10.5px] font-semibold text-faint mt-0.5 whitespace-nowrap">{label}</div>
      </div>
    </div>
  );
}

function SectionHead({ icon, title, sub, action, onAction }) {
  const { Icon } = window;
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="font-display font-bold text-ink text-[18px] flex items-center gap-2"><Icon name={icon} size={19} className="text-primary" /> {title}</h2>
        {sub && <p className="text-faint text-[12.5px] font-medium mt-0.5 ml-7">{sub}</p>}
      </div>
      {action && <button onClick={onAction} className="text-[13px] font-bold text-primary inline-flex items-center gap-1 hover:gap-1.5 transition-all shrink-0">{action} <Icon name="arrowRight" size={14} /></button>}
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
