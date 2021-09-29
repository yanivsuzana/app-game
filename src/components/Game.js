import React, { useState, useEffect , useRef} from "react";
import styled from "styled-components";
import AnswerBox from "./AnswerBox";
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, selectCount} from "../features/counter/counterSlice";
import { useHistory } from "react-router-dom";


const CentreWrapper = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
`;

const Counter = styled.div`
font-size: 29px;
font-weight: bolder;
` ;

const Word = styled(({ flag, ...props }) => <div {...props}>{flag}</div>)`
  font-size: 5em;
  line-height: 1em;
  padding: 0;
  margin: 0;
`;

const Results = styled(({ score, attempts, ...props }) => (
    <div {...props}>
        Score: <span>{score}</span>, Attempts: <span>{attempts}</span>
    </div>
))`
  display: block;
  font-size: 1.5em;
  span {
    font-weight: bold;
  }
`;

const shuffle = arr => [...arr].sort();

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}



export default props => {
    const [words, setWords] = useState(() => shuffle(props.words));
    const [attempts, setAttempts] = useState(props.attempts);
    const dispatch = useDispatch();
    const count = useSelector(selectCount);
    let [counter, setCount] = useState(0);
    const [incrementAmount, setIncrementAmount] = useState('0');
    let history = useHistory();


    let Timer = useInterval(() => {
        setCount(counter + 1);
        if(counter==30){
            setCount(0);
            onIncorrect();
        }
    }, 1000);


    const nextWord = () => {
        if(words.length==1){
            console.log('game over')
            history.push({
                pathname: '/GameOver',
            });
            return
        }
        setWords(words.length > 1 ? words.slice(1) : shuffle(props.words));
        setAttempts(props.attempts);
    };

    const onCorrect = () => {
        clearInterval(Timer);
        setCount(0);
        dispatch(increment())
        nextWord();
    };

    const onIncorrect = () => {
        if (attempts > 1) {
            setAttempts(attempts - 1);
            dispatch(decrement())
        }
        if(count==1){
            history.push({
                pathname: '/GameOver',
            });
            return
        }
    };

    String.prototype.replaceAt=function(index, char) {
        let a = this.split("");
        a[index] = char;
        return a.join("");
    }
    let [{ emoji, name }] = words;
    let WordToGuess=emoji;

    WordToGuess = WordToGuess.replaceAt(0, "_");
    WordToGuess = WordToGuess.replaceAt(emoji.length/2, "_");

    useEffect(() => console.log(WordToGuess), [name]);

    return (
        <CentreWrapper>
            <Word flag={WordToGuess} />
            <AnswerBox
                answer={name}
                onCorrect={onCorrect}
                onIncorrect={onIncorrect}
            />
            <Counter>{counter}</Counter>
            <Results score={count} attempts={attempts} />
        </CentreWrapper>
    );
};