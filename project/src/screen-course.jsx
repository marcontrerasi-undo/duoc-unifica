// src/screen-course.jsx — Detalle de curso re-imaginado → window.CourseScreen
const { useState: useStateCourse } = React;

function buildContent(course) {
  const preset = window.DATA.COURSE_CONTENT[course.id];
  if (preset) return preset;
  return {
    descripcion: `Material y actividades de ${course.nombre}. Accede a recursos, entregas y calificaciones desde un solo lugar.`,
    modulos: [
      { id: 'm0', tipo: 'info', titulo: 'Información de la Asignatura', sub: 'Syllabus y programa', estado: 'Disponible', items: 3 },
      { id: 'm1', tipo: 'experiencia', titulo: 'EA 1 · Fundamentos', sub: '4 recursos · 1 actividad', estado: 'En curso', progreso: 50, items: 5, activo: true },
      { id: 'm2', tipo: 'experiencia', titulo: 'EA 2 · Aplicación', sub: '5 recursos · 1 actividad', estado: 'Disponible', progreso: 0, items: 6 },
    ],
    notas: [
      { eval: 'EA 1', nota: course.promedio, pond: '40%' },
      { eval: 'EA 2', nota: null, pond: '30%' },
      { eval: 'Examen', nota: null, pond: '30%' },
    ],
  };
}

const RESOURCE_ICONS = { info: 'doc', experiencia: 'book', evaluacion: 'award' };
const ESTADO_TONE = { 'Completado': 'ok', 'Revisado': 'ok', 'En curso': 'primary', 'Disponible': 'neutral', 'Bloqueado': 'neutral' };

