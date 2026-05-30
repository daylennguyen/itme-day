// App.jsx — itme.day hub shell. Mascot + Home / RNG / Text FX tabs + footer.
const APP_TABS = [
  { id: "home", label: "Home" },
  { id: "rng", label: "RNG" },
  { id: "fx", label: "Text FX" },
];

function TabBar({ tab, setTab }) {
  return (
    <div className="tabs">
      {APP_TABS.map((t) => (
        <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
          {tab === t.id && <span className="pill" />}
          <span style={{ position: "relative", zIndex: 1 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState("home");
  return (
    <main className="page">
      <GobbyMascot />
      <TabBar tab={tab} setTab={setTab} />
      {tab === "home" && <HubHome />}
      {tab === "rng" && <D20Console />}
      {tab === "fx" && <TextFX />}
      <footer className="footer">
        itme.day &copy; 2026 Daylen Nguyen · built with React &amp; <a href="https://itmedotday.github.io/rng-react-components/" target="_blank" rel="noopener noreferrer">rng-react-components</a>
      </footer>
    </main>
  );
}

window.App = App;
