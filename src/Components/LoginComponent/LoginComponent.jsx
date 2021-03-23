import React, { useState, useEffect } from "react";
import { FaKeyboard, FaPlay } from "react-icons/fa";
import "./LoginComponent.css";

export default function LoginComponent({ setIsLoggedIn }) {

    const [userName, setUserName] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");

    useEffect(() => {
        if (sessionStorage.getItem("userName") && sessionStorage.getItem("difficulty")) {
            setUserName(sessionStorage.getItem("userName"));
            setDifficulty(sessionStorage.getItem("difficulty"));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("difficulty", difficulty);
        setIsLoggedIn(true);
    }
    const onChangeHandler=(e)=>{
        setUserName(e.target.value.toUpperCase());
        sessionStorage.clear();
    }
    return (
        <div className="login-page">
            <FaKeyboard className="keyboard-icon" />
            <div className="heading">fast fingers</div>
            <div className="description"><span> the ultimate typing game</span></div>

            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="input-field">
                        <input className="dropdown-input" type="text" value={userName} onChange={onChangeHandler} placeholder="Enter Your Name" required />
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
