import { useEffect, useState } from "react"

 export const useDeviceSize = () => {
    const [deviceType, setDeviceType] = useState<"mobile" |"tablet" | "pc">()
    useEffect(() => {
      if(window.innerWidth < 768){
        setDeviceType("mobile")
      }else if(window.innerWidth < 1024){
        setDeviceType("tablet")
      }else{
        setDeviceType("pc")
      }
    }, [])
    return {deviceType}
 }