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
          <div className="game__info__lives-hearts">
            {lives > 0 ? Array.from({ length: lives }).map((_, i) => (
              <span key={i} className={`heart ${i >= lives ? "lost" : ""}`}>
                ❤️
              </span>
            )) : "ПОПЫТОК БОЛЬШЕ НЕТ"}
          </div>
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
