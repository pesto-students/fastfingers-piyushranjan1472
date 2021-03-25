import React, { useState, useEffect, useRef } from 'react';
import { formatCountdownTime } from "../UtilityComponents/timeUtility";
import PropTypes from 'prop-types';

const FULL_DASH_ARRAY = 283;
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: 100
    },
    alert: {
        color: "red",
        threshold: 50
    }
};

export default function Timer({ randomWord, setIsGameOver }) {

    const difficulty = sessionStorage.getItem("difficulty");

    const [difficultyFactor, setDifficultyFactor] = useState(1);
    const [timerValue, setTimerValue] = useState(0);

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
        setTimerValue((randomWord.length / difficultyFactor) * 1000);
        setDifficultyFactor(difficultyFactor => difficultyFactor + 0.01);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [randomWord]);

    let timePassed = 0;
    let currentTimeLeft = timerValue;
    let circleTimerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

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
                    setIsGameOver(true);
                    clearInterval(timerInterval);
                }
            }, 10);
        };
        startTimer();
        startTimerCircle();
        return () => {
            clearInterval(timerInterval);
            onTimesUp()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerValue, randomWord, setIsGameOver]);


    function onTimesUp() {
        clearInterval(circleTimerInterval);
    }

    function startTimerCircle() {
        circleTimerInterval = setInterval(() => {
            timePassed = timePassed += 10;
            currentTimeLeft = timerValue - timePassed;
            if (currentTimeLeft > 0) {
                document.getElementById("timer-clock").innerHTML = `
          <div class="base-timer">
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                  id="base-timer-path-remaining"
                  stroke-dasharray="283"
                  class="base-timer__path-remaining ${remainingPathColor}"
                  d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                  "
                ></path>
              </g>
            </svg>
          </div>
          `;
                setCircleDasharray();
                setRemainingPathColor(currentTimeLeft);
            }
            if (currentTimeLeft === 0) {
                onTimesUp();
            }
        }, 10);
    }

    function setRemainingPathColor(currentTimeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (currentTimeLeft <= timerValue / 2) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
        if (currentTimeLeft <= 700) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = currentTimeLeft / timerValue;
        return rawTimeFraction - (1 / timerValue) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }


    return <div>
        <div id="timer-clock"></div>
        <div id="base-timer-label" className="timer-label">
        </div>

    </div>
}
Timer.propTypes = {
    randomWord: PropTypes.string.isRequired,
    setIsGameOver: PropTypes.func
}