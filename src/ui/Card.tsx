type Props = {
  id: number;
  src: string;
  name: string;
  isOpened: boolean;
  isMatch: boolean;
  onCardClick: (cardId: number) => void;
};
export function Card({ id, src, name, isOpened, isMatch, onCardClick }: Props) {
  return (
    <div
      className={`card ${isOpened ? "flipped" : ""} ${isMatch ? "matched" : ""}`}
      onClick={() => onCardClick(id)}
    >
      <div className="card__inner">
        <div className="card__front">
          <div className="card__pattern">
            <div className="card__pattern-dots"></div>
            <div className="card__pattern-lines"></div>
            <div className="card__back-content">
              <span>✦</span>
            </div>
          </div>
        </div>

        <div className={`card__back ${isMatch ? "matched" : ""}`}>
          <img className="card__img" src={src} alt={name} />
        </div>
      </div>
    </div>
  );
}
