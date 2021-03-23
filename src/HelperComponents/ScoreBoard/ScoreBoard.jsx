import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { convertToMinutes } from "../../UtilityComponents/timeUtility";
import "./ScoreBoard.css";

export default function ScoreBoard() {
    const scoreList = sessionStorage.getItem("gameResults") ? JSON.parse(sessionStorage.getItem("gameResults")) : [];
    const maximumScore = Math.max(...scoreList);
    return <div className="score-board">
        <div className="score-board-title">SCORE BOARD</div>
        <div className="scores">
            {scoreList.map((value, index) => {
                if (value === maximumScore) {
                    return <div key={uuidv4()}>
                        <div className="personal-best">Personal Best</div>
                        <li key={uuidv4()}>Game{index} : {convertToMinutes(value)}</li>
                    </div>
                }
                return <li key={uuidv4()}>Game{index} : {convertToMinutes(value)}</li>
            })}
        </div>

    </div>
}