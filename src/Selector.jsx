import { useEffect,useState } from "react"
export default function Selector(){
    const [apple,setApple] = useState()
    const [banana,setBanana] = useState()
    const [orange,setOrange] = useState()
    function handleShowFruits(fruit){
        console.log(fruit)
    }
    return(
        <div>
            <button onClick={function(){
                handleShowFruits("Apple")
            }}>Apple</button>
            <button onClick={function(){
                handleShowFruits("Banana")
            }}>Banana</button>
            <button onClick={function(){
                {handleShowFruits("Orange")}}}>Orange</button>
        </div>
    )
}