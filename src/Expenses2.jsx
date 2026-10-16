import { use, useState } from "react"

export default function Expenses2(){
    const [value,setValue] = useState()
    function increase(){
        setValue(value+1)
    }
     return(
        <div>
            <ul>
                <li><input type="checkBox" onClick={increase}/>Readbook</li>
                <li><input type="checkBox" onClick={increase}/>exercise</li>
                <li><input type="checkBox"  onClick={increase}/>DrinkWater</li>
                <li><input type="checkBox" onClick={increase} />HomeWork</li>
            </ul>
        </div>
    )
}