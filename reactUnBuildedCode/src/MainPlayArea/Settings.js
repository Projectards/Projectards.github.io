import React from "react";
import { useState,useEffect} from "react";

export const Settings = ({backToMenu}) =>
{
    const [setting1, setSetting1] = useState(false);
    const [setting2, setSetting2] = useState(false);
    const [setting3, setSetting3] = useState(false);
    const [firstLaunch, setFirstLaunch] = useState(false);

    function handleSetting1()
    {
        if(setting1)
            setSetting1(false);
        else
            setSetting1(true);
    }

    function handleSetting2()
    {
        if(setting2)
            setSetting2(false);
        else
            setSetting2(true);
    }

    function handleSetting3()
    {
        if(setting3)
            setSetting3(false);
        else
            setSetting3(true);
    }

    useEffect(()=>{
        if(!firstLaunch)
            return;
        if(setting2)
            window.alert("Setting 2 is on");
        else
            window.alert("Setting 2 is not on");
    },[setting2])

    useEffect(()=>{
        if(!firstLaunch)
            return;
        if(setting3)
            window.alert("Congrats. U clicked 2 <input type=\"checkbox\">'s, then clicked onto this one. :D");
        else
            window.alert("why u turned it off? :(");
    },[setting3])

    useEffect(()=>{
        if(!firstLaunch)
            setFirstLaunch(true);
    },[firstLaunch])
    return(
        <div className="settings">
            <h3>Ustawienia</h3>
            <div className="settingsOptions">
                <div className="settingCheckbox">
                    <span>Test Setting 1</span>
                    <input checked={setting1} type="checkbox" onClick={() => {handleSetting1();}}></input>
                </div>
                <div className="settingCheckbox">
                    <span>Test Setting 2</span>
                    <input checked={setting2} type="checkbox" onClick={() => {handleSetting2();}}></input>
                </div>
                <div className="settingCheckbox">
                    <span>Test Setting 3</span>
                    <input disabled={setting1?(setting2?false:true):true} checked={setting3} type="checkbox" onClick={() => {handleSetting3();}}></input>
                </div>
            </div>
            <h5 className="link" onClick={()=>{backToMenu();}}>Wróc do menu głównego</h5>
        </div>
    );

}