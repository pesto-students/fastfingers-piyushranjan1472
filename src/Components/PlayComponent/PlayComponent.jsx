import React, { useState } from 'react';
import PlayerDetails from '../../HelperComponents/PlayerDetails/PlayerDetails';
import './PlayComponent.css'
import TimeWordContainer from '../../HelperComponents/TimeWordContainer/TimeWordContainer';
import CurrentScore from '../../HelperComponents/CurrentScore/CurrentScore';
import ScoreBoard from '../../HelperComponents/ScoreBoard/ScoreBoard';
import { ImCross } from "react-icons/im";
import FinalScoreComponent from "../FinalScoreComponent/FinalScoreComponent";

export default function PlayComponent({ setIsLoggedIn }) {

    const [isGameOver, setIsGameOver] = useState(false);

    if (isGameOver) {
        return (<div className="play-container">
            <div className="header">
                <PlayerDetails />
                <CurrentScore isGameOver={isGameOver} />
            </div>
            <div className="main-content">
                <FinalScoreComponent setIsGameOver={setIsGameOver} setIsLoggedIn={setIsLoggedIn} />
            </div>
        </div>)
    }

    const stopGameHandler = () => {
        setIsLoggedIn(false);
    }

    return (<div className="play-container">
        <div className="header">
            <PlayerDetails />
            <CurrentScore isGameOver={isGameOver} />
        </div>
        <div className="main-content">
            <ScoreBoard />
            <TimeWordContainer setIsGameOver={setIsGameOver} />
        </div>
        <div className="stop-game">
            <button className="stop-button" onClick={stopGameHandler}>
                <ImCross className="close" />STOP GAME
            </button>
        </div>

    </div>)
}