type Props = {
  onStartGame: () => void;
  onMusic: () => void;
  isMusic: boolean;
};

export function Menu({ onStartGame, onMusic, isMusic }: Props) {
  return (
    <div className="menu">
      <div className="menu__container">
        <button className="menu__btn" onClick={onStartGame}>
          НАЧАТЬ НОВУЮ ИГРУ
        </button>
        <button className="menu__btn" onClick={onMusic}>
          {isMusic ? "Выключить музыку" : "Включить музыку"}
        </button>
      </div>
    </div>
  );
}
