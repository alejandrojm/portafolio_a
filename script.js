// Preloader animado
let percent = 0;
const preloader = document.getElementById('preloader');
const preloaderPercent = document.getElementById('preloader-percent');
function animatePreloader() {
  percent += Math.random() * 3 + 1;
  if (percent > 100) percent = 100;
  preloaderPercent.textContent = Math.floor(percent) + "%";
  if (percent < 100) {
    requestAnimationFrame(animatePreloader);
  } else {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.style.display = 'none', 700);
    }, 500);
  }
}
window.addEventListener('DOMContentLoaded', animatePreloader);

// Section Wipes (scroll snap)
document.body.style.scrollSnapType = "y mandatory";
document.querySelectorAll('.section').forEach(sec => {
  sec.style.scrollSnapAlign = "start";
});

// Navegación suave y subrayado activo
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior: 'smooth'});
  });
});
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80;
  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Reveal animado al hacer scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
  document.querySelectorAll('.timeline-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85) {
      card.classList.add('visible');
    }
  });
  document.querySelectorAll('.animated-section').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.8) {
      sec.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

function drawStar(x, y, r, color, angle = 0, glow = true) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.moveTo(0, -r);
  for (let i = 0; i < 5; i++) {
    ctx.rotate(Math.PI / 5);
    ctx.lineTo(0, -r * 0.5);
    ctx.rotate(Math.PI / 5);
    ctx.lineTo(0, -r);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  if(glow) {
    ctx.shadowColor = "#ff6bcb";
    ctx.shadowBlur = 24;
  }
  ctx.fill();
  ctx.restore();
}

// Modal de portafolio
const modal = document.getElementById('portfolio-modal');
const modalBody = modal.querySelector('.modal-body');
const closeModal = modal.querySelector('.close');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const portfolioDetails = [
  {
    title: "Billie in TIME's",
    img: "Img/Captura de pantalla 2025-05-12 150300.png",
    desc: "Portada de la famosa revista TIME's presentando a la artista Billie Eilish"
  },
  {
    title: "Persona 5 themed Whatsapp",
    img: "Img/persona_mockup.png",
    desc: "Estilización de la interfaz de Whatsapp en estilo del juego Persona 5"
  },
 {
    title: "Columpio",
    img: "Img/Columpio.png",
    desc: "Ilustración de Columpio"
  },
{
    title: "Revista Nintendo",
    img: "Img/MagazineMockupV3.png",
    desc: "Revista de analisis de la complejidad con respecto a la compra y venta de videojuegos Nintendo"
  },
{
    title: "Splatoon",
    img: "Img/Splatoon.png",
    desc: "Piezas editoriales basadas en el juego Splatoon"
  },
{
    title: "Nitw",
    img: "Img/Nitw_Postcards.png",
    desc: "Intervención tipográfica basada en el juego Night in the Woods"
  },
  {
    title: "Jardin del Ser",
    img: "Img/Foto.jpg",
    desc: "El secreto no es correr detrás de las mariposas es cuidar el jardín para que ellas vengan hacia tí"
  },
{
    title: "Los hombres NO lloran",
    img: "Img/Los hombres no lloran_mockup.png",
    desc: "Revista analizando la ausencia de acceso que los hombres tienen a la salud mental"
  },
{
    title: "Vuala estilo Mucha",
    img: "Img/Vuala.png",
    desc: "Etiqueta de Vuala con intervención artistica en relación al estilo Art Nouveau"
  },
{
    title: "Magnolia",
    img: "Img/Magnolia.png",
    desc: "Identidad de Marca de una cafeteria con vibras del 2000"
  },
];
while(portfolioDetails.length < 10) {
  const i = portfolioDetails.length + 1;
  portfolioDetails.push({
    title: `Proyecto ${i}`,
    img: `https://source.unsplash.com/random/800x600?sig=${i}`,
    desc: `Descripción detallada del Proyecto ${i}.`
  });
}

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const idx = parseInt(item.dataset.index, 10) - 1;
    const detail = portfolioDetails[idx];
    modalBody.innerHTML = `
      <img src="${detail.img}" alt="${detail.title}"/>
      <h3>${detail.title}</h3>
      <p>${detail.desc}</p>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.querySelector('.modal-content').classList.add('visible');
    }, 10);
  });
});
closeModal.onclick = function() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  modal.querySelector('.modal-content').classList.remove('visible');
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modal.querySelector('.modal-content').classList.remove('visible');
  }
};

// Animación de estrella en Bezier Path con efectos
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth, height = window.innerHeight;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function bezier(t, p0, p1, p2, p3) {
  // Cubic Bezier
  const cX = 3 * (p1.x - p0.x),
        bX = 3 * (p2.x - p1.x) - cX,
        aX = p3.x - p0.x - cX - bX;
  const cY = 3 * (p1.y - p0.y),
        bY = 3 * (p2.y - p1.y) - cY,
        aY = p3.y - p0.y - cY - bY;
  const x = aX * Math.pow(t,3) + bX * Math.pow(t,2) + cX * t + p0.x;
  const y = aY * Math.pow(t,3) + bY * Math.pow(t,2) + cY * t + p0.y;
  return {x, y};
}

function drawStar(x, y, r, color, angle = 0, glow = true) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.moveTo(0, -r);
  for (let i = 0; i < 5; i++) {
    ctx.rotate(Math.PI / 5);
    ctx.lineTo(0, -r * 0.5);
    ctx.rotate(Math.PI / 5);
    ctx.lineTo(0, -r);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  if(glow) {
    ctx.shadowColor = "#5ce8f1";
    ctx.shadowBlur = 24;
  }
  ctx.fill();
  ctx.restore();
}

function getScrollProgress() {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  return Math.min(1, Math.max(0, scrollY / docHeight));
}

let starAngle = 0;
function animateStar() {
  ctx.clearRect(0, 0, width, height);
  // Define Bezier path
  const p0 = {x: width*0.1, y: height*0.2};
  const p1 = {x: width*0.5, y: height*0.05};
  const p2 = {x: width*0.8, y: height*0.8};
  const p3 = {x: width*0.2, y: height*0.9};
  const t = getScrollProgress();
  const pos = bezier(t, p0, p1, p2, p3);
  // Parpadeo y rotación
  starAngle += 0.03;
  let glow = Math.abs(Math.sin(Date.now()/400)) > 0.5;
  drawStar(pos.x, pos.y, 26 + 4*Math.sin(Date.now()/300), "#5ce8f1", starAngle, glow);
  requestAnimationFrame(animateStar);
}
animateStar();

// Animación de barras de progreso al entrar en About Me
let skillsAnimated = false;
function animateSkills() {
  if(skillsAnimated) return;
  const skills = document.querySelectorAll('.progress');
  skills.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.2s var(--transition)';
      bar.style.width = width;
    }, 200);
  });
  skillsAnimated = true;
}
window.addEventListener('scroll', () => {
  const about = document.getElementById('about');
  const rect = about.getBoundingClientRect();
  if(rect.top < window.innerHeight * 0.7) animateSkills();
});

// Cursor personalizado estrella
const starCursor = document.getElementById('star-cursor');
if (starCursor) {
  starCursor.innerHTML = `
  <svg viewBox="0 0 40 40">
    <polygon points="20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16"
      fill="#ffe066" stroke="#ff6bcb" stroke-width="2"/>
  </svg>
  `;
  let cursorX = window.innerWidth/2, cursorY = window.innerHeight/2;
  let targetX = cursorX, targetY = cursorY;
  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  function animateCursor() {
    cursorX += (targetX - cursorX) * 0.18;
    cursorY += (targetY - cursorY) * 0.18;
    starCursor.style.transform = `translate(${cursorX}px,${cursorY}px) scale(1.1)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}
// Prevent scroll when modal is open
document.addEventListener('keydown', function(e) {
  if (modal.style.display === 'flex' && e.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modal.querySelector('.modal-content').classList.remove('visible');
  }
});
