import React from "react";
import { BattleColumn } from "./BattleColumn";

export const BattleColumns = ({destroyedCards,statusesAdded,detailFunction,showDetails,playedCards,onColumnSelect}) =>
{
    return(
        <div className="battleColumns">
            <BattleColumn destroyedCards={destroyedCards} statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} playedCards={playedCards} onColumnSelect={onColumnSelect} numberOfColumn="1"></BattleColumn>
            <BattleColumn destroyedCards={destroyedCards} statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} playedCards={playedCards} onColumnSelect={onColumnSelect} numberOfColumn="2"></BattleColumn>
            <BattleColumn destroyedCards={destroyedCards} statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} playedCards={playedCards} onColumnSelect={onColumnSelect} numberOfColumn="3"></BattleColumn>
            <BattleColumn destroyedCards={destroyedCards} statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} playedCards={playedCards} onColumnSelect={onColumnSelect} numberOfColumn="4"></BattleColumn>
        </div>
    )
}