import type { Cards } from "../utils/initializeGame";
import { Card } from "./Card";

type Props = {
  cards: Cards[];
  onCardClick: (cardId: number) => void;
  lives: number;
};

export function Board({ cards, lives, onCardClick }: Props) {
  return (
    <div>
      <div className="game__info">
        <div className="game__info__container">
          <span className="game__info__description">
            Количество попыток: {lives}
          </span>
        </div>
      </div>
      <div className="board">
        {cards.map((card, idx) => {
          return (
            <Card
              id={card.id!}
              name={card.name}
              src={card.src}
              isOpened={card.isOpened!}
              isMatch={card.match!}
              key={idx}
              onCardClick={() => onCardClick(card.id!)}
            />
          );
        })}
      </div>
    </div>
  );
}
