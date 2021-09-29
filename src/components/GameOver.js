import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {selectCount} from "../features/counter/counterSlice";


function GameOver() {
    const dispatch = useDispatch();
    const score = useSelector(selectCount);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(name.length<2){
          alert('name should contain at least 2 letters')
            return
        }
        if(phone.length<10){
            alert('phone is required min 10 digits')
            return
        }
        alert('sent successfully')
    }
    return (
        <div className='divcenter'>
            <h2>GameOver</h2>
            <div>
                your score for this game is  {score}
            </div>
            <form className="gameover" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </label>
                <button onClick={handleSubmit}>send data</button>
            </form>
        </div>
    );
}

export default GameOver;