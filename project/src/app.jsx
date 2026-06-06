// src/app.jsx — Shell, navegación, búsqueda global, ajustes y Tweaks
const { useState, useEffect, useRef, useCallback } = React;

const FONT_MAP = {
  'Moderno': { d: "'Plus Jakarta Sans', system-ui, sans-serif", b: "'Manrope', system-ui, sans-serif" },
  'Geométrico': { d: "'Sora', system-ui, sans-serif", b: "'Manrope', system-ui, sans-serif" },
  'Editorial': { d: "'Newsreader', Georgia, serif", b: "'Manrope', system-ui, sans-serif" },
};
const PRIMARY_OPTS = ['#0e4fb8', '#143a86', '#0c7a5b'];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "Claro",
  "font": "Moderno",
  "primary": "#0e4fb8"
}/*EDITMODE-END*/;

const NAV = [
  { id: 'inicio', icon: 'home', label: 'Inicio' },
  { id: 'cursos', icon: 'book', label: 'Cursos' },
  { id: 'ayuda', icon: 'support', label: 'Ayuda' },
];

function App() {
  const { Logo, Button, IconButton, Icon, Card, Badge, Avatar, CourseGlyph, Progress, Sheet, Tooltip } = window;
  const { LoginScreen, DashboardScreen, CourseScreen, HelpScreen, OnboardingTour } = window;
  const { STUDENT, NOTIFICATIONS, SEARCH_INDEX, QUICK_ACTIONS, HELP_POPULAR } = window.DATA;

  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [logged, setLogged] = useState(false);
  const [route, setRoute] = useState('inicio');
  const [courseId, setCourseId] = useState(null);
  const [tour, setTour] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  // Aplicar Tweaks → tokens
  useEffect(() => {
    document.documentElement.classList.toggle('dark', t.theme === 'Oscuro');
  }, [t.theme]);
  useEffect(() => {
    const f = FONT_MAP[t.font] || FONT_MAP.Moderno;
    document.documentElement.style.setProperty('--font-display', f.d);
    document.documentElement.style.setProperty('--font-body', f.b);
  }, [t.font]);
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', t.primary);
    document.documentElement.style.setProperty('--primary-soft', `color-mix(in srgb, ${t.primary} 13%, var(--surface))`);
  }, [t.primary]);

  // ⌘K búsqueda global
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (logged) setSearchOpen(true); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [logged]);

  const navigate = (r) => { setRoute(r); setCourseId(null); window.scrollTo({ top: 0 }); };
  const openCourse = (id) => { setCourseId(id); setRoute('curso'); window.scrollTo({ top: 0 }); };
  const dismiss = (id) => setNotifs((ns) => ns.filter((n) => n.id !== id));

  const safeGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  const login = () => {
    setLogged(true);
    const onboarded = safeGet('duoc_onboarded');
    if (!onboarded) setTimeout(() => setTour(true), 700);
  };
  const finishTour = () => { setTour(false); safeSet('duoc_onboarded', '1'); };
  const reactivateTour = () => { setSettingsOpen(false); navigate('inicio'); setTimeout(() => setTour(true), 500); };

  if (!logged) return (<><LoginScreen onLogin={login} /><TweaksUI t={t} setTweak={setTweak} /></>);

  const unread = notifs.filter((n) => n.urgencia === 'alta').length;
  const titles = { inicio: 'Inicio', cursos: 'Mis cursos', ayuda: 'Centro de ayuda', curso: 'Curso' };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-[230px] shrink-0 border-r border-line bg-surface sticky top-0 h-screen">
        <div className="px-5 h-[68px] flex items-center border-b border-line"><Logo size="sm" /></div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => {
            const active = route === n.id || (n.id === 'cursos' && route === 'curso');
            return (
              <button key={n.id} onClick={() => navigate(n.id)} data-tour={n.id === 'ayuda' ? undefined : undefined}
                className={`w-full flex items-center gap-3 px-3.5 h-12 rounded-xl font-semibold text-[14.5px] transition-all ${active ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}>
                <Icon name={n.icon} size={20} /> {n.label}
                {n.id === 'inicio' && unread > 0 && <span className="ml-auto min-w-[20px] h-5 px-1.5 grid place-items-center rounded-full bg-high text-white text-[11px] font-bold">{unread}</span>}
              </button>
            );
          })}
          <div className="pt-3 mt-3 border-t border-line">
            <button onClick={() => setSearchOpen(true)} className="w-full flex items-center gap-3 px-3.5 h-12 rounded-xl font-semibold text-[14.5px] text-muted hover:bg-surface-2 hover:text-ink transition-all">
              <Icon name="search" size={20} /> Buscar <span className="ml-auto text-[11px] font-bold text-faint px-1.5 py-0.5 rounded bg-surface-2 border border-line">⌘K</span>
            </button>
          </div>
        </nav>
        {/* Perfil */}
        <div className="p-3 border-t border-line">
          <button onClick={() => setSettingsOpen(true)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-2 transition-all text-left">
            <Avatar iniciales={STUDENT.iniciales} size={40} />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-ink text-[13.5px] truncate">{STUDENT.nombre}</div>
              <div className="text-faint text-[11.5px] truncate">{STUDENT.carrera}</div>
            </div>
            <Icon name="settings" size={18} className="text-faint shrink-0" />
          </button>
        </div>
      </aside>

      {/* Columna principal */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 h-[60px] lg:h-[68px] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-md border-b border-line flex items-center gap-2 px-4 lg:px-6">
          <div className="lg:hidden"><Logo size="sm" /></div>
          <h1 className="hidden lg:block font-display font-bold text-ink text-[18px]">{titles[route]}</h1>
          <div className="flex-1"></div>
          <div className="lg:hidden"><IconButton name="search" label="Buscar" onClick={() => setSearchOpen(true)} /></div>
          <IconButton name={t.theme === 'Oscuro' ? 'sun' : 'moon'} label="Cambiar tema" onClick={() => setTweak('theme', t.theme === 'Oscuro' ? 'Claro' : 'Oscuro')} />
          <Tooltip label="Notificaciones"><IconButton name="bell" label="Notificaciones" badge={unread} onClick={() => navigate('inicio')} /></Tooltip>
          <button onClick={() => setSettingsOpen(true)} className="lg:hidden"><Avatar iniciales={STUDENT.iniciales} size={38} /></button>
        </header>

        {/* Vistas */}
        <main className="flex-1 pb-24 lg:pb-8">
          {route === 'inicio' && <DashboardScreen student={STUDENT} onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} notifications={notifs} onDismiss={dismiss} onCourse={openCourse} />}
          {route === 'cursos' && <CoursesList onCourse={openCourse} />}
          {route === 'curso' && <CourseScreen courseId={courseId} onBack={() => navigate('inicio')} onNavigate={navigate} />}
          {route === 'ayuda' && <HelpScreen onNavigate={navigate} />}
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-[64px] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md border-t border-line flex items-center justify-around px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {NAV.map((n) => {
          const active = route === n.id || (n.id === 'cursos' && route === 'curso');
          return (
            <button key={n.id} onClick={() => navigate(n.id)} className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full rounded-xl transition-colors ${active ? 'text-primary' : 'text-faint'}`} style={{ minHeight: 44 }}>
              <div className="relative"><Icon name={n.icon} size={23} strokeWidth={active ? 2.2 : 1.7} />{n.id === 'inicio' && unread > 0 && <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-high"></span>}</div>
              <span className="text-[11px] font-bold">{n.label}</span>
            </button>
          );
        })}
      </nav>

      {/* FAB Ayuda (presente en todas las pantallas) */}
      <div className="fixed z-40 right-4 lg:right-6 bottom-[80px] lg:bottom-6" data-tour="tour-help">
        <button onClick={() => setHelpOpen((v) => !v)} aria-label="Ayuda rápida"
          className="grid place-items-center rounded-full bg-primary text-white shadow-float hover:scale-105 active:scale-95 transition-transform" style={{ width: 56, height: 56 }}>
          <Icon name={helpOpen ? 'close' : 'support'} size={26} />
        </button>
      </div>
      {helpOpen && <HelpPopover onClose={() => setHelpOpen(false)} onOpenCenter={() => { setHelpOpen(false); navigate('ayuda'); }} />}

      {/* Búsqueda global (command palette) */}
      {searchOpen && <CommandPalette onClose={() => setSearchOpen(false)} onPick={(item) => {
        setSearchOpen(false);
        if (item.ruta.startsWith('curso:')) openCourse(item.ruta.split(':')[1]); else navigate(item.ruta);
      }} />}

      {/* Ajustes */}
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} t={t} setTweak={setTweak} onReactivateTour={reactivateTour} onLogout={() => { setSettingsOpen(false); setLogged(false); setRoute('inicio'); }} />

      {/* Tour onboarding */}
      {tour && <OnboardingTour steps={window.DATA.TOUR_STEPS} onFinish={finishTour} onSkip={finishTour} />}

      {/* Tweaks */}
      <TweaksUI t={t} setTweak={setTweak} />
    </div>
  );
}

