import { useEffect, useState } from "react"
export default function Practice(){
    const [value,setValue] = useState('')
    const [name,setName] = useState([])
    const [click,setClick] = useState(false)
    function handleClick(){
        // setName([parseInt(value)])
        // setName(function(pre){
        //     return[...pre,parseInt(value)]
        // })
        if(click === false){
            setClick(true)
        }else{
            setClick(false)
        }
    }
    function showAlert(){
        if(click === true){
         alert("Welcome")
        }
    }
    useEffect(
        function(){
            showAlert()
        },[click]
    )
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