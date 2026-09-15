// Servidor Backend (Turso API)
const API_URL = 'http://localhost:3000/api/investigation';
const DOC_ID = 'protocolo-monografia-pedro';

// Configuración de Supabase (renombrado a supabaseClient para evitar colisiones)
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
const SUPABASE_KEY = 'TU-PUBLIC-ANON-KEY';
const supabaseClient = window.supabase ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Adaptación de las 9 Fases Académicas
let currentSections = [
  {
    id: "sec-1",
    title: "1. Selección y Delimitación del Tema",
    themeClass: "theme-1",
    content: `
      <h3>Tema de Investigación</h3>
      <p><strong>"Análisis descriptivo del impacto del diseño de software y gestión de microservicios en el consumo de energía eléctrica mediante monitoreo IoT en infraestructura de servidores."</strong></p>
      <ul>
        <li><strong>Línea de Investigación:</strong> Green Computing e Infraestructura Red distribuida.</li>
        <li><strong>Delimitación Temática:</strong> Evaluación del consumo de energía eléctrica (Watts) y uso de hardware (CPU/RAM) en contenedores Docker.</li>
        <li><strong>Delimitación Espacial:</strong> Laboratorio informático de servidores (INATEC León).</li>
        <li><strong>Delimitación Temporal:</strong> Análisis continuo durante 3 meses de prueba.</li>
      </ul>
    `
  },
  {
    id: "sec-2",
    title: "2. Planteamiento y Pregunta de Investigación",
    themeClass: "theme-2",
    content: `
      <h3>Descripción de la Problemática</h3>
      <p>La transición hacia microservicios en contenedores ha incrementado la huella energética en centros de datos. La falta de visibilidad del costo energético directo en decisiones de software provoca consumo innecesario de watts y costos financieros elevados.</p>
      <h3>Pregunta Principal de Investigación</h3>
      <p><em>"¿Cuáles son los patrones de consumo energético y el perfil de uso de recursos de hardware en aplicaciones de microservicios desplegadas en servidores bajo diferentes cargas de trabajo e itinerarios de optimización?"</em></p>
    `
  },
  {
    id: "sec-3",
    title: "3. Marco Teleológico (Objetivos)",
    themeClass: "theme-3",
    content: `
      <h3>Objetivo General</h3>
      <p>Analizar de manera descriptiva la relación entre la carga de trabajo de arquitecturas de microservicios y el consumo de energía eléctrica en entornos de servidores, mediante métricas de telemetría e instrumentos de medición IoT para fundamentar directrices de Green Computing.</p>
      <h3>Objetivos Específicos</h3>
      <ol>
        <li>Caracterizar el entorno de hardware, software y contenedores en el escenario de prueba.</li>
        <li>Diseñar e implementar el sistema de monitoreo IoT utilizando sensores SCT-013, ESP32 y Prometheus/Grafana.</li>
        <li>Medir y registrar los perfiles de consumo eléctrico (Watts) y CPU/RAM bajo escenarios idle, carga normal y picos de demanda.</li>
        <li>Sintetizar hallazgos y proponer buenas prácticas de desarrollo y orquestación sustentable.</li>
      </ol>
    `
  },
  {
    id: "sec-4",
    title: "4. Revisión Bibliográfica y Marco Teórico (APA 7)",
    themeClass: "theme-4",
    content: `
      <h3>Fundamentación Teórica</h3>
      <p><strong>Green Computing:</strong> Murugesan (2008) define las prácticas de informática verde enfocadas en software eficiente para reducir ciclos de reloj y uso de memoria.</p>
      <p><strong>Microservicios y Docker:</strong> Fowler (2014) analiza el aislamiento de procesos y el impacto de contenedores subutilizados en la potencia eléctrica.</p>
      <p><strong>Telemetría e IoT:</strong> Convergencia de sensores no invasivos SCT-013 con agentes Prometheus/cAdvisor para perfilado directo de hardware/software.</p>
    `
  },
  {
    id: "sec-5",
    title: "5. Diseño Metodológico",
    themeClass: "theme-5",
    content: `
      <h3>Tipo y Enfoque de Investigación</h3>
      <p><strong>Tipo:</strong> Descriptiva cuantitativa. Se orienta a caracterizar el comportamiento de consumo de potencia sin manipulación experimental de variables.</p>
      <p><strong>Enfoque:</strong> Cuantitativo, basado en telemetría continua e intervalos de corriente lecturas en tiempo real.</p>
    `
  },
  {
    id: "sec-6",
    title: "6. Población, Muestra e Instrumentación",
    themeClass: "theme-6",
    content: `
      <h3>Población y Muestra</h3>
      <p><strong>Población:</strong> Microservicios y contenedores Docker en el clúster de servidores del laboratorio.</p>
      <p><strong>Muestra:</strong> Muestreo no probabilístico de 5 microservicios clave (Autenticación, Catálogo, Pagos, Notificaciones y Logs).</p>
      <h3>Instrumentos Técnicos</h3>
      <ul>
        <li><strong>Hardware:</strong> Sensores de corriente SCT-013 integrados con microcontrolador ESP32.</li>
        <li><strong>Software:</strong> Prometheus, Grafana y agente cAdvisor.</li>
      </ul>
    `
  },
  {
    id: "sec-7",
    title: "7. Cronograma de Actividades",
    themeClass: "theme-7",
    content: `
      <ul>
        <li><strong>Mes 1:</strong> Configuración de escenario IoT y prueba piloto del sensor ESP32.</li>
        <li><strong>Mes 2:</strong> Recolección continua de métricas bajo escenarios simulados de carga.</li>
        <li><strong>Mes 3:</strong> Procesamiento de datos, tabulación y redacción del informe final.</li>
      </ul>
    `
  },
  {
    id: "sec-8",
    title: "8. Aspectos Éticos e Integridad Científica",
    themeClass: "theme-8",
    content: `
      <p><strong>Protección de Datos:</strong> Registro exclusivo de métricas de infraestructura sin capturar datos sensibles de usuarios.</p>
      <p><strong>Sostenibilidad Ambiental:</strong> Protocolo diseñado para minimizar pruebas de estrés innecesarias y evitar desperdicio eléctrico.</p>
    `
  },
  {
    id: "sec-9",
    title: "9. Matriz de Operacionalización e Instrumentos",
    themeClass: "theme-9",
    content: `
      <p>Matriz de variables (Consumo en Watts, Porcentaje de CPU/RAM, Tasa de Peticiones/seg) integrada con la ficha de observación técnica automatizada.</p>
    `
  }
];

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  await loadFromTurso();
  fetchNotifications();
});

