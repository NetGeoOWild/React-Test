import { useState } from "react";

type Props = {
  onStartGame: () => void;
  onMusic: () => void;
  onVolumeChange: (value: number) => void;
  isMusic: boolean;
  volume: number;
};

export function Menu({
  onStartGame,
  onMusic,
  isMusic,
  volume,
  onVolumeChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleStartGame = () => {
    setIsOpen(!isOpen);
    onStartGame();
  };

  return (
    <>
      {!isOpen && (
        <button className="burger-btn" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      )}

      <div className={`menu ${isOpen ? "menu--open" : ""}`}>
        <div className="menu__container">
          <button className="menu__close-btn" onClick={toggleMenu}>
            ✕
          </button>
          <button className="menu__btn" onClick={handleStartGame}>
            НАЧАТЬ НОВУЮ ИГРУ
          </button>
          <button className="menu__btn" onClick={onMusic}>
            {isMusic ? "Выключить музыку" : "Включить музыку"}
          </button>
          <div className="label__group">
            <span className="label">Громкость музыки</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              style={
                {
                  "--progress": `${volume}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>

      {isOpen && <div className="menu__overlay" onClick={toggleMenu}></div>}
    </>
  );
}
