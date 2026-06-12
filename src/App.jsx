import { useEffect, useMemo, useRef, useState } from 'react';

const projects = [
  {
    title: 'Real-Time Chat App',
    description:
      'A real-time chat application built with the MERN stack and Socket.io, supporting one-to-one messaging, online status, and instant communication.',
    tags: ['MERN', 'Socket.io', 'WebSockets'],
    live: '',
    github: 'https://github.com/Vishwajeet594/Chat-app',
  },
  {
    title: 'URL Shortener',
    description:
      'A URL shortening service with short code generation, redirection logic, and click tracking built using Node.js, Express.js, and MongoDB.',
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    live: '',
    github: 'https://github.com/Vishwajeet594/Url-shortener',
  },
  {
    title: 'MyBook',
    description:
      'A full-stack e-commerce application with authentication, REST APIs, CRUD operations, and secure backend architecture.',
    tags: ['React', 'Node.js', 'MongoDB'],
    live: '',
    github: 'https://github.com/Vishwajeet594/BookShelf',
  },
  {
    title: 'Quick Stay',
    description:
      'A hotel booking web application featuring authentication, search & filtering, responsive UI, and smooth booking flow.',
    tags: ['React', 'Tailwind CSS', 'Clerk'],
    live: '',
    github: 'https://github.com/Vishwajeet594/Hotel-Booking',
  },
   {
    title: 'Sustainable City Guide',
    description:
      'A responsive city guide built with HTML, CSS, and JavaScript to showcase eco-friendly spots, transport options, and community events.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://vishwajeet594.github.io/Sustainable-City-Guide/Project/index.html',
    github: '',
  },
  {
    title: 'Sorting Visualizer',
    description:
      'An interactive sorting visualizer built with HTML, CSS, and JavaScript, supporting multiple sorting algorithms with smooth animations.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://vishwajeet594.github.io/Sorting_visualizer/index.html',
    github: '',
  },
];

