import { useState,useEffect } from "react"
export default function Input(){
    const myObj = {
        name: "",
        score: ""
    }
    const [array,setArray] = useState([])
    const [value,setValue] = useState(myObj)
    function handleValue(e){
        const {name,value} = e.target
        setValue(function(pre){
            return({...pre,[name]:value})
        })
        console.log(value)
    }
    function handleSubmit(){
        setArray(function(pre){
            return([...pre,value])
        })
    }
    console.log(array)
    return(
        <div>
            <input type="text" name="name" onChange={handleValue} placeholder="Student Name"/>
            <input type="text" name="score" onChange={handleValue} placeholder="Score" />
            <button onClick={handleSubmit}>Send</button>
        </div>
    )
}