// GobbyMascot.jsx — the brand mascot.
// Production itme.day morphs the goblin's face (anime.js Chill-Component port);
// here we use the full-color static SVG (face baked in) with an idle bob and a
// springy tap reaction — a faithful cosmetic stand-in for the live animation.
function GobbyMascot() {
  const [pop, setPop] = React.useState(0);
  const moods = ["hi.", "rolling…", "nat 20!", "goblin mode", "✦"];
  const [mood, setMood] = React.useState(null);

  const tap = () => {
    setPop((p) => p + 1);
    setMood(moods[Math.floor(Math.random() * moods.length)]);
    window.clearTimeout(tap._t);
    tap._t = window.setTimeout(() => setMood(null), 1100);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button
        onClick={tap}
        aria-label="Gobby mascot — tap him"
        style={{
          border: "none", background: "transparent", cursor: "pointer",
          padding: 0, width: 200, height: 200, position: "relative",
        }}
      >
        <img
          key={pop}
          src="../../assets/gobby.svg"
          alt="Gobby the goblin"
          draggable={false}
          style={{
            width: "100%", height: "100%", objectFit: "contain",
            animation: pop ? "gobbyPop .45s cubic-bezier(.3,1.6,.5,1)" : "gobbyIdle 4s ease-in-out infinite",
            userSelect: "none",
          }}
        />
      </button>
      <div style={{
        height: 18, fontSize: 12, fontWeight: 600, color: "var(--gobby-skin)",
        opacity: mood ? 1 : 0, transform: mood ? "none" : "translateY(-4px)",
        transition: "all .2s",
      }}>{mood}</div>

      <style>{`
        @keyframes gobbyIdle { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
        @keyframes gobbyPop { 0%{ transform: scale(1) } 35%{ transform: scale(.9) rotate(-3deg) } 70%{ transform: scale(1.05) rotate(2deg) } 100%{ transform: scale(1) } }
      `}</style>
    </div>
  );
}

window.GobbyMascot = GobbyMascot;
