"use client"
import { useState , useEffect } from "react";

export default function DashboardPage(){
   
    const [currentTime , setCurrentTime] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>(
            setCurrentTime(new Date())
        ) , 1000)

         return () => clearInterval(timer); // cleanup
    },[])

   
    return(
        <div>
            hello dashboard
        </div>
    )
}