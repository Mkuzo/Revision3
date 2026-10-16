import { useEffect, useState } from "react"

export default function Digital(){
    const time  = new Date()
    const [value,setValue] = useState()
    const [store,setStore] = useState()
    function showTime(){
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const second = time.getSeconds()
        const combaine = `${hours}:${minutes}:${second}`
        setValue(combaine)
        console.log(hours)

        setStore(hours)
    }
    useEffect(function(){
        showTime()
    },[])
    useEffect(function(){
        let newTime;
        if(store > 12){
            alert("AfterNoon")
        }else{
            alert("Good Morning")
        }
    },[store])
    return(
        <div>
            <p>{value}</p>
        </div>
    )
}