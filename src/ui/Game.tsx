import { useEffect, useReducer, useState } from "react";
import { Board } from "./Board";
import { Menu } from "./Menu";
import { Music } from "./Music";
import { Popup } from "./Popup";
import { gameReducer, initialState } from "../utils/gameReducer";

export function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [isMusic, setIsMusic] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    if (state.selectedCards.length === 2) {
      const timer = setTimeout(() => {
        dispatch({
          type: "CHECK_MATCH",
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.selectedCards]);

  function handleCardClick(cardId: number) {
    dispatch({
      type: "OPEN_CARD",
      cardId: cardId,
    });
  }

  function startNewGame() {
    dispatch({
      type: "CLOSE_ALL_CARDS",
    });

    setTimeout(() => {
      dispatch({
        type: "START_GAME",
      });
    }, 500);
  }

  function handlePopup() {
    if (!musicStarted) {
      setMusicStarted(true);
      setIsMusic(true);
    }

    dispatch({
      type: "CLOSE_POPUP",
    });
  }

  return (
    <>
      <Popup popup={state.gamePopup} onPopup={handlePopup} />
      <Menu
        onStartGame={startNewGame}
        onMusic={() => setIsMusic(!isMusic)}
        isMusic={isMusic}
        volume={volume}
        onVolumeChange={setVolume}
      />
      <Music isPlaying={isMusic} volume={volume} />
      <Board
        cards={state.cards}
        lives={state.lives}
        onCardClick={handleCardClick}
      />
    </>
  );
}
