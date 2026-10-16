import { useEffect, useState } from "react"

export default function Expenses3(){
    const [value,setValue] = useState(0)
    function handleInput(e){
        setValue(e.target.value)
        console.log(value)
    }
    function add(){
        setValue(value+30)
    }
    useEffect(function(){
        add()
    },[])
    return(
        <div>
            <input type="text" onChange={handleInput} />
            <p>{value}</p>
            <button onClick={add}>Add</button>
        </div>
    )
}