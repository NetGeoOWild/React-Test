type Props = {
  id: number;
  src: string;
  name: string;
  isOpened: boolean;
  match: boolean;
  onCardClick: (cardId: number) => void;
};
export function Card({ id, src, name, isOpened, match, onCardClick }: Props) {
  return (
    <div className={`card ${isOpened ? "flipped" : " "}`} onClick={() => onCardClick(id)}>
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
        
        <div className="card__back">
          <img
            className="card__img"
            src={src}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
}
