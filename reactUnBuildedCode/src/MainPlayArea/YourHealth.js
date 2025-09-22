import React from "react";

export const YourHealth = ({yourHP}) =>
{
    return(
        <div className="yourHealth">
            <span>Health:</span>
            <span>{yourHP}</span>
        </div>
    );
}