// Cargar Datos desde Turso Cloud
async function loadFromTurso() {
  try {
    const res = await fetch(`${API_URL}/${DOC_ID}`);
    if (res.ok) {
      const data = await res.json();
      if (data.title) document.getElementById('doc-title').innerText = data.title;
      if (data.sections && Array.isArray(data.sections)) {
        currentSections = data.sections;
      }
    }
  } catch (err) {
    console.warn("Iniciando con datos por defecto locales.");
  }
  renderSections(currentSections);
}

// Renderizar Tarjetas Bento Grid
function renderSections(sections) {
  const grid = document.getElementById("bento-grid");
  grid.innerHTML = "";
  
  sections.forEach((sec, idx) => {
    const card = document.createElement("div");
    card.className = `bento-card`;
    card.innerHTML = `
      <div class="card-header ${sec.themeClass}">
        <span>${sec.title}</span>
        <div class="card-number">${idx + 1}</div>
      </div>
      <div class="card-body" contenteditable="true" id="${sec.id}">
        ${sec.content}
      </div>
      <div class="comments-section">
        <div class="comment-box">
          <input type="text" id="input-${sec.id}" placeholder="Escribe un comentario en esta sección...">
          <button onclick="addComment('${sec.id}')"><i class="ri-send-plane-fill"></i></button>
        </div>
        <div class="comments-list" id="comments-list-${sec.id}">
          <div class="comment-item"><strong>Revisión Académica:</strong> Sección alineada con las normas de monografía.</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Guardar Cambios en Turso Cloud
async function saveProgress() {
  const title = document.getElementById('doc-title').innerText;
  
  // Extraer el HTML editable actualizado de cada sección
  const updatedSections = currentSections.map(sec => {
    const el = document.getElementById(sec.id);
    return {
      ...sec,
      content: el ? el.innerHTML : sec.content
    };
  });

  const payload = {
    id: DOC_ID,
    user_id: 'pedro-valverde',
    title: title,
    sections: updatedSections
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.status === 'exito') {
      alert("¡Avances e investigación guardados con éxito en Turso Cloud!");
    }
  } catch (err) {
    console.error('Error al guardar:', err);
    alert('No se pudo conectar con el servidor en http://localhost:3000');
  }
}

// Editor de Texto Enriquecido
function execCmd(command, value = null) {
  document.execCommand(command, false, value);
}

function insertImage() {
  const url = prompt("Introduce la URL de la imagen:");
  if (url) execCmd('insertImage', url);
}

function addNewSection() {
  const title = prompt("Título de la nueva sección:", "Sección Adicional");
  if (!title) return;
  const newSec = {
    id: `sec-${Date.now()}`,
    title: title,
    themeClass: "theme-1",
    content: "<p>Escribe el contenido aquí...</p>"
  };
  currentSections.push(newSec);
  renderSections(currentSections);
}

// Agregar Comentarios Locales
function addComment(secId) {
  const input = document.getElementById(`input-${secId}`);
  const list = document.getElementById(`comments-list-${secId}`);
  if (!input.value.trim()) return;

  const item = document.createElement('div');
  item.className = 'comment-item';
  item.innerHTML = `<strong>Tú:</strong> ${input.value}`;
  list.appendChild(item);
  input.value = '';
}

// Autenticación con Google
async function loginWithGoogle() {
  if (!supabaseClient) return alert("Configura tus credenciales de Supabase.");
  const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google' });
  if (error) alert("Error al iniciar sesión: " + error.message);
}

// Gestión de Notificaciones
async function fetchNotifications() {
  const badge = document.getElementById('notif-badge');
  const list = document.getElementById('notif-list');
  
  const mockNotifs = [
    { id: 1, visitor_name: 'Dra. Damaris Medal', action: 'Visualizó tu protocolo' },
    { id: 2, visitor_name: 'Ing. Denis Berrios', action: 'Revisó el Marco Teórico' }
  ];
  badge.innerText = mockNotifs.length;
  list.innerHTML = mockNotifs.map(n => `
    <li class="notif-item">
      <span><strong>${n.visitor_name}:</strong> ${n.action}</span>
      <button onclick="deleteNotif(this)"><i class="ri-delete-bin-line"></i></button>
    </li>
  `).join('');
}

function deleteNotif(btnElement) {
  btnElement.parentElement.remove();
  const badge = document.getElementById('notif-badge');
  badge.innerText = Math.max(0, parseInt(badge.innerText) - 1);
}

function toggleNotifications() {
  document.getElementById('notifications-panel').classList.toggle('hidden');
}

// Exportación Multiformato
function exportPDF() {
  const element = document.getElementById('investigation-canvas');
  const opt = {
    margin: 10,
    filename: 'Protocolo_Investigacion_Pedro_Valverde.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

function exportPNG() {
  const element = document.getElementById('investigation-canvas');
  html2canvas(element).then(canvas => {
    const link = document.createElement('a');
    link.download = 'Investigacion_BentoGrid.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function exportPPT() {
  let pptx = new PptxGenJS();
  let slide = pptx.addSlide();
  slide.addText("Defensa de Monografía: Monitoreo IoT & Green IT", { x: 1, y: 1, fontSize: 24, color: "363636", bold: true });
  slide.addText("Pedro Ismael Valverde Zapata - INATEC León", { x: 1, y: 2, fontSize: 16, color: "5B8E7D" });
  pptx.writeFile({ fileName: "Presentacion_Defensa_Investigacion.pptx" });
}

function exportWord() {
  const content = document.getElementById('investigation-canvas').innerText;
  const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Protocolo_Investigacion_Pedro_Valverde.doc';
  a.click();
}

// Modal Compartir
document.getElementById('btn-share').onclick = () => {
  document.getElementById('share-modal').classList.remove('hidden');
  document.getElementById('share-url-input').value = window.location.href + "?token=share-abc12345";
};

function closeShareModal() {
  document.getElementById('share-modal').classList.add('hidden');
}

async function copyShareUrl() {
  const input = document.getElementById('share-url-input');
  try {
    await navigator.clipboard.writeText(input.value);
    alert("¡Enlace de investigación copiado al portapapeles!");
  } catch (err) {
    input.select();
    document.execCommand('copy');
    alert("¡Enlace copiado!");
  }
}

let currentAccessRole = 'edit'; // Por defecto acceso completo local
let currentShareToken = '';

// Al cargar la página, verificamos si hay un token en la URL (?token=...)
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentShareToken = urlParams.get('token') || '';

  await loadFromTurso();
  fetchNotifications();
});

// Cargar Datos y aplicar permisos de interfaz
async function loadFromTurso() {
  try {
    const fetchUrl = currentShareToken 
      ? `${API_URL}/${DOC_ID}?token=${currentShareToken}`
      : `${API_URL}/${DOC_ID}`;

    const res = await fetch(fetchUrl);
    if (res.ok) {
      const data = await res.json();
      
      if (data.title) document.getElementById('doc-title').innerText = data.title;
      if (data.sections && Array.isArray(data.sections)) {
        currentSections = data.sections;
      }
      
      // Aplicar rol de permisos retornado por el servidor
      if (data.user_access_role) {
        currentAccessRole = data.user_access_role;
        applyPermissionsToUI(currentAccessRole);
      }
    }
  } catch (err) {
    console.warn("Iniciando con estructura local.");
  }
  renderSections(currentSections);
  applyPermissionsToUI(currentAccessRole);
}

// Bloquear o permitir edición según el tipo de enlace
function applyPermissionsToUI(role) {
  const isReadOnly = (role === 'view_comment');
  
  // Título principal
  const titleEl = document.getElementById('doc-title');
  if (titleEl) titleEl.contentEditable = !isReadOnly;

  // Ocultar botones de guardado y edición si es solo lectura
  const btnSave = document.getElementById('btn-save-turso');
  const toolbar = document.querySelector('.editor-toolbar');
  
  if (btnSave) btnSave.style.display = isReadOnly ? 'none' : 'inline-flex';
  if (toolbar) toolbar.style.display = isReadOnly ? 'none' : 'flex';

  // Deshabilitar contenteditable en todas las tarjetas
  document.querySelectorAll('.card-body').forEach(card => {
    card.contentEditable = !isReadOnly;
  });
}

// Generar o actualizar enlace desde el Modal
async function updateSharePermission() {
  const permissionSelect = document.getElementById('share-permission').value;
  
  // Generar token único si no existe
  if (!currentShareToken) {
    currentShareToken = 'share-' + Math.random().toString(36).substring(2, 10);
  }

  // Guardar la configuración del enlace en Turso
  const payload = {
    id: DOC_ID,
    user_id: 'pedro-valverde',
    title: document.getElementById('doc-title').innerText,
    sections: currentSections,
    permission_token: currentShareToken,
    share_role: permissionSelect
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const generatedLink = `${window.location.origin}${window.location.pathname}?token=${currentShareToken}`;
    document.getElementById('share-url-input').value = generatedLink;
  } catch (err) {
    console.error("Error guardando el token:", err);
  }
}

// Abrir el Modal de Compartir
document.getElementById('btn-share').onclick = () => {
  document.getElementById('share-modal').classList.remove('hidden');
  updateSharePermission(); // Genera y sincroniza el enlace al abrir
};