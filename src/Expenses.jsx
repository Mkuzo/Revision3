import { useState,useEffect } from "react"
export default function Expenses(){
    const [food,setFood] = useState(500)
    const [transport,setTransport] = useState(200)
    const [book,setBook] = useState(300)
    const [total,setTotal] = useState(1000)
    function handleFood(){
        setFood(food + 1)
    }
    function handleTransport(){
        setTransport(transport + 1)
    }
    function handleBook(){
        setBook(book + 1)
    }
    function handleTotal(){
        setTotal(book+transport+food)
    }
    useEffect(function(){
        if(total === 1050){
            alert("Your Expenditure has reached the max level")
        }
    },[total])
    return(
        <div>
            <p>Food: {food}</p>
            <p>Transport: {transport}</p>
            <p>Books: {book}</p>
            <p>Total: {total}</p>
            <button onClick={handleFood}>Increase Food</button>
            <button onClick={handleTransport}>Increse Transport</button>
            <button onClick={handleBook}>Increase Book</button>
            <button onClick={handleTotal}>Total</button>
        </div>
    )
}