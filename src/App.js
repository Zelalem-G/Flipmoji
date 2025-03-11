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
  const [trial, setTrial] = useState(0);
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

  function handleCard(emoji_id) {
    const newEmoji = emojis.find((em) => em.id === emoji_id);

    if (!curCard1) {
      // no open card
      setCurCard1(newEmoji);

      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) =>
          emoji.id === newEmoji.id ? { ...newEmoji, hidden: false } : emoji
        )
      );
      return;
    }

    if (!curCard2 && curCard1) {
      // 1 card already open clicked on another card
      setCurCard2(newEmoji);

      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) =>
          emoji.id === newEmoji.id ? { ...newEmoji, hidden: false } : emoji
        )
      );

      if (curCard1.id === newEmoji.id) {
        // clicked the same card twice
        setCurCard1(null);
        setCurCard2(null);
        setEmojis((prevEmojis) =>
          prevEmojis.map((emoji) =>
            emoji.id === curCard1.id || emoji.id === newEmoji.id
              ? { ...emoji, hidden: true }
              : emoji
          )
        );
        return;
      }

      if (curCard1.e === newEmoji.e && curCard1.id !== newEmoji.id) {
        // match then remove them
        setEmojis((prevEmojis) =>
          prevEmojis.filter(
            (em) => em.id !== curCard1.id && em.id !== newEmoji.id
          )
        );
      } else {
        // no match wait 1 sec and hidde the cards
        // await wait(1);
        setEmojis((prevEmojis) =>
          prevEmojis.map((emoji) =>
            emoji.id === curCard1.id || emoji.id === newEmoji.id
              ? { ...emoji, hidden: true }
              : emoji
          )
        );
      }
    }
    if (curCard2) {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) =>
          emoji.id === curCard1.id || emoji.id === newEmoji.id
            ? { ...emoji, hidden: true }
            : emoji
        )
      );
      setCurCard1(newEmoji);
      setCurCard2(null);
    }
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
  return (
    <button className="card" onClick={() => onCard(emoji.id)}>
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
