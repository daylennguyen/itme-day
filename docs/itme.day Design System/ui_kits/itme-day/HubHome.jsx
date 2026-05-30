// HubHome.jsx — the "Home" tab: a minimal list of projects.
const PROJECTS = [
  { id: "gobby", title: "Gobby", href: "https://gobby.itme.day/", description: "AI dungeon master for solo D&D play." },
  { id: "rng", title: "rng-react-components", href: "https://itmedotday.github.io/rng-react-components/", description: "High-fidelity RNG & gaming UI components for React." },
  { id: "itme", title: "itme.day", href: "https://itme.day/", description: "This link hub." },
];

function ProjectCard({ project, index }) {
  return (
    <Reveal as="li" delay={0.08 * index} className="card" style={{ listStyle: "none" }}>
      <div className="card-title">{project.title}</div>
      <div className="card-desc">{project.description}</div>
      <a className="btn btn-secondary" href={project.href} target="_blank" rel="noopener noreferrer" style={{ width: "fit-content", textDecoration: "none" }}>
        Visit
      </a>
    </Reveal>
  );
}

function HubHome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <Reveal as="header">
        <p className="eyebrow">itme.day</p>
        <h1 className="title">Projects</h1>
        <p className="subtitle">A minimal list of things I am building.</p>
      </Reveal>
      <ul style={{ display: "flex", flexDirection: "column", gap: 16, margin: 0, padding: 0 }} aria-label="Projects">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </ul>
    </div>
  );
}

window.HubHome = HubHome;
