import React, { useEffect, useState } from 'react';
import Preview from '../../HelperComponents/Preview';
import Timer from '../../HelperComponents/Timer';
import dictionary from "../../data/dictionary.json";
import './TimeWordContainer.css';


export default function TimeWordContainer({ setIsGameOver }) {

    const difficulty = sessionStorage.getItem("difficulty");

    const [randomWord, setRandomWord] = useState('');

    const wordsList = dictionary.filter(word => {
        if (difficulty === "EASY") {
            return word.length <= 4;
        }
        if (difficulty === "MEDIUM") {
            return word.length > 4 && word.length <= 8;
        }
        if (difficulty === "HARD") {
            return word.length > 8;
        }
        return null;
    }
    );

    const handleRandomWords = () => {
        setRandomWord(wordsList[Math.floor(Math.random() * wordsList.length)]);
    }



    useEffect(() => {
        setRandomWord(wordsList[Math.floor(Math.random() * wordsList.length)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (<div className="timer-container">
        <div className="timer">
            <Timer randomWord={randomWord} setIsGameOver={setIsGameOver} />
        </div>
        <div className="words">
            <Preview randomWord={randomWord} handleRandomWords={handleRandomWords} />
        </div>
    </div>)
}