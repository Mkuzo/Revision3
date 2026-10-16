import { useEffect } from "react"

export default function Days(){
    const time = new Date()
    function handelTime(){
        const days = time.getDay()
        const combaine = Convert(days)
        console.log("Combine",combaine)
    }
    function Convert(days){
        console.log("Days",days)
        if(days === 3){
            return "Wednsday"
        }
        if(days === 4){
            return "Thursday"
        }
        if(days === 5){
            return "Friday"
        }
        if(days === 6){
            return "saturday"
        }
        if(days === 7){
            return "Sunday"
        }
        else{
            return "error"
        }
    }
    useEffect(function(){
        handelTime()
    },[])
    return(
        <div>
            
        </div>
    )
}