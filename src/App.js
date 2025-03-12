import { useState } from "react";

const InitialEmojis = [
  { id: 1, match: false, e: "🤑", hidden: true },
  { id: 2, match: false, e: "😰", hidden: true },
  { id: 3, match: false, e: "😀", hidden: true },
  { id: 4, match: false, e: "😉", hidden: true },
  { id: 5, match: false, e: "😭", hidden: true },
  { id: 6, match: false, e: "😡", hidden: true },
  { id: 7, match: false, e: "🥳", hidden: true },
  { id: 8, match: false, e: "🥸", hidden: true },
  { id: 9, match: false, e: "😎", hidden: true },
  { id: 10, match: false, e: "😂", hidden: true },
  { id: 11, match: false, e: "🥰", hidden: true },
  { id: 12, match: false, e: "🙃", hidden: true },
  { id: 13, match: false, e: "🤑", hidden: true },
  { id: 14, match: false, e: "😰", hidden: true },
  { id: 15, match: false, e: "😀", hidden: true },
  { id: 16, match: false, e: "😉", hidden: true },
  { id: 17, match: false, e: "😎", hidden: true },
  { id: 18, match: false, e: "😭", hidden: true },
  { id: 19, match: false, e: "😡", hidden: true },
  { id: 20, match: false, e: "🥳", hidden: true },
  { id: 21, match: false, e: "🥸", hidden: true },
  { id: 22, match: false, e: "😂", hidden: true },
  { id: 23, match: false, e: "🥰", hidden: true },
  { id: 24, match: false, e: "🙃", hidden: true },
];

export default function App() {
  InitialEmojis.forEach((emoji, i) => {
    const r = Math.floor(Math.random() * InitialEmojis.length);
    [emoji.e, InitialEmojis[r].e] = [InitialEmojis[r].e, emoji.e];
  });

  const [trial, setTrial] = useState(0);
  const [emojis, setEmojis] = useState([...InitialEmojis]);
  const [curCard1, setCurCard1] = useState(null);
  const [curCard2, setCurCard2] = useState(null);
  const [scoreCount, setScoreCount] = useState(0);

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

  function handleReset() {
    const newEmojis = [...InitialEmojis];
    newEmojis.forEach((emoji, i) => {
      const r = Math.floor(Math.random() * newEmojis.length);
      [emoji.e, newEmojis[r].e] = [newEmojis[r].e, emoji.e];
    });
    setEmojis(
      newEmojis.map((emoji) => ({ ...emoji, match: false, hidden: true }))
    );
    setTrial(0);
    setCurCard1(null);
    setCurCard2(null);
  }

  function handleCard(emoji_id) {
    const newEmoji = emojis.find((em) => em.id === emoji_id);

    if (newEmoji.match) {
      return;
    }

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
        // match
        setTrial(() => trial + 1);
        setEmojis((prevEmojis) =>
          prevEmojis.map((em) =>
            em.id === curCard1.id || em.id === newEmoji.id
              ? { ...em, match: true }
              : em
          )
        );
        setScoreCount(scoreCount + 1);
      } else {
        // no match wait 1 sec and hidde the cards
        setTrial(() => trial + 1);
        // setEmojis((prevEmojis) =>
        //   prevEmojis.map((emoji) =>
        //     emoji.id === curCard1.id || emoji.id === newEmoji.id
        //       ? { ...emoji, hidden: true }
        //       : emoji
        //   )
        // );
      }
    }
    if (curCard2) {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) =>
          emoji.id === newEmoji.id || emoji.match
            ? { ...emoji, hidden: false }
            : { ...emoji, hidden: true }
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
        <Footer onReset={handleReset} trial={trial} score={scoreCount} />
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
    <button
      className={emoji.match ? "card match" : "card"}
      onClick={() => onCard(emoji.id)}
    >
      {emoji?.hidden ? "?" : emoji?.e}
    </button>
  );
}

function Footer({ onReset, trial, score }) {
  return (
    <footer className="footer">
      <div className="trial">
        <h2> {score === 12 ? "You WON🏆" : `Trial ${trial}`}</h2>
      </div>
      <button className="reset" onClick={onReset}>
        Reset
      </button>
    </footer>
  );
}
