import {React,useEffect,useState,useRef} from "react";

export const CardVisible = ({statusesAdded,detailFunction,showDetails,card}) =>
{
    let timer=null;
    let imgPath = "/cardImages/"+card.imgSrc;
    let statusesString = "";
    let thisCardStatuses = statusesAdded.filter((cardStatus)=>{return cardStatus[0] === card.id});
    thisCardStatuses.forEach((cardStatus) => {
        statusesString += " "+cardStatus[1];
    });


    const handleMouseDown = () =>
    {
        timer = setTimeout(() =>
        {
            handleCardDetails();
        },1000)
    }

    const handleCardDetails = () =>
    {
        if(!showDetails)
            detailFunction(card,true);
    }

    const handleDoubleClick = () =>
    {
        if(showDetails)
            detailFunction(card,false);
        else
            detailFunction(card,true);
    }

    const handleMouseUp = () =>
    {
        if(showDetails)
            detailFunction(card,false);
        clearTimeout(timer);
    }

    return(
        <div className={"cardVisible"+statusesString} data-cardid={card.id} data-linecomp={card.lineComp} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp} onDoubleClick={handleDoubleClick}>
            <img src={imgPath}></img>
        </div>
    );
}