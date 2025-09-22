import React from "react";
import { Card } from "../classes/card";


export const CardStatisticsScreen = ({detailCardStatuses,card,showBool,showBoolSet}) =>
{
    let detailStatusString = "";
    detailCardStatuses.forEach(element => {
        detailStatusString += " "+element[1];
    });
    if(card===undefined)
    {
        card = new Card(0,"Null",0,0,0,"FL","null");
    }
    let imgPath = "/cardImages/"+card.imgSrc;
    return(
        <div className={showBool?"cardShowScreen":"cardShowScreenHidden"} onClick={()=>{showBoolSet(false);}}>
            <img src={imgPath}></img>
            <h1>{card.name}</h1>
            <h3>Koszt:{card.cost}</h3>
            <h3>Atak:{card.attack}</h3>
            <h3>Obrona:{card.defence}</h3>
            <h3>Linia frontu:{card.lineCompatibility}</h3>
            <h3>Status:{detailStatusString}</h3>
        </div>
    );
}