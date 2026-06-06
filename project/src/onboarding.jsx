// src/onboarding.jsx — Tour guiado (spotlight) → window.OnboardingTour
const { useState: useStateTour, useEffect: useEffectTour, useCallback: useCbTour } = React;

function OnboardingTour({ steps, onFinish, onSkip }) {
  const { Icon, Button } = window;
  const [i, setI] = useStateTour(0);
  const [rect, setRect] = useStateTour(null);
  const [mobile, setMobile] = useStateTour(window.innerWidth < 1024);
  const step = steps[i];

  const measure = useCbTour(() => {
    setMobile(window.innerWidth < 1024);
    // limpiar anteriores
    document.querySelectorAll('[data-tour-highlight]').forEach((el) => el.removeAttribute('data-tour-highlight'));
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) { setRect(null); return; }
    const r = el.getBoundingClientRect();
    // asegurar visibilidad
    if (r.top < 80 || r.bottom > window.innerHeight - 80) {
      window.scrollTo({ top: window.scrollY + r.top - window.innerHeight * 0.35, behavior: 'smooth' });
      setTimeout(() => {
        const rr = el.getBoundingClientRect();
        el.setAttribute('data-tour-highlight', '');
        setRect({ top: rr.top, left: rr.left, width: rr.width, height: rr.height, bottom: rr.bottom, right: rr.right });
      }, 320);
      return;
    }
    el.setAttribute('data-tour-highlight', '');
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right });
  }, [step]);

  useEffectTour(() => {
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
  }, [measure]);

  useEffectTour(() => () => {
    document.querySelectorAll('[data-tour-highlight]').forEach((el) => el.removeAttribute('data-tour-highlight'));
  }, []);

  const next = () => { if (i < steps.length - 1) setI(i + 1); else finish(); };
  const prev = () => i > 0 && setI(i - 1);
  const finish = () => {
    document.querySelectorAll('[data-tour-highlight]').forEach((el) => el.removeAttribute('data-tour-highlight'));
    onFinish();
  };

  // Posición de la tarjeta
  let cardStyle = {};
  if (mobile || !rect) {
    cardStyle = { left: '50%', bottom: 16, transform: 'translateX(-50%)', width: 'min(92vw, 380px)' };
  } else {
    const W = 340, gap = 18;
    let top, left;
    if (step.pos === 'bottom') { top = rect.bottom + gap; left = rect.left; }
    else if (step.pos === 'top') { top = rect.top - gap; left = rect.left; }
    else if (step.pos === 'left') { top = rect.top; left = rect.left - W - gap; }
    else { top = rect.top; left = rect.right + gap; }
    left = Math.max(16, Math.min(left, window.innerWidth - W - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - 280));
    cardStyle = { top, left, width: W, transform: step.pos === 'top' ? 'translateY(-100%)' : 'none' };
  }

  return (
    <div className="fixed inset-0 z-[70]">
      {/* scrim cuando no hay target (primer frame) */}
      {!rect && <div className="absolute inset-0 bg-[rgba(7,14,26,0.62)]"></div>}

      <div key={i} className="fixed z-[75] anim-scale-in" style={cardStyle}>
        <div className="bg-surface rounded-2xl shadow-float border border-line overflow-hidden">
          <div className="h-1.5 w-full bg-surface-2">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((i + 1) / steps.length) * 100}%` }}></div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="grid place-items-center rounded-xl bg-primary-soft pulse-ring" style={{ width: 42, height: 42 }}>
                <Icon name={step.icon} size={21} className="text-primary" />
              </div>
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <span key={idx} className="rounded-full transition-all duration-300" style={{ width: idx === i ? 20 : 7, height: 7, background: idx === i ? 'var(--primary)' : idx < i ? 'var(--primary)' : 'var(--border)', opacity: idx <= i ? 1 : .6 }}></span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-faint tracking-wide">PASO {i + 1} DE {steps.length}</span>
            </div>
            <h3 className="font-display font-extrabold text-ink text-[19px] leading-tight">{step.titulo}</h3>
            <p className="text-muted text-[14px] leading-relaxed mt-1.5">{step.desc}</p>

            <div className="flex items-center justify-between gap-2 mt-5">
              <button onClick={onSkip} className="text-[13px] font-semibold text-faint hover:text-muted transition-colors px-2 py-2" style={{ minHeight: 40 }}>Saltar tour</button>
              <div className="flex items-center gap-2">
                {i > 0 && <Button variant="ghost" size="sm" onClick={prev} icon="chevronLeft">Atrás</Button>}
                <Button size="sm" onClick={next} iconRight={i === steps.length - 1 ? 'check' : 'arrowRight'}>
                  {i === steps.length - 1 ? 'Empezar' : 'Siguiente'}
                </Button>
              </div>
            </div>
            <p className="text-[11.5px] text-faint mt-3 flex items-center gap-1.5 pt-3 border-t border-line">
              <Icon name="settings" size={13} /> Puedes reactivar este tour en Ajustes cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

window.OnboardingTour = OnboardingTour;
