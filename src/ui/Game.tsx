import { useState } from "react";
import { Board } from "./Board";

export type Cards = {
  id?: number;
  isOpened?: boolean;
  match?: boolean;
  src: string;
  name: string;
};

const initData = [
  {
    name: "card_1",
    src: "/assets/card_1.webp",
  },
  {
    name: "card_2",
    src: "/assets/card_2.webp",
  },
  {
    name: "card_3",
    src: "/assets/card_3.webp",
  },
  {
    name: "card_4",
    src: "/assets/card_4.webp",
  },
  {
    name: "card_5",
    src: "/assets/card_5.webp",
  },
  {
    name: "card_6",
    src: "/assets/card_6.webp",
  },
  {
    name: "card_7",
    src: "/assets/card_7.webp",
  },
  {
    name: "card_8",
    src: "/assets/card_8.webp",
  },
];

export function Game() {
  function initializeGame(cards: Cards[]) {
    const rawCards = [...cards, ...cards];

    for (let i = rawCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [rawCards[i], rawCards[j]] = [rawCards[j], rawCards[i]];
    }

    return rawCards.map((card, index) => {
      return {
        ...card,
        id: index + 1,
        isOpened: false,
        match: false,
      };
    });
  }

  const [cards, setCards] = useState<Cards[]>(() => initializeGame(initData));
  const [selectedCards, setSelectedCards] = useState<Cards[]>([]);

  function handleCardClick(cardId: number) {
    const clickedCard = cards.find((card) => card.id === cardId);

    if (
      !clickedCard ||
      clickedCard.isOpened ||
      clickedCard.match ||
      selectedCards.length >= 2
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
        const matchedCards = newCards.map((card) => {
          if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
            return { ...card, match: true };
          }
          return card;
        });

        setCards(matchedCards);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card) => {
            if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
              return { ...card, isOpened: false };
            }

            return card;
          });

          setCards(resetCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  }

  return <Board cards={cards} onCardClick={handleCardClick} />;
}
