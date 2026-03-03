"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PostLogin(){
    const router= useRouter()

    useEffect(()=>{
        const checkHandle= async ()=>{
            const res= await fetch("/api/user-handle")
            const data= await res.json()
            if(data.handle){
                router.replace("/dashboard")
            }else{
                router.replace("/generate")
            }
        }
        checkHandle()
    },[router])

    return(
         <div className="flex items-center justify-center h-screen">
      <p>Checking account...</p>
    </div>
    )
}