import { useEffect } from "react";
import { getTimeByTimezoneOffset } from "../../utilities/utility";
function TimeUpdation (props : { timeZone : number, setDate : React.Dispatch<React.SetStateAction<Date>>}) : void{
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            const now = getTimeByTimezoneOffset(props.timeZone);
            props.setDate(now);
        },1000);
        return ()=> clearInterval(intervalId);
    },[]);

}