const skills = ['C', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS', 'ReactJS', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'REST APIs', 'Socket.io', 'Git', 'GitHub', 'VS Code', 'Clerk', 'DSA', 'Problem Solving'];

const experience = [
  {
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code (GSSoC)',
    year: 'Oct 2024 – Nov 2024',
    summary:
      'Contributed to open-source projects by submitting 25+ pull requests, fixing bugs, improving documentation, and collaborating with maintainers to enhance code quality and project usability.',
  },
];

const stats = [
  { value: 10, suffix: ' +', label: 'Full-stack projects built' },
  { value: 1500, suffix: ' +', label: 'DSA problems solved' },
  { value: 9.04, suffix: ' CGPA', label: 'Current academic performance' },
];

const storySteps = [
  {
    title: 'Learning the fundamentals',
    text: 'Started with programming basics and gradually developed interest in web development and software engineering.',
  },
  {
    title: 'Building real-world applications',
    text: 'Worked on full-stack MERN projects to understand frontend, backend, databases, and scalable application structure.',
  },
  {
    title: 'Moving toward a tech career',
    text: 'Practicing DSA, improving development skills, and preparing for internships and software engineering roles.',
  },
];

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') ?? 'dark');
  const [counts, setCounts] = useState(stats.map(() => 0));
  const shellRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return undefined;
    }

    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frameId = 0;

    const animate = () => {
      current.x += (pointer.x - current.x) * 0.08;
      current.y += (pointer.y - current.y) * 0.08;

      shell.style.setProperty('--mouse-x', current.x.toFixed(4));
      shell.style.setProperty('--mouse-y', current.y.toFixed(4));

      frameId = window.requestAnimationFrame(animate);
    };

    const updatePointer = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const resetPointer = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    frameId = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', resetPointer);
    };
  }, []);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    let frameId = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(stats.map((stat) => Math.round(stat.value * progress)));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        size: 80 + (index % 5) * 36,
        top: `${8 + ((index * 13) % 84)}%`,
        left: `${4 + ((index * 17) % 92)}%`,
        delay: `${(index % 6) * 0.8}s`,
        duration: `${10 + (index % 5) * 2}s`,
      })),
    [],
  );

  const heroOffset = Math.min(scrollY * 0.18, 80);
  const panelOffset = Math.min(scrollY * 0.12, 56);
  const orbitOffset = Math.min(scrollY * 0.08, 24);
  const dividerOffset = Math.min(scrollY * 0.05, 18);

  return (
    <div className="page-shell" ref={shellRef}>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${Math.min(scrollY / 2400, 1)})` }}
      />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="grid-overlay" />

      <div className="floating-particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <header className="topbar">
        <a className="brand" href="#hero">
          Vishwajeet Kushwaha
        </a>
        <div className="topbar-right">
          <nav className="topnav" aria-label="Section navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="section-divider top-divider" aria-hidden="true">
            <span style={{ transform: `translateX(${dividerOffset}px)` }} />
          </div>
          <div
            className="hero-copy reveal is-visible"
            style={{ transform: `translateY(${heroOffset * 0.4}px)` }}
          >
          <span className="eyebrow">CS Student • MERN Developer</span>

<h1 className="headline-stack">
  <span>MERN Stack</span>
  <span>Developer &</span>
  <span>Problem Solver.</span>
</h1>

<p>
  I create responsive web experiences with React and Node.js, focusing on
  clean interfaces, reliable data flows, and fast interactions. I enjoy
  crafting projects that feel polished and perform smoothly across screens.
</p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View Projects
              </a>
              <a
                className="secondary-button"
                href="#contact"
              >
                Contact Me
              </a>
            </div>

            <div className="hero-ribbon">
              <span>React</span>
              <span>Frontend Systems</span>
              <span>UI Motion</span>
            </div>
          </div>

          <div
            className="hero-panel reveal is-visible"
            style={{ transform: `translateY(${panelOffset}px)` }}
          >
          <div className="hero-card hero-card-large">
  <span className="hero-card-label">Current Focus</span>
  <strong>
    Building polished MERN experiences with thoughtful UI and strong engineering.
  </strong>
</div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={stat.label} className="hero-card">
                  <strong>
                    {counts[index]}
                    {stat.suffix}
                  </strong>
                  <br />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hero-orbit"
            aria-hidden="true"
            style={{ transform: `translateY(${orbitOffset}px)` }}
          >
            <span className="orbit-ring ring-one" />
            <span className="orbit-ring ring-two" />
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <span className="orbit-dot dot-three" />
          </div>
        </section>

        <section className="section reveal" id="about" data-reveal>
  <div className="section-heading">
    <span className="eyebrow">About</span>

    <h2 className="split-heading">
      <span>Passionate about</span>
      <span>full-stack development</span>
      <span>and problem solving.</span>
    </h2>
  </div>

  <div className="about-layout">
    <article className="glass-card spotlight-card tilt-card">
      <p>
        Hi, I'm a Computer Science student passionate about MERN stack development,
        Data Structures & Algorithms, and building real-world web applications.
        I enjoy creating responsive, scalable, and user-friendly products while
        continuously learning modern technologies and improving my problem-solving skills.
      </p>
    </article>

    <article className="glass-card quote-card tilt-card">
      <span className="quote-mark">"</span>

      <p>
        I believe great products combine clean design, efficient systems,
        and intuitive user experiences that make technology feel simple and impactful.
      </p>
    </article>
  </div>
</section>
        <section className="story-section reveal" data-reveal>
          <div className="section-divider" aria-hidden="true">
            <span />
          </div>
          <div className="story-layout">
            <aside className="story-pin glass-card">
              <span className="eyebrow">Scroll Story</span>
              <h2 className="split-heading">
  <span>Started with curiosity.</span>
  <span>Now building projects</span>
  <span>and solving real problems.</span>
</h2>

<p>
  My journey into development began with learning the basics of programming and
  gradually evolved into building MERN stack applications, practicing DSA, and
  exploring how modern software products are created.
</p>
            </aside>

            <div className="story-steps">
              {storySteps.map((step, index) => (
                <article className="story-card glass-card stagger-item" key={step.title}>
                  <span className="story-index">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal" id="projects" data-reveal>
  <div className="section-heading">
    <span className="eyebrow">Projects</span>

    <h2 className="split-heading">
      <span>Projects focused on</span>
      <span>problem solving, scalability,</span>
      <span>and modern web experiences.</span>
    </h2>
  </div>

          <div className="projects-grid stagger-group">
            {projects.map((project, index) => (
              <article
                className="project-card glass-card tilt-card"
                key={project.title}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="project-topline">
                  <span>0{index + 1}</span>
                  <span>Featured Project</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="card-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="skills" data-reveal>
          <div className="section-heading">
            <span className="eyebrow">Skills</span>
            <h2 className="split-heading">
              <span>Core technologies and</span>
              <span>concepts I use to build</span>
              <span>reliable modern products.</span>
            </h2>
          </div>

          <div className="skills-shell glass-card">
            {skills.map((skill, index) => (
              <span
                className="skill-chip"
                key={skill}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section reveal" id="experience" data-reveal>
          <div className="section-heading">
            <span className="eyebrow">Experience</span>
            <h2 className="split-heading">
              <span>A compact timeline of</span>
              <span>hands-on engineering work</span>
              <span>and product execution.</span>
            </h2>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item glass-card" key={`${item.role}-${item.year}`}>
                <div className="timeline-meta">
                  <span>{item.year}</span>
                  <strong>{item.role}</strong>
                </div>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      <section className="section reveal contact-section" id="contact" data-reveal>
  <div className="contact-banner glass-card">
    <div>
      <span className="eyebrow">Contact</span>

      <h2 className="split-heading">
        <span>Let's connect and</span>
        <span>build impactful</span>
        <span>digital experiences.</span>
      </h2>

      <p>
        Open to internships, freelance opportunities, open-source collaborations,
        and software engineering roles.
      </p>
    </div>

            <div className="contact-links">
              <a href="mailto:vishwajeet8110@gmail.com">hello@portfolio.dev</a>
              <a href="https://www.linkedin.com/in/vishwajeet-kushwaha-099151318/" target="_blank" rel="noreferrer">
                linkedin.com/in/yourname
              </a>
              <a href="https://github.com/Vishwajeet594" target="_blank" rel="noreferrer">
                github.com/yourname
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
