import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { convertTimeToMMSS } from "../../UtilityComponents/timeUtility";
import "./CurrentScore.css";

export default function CurrentScore({ isGameOver }) {
    const [currentCount, setCount] = useState(0);
    let timer = () => setCount(currentCount + 1);

    const setTimer = () => {
        if (isGameOver) {
            if (currentCount > 0) {
                let previousGameResults = sessionStorage.getItem("gameResults")
                    ? sessionStorage.getItem("gameResults")
                    : "[]";
                previousGameResults = JSON.parse(previousGameResults);
                previousGameResults.push(currentCount);
                sessionStorage.setItem(
                    "gameResults",
                    JSON.stringify(previousGameResults)
                );
            }
            setCount(0);
            return;
        }
        const intervalId = setInterval(timer, 1000);
        return () => clearInterval(intervalId);
    }

    useEffect(setTimer);

    if (isGameOver) {
        return <div className="current-score">
            <div className="flex">
                <div className="info">fast fingers</div>
            </div>
        </div>
    }

    return (
        <div className="current-score">
            <div className="flex">
                <div className="info">fast fingers</div>
            </div>
            <div className="flex">
                <div className="info">
                    SCORE : <span id="currentScore" count={currentCount}>{convertTimeToMMSS(currentCount)}</span>
                </div>
            </div>
        </div>
    );
}

CurrentScore.propTypes = {
    isGameOver: PropTypes.bool.isRequired,
};

CurrentScore.defaultProps = {
    isGameOver: false,
};
