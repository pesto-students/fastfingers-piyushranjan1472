import React, { useState } from 'react';
import PlayerDetails from '../../HelperComponents/PlayerDetails/PlayerDetails';
import './PlayComponent.css'
import TimeWordContainer from '../../HelperComponents/TimeWordContainer/TimeWordContainer';
import CurrentScore from '../../HelperComponents/CurrentScore/CurrentScore';
import ScoreBoard from '../../HelperComponents/ScoreBoard/ScoreBoard';
import FinalScoreComponent from "../FinalScoreComponent/FinalScoreComponent";
import { GiCrossedSabres } from "react-icons/gi";

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
        setIsGameOver(true);
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
                <GiCrossedSabres className="close" />STOP GAME
            </button>
        </div>

    </div>)
}