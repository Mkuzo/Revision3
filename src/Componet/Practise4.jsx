import { useEffect,useState } from "react"
export default function Practice4(){
    // const [count,setCount] = useState(0)
    // function increase(){
    //     setCount(count + 1)
    // }
    // useEffect(function(){
    //     if(count === 10){
    //         alert(10)
    //     }
    // },[count])
    const [name,setName] = useState("")
    function handleName(e){
        setName(e.target.value)
    }
    useEffect(function(){
        
    },[])
    return(
        <div>
            {/* <p>{count}</p>
            <button onClick={increase}>Click</button> */}
            <input type="text" placeholder="EnterName" onChange={handleName} />
            <p>{name}</p>
            <button>Click</button>
        </div>
    )
}