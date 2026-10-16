import { useEffect,useState } from "react"
export default function Practice3(){
    const [value,setValue] = useState()
    const [data,setData] = useState([])
    function handleInput(e){
        setValue(e.target.value)
    }
    function handleButton(){
        setData(function(pre){
            return([...pre,value])
        })
        console.log(data)
    }
    console.log(value)
    return(
        <div>
            <input type="text" onChange={handleInput} />
            <button onClick={handleButton}>Click</button>
            <ul>
            {data.map(function(res){
                return(
                        <li>{res}</li>
                    
                )
            })}
            </ul>
        </div>
    )
}