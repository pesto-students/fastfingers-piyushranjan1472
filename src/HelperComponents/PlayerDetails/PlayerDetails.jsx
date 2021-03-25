import React from 'react';
import { BsPersonFill } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import "./PlayerDetails.css"

export default function PlayerDetails() {
    const userName = sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : "";
    const difficulty = sessionStorage.getItem("difficulty") ? sessionStorage.getItem("difficulty") : "";

    return <div className="top-left">
        <div className="person-name">
            <BsPersonFill className="person" />{userName}

        </div>
        <div className="difficulty">
            <FaGamepad className="game-pad" />LEVEL : {difficulty}

        </div>
    </div>
}

