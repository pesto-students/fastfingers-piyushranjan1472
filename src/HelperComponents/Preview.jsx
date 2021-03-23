import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Preview({ randomWord, handleRandomWords }) {
    const word = randomWord.toUpperCase().split('');
    const [userInput, setUserInput] = useState('');

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
        if (userInput === randomWord.toUpperCase()) {
            setUserInput("")
            handleRandomWords();
        }
    }, [handleRandomWords, randomWord, userInput]);

    const handleChange = (e) => {
        setUserInput(e.target.value.toUpperCase());

    }
    return <div className="word">
        {
            word.map((letter, i) => {
                let color = '';
                if (i < userInput.length) {
                    color = (userInput[i] === word[i]) ? "green" : "blue";
                }
                return <span key={i} style={color = { color }}>{letter}</span>
            })
        }
        <div>
            <input className="word-input" type="text" ref={inputRef} value={userInput} onChange={handleChange}></input>
        </div>
    </div>
}
Preview.protoTypes = {
    randomWord: PropTypes.string.isRequired,
    handleRandomWords: PropTypes.func

}