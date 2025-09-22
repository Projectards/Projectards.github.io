import {React,useState} from "react";


export const YourTurnPoints = ({remainingPoints,maxPoints,handleEndTurn}) =>
{
    const [disabled,setDisabled] = useState(false);
    return(
        <div className="yourTurnPoints">
            <div>
                <span className="pointsWord">Pozostałe Punkty:</span>
                <span className="remainingPoints">{remainingPoints}</span>
                <span className="pointSlash">/</span>
                <span className="maxPoints">{maxPoints}</span>
            </div>
            <div>
                <button disabled={disabled} id="endTurnButton" onClick={()=>{handleEndTurn(); setDisabled(true);setTimeout(()=>{setDisabled(false);},4000)}}>Zakończ turę</button>
            </div>
        </div>
    )
}