import { useState } from "react";

const InitialEmojis = [
  { id: 1, e: "🤑", hidden: true },
  { id: 2, e: "😰", hidden: true },
  { id: 3, e: "😀", hidden: true },
  { id: 4, e: "😉", hidden: true },
  { id: 5, e: "😭", hidden: true },
  { id: 6, e: "😡", hidden: true },
  { id: 7, e: "🥳", hidden: true },
  { id: 8, e: "🥸", hidden: true },
  { id: 9, e: "😎", hidden: true },
  { id: 10, e: "😂", hidden: true },
  { id: 11, e: "🥰", hidden: true },
  { id: 12, e: "🙃", hidden: true },
  { id: 13, e: "🤑", hidden: true },
  { id: 14, e: "😰", hidden: true },
  { id: 15, e: "😀", hidden: true },
  { id: 16, e: "😉", hidden: true },
  { id: 17, e: "😎", hidden: true },
  { id: 18, e: "😭", hidden: true },
  { id: 19, e: "😡", hidden: true },
  { id: 20, e: "🥳", hidden: true },
  { id: 21, e: "🥸", hidden: true },
  { id: 22, e: "😂", hidden: true },
  { id: 23, e: "🥰", hidden: true },
  { id: 24, e: "🙃", hidden: true },
];

export default function App() {
  const [trial, setTrial] = useState(1);
  const [emojis, setEmojis] = useState(InitialEmojis);
  const [curCard1, setCurCard1] = useState(null);
  const [curCard2, setCurCard2] = useState(null);

  function randomEmojis() {
    setEmojis(
      emojis?.map((emoji, i) => {
        const r = Math.floor(Math.random() * emojis.length);
        const temp = emoji.e;
        emoji.e = emojis[r].e;
        emojis[r].e = temp;
      })
    );
  }

  function wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  function handleReset() {
    setEmojis(InitialEmojis);
    randomEmojis();
    setEmojis(emojis?.map((emoji) => ({ ...emoji, hidden: true })));
    setTrial(0);
    setCurCard1(null);
    setCurCard2(null);
  }

  async function handleCard(emoji) {
    if (!curCard1) {
      setCurCard1(emoji);
      console.log(curCard1);
      curCard1.hidden = !curCard1?.hidden;
      return;
    }
    if (!curCard2 && curCard1) {
      setCurCard2(emoji);
      curCard2.hidden = !curCard2.hidden;
      console.log(2);

      if (curCard1.id === curCard2?.id) {
        setCurCard1(null);
        setCurCard2(null);
        return;
      }

      if (curCard1.e === curCard2?.e && curCard1.id !== curCard2?.id) {
        // curCard2.hidden = !curCard2.hidden;
        setEmojis((emojis) =>
          emojis.filter((em) => em.id !== curCard1.id && em.id !== curCard2?.id)
        );
      }
      if (curCard1.e !== curCard2?.e) {
        console.log(3);

        curCard2.hidden = !curCard2.hidden;
        await wait(4);
        curCard1.hidden = true;
        curCard2.hidden = true;
      }
    }
    console.log(4);

    setCurCard1(null);
    setCurCard2(null);
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBox onCard={handleCard} emojis={emojis} />
        <Footer onReset={handleReset} trial={trial} />
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

function GameBox({ onCard, emojis }) {
  return (
    <div className="game-box">
      {emojis?.map((emoji) => (
        <Card emoji={emoji} onCard={onCard} />
      ))}
    </div>
  );
}

function Card({ emoji, onCard }) {
  // const [show, setShow] = useState(false);

  return (
    <button
      className="card"
      onClick={(emoji) => {
        console.log(emoji);
        onCard(emoji);
      }}
    >
      {emoji?.hidden ? "?" : emoji?.e}
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
