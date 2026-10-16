import { useEffect, useState } from "react"
export default function Time2(){
    const [value,setValue] = useState()
    const [value2,setValue2] = useState()
    const newDays = new Date()
    function showTime(){
        const hour = newDays.getHours()
        const minutes = newDays.getMinutes()
        const combaine = `${hour} : ${minutes}`
        const date = newDays.getDate()
        const year = newDays.getFullYear()
        const month = newDays.getMonth() + 1
        const combaine2 = `${month} / ${date} / ${year}`
        setValue(combaine)
        setValue2(combaine2)
        console.log(month)
    }
    useEffect(function(){
        showTime()
    },[])
    return(
        <div>
            <p>{value}</p>
            <p>{value2}</p>
        </div>
    )
}