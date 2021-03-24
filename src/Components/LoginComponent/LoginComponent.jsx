import React, { useState, useEffect, useRef } from "react";
import { FaKeyboard, FaPlay } from "react-icons/fa";
import "./LoginComponent.css";

export default function LoginComponent({ setIsLoggedIn }) {

    const [userName, setUserName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const inputRef = useRef();
    // let error = '';

    useEffect(() => {
        if (sessionStorage.getItem("userName") && sessionStorage.getItem("difficulty")) {
            setUserName(sessionStorage.getItem("userName"));
            setDifficulty(sessionStorage.getItem("difficulty"));
        }
        inputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName === '') {
            return setErrorMessage("Player Name is Required");
        }
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("difficulty", difficulty);
        setIsLoggedIn(true);
    }
    const onChangeHandler = (e) => {
        setErrorMessage('');
        setUserName(e.target.value.toUpperCase());
        sessionStorage.clear();
    }
    return (
        <div className="login-page">
            <FaKeyboard className="keyboard-icon" />
            <div className="heading">fast fingers</div>
            <div className="description"><span> the ultimate typing game</span></div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form">
                    <div className="input-field">
                        <input ref={inputRef} className="dropdown-input" type="text" value={userName} onChange={onChangeHandler} placeholder="Enter Your Name" required />
                        <span className="field-error">{errorMessage}</span>
                    </div>
                    <div className="dropdown">
                        <select className="dropdown-input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div className="button-container">
                        <button className="button" type="submit">
                            <FaPlay className="play-button" />
                            START GAME
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
