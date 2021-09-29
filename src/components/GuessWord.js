import React from 'react';
import Game from "./Game";
import DATA from "../MockData/words";

export default function GuessWord() {
    return (
        <div>
            <Game words={DATA} attempts={DATA.length}  />,
        </div>
    );
}