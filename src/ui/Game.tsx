import { useState } from "react";
import { Board } from "./Board";
import { Menu } from "./Menu";
import { Music } from "./Music";
import { initializeGame, type Cards } from "../utils/initializeGame";
import { Popup } from "./Popup";

const baseUrl = import.meta.env.BASE_URL;

const initData = [
  {
    name: "card_1",
    src: `${baseUrl}/assets/card_1.webp`,
  },
  {
    name: "card_2",
    src: `${baseUrl}/assets/card_2.webp`,
  },
  {
    name: "card_3",
    src: `${baseUrl}/assets/card_3.webp`,
  },
  {
    name: "card_4",
    src: `${baseUrl}/assets/card_4.webp`,
  },
  {
    name: "card_5",
    src: `${baseUrl}/assets/card_5.webp`,
  },
  {
    name: "card_6",
    src: `${baseUrl}/assets/card_6.webp`,
  },
  {
    name: "card_7",
    src: `${baseUrl}/assets/card_7.webp`,
  },
  {
    name: "card_8",
    src: `${baseUrl}/assets/card_8.webp`,
  },
];

const defaultLives = 6;

export function Game() {
  const [cards, setCards] = useState<Cards[]>(() => initializeGame(initData));
  const [selectedCards, setSelectedCards] = useState<Cards[]>([]);
  const [isMusic, setIsMusic] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [lives, setLives] = useState(defaultLives);
  const [gamePopup, setGamePopup] = useState("start");

  function handleCardClick(cardId: number) {
    const clickedCard = cards.find((card) => card.id === cardId);

    if (
      !clickedCard ||
      clickedCard.isOpened ||
      clickedCard.match ||
      selectedCards.length >= 2 ||
      lives === 0
    ) {
      return;
    }

    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, isOpened: true };
      }
      return card;
    });

    setCards(newCards);

    if (selectedCards.length === 0) {
      setSelectedCards([clickedCard]);
    } else {
      setSelectedCards([...selectedCards, clickedCard]);
      if (selectedCards[0].name === clickedCard.name) {
        setTimeout(() => {
          const matchedCards = newCards.map((card) => {
            if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
              return { ...card, match: true };
            }
            return card;
          });

          if (matchedCards.every((card) => card.match)) {
            setGamePopup("win");
          }

          const addLive = lives + 1;
          setCards(matchedCards);
          setSelectedCards([]);
          setLives(addLive);

        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card) => {
            if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
              return { ...card, isOpened: false };
            }

            return card;
          });

          const loseLive = lives - 1;
          setCards(resetCards);
          setSelectedCards([]);
          setLives(loseLive);

          if (loseLive === 0) {
            setGamePopup("lose");
          }
        }, 1000);
      }
    }
  }

  function startNewGame() {
    const closeAllCards = cards.map((card) => {
      return { ...card, isOpened: false };
    });
    
    setCards(closeAllCards);

    setTimeout(() => {
      setCards(initializeGame(initData));
    }, 500);
    
    setSelectedCards([]);
    setGamePopup("");
    setLives(defaultLives);
  }

  function handlePopup() {
    if (!musicStarted) {
      setMusicStarted(true);
      setIsMusic(true);
    }

    setGamePopup("");
  }

  return (
    <>
      <Popup popup={gamePopup} onPopup={handlePopup} />
      <Menu
        onStartGame={startNewGame}
        onMusic={() => setIsMusic(!isMusic)}
        isMusic={isMusic}
      />
      <Music isPlaying={isMusic} />
      <Board cards={cards} lives={lives} onCardClick={handleCardClick} />
    </>
  );
}
