import { initializeGame, type Cards } from "./initializeGame";

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

export type State = {
  cards: Cards[];
  selectedCards: Cards[];
  lives: number;
  gamePopup: string;
};

export const initialState: State = {
  cards: initializeGame(initData),
  selectedCards: [],
  lives: defaultLives,
  gamePopup: "start",
};

export type Action =
  | {
      type: "OPEN_CARD";
      cardId: number;
    }
  | {
      type: "CHECK_MATCH";
    }
  | {
      type: "START_GAME";
    }
  | {
      type: "CLOSE_ALL_CARDS";
    }
  | {
      type: "CLOSE_POPUP";
    };

export function gameReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_CARD": {
      const clickedCard = state.cards.find(
        (card: Cards) => card.id === action.cardId,
      );

      if (
        !clickedCard ||
        clickedCard.isOpened ||
        clickedCard.match ||
        state.selectedCards.length >= 2 ||
        state.lives === 0
      ) {
        return state;
      }

      const newCards = state.cards.map((card: Cards) => {
        if (card.id === action.cardId) {
          return { ...card, isOpened: true };
        }
        return card;
      });

      return {
        ...state,
        cards: newCards,
        selectedCards: [...state.selectedCards, clickedCard],
      };
    }

    case "CHECK_MATCH": {
      if (state.selectedCards.length !== 2) {
        return state;
      }

      const [firstCard, secondCard] = state.selectedCards;

      if (firstCard.name === secondCard.name) {
        const matchedCards = state.cards.map((card: Cards) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {
              ...card,
              match: true,
            };
          }

          return card;
        });

        const isWin = matchedCards.every((card: Cards) => {
          return card.match;
        });

        if (isWin) {
          return {
            ...state,
            cards: matchedCards,
            selectedCards: [],
            gamePopup: "win",
          };
        }

        return {
          ...state,
          cards: matchedCards,
          selectedCards: [],
          lives: state.lives + 1,
        };
      } else {
        const resetCards = state.cards.map((card: Cards) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, isOpened: false };
          }

          return card;
        });

        const newLives = state.lives - 1;

        return {
          ...state,
          cards: resetCards,
          selectedCards: [],
          lives: newLives,
          gamePopup: newLives === 0 ? "lose" : state.gamePopup,
        };
      }
    }

    case "START_GAME": {
      return {
        ...state,
        cards: initializeGame(initData),
        selectedCards: [],
        gamePopup: "",
        lives: defaultLives,
      };
    }

    case "CLOSE_POPUP": {
      return {
        ...state,
        gamePopup: "",
      };
    }

    case "CLOSE_ALL_CARDS": {
      return {
        ...state,
        cards: state.cards.map((card) => ({
          ...card,
          isOpened: false,
        })),
      };
    }

    default:
      return state;
  }
}