// ---- Lista de cursos ----
function CoursesList({ onCourse }) {
  const { Card, Badge, CourseGlyph, Progress, Icon } = window;
  const { COURSES } = window.DATA;
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <h1 className="font-display font-extrabold text-ink text-[clamp(1.6rem,4vw,2.1rem)] tracking-tight mb-1">Mis cursos</h1>
      <p className="text-faint text-[14px] font-medium mb-6">{COURSES.length} asignaturas · {window.DATA.STUDENT.semestre}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {COURSES.map((c, i) => (
          <Card key={c.id} hover pad={false} onClick={() => onCourse(c.id)} className="p-4 group anim-fade-up" style={{ animationDelay: `${i * .05}s` }}>
            <div className="flex items-start gap-3.5">
              <CourseGlyph course={c} size={54} />
              <div className="flex-1 min-w-0">
                <span className="text-[11.5px] font-bold text-faint">{c.sigla} · {c.seccion}</span>
                <h3 className="font-display font-bold text-ink text-[16px] leading-snug group-hover:text-primary transition-colors">{c.nombre}</h3>
                <p className="text-faint text-[12.5px] mt-0.5 flex items-center gap-1.5"><Icon name="user" size={13} /> {c.docente}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1"><Progress value={c.progreso} color={c.color} /></div>
              <span className="text-[12.5px] font-bold" style={{ color: c.color }}>{c.progreso}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---- Popover de ayuda rápida (FAB) ----
function HelpPopover({ onClose, onOpenCenter }) {
  const { Icon, Card, Badge } = window;
  const { HELP_POPULAR } = window.DATA;
  return (
    <div className="fixed z-40 right-4 lg:right-6 bottom-[148px] lg:bottom-[80px] w-[min(92vw,340px)] anim-scale-in" style={{ transformOrigin: 'bottom right' }}>
      <div className="bg-surface border border-line rounded-2xl shadow-float overflow-hidden">
        <div className="p-4 text-white" style={{ background: 'var(--primary)' }}>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-[16px]">¿Necesitas ayuda?</h3>
            <button onClick={onClose} aria-label="Cerrar" className="grid place-items-center rounded-lg hover:bg-white/15" style={{ width: 32, height: 32 }}><Icon name="close" size={17} /></button>
          </div>
          <p className="text-white/80 text-[12.5px] mt-0.5">Respuestas rápidas y soporte en línea.</p>
        </div>
        <div className="p-2">
          <p className="text-[10.5px] font-bold text-faint uppercase tracking-wide px-2 pt-1.5 pb-1">Preguntas frecuentes</p>
          {HELP_POPULAR.slice(0, 3).map((p, i) => (
            <button key={i} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-surface-2 text-left transition-colors" style={{ minHeight: 44 }}>
              <Icon name="support" size={16} className="text-primary shrink-0" /><span className="text-ink text-[13px] font-medium flex-1 leading-snug">{p}</span>
            </button>
          ))}
          <div className="grid grid-cols-2 gap-2 p-1.5 pt-2">
            <button onClick={onOpenCenter} className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-surface-2 text-ink font-bold text-[12.5px] hover:bg-line transition-colors" style={{ minHeight: 44 }}><Icon name="book" size={16} /> Centro</button>
            <button className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-white font-bold text-[12.5px] hover:brightness-110 transition-all" style={{ minHeight: 44 }}><Icon name="chat" size={16} /> Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Command palette ----
function CommandPalette({ onClose, onPick }) {
  const { Icon } = window;
  const { SEARCH_INDEX } = window.DATA;
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  const results = SEARCH_INDEX.filter((s) => (s.titulo + s.sub + s.tipo).toLowerCase().includes(q.toLowerCase()));
  const groups = results.reduce((acc, r) => { (acc[r.tipo] = acc[r.tipo] || []).push(r); return acc; }, {});
  return (
    <div className="fixed inset-0 z-[85] flex items-start justify-center pt-[12vh] px-4 anim-fade-in">
      <div className="absolute inset-0 bg-[rgba(8,15,28,0.5)] backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-[600px] bg-surface rounded-2xl shadow-float border border-line overflow-hidden anim-scale-in">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-line">
          <Icon name="search" size={22} className="text-primary" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca cursos, trámites, recursos o personas…" className="flex-1 bg-transparent outline-none text-ink text-[16px] font-medium placeholder:text-faint" />
          <kbd className="text-[11px] font-bold text-faint px-2 py-1 rounded bg-surface-2 border border-line">Esc</kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <div className="text-center py-10 text-muted text-[14px]">Sin resultados para “{q}”.</div>}
          {Object.entries(groups).map(([tipo, items]) => (
            <div key={tipo} className="mb-1">
              <p className="text-[10.5px] font-bold text-faint uppercase tracking-wide px-3 pt-2 pb-1">{tipo}</p>
              {items.map((item, i) => (
                <button key={i} onClick={() => onPick(item)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-2 text-left transition-colors group" style={{ minHeight: 44 }}>
                  <div className="grid place-items-center rounded-lg bg-primary-soft shrink-0" style={{ width: 38, height: 38 }}><Icon name={item.icon} size={18} className="text-primary" /></div>
                  <div className="flex-1 min-w-0"><p className="text-ink font-semibold text-[14px] truncate">{item.titulo}</p><p className="text-faint text-[12px] truncate">{item.sub}</p></div>
                  <Icon name="arrowRight" size={16} className="text-faint opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="px-5 h-11 border-t border-line flex items-center gap-4 text-[11.5px] text-faint font-medium">
          <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-line">↵</kbd> abrir</span>
          <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-line">esc</kbd> cerrar</span>
          <span className="ml-auto">Búsqueda unificada</span>
        </div>
      </div>
    </div>
  );
}

// ---- Hoja de ajustes ----
function SettingsSheet({ open, onClose, t, setTweak, onReactivateTour, onLogout }) {
  const { Sheet, Icon, Avatar, Button } = window;
  const { STUDENT } = window.DATA;
  return (
    <Sheet open={open} onClose={onClose} side="right" label="Ajustes">
      <div className="relative h-screen w-full max-w-[400px] bg-surface border-l border-line shadow-float overflow-y-auto anim-slide-right">
        <div className="sticky top-0 bg-surface border-b border-line px-5 h-[60px] flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-ink text-[18px]">Ajustes</h2>
          <button onClick={onClose} aria-label="Cerrar" className="grid place-items-center rounded-xl hover:bg-surface-2 text-muted" style={{ width: 40, height: 40 }}><Icon name="close" size={20} /></button>
        </div>
        <div className="p-5 space-y-6">
          <div className="flex items-center gap-3.5">
            <Avatar iniciales={STUDENT.iniciales} size={56} />
            <div className="min-w-0">
              <div className="font-display font-bold text-ink text-[16px]">{STUDENT.nombre}</div>
              <div className="text-faint text-[12.5px]">{STUDENT.rut} · {STUDENT.jornada}</div>
              <div className="text-primary text-[12.5px] font-semibold mt-0.5">{STUDENT.carrera}</div>
            </div>
          </div>

          <SettingsGroup title="Apariencia">
            <SettingRow icon={t.theme === 'Oscuro' ? 'moon' : 'sun'} label="Modo oscuro" desc="Ideal para estudiar de noche">
              <ToggleSwitch on={t.theme === 'Oscuro'} onChange={() => setTweak('theme', t.theme === 'Oscuro' ? 'Claro' : 'Oscuro')} />
            </SettingRow>
            <SettingRow icon="globe" label="Idioma" desc="Español (Chile)"><Icon name="chevronRight" size={18} className="text-faint" /></SettingRow>
          </SettingsGroup>

          <SettingsGroup title="Onboarding y ayuda">
            <button onClick={onReactivateTour} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors text-left" style={{ minHeight: 44 }}>
              <div className="grid place-items-center rounded-xl bg-primary-soft" style={{ width: 38, height: 38 }}><Icon name="play" size={17} className="text-primary" /></div>
              <div className="flex-1"><div className="font-semibold text-ink text-[14px]">Reactivar tour guiado</div><div className="text-faint text-[12px]">Vuelve a ver las 5 funciones clave</div></div>
              <Icon name="chevronRight" size={18} className="text-faint" />
            </button>
            <SettingRow icon="support" label="Centro de ayuda" desc="Guías, chat y estado de servicios"><Icon name="chevronRight" size={18} className="text-faint" /></SettingRow>
          </SettingsGroup>

          <SettingsGroup title="Cuenta">
            <SettingRow icon="shield" label="Seguridad y acceso" desc="Contraseña, biometría, sesiones"><Icon name="chevronRight" size={18} className="text-faint" /></SettingRow>
            <SettingRow icon="bell" label="Notificaciones" desc="Preferencias de alertas"><Icon name="chevronRight" size={18} className="text-faint" /></SettingRow>
          </SettingsGroup>

          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-high-soft text-high font-bold text-[14px] hover:brightness-95 transition-all" style={{ minHeight: 44 }}>
            <Icon name="logout" size={18} /> Cerrar sesión
          </button>
          <p className="text-center text-faint text-[11.5px]">Duoc Unifica · v1.0 · Prototipo</p>
        </div>
      </div>
    </Sheet>
  );
}

function SettingsGroup({ title, children }) {
  return (<div><p className="text-[11px] font-bold text-faint uppercase tracking-wide mb-2 ml-1">{title}</p><div className="bg-surface-2 rounded-2xl p-1.5 space-y-0.5">{children}</div></div>);
}
function SettingRow({ icon, label, desc, children }) {
  const { Icon } = window;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl">
      <div className="grid place-items-center rounded-xl bg-surface" style={{ width: 38, height: 38 }}><Icon name={icon} size={17} className="text-primary" /></div>
      <div className="flex-1 min-w-0"><div className="font-semibold text-ink text-[14px]">{label}</div>{desc && <div className="text-faint text-[12px]">{desc}</div>}</div>
      {children}
    </div>
  );
}
function ToggleSwitch({ on, onChange }) {
  return (
    <button onClick={onChange} role="switch" aria-checked={on} className="relative rounded-full transition-colors shrink-0" style={{ width: 46, height: 28, background: on ? 'var(--primary)' : 'var(--border)' }}>
      <span className="absolute top-1 rounded-full bg-white shadow transition-all" style={{ width: 20, height: 20, left: on ? 22 : 4 }}></span>
    </button>
  );
}

// ---- Panel de Tweaks ----
function TweaksUI({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;
  if (!TweaksPanel) return null;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Tema" />
      <TweakRadio label="Apariencia" value={t.theme} options={['Claro', 'Oscuro']} onChange={(v) => setTweak('theme', v)} />
      <TweakColor label="Color primario" value={t.primary} options={PRIMARY_OPTS} onChange={(v) => setTweak('primary', v)} />
      <TweakSection label="Tipografía" />
      <TweakRadio label="Estilo" value={t.font} options={['Moderno', 'Geométrico', 'Editorial']} onChange={(v) => setTweak('font', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
