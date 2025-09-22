import { useEffect, useState } from "react";
import React from "react";
import { PlayArea } from "./PlayArea";
import { Settings } from "./Settings";

export const MainMenu = () =>
{
    const [gameStarted,setGameStarted] = useState(false);
    const [settings,setSettings] = useState(false);
    

    function backToMenu()
    {
        setGameStarted(false);
        setSettings(false);
    }

    return(
        <div>
            <div className={gameStarted?"mainMenuHidden":settings?"mainMenuHidden":"mainMenu"}>
                <div className="menuTitle">
                    <h2>PROJECTARDS</h2>
                    <span>Gra zrobiona przez: MeFiu Dywan</span>
                </div>
                <div className="mainMenuButtons">
                    <button onClick={() => {setGameStarted(true);}}>Szybka gra</button>
                    <button disabled>Stwórz nową grę</button>
                    <button onClick={() => {setSettings(true);}}>Ustawienia</button>
                </div>
            </div>
            {gameStarted?<PlayArea backToMenu={backToMenu} gameStarted={gameStarted}></PlayArea>:<div></div>}
            {settings?<Settings backToMenu={backToMenu}></Settings>:<div></div>}
        </div>
    );
}