import {Link} from "react-router-dom";
import React from "react";


export default function Home() {
    return (
        <div>
            <h2 className="white">Guess the word is simple game</h2>
            <div className="btn">
                <Link to="/GuessWord">Start Game</Link>
            </div>
        </div>
    );
}
