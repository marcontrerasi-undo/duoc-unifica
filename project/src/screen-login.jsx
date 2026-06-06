// src/screen-login.jsx — Inicio de sesión unificado (SSO simulado) → window.LoginScreen
const { useState: useStateLogin } = React;

function LoginScreen({ onLogin }) {
  const { Logo, Button, Icon } = window;
  const [loading, setLoading] = useStateLogin(false);
  const [user, setUser] = useStateLogin('camila.reyes');
  const [pass, setPass] = useStateLogin('••••••••••');

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => onLogin(), 1100);
  };

  const features = [
    { icon: 'book', t: 'Aula Virtual' },
    { icon: 'doc', t: 'Trámites' },
    { icon: 'wallet', t: 'Finanzas' },
    { icon: 'calendar', t: 'Calendario' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-bg">
      {/* Panel de marca */}
      <div className="relative lg:w-[54%] overflow-hidden text-white flex flex-col justify-between p-7 sm:p-10 lg:p-14 min-h-[300px]"
        style={{ background: 'linear-gradient(150deg, #0c3f93 0%, #0e4fb8 45%, #103a86 100%)' }}>
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'repeating-linear-gradient(125deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)' }}></div>
        <div className="absolute -right-16 -top-20 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 68%)', opacity: .5 }}></div>
        <div className="absolute right-10 bottom-24 w-24 h-24 rounded-3xl rotate-12 hidden lg:block" style={{ background: 'var(--accent)', opacity: .9 }}></div>

        <div className="relative z-10"><Logo size="lg" /></div>

        <div className="relative z-10 max-w-xl anim-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[12.5px] font-semibold whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.14)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }}></span>
            Plataforma estudiantil unificada
          </div>
          <h1 className="font-display font-extrabold leading-[1.04] tracking-tight text-[clamp(2rem,5vw,3.4rem)]">
            Una sola cuenta.<br />Toda tu vida<br />académica.
          </h1>
          <p className="mt-5 text-[15px] sm:text-[17px] leading-relaxed text-white/80 max-w-md">
            Lo académico y lo administrativo, por fin en un mismo lugar. Sin contraseñas duplicadas, sin pestañas perdidas.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {features.map((f) => (
              <div key={f.t} className="flex items-center gap-2 px-3.5 h-11 rounded-xl text-[13.5px] font-semibold whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Icon name={f.icon} size={17} /> {f.t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/70 text-[13px] font-medium">
          <Icon name="shield" size={16} /> Acceso seguro · Inicio de sesión único (SSO)
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="lg:w-[46%] flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[400px] anim-fade-up">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h2 className="font-display font-extrabold text-[26px] sm:text-[30px] tracking-tight text-ink">Hola de nuevo 👋</h2>
          <p className="text-muted mt-1.5 text-[15px]">Ingresa con tu cuenta institucional Duoc UC.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[13px] font-semibold text-muted ml-1">Usuario o correo institucional</span>
              <div className="mt-1.5 flex items-center gap-2.5 h-13 px-4 rounded-xl bg-surface border border-line focus-within:border-primary focus-within:ring-2 focus-within:ring-[var(--primary-soft)] transition-all" style={{ height: 52 }}>
                <Icon name="user" size={18} className="text-faint" />
                <input value={user} onChange={(e) => setUser(e.target.value)} className="flex-1 bg-transparent outline-none text-[15px] text-ink font-medium" placeholder="nombre.apellido" />
                <span className="text-faint text-[14px] font-medium hidden sm:block">@duocuc.cl</span>
              </div>
            </label>
            <label className="block">
              <span className="text-[13px] font-semibold text-muted ml-1">Contraseña</span>
              <div className="mt-1.5 flex items-center gap-2.5 px-4 rounded-xl bg-surface border border-line focus-within:border-primary focus-within:ring-2 focus-within:ring-[var(--primary-soft)] transition-all" style={{ height: 52 }}>
                <Icon name="lock" size={18} className="text-faint" />
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="flex-1 bg-transparent outline-none text-[15px] text-ink font-medium tracking-widest" />
              </div>
            </label>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[13.5px] text-muted font-medium cursor-pointer select-none">
                <span className="w-4.5 h-4.5 rounded-md bg-primary grid place-items-center" style={{ width: 18, height: 18 }}><Icon name="check" size={12} className="text-white" strokeWidth={3} /></span>
                Recordarme
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[13.5px] font-semibold text-primary hover:underline whitespace-nowrap">¿Olvidaste tu clave?</a>
            </div>

            <Button type="submit" full size="lg" iconRight={loading ? null : 'arrowRight'} className="mt-2">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></span> Verificando…</span>
              ) : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-line"></div>
            <span className="text-[12.5px] text-faint font-semibold whitespace-nowrap">o accede con</span>
            <div className="flex-1 h-px bg-line"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={submit} className="flex items-center justify-center gap-2 h-12 rounded-xl border border-line bg-surface text-ink font-semibold text-[14px] hover:bg-surface-2 transition-all active:scale-[.98] focus-ring" style={{ minHeight: 44 }}>
              <Icon name="qr" size={18} className="text-primary" /> <span className="whitespace-nowrap">Código QR</span>
            </button>
            <button onClick={submit} className="flex items-center justify-center gap-2 h-12 rounded-xl border border-line bg-surface text-ink font-semibold text-[14px] hover:bg-surface-2 transition-all active:scale-[.98] focus-ring" style={{ minHeight: 44 }}>
              <Icon name="fingerprint" size={18} className="text-primary" /> Biometría
            </button>
          </div>

          <p className="text-center text-[12.5px] text-faint mt-8 leading-relaxed">
            Al ingresar aceptas el reglamento de uso de plataformas digitales de Duoc UC.<br />¿Problemas de acceso? <a href="#" onClick={(e) => e.preventDefault()} className="text-primary font-semibold hover:underline">Mesa de ayuda</a>
          </p>
        </div>
      </div>
    </div>
  );
}

window.LoginScreen = LoginScreen;
