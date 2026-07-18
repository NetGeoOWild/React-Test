export type Cards = {
  id?: number;
  isOpened?: boolean;
  match?: boolean;
  src: string;
  name: string;
};

export function initializeGame(cards: Cards[]) {
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
