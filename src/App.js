import { useState } from "react";

const emojis = [
  { e: "🤑", hidden: true },
  { e: "😰", hidden: true },
  { e: "😀", hidden: true },
  { e: "😉", hidden: true },
  { e: "😭", hidden: true },
  { e: "😡", hidden: true },
  { e: "🥳", hidden: true },
  { e: "🥸", hidden: true },
  { e: "😎", hidden: true },
  { e: "😂", hidden: true },
  { e: "🥰", hidden: true },
  { e: "🙃", hidden: true },
  { e: "🤑", hidden: true },
  { e: "😰", hidden: true },
  { e: "😀", hidden: true },
  { e: "😉", hidden: true },
  { e: "😎", hidden: true },
  { e: "😭", hidden: true },
  { e: "😡", hidden: true },
  { e: "🥳", hidden: true },
  { e: "🥸", hidden: true },
  { e: "😂", hidden: true },
  { e: "🥰", hidden: true },
  { e: "🙃", hidden: true },
];

export default function App() {
  const [trial, setTrial] = useState(0);

  function randomEmojis() {
    emojis.forEach((emoji, i) => {
      const r = Math.floor(Math.random() * emojis.length);
      console.log(r);
      const temp = emoji.e;
      emoji.e = emojis[r].e;
      emojis[r].e = temp;
    });
  }

  function handleReset() {
    randomEmojis();
    emojis.forEach((emoji) => (emoji.hidden = true));
    setTrial(0);
  }

  function handleCard(emoji) {
    emoji.hidden = !emoji.hidden;
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBox onCard={handleCard} />
        <Footer onReset={handleReset} trial={trial} setTrial={setTrial} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-emoji">
        <p className="title">🙂</p>
      </div>
      <div className="header-title">
        <h1>Flipmoji</h1>
      </div>
      <div>
        <p className="title">🤩</p>
      </div>
    </header>
  );
}

function GameBox({ onCard }) {
  return (
    <div className="game-box">
      {emojis.map((emoji) => (
        <Card emoji={emoji} onCard={onCard} />
      ))}
    </div>
  );
}

function Card({ emoji, onCard }) {
  const [show, setShow] = useState(false);

  return (
    <button
      className="card"
      onClick={() => {
        onCard(emoji);
        setShow(!show);
      }}
    >
      {emoji.hidden ? "?" : emoji.e}
    </button>
  );
}

function Footer({ onReset, trial }) {
  return (
    <footer className="footer">
      <div className="trial">
        <h2>Trial {trial}</h2>
      </div>
      <button className="reset" onClick={onReset}>
        Reset
      </button>
    </footer>
  );
}
