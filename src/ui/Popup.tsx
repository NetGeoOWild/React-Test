type Props = {
  popup: string;
  onPopup: () => void;
};

export function Popup({ popup, onPopup }: Props) {
  return (
    <div className={`overlay ${popup ? "active" : ""}`}>
      <div className="popup">
        <span className="popup-icon">
          <svg
            xmlns="http://w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="gold"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            xmlns="http://w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="gold"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg
            xmlns="http://w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="gold"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>

        <h2 id="popup-title">
          {popup === "start" && "Добро пожаловать в игру 'MEMO'"}
          {popup === "win" && "Поздравляем вы победили!"}
          {popup === "lose" && "Вы проиграли - закончились попытки :("}
        </h2>

        <p>
          {popup === "start" &&
            "Вам необходимо запоминать расположение карточек и открывать парные карточки"}
          {(popup === "win" ||popup === "lose") &&
              "Игра окончена, что-бы начать новую игру, нажмите в игровом меню - 'начать новую игру'"}
        </p>

        <div className="popup-actions">
          <button className="btn-primary" onClick={onPopup}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
}