function CourseScreen({ courseId, onBack, onNavigate }) {
  const { Icon, Card, Badge, Button, Progress, CourseGlyph } = window;
  const course = window.DATA.COURSES.find((c) => c.id === courseId) || window.DATA.COURSES[0];
  const content = buildContent(course);
  const [tab, setTab] = useStateCourse('contenido');
  const [openMod, setOpenMod] = useStateCourse(content.modulos.find((m) => m.activo)?.id || content.modulos[0].id);

  const tabs = [
    { id: 'contenido', label: 'Contenido', icon: 'book' },
    { id: 'notas', label: 'Calificaciones', icon: 'award' },
    { id: 'foro', label: 'Foro y anuncios', icon: 'chat' },
  ];

  const sampleResources = [
    { icon: 'video', t: 'Videocápsula introductoria', d: '8 min · Visto', done: true },
    { icon: 'file', t: 'Lectura: modelos de servicio', d: 'PDF · 12 págs.' },
    { icon: 'link', t: 'Recurso interactivo externo', d: 'Enlace · 15 min' },
    { icon: 'award', t: 'Actividad evaluada EA 2', d: 'Entrega hasta el 10 jun · 23:59', cta: true },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[13.5px] font-bold text-muted hover:text-primary transition-colors mb-4" style={{ minHeight: 40 }}>
        <Icon name="chevronLeft" size={16} /> Volver al inicio
      </button>

      {/* Banner re-imaginado (reemplaza el banner oscuro legacy) */}
      <div className="anim-fade-up relative rounded-3xl overflow-hidden p-6 sm:p-8 text-white mb-6" style={{ background: `linear-gradient(135deg, ${course.color} 0%, color-mix(in srgb, ${course.color} 70%, #0a1530) 100%)` }}>
        <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'repeating-linear-gradient(125deg, #fff 0, #fff 1px, transparent 1px, transparent 20px)' }}></div>
        <div className="absolute -right-10 -bottom-16 w-56 h-56 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[11.5px] font-bold" style={{ background: 'rgba(255,255,255,0.18)' }}>{course.sigla}</span>
            <span className="px-2.5 py-1 rounded-full text-[11.5px] font-bold" style={{ background: 'rgba(255,255,255,0.18)' }}>Sección {course.seccion}</span>
            <span className="px-2.5 py-1 rounded-full text-[11.5px] font-bold" style={{ background: 'rgba(255,255,255,0.18)' }}>{course.proxima}</span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.6rem,4vw,2.3rem)] leading-tight tracking-tight max-w-2xl">{course.nombre}</h1>
          <p className="text-white/85 text-[14.5px] mt-2 max-w-xl leading-relaxed">{content.descripcion}</p>
          <div className="flex items-center gap-4 mt-5 flex-wrap">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold"><Icon name="user" size={16} /> {course.docente}</div>
            <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-xs">
              <span className="text-[12.5px] font-bold whitespace-nowrap">{course.progreso}% completado</span>
              <div className="flex-1"><Progress value={course.progreso} color="#fff" track="rgba(255,255,255,0.25)" height={6} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-surface border border-line shadow-card mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 h-11 rounded-xl text-[14px] font-semibold whitespace-nowrap transition-all ${tab === t.id ? 'bg-primary text-white shadow-card' : 'text-muted hover:bg-surface-2 hover:text-ink'}`} style={{ minHeight: 44 }}>
            <Icon name={t.icon} size={17} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'contenido' && (
        <div className="grid lg:grid-cols-3 gap-6 anim-fade-in">
          <div className="lg:col-span-2 space-y-3">
            {content.modulos.map((m, i) => {
              const open = openMod === m.id;
              const locked = m.estado === 'Bloqueado';
              return (
                <div key={m.id} className={`bg-surface border rounded-2xl shadow-card overflow-hidden transition-all anim-fade-up ${open ? 'border-primary/40' : 'border-line'}`} style={{ animationDelay: `${i * .05}s` }}>
                  <button onClick={() => !locked && setOpenMod(open ? null : m.id)} disabled={locked}
                    className={`w-full flex items-center gap-3.5 p-4 text-left transition-colors ${locked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-surface-2'}`}>
                    <div className="grid place-items-center rounded-xl shrink-0" style={{ width: 42, height: 42, background: open ? 'var(--primary)' : 'var(--primary-soft)' }}>
                      <Icon name={locked ? 'lock' : RESOURCE_ICONS[m.tipo]} size={19} className={open ? 'text-white' : 'text-primary'} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-ink text-[15px] leading-snug">{m.titulo}</h3>
                        <Badge tone={ESTADO_TONE[m.estado]}>{m.estado}</Badge>
                      </div>
                      <p className="text-faint text-[12.5px] mt-0.5">{m.sub}</p>
                      {typeof m.progreso === 'number' && m.progreso > 0 && (
                        <div className="mt-2 max-w-[200px]"><Progress value={m.progreso} color={course.color} height={5} /></div>
                      )}
                    </div>
                    {!locked && <Icon name="chevronDown" size={18} className={`text-faint shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />}
                  </button>
                  {open && !locked && (
                    <div className="px-4 pb-4 anim-fade-in">
                      <div className="space-y-2 pt-1">
                        {sampleResources.map((r, idx) => (
                          <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-primary/40 cursor-pointer group ${r.cta ? 'bg-medium-soft border-transparent' : 'bg-surface-2 border-line'}`}>
                            <div className="grid place-items-center rounded-lg bg-surface shrink-0" style={{ width: 34, height: 34 }}>
                              <Icon name={r.icon} size={16} className={r.cta ? 'text-medium' : 'text-primary'} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-ink font-semibold text-[13.5px] leading-snug">{r.t}</p>
                              <p className="text-faint text-[12px]">{r.d}</p>
                            </div>
                            {r.done ? <Icon name="checkCircle" size={18} className="text-[var(--ok)]" /> : r.cta ? <Button size="sm" variant="accent">Entregar</Button> : <Icon name="chevronRight" size={16} className="text-faint group-hover:translate-x-0.5 transition-transform" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Lateral del curso */}
          <div className="space-y-4">
            <Card>
              <h3 className="font-display font-bold text-ink text-[15px] mb-3">Accesos del curso</h3>
              <div className="space-y-1.5">
                {[{ i: 'doc', t: 'Syllabus' }, { i: 'users', t: 'Compañeros y grupos' }, { i: 'chat', t: 'Foro de dudas' }, { i: 'award', t: 'Mis calificaciones' }].map((a) => (
                  <button key={a.t} onClick={() => a.t.includes('calific') && setTab('notas')} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-2 transition-colors text-left" style={{ minHeight: 44 }}>
                    <Icon name={a.i} size={18} className="text-primary" />
                    <span className="text-ink font-semibold text-[13.5px] flex-1">{a.t}</span>
                    <Icon name="chevronRight" size={16} className="text-faint" />
                  </button>
                ))}
              </div>
            </Card>
            <Card className="bg-primary-soft border-transparent">
              <div className="flex items-center gap-2 mb-1.5"><Icon name="support" size={18} className="text-primary" /><h3 className="font-display font-bold text-ink text-[15px]">¿Trámite del ramo?</h3></div>
              <p className="text-muted text-[13px] leading-relaxed">Solicita certificados, justifica inasistencias o revisa tu asistencia sin cambiar de plataforma.</p>
              <Button size="sm" variant="primary" full className="mt-3" iconRight="arrowRight" onClick={() => onNavigate('ayuda')}>Ir a trámites</Button>
            </Card>
          </div>
        </div>
      )}

      {tab === 'notas' && (
        <Card className="anim-fade-in" pad={false}>
          <div className="p-5 border-b border-line flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-display font-bold text-ink text-[16px]">Calificaciones</h3>
            <div className="flex items-center gap-2 text-[13px]"><span className="text-muted font-medium">Promedio actual</span><span className="font-display font-extrabold text-[20px]" style={{ color: course.color }}>{course.promedio?.toFixed(1)}</span></div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {content.notas.map((n, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4">
                <div className="grid place-items-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: n.nota ? 'color-mix(in srgb, var(--ok) 12%, transparent)' : 'var(--surface-2)' }}>
                  <Icon name={n.nota ? 'check' : 'clock'} size={18} style={{ color: n.nota ? 'var(--ok)' : 'var(--text-faint)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ink font-semibold text-[14px]">{n.eval}</p>
                  <p className="text-faint text-[12px]">Ponderación {n.pond}</p>
                </div>
                {n.nota ? <span className="font-display font-extrabold text-[22px] text-ink tabular-nums">{n.nota.toFixed(1)}</span> : <Badge tone="neutral">Pendiente</Badge>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'foro' && (
        <div className="anim-fade-in space-y-3">
          {[{ a: 'Rodrigo Maldonado', r: 'Docente', t: 'Material complementario EA 2', d: 'Recuerden revisar la lectura sobre modelos IaaS/PaaS antes de la sesión del miércoles.', time: 'Hace 2 h', pin: true },
            { a: 'Valentina Soto', r: 'Estudiante', t: '¿Dudas sobre la entrega?', d: '¿La actividad evaluada se entrega individual o en grupo?', time: 'Ayer' }].map((p, i) => (
            <Card key={i} className="anim-fade-up" style={{ animationDelay: `${i * .05}s` }}>
              <div className="flex items-start gap-3">
                <window.Avatar iniciales={p.a.split(' ').map((x) => x[0]).join('')} size={42} color={p.r === 'Docente' ? course.color : 'var(--low)'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-ink text-[14px]">{p.a}</span>
                    <Badge tone={p.r === 'Docente' ? 'primary' : 'neutral'}>{p.r}</Badge>
                    {p.pin && <Badge tone="accent" icon="bookmark">Fijado</Badge>}
                    <span className="text-faint text-[12px]">· {p.time}</span>
                  </div>
                  <h4 className="font-display font-bold text-ink text-[15px] mt-1">{p.t}</h4>
                  <p className="text-muted text-[13.5px] leading-relaxed mt-1">{p.d}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-[12.5px] font-bold text-muted hover:text-primary flex items-center gap-1.5"><Icon name="chat" size={15} /> Responder</button>
                    <button className="text-[12.5px] font-bold text-muted hover:text-primary flex items-center gap-1.5"><Icon name="check" size={15} /> Útil</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

window.CourseScreen = CourseScreen;
