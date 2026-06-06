// src/data.jsx — Datos ficticios en español académico (window.DATA)
const STUDENT = {
  nombre: 'Camila Reyes Soto',
  primerNombre: 'Camila',
  rut: '21.345.678-9',
  carrera: 'Ingeniería en Informática',
  sede: 'Sede Plaza Vespucio',
  jornada: 'Vespertina',
  semestre: '5º Semestre · 2026',
  avance: 64,
  iniciales: 'CR',
};

const COURSES = [
  {
    id: 'cloud',
    sigla: 'TIN-2043',
    nombre: 'Introducción a Cloud Computing',
    seccion: '002V',
    docente: 'Rodrigo Maldonado',
    color: '#0e4fb8',
    progreso: 72,
    proxima: 'Mié 14:30 · Lab 4',
    promedio: 5.8,
    tareasPendientes: 2,
    nuevos: 3,
  },
  {
    id: 'bd',
    sigla: 'TIN-1052',
    nombre: 'Bases de Datos Relacionales',
    seccion: '004V',
    docente: 'Patricia Aguilera',
    color: '#7b3ff2',
    progreso: 58,
    proxima: 'Jue 19:00 · Sala 312',
    promedio: 6.2,
    tareasPendientes: 1,
    nuevos: 0,
  },
  {
    id: 'web',
    sigla: 'TIN-2110',
    nombre: 'Desarrollo de Aplicaciones Web',
    seccion: '001V',
    docente: 'Felipe Cárcamo',
    color: '#1f9d6b',
    progreso: 81,
    proxima: 'Vie 14:30 · Lab 2',
    promedio: 6.5,
    tareasPendientes: 0,
    nuevos: 1,
  },
  {
    id: 'etica',
    sigla: 'EPL-1500',
    nombre: 'Ética para el Trabajo',
    seccion: '012V',
    docente: 'Ignacia Tapia',
    color: '#d98300',
    progreso: 44,
    proxima: 'Lun 19:00 · Sala 208',
    promedio: 5.4,
    tareasPendientes: 1,
    nuevos: 0,
  },
];

const NOTIFICATIONS = [
  {
    id: 'n1',
    urgencia: 'alta',
    tipo: 'Calificación',
    titulo: 'Nueva nota publicada en Cloud Computing',
    detalle: 'Experiencia de Aprendizaje 2: obtuviste un 6,3. Revisa la retroalimentación del docente.',
    tiempo: 'Hace 20 min',
    curso: 'cloud',
    accion: 'Ver calificación',
  },
  {
    id: 'n2',
    urgencia: 'alta',
    tipo: 'Horario',
    titulo: 'Tu clase de Bases de Datos cambió de sala',
    detalle: 'La sesión del jueves 19:00 se traslada de Sala 312 a Sala 401, Edificio B.',
    tiempo: 'Hace 1 h',
    curso: 'bd',
    accion: 'Ver en calendario',
  },
  {
    id: 'n3',
    urgencia: 'media',
    tipo: 'Trámite',
    titulo: 'Inscripción de asignaturas abre en 3 días',
    detalle: 'El periodo de toma de ramos para el 6º semestre comienza el 8 de junio a las 09:00.',
    tiempo: 'Hace 3 h',
    curso: null,
    accion: 'Ir al trámite',
  },
  {
    id: 'n4',
    urgencia: 'media',
    tipo: 'Entrega',
    titulo: 'Tarea por vencer en Ética para el Trabajo',
    detalle: 'El control de lectura cierra mañana a las 23:59. Aún no registras entrega.',
    tiempo: 'Hace 5 h',
    curso: 'etica',
    accion: 'Subir entrega',
  },
  {
    id: 'n5',
    urgencia: 'baja',
    tipo: 'Estado técnico',
    titulo: 'Mantención programada de la plataforma',
    detalle: 'El sábado 7 de junio entre 02:00 y 04:00 el servicio podría presentar intermitencias.',
    tiempo: 'Ayer',
    curso: null,
    accion: 'Ver estado',
  },
  {
    id: 'n6',
    urgencia: 'baja',
    tipo: 'Comunidad',
    titulo: 'Nuevo anuncio en Desarrollo Web',
    detalle: 'El docente compartió material complementario sobre componentes reutilizables.',
    tiempo: 'Ayer',
    curso: 'web',
    accion: 'Leer anuncio',
  },
];

