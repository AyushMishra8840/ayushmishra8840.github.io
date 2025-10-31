document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Typing effect */
  const typedText = ["Full Stack Developer", "Java & Node.js Enthusiast", "UI/UX Learner"];
  let i = 0, j = 0, typing = true;
  const out = document.getElementById('typed');
  function typeAnim() {
    if (!out) return;
    if (typing) {
      out.textContent = typedText[i].slice(0, j++);
      if (j > typedText[i].length + 6) typing = false;
    } else {
      out.textContent = typedText[i].slice(0, j--);
      if (j <= 0) { typing = true; i = (i + 1) % typedText.length; }
    }
    setTimeout(typeAnim, typing ? 120 : 60);
  }
  typeAnim();

  /* Dynamic tech bars */
  /* Dynamic tech bars */
const techData = [
  { name: "HTML", level: "90%" },
  { name: "CSS", level: "85%" },
  { name: "JavaScript", level: "85%" },
  { name: "React.js", level: "75%" },
  { name: "Node.js", level: "70%" },
  { name: "Java", level: "75%" },
  { name: "MySQL", level: "65%" },
];
const techBars = document.getElementById('techBars');
techData.forEach(t => {
  const row = document.createElement('div');
  row.className = 'tech-row';
  row.innerHTML = `
    <div class="tech-name">${t.name}</div>
    <div class="bar">
      <div class="fill" style="--p:${t.level}">
        <span class="percent">${t.level}</span>
      </div>
    </div>
  `;
  techBars.appendChild(row);
});

  /* Animate bars when visible */
  const bars = document.querySelectorAll('.fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.style.getPropertyValue('--p');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));

  /* Dynamic projects */
  const projects = [
    {
      title: "Employee Management System",
      stack: "Java, JDBC, Servlets, MySQL",
      desc: "CRUD operations, responsive UI, Tomcat deployment.",
      link: "https://github.com/AyushMishra8840"
    },
    {
      title: "Rapid Mart",
      stack: "E-commerce (Java + MySQL)",
      desc: "Online store with product listing, cart, and authentication.",
      link: "https://github.com/AyushMishra8840"
    },
    {
      title: "Portfolio Website",
      stack: "HTML, CSS, JS, Node.js",
      desc: "Personal responsive portfolio with backend integration.",
      link: "https://github.com/AyushMishra8840"
    }
  ];
  const grid = document.getElementById('projectsGrid');
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project';
    card.innerHTML = `
      <div class="project-inner">
        <div class="proj-front">
          <h3>${p.title}</h3><p>${p.stack}</p>
        </div>
        <div class="proj-back">
          <p>${p.desc}</p>
          <div class="proj-links"><a class="link" href="${p.link}" target="_blank">Code</a></div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  /* Contact form submit */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      status.textContent = 'Sending...';
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
          })
        });
        const data = await res.json();
        status.textContent = data.ok ? 'Message sent successfully!' : 'Error sending message.';
        if (data.ok) form.reset();
      } catch {
        status.textContent = 'Network error. Try again later.';
      }
    });
  }
});
