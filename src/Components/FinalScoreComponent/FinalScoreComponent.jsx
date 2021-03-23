import React from 'react';
import { convertToMinutes } from "../../UtilityComponents/timeUtility";
import { MdRefresh } from "react-icons/md";
import "./FinalScoreComponent.css";

export default function FinalScoreComponent({ setIsLoggedIn, setIsGameOver }) {

    const scoreList = sessionStorage.getItem("gameResults") ? JSON.parse(sessionStorage.getItem("gameResults")) : [];
    const maximumScore = Math.max(...scoreList);
    const currentScore = document.getElementById("currentScore").getAttribute("count");

    const playAgainHandler = () => {
        setIsGameOver(false);
    }

    const gameQuitHandler = () => {
        setIsLoggedIn(false);
    }

    if (maximumScore < currentScore) {
        return (<div className="final-score">
            <div className="center">
                <div className="game-score">SCORE : GAME {scoreList.length}</div>
                <div className="game-time">{convertToMinutes(currentScore)}</div>
                <div className="new-high-score">New High Score</div>
                <div className="play-again">
                    <button className="play-again-button" onClick={playAgainHandler}>
                        <MdRefresh className="refresh-icon" /> Play Again
            </button>
                </div>
            </div>
            <div className="quit-button" onClick={gameQuitHandler}>QUIT</div>
        </div>)
    }

    return (<div className="final-score">
        <div className="center">
            <div className="game-score">SCORE : GAME {scoreList.length}</div>
            <div className="game-time">{convertToMinutes(currentScore)}</div>
            <div className="play-again">
                <button className="play-again-button" onClick={playAgainHandler}>
                    <MdRefresh className="refresh-icon" /> Play Again
                </button>
            </div>
        </div>
        <div className="quit-button" onClick={gameQuitHandler}>QUIT</div>
    </div>)
}