// src/ui.jsx — Primitivas de interfaz compartidas (exportadas a window)
const { useState, useEffect, useRef } = React;
const Icon = window.Icon;

// ---- Marca original "Duoc Unifica" (no es el logotipo institucional) ----
function Logo({ size = 'md', mono = false }) {
  const dims = size === 'sm' ? 30 : size === 'lg' ? 44 : 36;
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative grid place-items-center shrink-0 rounded-[11px]"
        style={{ width: dims, height: dims, background: mono ? 'currentColor' : 'var(--primary)' }}>
        <div className="absolute rounded-[4px]" style={{ width: dims*0.30, height: dims*0.30, background: 'var(--accent)', top: dims*0.20, left: dims*0.20 }}></div>
        <div className="absolute rounded-full" style={{ width: dims*0.26, height: dims*0.26, background: '#fff', bottom: dims*0.18, right: dims*0.18, opacity: .92 }}></div>
      </div>
      {size !== 'icon' && (
        <div className="leading-none">
          <div className="font-display font-extrabold tracking-tight text-ink" style={{ fontSize: dims*0.48 }}>
            Unifica<span className="text-primary">.</span>
          </div>
          <div className="font-semibold text-faint tracking-[0.18em] uppercase" style={{ fontSize: dims*0.22, marginTop: 2 }}>Duoc UC</div>
        </div>
      )}
    </div>
  );
}

function Button({ children, variant = 'primary', size = 'md', icon, iconRight, full, className = '', ...props }) {
  const sizes = {
    sm: 'h-10 px-4 text-[14px] gap-1.5 rounded-xl',
    md: 'h-12 px-5 text-[15px] gap-2 rounded-xl',
    lg: 'h-14 px-7 text-[16px] gap-2.5 rounded-2xl',
  };
  const variants = {
    primary: 'bg-primary text-white hover:brightness-110 shadow-card',
    accent: 'bg-accent text-accent-ink hover:brightness-105 shadow-card',
    soft: 'bg-primary-soft text-primary hover:brightness-[.97]',
    ghost: 'bg-transparent text-muted hover:bg-surface-2 hover:text-ink',
    outline: 'bg-surface text-ink border border-line hover:bg-surface-2',
    danger: 'bg-high-soft text-high hover:brightness-[.98]',
  };
  return (
    <button
      className={`relative inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[.97] focus-ring ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
      style={{ minHeight: 44 }}
      {...props}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} />}
    </button>
  );
}

function IconButton({ name, label, onClick, active, badge, size = 20, className = '' }) {
  return (
    <button onClick={onClick} aria-label={label} title={label}
      className={`relative grid place-items-center rounded-xl transition-all duration-200 active:scale-90 focus-ring ${active ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-2 hover:text-ink'} ${className}`}
      style={{ width: 44, height: 44 }}>
      <Icon name={name} size={size} />
      {badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-high text-white text-[10px] font-bold ring-2 ring-surface">{badge}</span>
      )}
    </button>
  );
}

function Card({ children, className = '', pad = true, hover = false, ...props }) {
  return (
    <div className={`bg-surface border border-line rounded-2xl shadow-card ${pad ? 'p-5' : ''} ${hover ? 'transition-all duration-300 hover:shadow-float hover:-translate-y-0.5 cursor-pointer' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

function Badge({ children, tone = 'neutral', className = '', icon }) {
  const tones = {
    neutral: 'bg-surface-2 text-muted',
    primary: 'bg-primary-soft text-primary',
    accent: 'bg-[var(--accent)] text-accent-ink',
    high: 'bg-high-soft text-high',
    medium: 'bg-medium-soft text-medium',
    low: 'bg-low-soft text-low',
    ok: 'bg-[color-mix(in_srgb,var(--ok)_14%,transparent)] text-[var(--ok)]',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-bold tracking-wide whitespace-nowrap ${tones[tone]} ${className}`}>
      {icon && <Icon name={icon} size={13} strokeWidth={2.2} />}
      {children}
    </span>
  );
}

function Avatar({ iniciales, size = 40, color = 'var(--primary)' }) {
  return (
    <div className="grid place-items-center rounded-full font-display font-bold text-white shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {iniciales}
    </div>
  );
}

// Glifo del curso: marca de color con sigla (placeholder en vez de imagen real)
function CourseGlyph({ course, size = 52, radius = 14 }) {
  return (
    <div className="relative grid place-items-center shrink-0 overflow-hidden" style={{ width: size, height: size, borderRadius: radius, background: `color-mix(in srgb, ${course.color} 16%, var(--surface))` }}>
      <div className="absolute inset-0 opacity-[0.5]" style={{ background: `repeating-linear-gradient(125deg, ${course.color}22 0, ${course.color}22 6px, transparent 6px, transparent 13px)` }}></div>
      <span className="relative font-display font-extrabold tracking-tight" style={{ color: course.color, fontSize: size * 0.26 }}>
        {course.sigla.split('-')[0]}
      </span>
    </div>
  );
}

function Progress({ value, color = 'var(--primary)', track, height = 7, className = '' }) {
  return (
    <div className={`w-full rounded-full overflow-hidden ${className}`} style={{ height, background: track || 'var(--surface-2)' }}>
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${value}%`, background: color }}></div>
    </div>
  );
}

const URGENCY = {
  alta: { tone: 'high', label: 'Alta', color: 'var(--high)', icon: 'flame' },
  media: { tone: 'medium', label: 'Media', color: 'var(--medium)', icon: 'clock' },
  baja: { tone: 'low', label: 'Baja', color: 'var(--low)', icon: 'info' },
};

// Hoja inferior / modal con animación
function Sheet({ open, onClose, children, side = 'center', label }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const align = side === 'right' ? 'justify-end' : 'justify-center';
  return (
    <div className="fixed inset-0 z-[80] flex anim-fade-in" style={{ alignItems: side === 'center' ? 'center' : 'stretch' }} role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-[rgba(8,15,28,0.55)] backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full flex ${align}`}>{children}</div>
    </div>
  );
}

function Tooltip({ children, label }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-ink text-surface text-xs font-semibold whitespace-nowrap z-50 anim-fade-in" style={{ background: 'var(--text)', color: 'var(--surface)' }}>{label}</span>}
    </span>
  );
}

Object.assign(window, { Logo, Button, IconButton, Card, Badge, Avatar, CourseGlyph, Progress, URGENCY, Sheet, Tooltip });
