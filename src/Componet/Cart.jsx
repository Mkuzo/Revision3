import { use, useEffect, useState } from "react"
export default function Cart(){
    const [age,setAge] = useState(13)
    const [score,setScore] = useState(75)
    const [Atendance,setAtendance] = useState(20)
    function handleAge(){
        setAge(age + 1)
    }
    function handleAtend(){
        setAtendance(Atendance + 1)
    }
    function handleScore(){
        setScore(score+1)
    }
    function reset(){
        setAge(0)
        setAtendance(0)
        setScore(0)
    }
    useEffect(function(){
        if(age === 10 && Atendance === 10 && score === 10){
            alert("rechead 10")
        }
    },[age,Atendance,score])
    return(
        <div>
            <p>Name John</p>
            <p>Age: {age}</p>
            <p>score: {score}</p>
            <p>Atendance: {Atendance}</p>
            <button onClick={handleAge}>Increase Age</button>
             <button onClick={handleScore}>Increse Score</button>
             <button onClick={handleAtend}>Increse Atendance</button>
             <button onClick={reset}>Reset</button>
        </div>
    )
}