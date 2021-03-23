import React, { useState, useEffect, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';

import ProgressClock  from "./ProgressClock/ProgressClock";

export default function Timer({ randomWord, setIsGameOver }) {

    const difficulty = sessionStorage.getItem("difficulty");

    function reducer(state) {
        if (state < 2000) {
            return 2000;
        }
        return (randomWord.length / difficultyFactor) * 1000;
    }

    const [difficultyFactor, setDifficultyFactor] = useState(1);
    const [timerValue, setTimerValue] = useReducer(reducer, 0);

    let timeLeft = useRef(0);

    useEffect(() => {
        if (difficulty === "EASY") {
            setDifficultyFactor(1)
        }
        if (difficulty === "MEDIUM") {
            setDifficultyFactor(1.5)
        }
        if (difficulty === "HARD") {
            setDifficultyFactor(2)
        }
    }, [difficulty]);

    useEffect(() => {
        setTimerValue();
        setDifficultyFactor(difficultyFactor => difficultyFactor + 0.01);

    }, [randomWord]);


    const formatCountdownTime = (time) => {
        let seconds = Math.floor(time / 1000);
        let millisec = (Math.floor(time % 1000) / 10).toFixed(0);

        if (millisec < 10) {
            millisec = `0${millisec}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${seconds}:${millisec}`;
    }

    useEffect(() => {
        let timerInterval = null;
        let timePassed = 0;
        const startTimer = () => {
            timerInterval = setInterval(() => {
                timePassed = timePassed += 10;
                timeLeft.current = timerValue - timePassed;
                if (timeLeft.current > 0) {
                    document.getElementById('base-timer-label').innerHTML = formatCountdownTime(timeLeft.current);
                }
                if (timeLeft.current <= 0) {
                    setIsGameOver(true)
                    clearInterval(timerInterval);
                }
            }, 10);
        };
        startTimer();
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerValue, randomWord, setIsGameOver]);


    return <div>
        <ProgressClock progress={20} />
        <div id="base-timer-label" className="timer-label">
        </div>

    </div>
}
Timer.propTypes = {
    randomWord: PropTypes.string.isRequired,
    setIsGameOver: PropTypes.func
}