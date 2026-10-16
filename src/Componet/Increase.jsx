import { useState,useEffect } from "react"
export default function Increase(){
    const [number,setNumber] = useState(0)
    function increase(){
        setNumber(number + 1)
    }
    function decrease(){
        if(number > 0){
            setNumber(number - 1)
        }
    }
    return(
        <div>
            <p>{number}</p>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    )
}