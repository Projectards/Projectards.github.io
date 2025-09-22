import React, { useState } from "react";
import { CardUnknown } from "./CardUnknown";
import {Card} from "../classes/card.js";
import { EnemyTurnPoints } from "./EnemyTurnPoints";
import {EnemyHealth} from "./EnemyHealth";

export const EnemyCards = (enemyCards) =>
{
    return(
        <div className="enemyCards">
            <EnemyHealth enemyHP={enemyCards.enemyHP}></EnemyHealth>
            <div className="enemyCardsInHand">
            {enemyCards.enemyCards.map(element =>(
                <CardUnknown></CardUnknown>
            ))}
            </div>
            <EnemyTurnPoints remainingPoints={enemyCards.enemyTurnPoints} maxPoints={enemyCards.enemyMaxPoints}></EnemyTurnPoints>
        </div>
    );
}