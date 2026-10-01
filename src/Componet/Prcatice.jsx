import { useEffect, useState } from "react"
export default function Practice(){
    const [value,setValue] = useState('')
    const [name,setName] = useState([])
    function handleClick(){
        setName([parseInt(value)])
        setName(function(pre){
            return[...pre,parseInt(value)]
        })
    }
    function handleChange(e){
        setValue(e.target.value)
    }
    console.log(value)
    console.log(name)
    return(
        <div>
            <input type="text" onChange={handleChange} />
            <button onClick={handleClick}>Click</button>
        </div>   
    )
}