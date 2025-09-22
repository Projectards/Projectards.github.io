import React from "react";

export const EnemyHealth = ({enemyHP}) =>
{
    return(
        <div className="enemyHealth">
            <span>Health:</span>
            <span>{enemyHP}</span>
        </div>
    );
}