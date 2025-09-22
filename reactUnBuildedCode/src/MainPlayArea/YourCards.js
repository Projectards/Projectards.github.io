import React from "react";
import { CardVisible } from "./CardVisible";
import { useState } from "react";
import {Card} from "../classes/card.js";
import { YourTurnPoints } from "./YourTurnPoints";
import {YourHealth} from "./YourHealth";

export const YourCards = ({statusesAdded,detailFunction,showDetails,yourHP,yourCards,onCardSelect,yourTurnPoints,yourMaxPoints,handleEndTurn}) =>
{

    return(
        <div className="yourCards">
            <YourHealth yourHP={yourHP}></YourHealth>
            <div className="yourCardsInHand">
                {yourCards.map(karta => (
                    <div onClick={(event)=>{onCardSelect(event,karta)}}>
                        <CardVisible statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} card={karta}></CardVisible>
                    </div>
                ))}
            </div>
            <YourTurnPoints remainingPoints={yourTurnPoints} maxPoints={yourMaxPoints} handleEndTurn={handleEndTurn}></YourTurnPoints>
        </div>
    )
}