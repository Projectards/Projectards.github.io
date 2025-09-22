import {React,useState} from "react";


export const EnemyTurnPoints = ({remainingPoints,maxPoints}) =>
{
    return(
        <div className="enemyTurnPoints">
            <span className="pointsWord">Pozostałe Punkty:</span>
            <span className="remainingPoints">{remainingPoints}</span>
            <span className="pointSlash">/</span>
            <span className="maxPoints">{maxPoints}</span>
        </div>
    )
}