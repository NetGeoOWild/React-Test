import { Card } from "./Card";
import type { Cards } from "./Game";

type Props = {
  cards: Cards[];
  onCardClick: (cardId: number) => void;
};

export function Board({ cards, onCardClick }: Props) {

  return (
    <div className="board">
      {cards.map((card, idx) => {
        return (
          <Card
            id={card.id!}
            name={card.name}
            src={card.src}
            isOpened={card.isOpened!}
            key={idx}
            onCardClick={() => onCardClick(card.id!)}
          />
        );
      })}
    </div>
  );
}