const CALENDAR = [
  { id: 'c1', dia: 'HOY', fecha: 'Jue 5 jun', items: [
    { hora: '19:00', titulo: 'Bases de Datos Relacionales', lugar: 'Sala 401 · Ed. B', tipo: 'clase', color: '#7b3ff2', alerta: 'Sala actualizada' },
    { hora: '23:59', titulo: 'Cierre control de lectura · Ética', lugar: 'Entrega en línea', tipo: 'entrega', color: '#d98300' },
  ]},
  { id: 'c2', dia: 'MAÑANA', fecha: 'Vie 6 jun', items: [
    { hora: '14:30', titulo: 'Desarrollo de Aplicaciones Web', lugar: 'Lab 2', tipo: 'clase', color: '#1f9d6b' },
  ]},
  { id: 'c3', dia: 'PRÓXIMO', fecha: 'Lun 8 jun', items: [
    { hora: '09:00', titulo: 'Apertura inscripción de asignaturas', lugar: 'Trámite · Vivo', tipo: 'tramite', color: '#0e4fb8' },
    { hora: '19:00', titulo: 'Ética para el Trabajo', lugar: 'Sala 208', tipo: 'clase', color: '#d98300' },
  ]},
  { id: 'c4', dia: 'PRÓXIMO', fecha: 'Mié 10 jun', items: [
    { hora: '14:30', titulo: 'Evaluación Cloud Computing', lugar: 'Lab 4', tipo: 'evaluacion', color: '#e0454b', alerta: 'Evaluación' },
  ]},
];

const QUICK_ACTIONS = [
  { id: 'q1', label: 'Certificado de alumno regular', icon: 'doc', categoria: 'Trámite', destacado: true },
  { id: 'q2', label: 'Estado de cuenta y pagos', icon: 'wallet', categoria: 'Finanzas' },
  { id: 'q3', label: 'Inscripción de asignaturas', icon: 'list', categoria: 'Trámite' },
  { id: 'q4', label: 'Reservar sala de estudio', icon: 'pin', categoria: 'Campus' },
  { id: 'q5', label: 'Solicitar beca o beneficio', icon: 'gift', categoria: 'Finanzas' },
  { id: 'q6', label: 'Mesa de ayuda técnica', icon: 'support', categoria: 'Soporte' },
];

const SEARCH_INDEX = [
  { tipo: 'Curso', titulo: 'Introducción a Cloud Computing', sub: 'TIN-2043 · Sección 002V', icon: 'book', ruta: 'curso:cloud' },
  { tipo: 'Curso', titulo: 'Bases de Datos Relacionales', sub: 'TIN-1052 · Sección 004V', icon: 'book', ruta: 'curso:bd' },
  { tipo: 'Trámite', titulo: 'Certificado de alumno regular', sub: 'Emisión inmediata · PDF', icon: 'doc', ruta: 'ayuda' },
  { tipo: 'Trámite', titulo: 'Inscripción de asignaturas', sub: 'Disponible desde el 8 de junio', icon: 'list', ruta: 'ayuda' },
  { tipo: 'Recurso', titulo: 'Syllabus · Cloud Computing', sub: 'Documento del curso', icon: 'file', ruta: 'curso:cloud' },
  { tipo: 'Recurso', titulo: 'Biblioteca digital', sub: 'Catálogo y préstamos', icon: 'book', ruta: 'ayuda' },
  { tipo: 'Soporte', titulo: 'Restablecer contraseña', sub: 'Guía rápida · 2 min', icon: 'support', ruta: 'ayuda' },
  { tipo: 'Persona', titulo: 'Rodrigo Maldonado', sub: 'Docente · Cloud Computing', icon: 'user', ruta: 'curso:cloud' },
];

