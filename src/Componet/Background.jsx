import { useState, useEffect } from "react"
export default function Background(){
    const [dark,setDark] = useState("div")
    function change(){
        if(dark === "div"){
         setDark("div2")   
        }
        else{
            setDark("div")
        }
    }
    return(
        <div>
            <button onClick={change}>Click</button>
            <div className={dark}>


            </div>
        </div>
    )
}