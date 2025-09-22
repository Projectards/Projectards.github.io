import React, { useState } from "react";

export const EndScreen = ({condition,text="",textColor="white",backToMenu=null}) =>
{
    return(
        <div className={condition?"endScreen":"endScreenHidden"}>
            <h1 style={{color:textColor}}>{text}</h1>
            <h5 className={backToMenu===null?"linkHidden":"link"} onClick={()=>{if(backToMenu!=null)backToMenu()}}>Powróć do głównego menu</h5>
        </div>
    );
}