// Estructura del curso re-imaginada (desde el legacy "Maleta Didáctica")
const COURSE_CONTENT = {
  cloud: {
    banner: 'Introducción a Cloud Computing',
    descripcion: 'Comprende los fundamentos de la computación en la nube, modelos de servicio y despliegue de soluciones escalables.',
    modulos: [
      { id: 'm0', tipo: 'info', titulo: 'Información de la Asignatura', sub: 'Syllabus, programa y reglas de evaluación', estado: 'Revisado', items: 3 },
      { id: 'm1', tipo: 'experiencia', titulo: 'EA 1 · Conociendo la nube y sus servicios', sub: '4 recursos · 1 actividad evaluada', estado: 'Completado', progreso: 100, items: 5 },
      { id: 'm2', tipo: 'experiencia', titulo: 'EA 2 · Modelos de servicio IaaS, PaaS y SaaS', sub: '6 recursos · 1 actividad evaluada', estado: 'En curso', progreso: 60, items: 7, activo: true },
      { id: 'm3', tipo: 'experiencia', titulo: 'EA 3 · Despliegue y escalabilidad', sub: '5 recursos · 1 actividad evaluada', estado: 'Disponible', progreso: 0, items: 6 },
      { id: 'm4', tipo: 'evaluacion', titulo: 'Evaluación Transversal', sub: 'Disponible desde el 10 de junio', estado: 'Bloqueado', items: 1 },
    ],
    notas: [
      { eval: 'EA 1 · Actividad práctica', nota: 5.8, pond: '25%' },
      { eval: 'EA 2 · Informe de servicios', nota: 6.3, pond: '25%' },
      { eval: 'EA 3 · Proyecto despliegue', nota: null, pond: '25%' },
      { eval: 'Evaluación Transversal', nota: null, pond: '25%' },
    ],
  },
};

const HELP_CATEGORIES = [
  { id: 'h1', icon: 'rocket', titulo: 'Primeros pasos', desc: 'Configura tu cuenta y conoce la plataforma', articulos: 8, color: '#0e4fb8' },
  { id: 'h2', icon: 'book', titulo: 'Académico', desc: 'Cursos, notas, foros y entregas', articulos: 14, color: '#1f9d6b' },
  { id: 'h3', icon: 'doc', titulo: 'Trámites y certificados', desc: 'Solicitudes administrativas en línea', articulos: 11, color: '#d98300' },
  { id: 'h4', icon: 'wallet', titulo: 'Finanzas y becas', desc: 'Pagos, aranceles y beneficios', articulos: 9, color: '#7b3ff2' },
  { id: 'h5', icon: 'support', titulo: 'Soporte técnico', desc: 'Acceso, contraseñas y fallas', articulos: 12, color: '#e0454b' },
  { id: 'h6', icon: 'campus', titulo: 'Vida en el campus', desc: 'Salas, biblioteca y bienestar', articulos: 7, color: '#0e7490' },
];

const HELP_POPULAR = [
  '¿Cómo descargo mi certificado de alumno regular?',
  'No puedo ver las notas de un curso',
  'Restablecer mi contraseña de acceso',
  '¿Cuándo abre la inscripción de asignaturas?',
  '¿Dónde encuentro el syllabus de mi ramo?',
];

const SERVICE_STATUS = [
  { servicio: 'Aula Virtual (cursos)', estado: 'operativo' },
  { servicio: 'Trámites y certificados', estado: 'operativo' },
  { servicio: 'Pasarela de pagos', estado: 'degradado' },
  { servicio: 'Correo institucional', estado: 'operativo' },
];

const TOUR_STEPS = [
  { target: 'tour-search', titulo: 'Búsqueda global', desc: 'Encuentra cursos, trámites, recursos y personas desde un solo lugar. Sin navegar por menús.', icon: 'search', pos: 'bottom' },
  { target: 'tour-notifs', titulo: 'Notificaciones priorizadas', desc: 'Tus alertas ordenadas por urgencia: notas, cambios de horario y estado técnico, siempre primero lo importante.', icon: 'bell', pos: 'left' },
  { target: 'tour-calendar', titulo: 'Calendario unificado', desc: 'Clases, evaluaciones y fechas institucionales en una sola vista integrada.', icon: 'calendar', pos: 'left' },
  { target: 'tour-courses', titulo: 'Tus cursos, simplificados', desc: 'Accede al material académico y a las funciones administrativas de cada ramo en menos de 3 clics.', icon: 'book', pos: 'top' },
  { target: 'tour-help', titulo: 'Ayuda en todo momento', desc: 'El botón de ayuda te acompaña en cada pantalla con guías, chat y estado de los servicios.', icon: 'support', pos: 'left' },
];

window.DATA = {
  STUDENT, COURSES, NOTIFICATIONS, CALENDAR, QUICK_ACTIONS, SEARCH_INDEX,
  COURSE_CONTENT, HELP_CATEGORIES, HELP_POPULAR, SERVICE_STATUS, TOUR_STEPS,
};
