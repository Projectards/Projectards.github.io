import React, { useEffect, useRef } from "react";
import { EnemyCards } from "./EnemyCards";
import { BattleColumns } from "./BattleColumns";
import { YourCards } from "./YourCards";
import { Card } from "../classes/card";
import { useState } from "react";
import { CardVisible } from "./CardVisible";
import { CardInPlay } from "../classes/cardInPlay";
import { EndScreen } from "./EndScreen";
import { CardTemplate } from "../classes/cardTemplate";
import { CardStatisticsScreen } from "./CardStatisticsScreen";

export const PlayArea = ({backToMenu,gameStarted=true}) =>
{
    const [yourCards,setYourCards] = useState([]);
    const [enemyCards,setEnemyCards] = useState([]);
    const [cardsInPlay,setCardsInPlay] = useState([]);
    const [cardSelected,setCardSelected] = useState(null);
    const [yourTurnPoints, setYourTurnPoints] = useState(1);
    const [yourMaxPoints, setYourMaxPoints] = useState(1);
    const [enemyTurnPoints, setEnemyTurnPoints] = useState(1);
    const [enemyMaxPoints, setEnemyMaxPoints] = useState(1);
    const [yourHP, setYourHP] = useState(20);
    const [enemyHP, setEnemyHP] = useState(20);
    const [possibleCardsToPlay, setPossibleCardsToPlay] = useState([]);
    const [enemyTurn, setEnemyTurn] = useState(false);
    const [odpalone,setOdpalone] = useState(gameStarted);
    const [win,setWin] = useState(false);
    const [loss,setLoss] = useState(false);
    const [draw,setDraw] = useState(false);
    const [attackPhase, setAttackPhase] = useState(false);
    const [loading,setLoading] = useState(true);
    const [showDetails,setShowDetails] = useState(false);
    const [detailCard,setDetailCard] = useState();
    const [detailCardStatuses,setDetailCardStatuses] = useState([]);
    const [statusesAdded, setStatusesAdded] = useState([]);
    const [destroyedCards,setDestroyedCards] = useState([]);
    const [statusesAddedByDrawingCards,setStatusesAddedByDrawingCards] = useState([]);

    const fullCardLibrary = [new CardTemplate("Średniowieczny Łucznik",1,1,1,"BL","medievalArcher.png",[]),new CardTemplate("Szkielet Ciemności",1,1,1,"FL","evilSkeleton.png",[]),new CardTemplate("Palisada",2,0,3,"FL","palisade.png",[]),new CardTemplate("Kobra",2,3,1,"FL","desertCobra.png",[]),new CardTemplate("Snajper",3,4,2,"BL","sniperJungle.png",[]),new CardTemplate("Wiking",4,4,4,"FL","vikingWithAxe.png",[]),new CardTemplate("Mur",4,0,10,"FL","wall.png",[]),new CardTemplate("Toyota z KM-em",5,4,6,"FL","toyota.png",[]),new CardTemplate("Bombarda",5,6,1,"BL","bombarda.png",[]),new CardTemplate("Zainfekowany golem",8,5,9,"FL","infectedGolem.png",[]),new CardTemplate("Boris",3,1,2,"BL","Boris.png",["Webber"])];
    
    let startingCards = 3;
    const prevEnemyCards = useRef(enemyCards);
    const prevPossibleCards = useRef(possibleCardsToPlay);
    const maxId = useRef(1);
    const CardsDamaged = useRef([]);
    const CardsDamagedOG = useRef([]);

    //listen man
    //im not insane
    //not at all
    //anyways
    //u need to rework damage dealing
    //that the dmg will accumulate
    //and the accummulated dmg will hit the most upward enemy on the column
    //and then we wont get errors that we destroy and damage the same card and undefined (hopefully)
    //good luck
    //(silently) im fucking talking to myself im insane i-i-im literally insane

    useEffect(()=>{
        if(yourHP <= 0 && enemyHP > 0)
        {
            setLoss(true);
        }
        if(enemyHP <= 0 && yourHP > 0)
        {
            setWin(true);
        }
        if(yourHP <= 0 && enemyHP<= 0)
        {
            setDraw(true);
        }
    },[enemyHP,yourHP])

    useEffect(()=>{
        if(enemyTurnPoints > 1)
            setTimeout(()=>{AttackPhase();},1000);
    },[enemyMaxPoints])

    useEffect(()=>{
        if(odpalone)
        {
            startingCards = 3;
            setYourCards([]);
            setEnemyCards([]);
            setCardsInPlay([]);
            setCardSelected(null);
            setYourTurnPoints(1);
            setYourMaxPoints(1);
            setEnemyTurnPoints(1);
            setEnemyMaxPoints(1);
            setYourHP(20);
            setEnemyHP(20);
            setEnemyTurn(false);
            setAttackPhase(false);
            setPossibleCardsToPlay([]);
            setWin(false);
            setDraw(false);
            setLoss(false);
            setLoading(false);
        }
    },[odpalone])

    useEffect(()=>
    {
        console.log("loading");
        console.log(statusesAdded);
        let tempArray = [];
        if(!loading)
        {
            while(startingCards > 0)
            {
                let t=[];
                console.log(startingCards);
                t = InitialDrawCards();
                t.forEach((element)=>{
                    tempArray.push(element);
                });
                startingCards--;
            }
        }
        setStatusesAdded(tempArray);
        console.log("loading finished");
        console.log(statusesAdded);
    },[loading])


    //tomson fuckin goated
    useEffect(()=>{
        setPossibleCardsToPlay(enemyCards.filter(element => element.cost <= enemyTurnPoints));
    },[enemyCards])


    useEffect(()=>{
        console.log(enemyTurn);
        if(enemyTurn)
        {
            if((prevEnemyCards.current !== enemyCards && prevPossibleCards.current !== possibleCardsToPlay) || prevPossibleCards.current !== possibleCardsToPlay)
            {
                console.log(prevPossibleCards);
                console.log(possibleCardsToPlay);
                console.log("check: "+enemyTurnPoints);
                EnemyMove();
            }
        }
    },[enemyCards,possibleCardsToPlay])
    
    useEffect(()=>{
        prevEnemyCards.current = enemyCards;
        prevPossibleCards.current = possibleCardsToPlay;
    },[enemyCards,possibleCardsToPlay])

    useEffect(()=>{
        console.log("DETAIL CARD ALBO STATUSES ADDED");
        console.log(statusesAdded);
        if(detailCard===undefined)
        {
            return;
        }
        else
        {
            let selectedCardStatusesArray = statusesAdded.filter((card) => {return card[0] === detailCard.id});
            setDetailCardStatuses(selectedCardStatusesArray);
        }
    },[statusesAdded,detailCard])

    useEffect(()=>{
        if(statusesAddedByDrawingCards.length === 0)
        {
            return;
        }
        else
        {
            let tempArray1 = statusesAddedByDrawingCards;
            let tempArray2 = statusesAdded;
            tempArray1.forEach((element)=>{
                tempArray2.push(element);
            })
            setStatusesAdded(tempArray2);
        }
    },[statusesAddedByDrawingCards])

    const handleClick = (event,karta) =>
    {
        let lastChosen = document.getElementsByClassName("cardVisible chosen");
        let FrontLineColumns = document.getElementsByClassName("yourFrontLine");
        let BackLineColumns = document.getElementsByClassName("yourBackLine");
        for(let i=0; i<FrontLineColumns.length;i++)
        {
            FrontLineColumns[i].classList.toggle("available",false);
            FrontLineColumns[i].classList.toggle("unavailable",false);
        }
        for(let i=0; i<BackLineColumns.length;i++)
        {
            BackLineColumns[i].classList.toggle("unavailable",false);
            BackLineColumns[i].classList.toggle("available",false);
        }
        for(let i=0; i<lastChosen.length; i++)
        {
            lastChosen[i].classList.remove("chosen");
        }
        let chosenCard = event.target;
        switch(chosenCard.nodeName)
        {
            case "IMG":
                chosenCard = chosenCard.parentElement;
                break;
            case "DIV":
                if(chosenCard.childNodes[0].nodeName !== "IMG")
                    return;
                break;
            default:
                return;
        }
        chosenCard.classList.add("chosen");
        if(karta.lineCompatibility === "BL")
        {
            let backLineColumnsAvailable = document.getElementsByClassName("yourBackLine");
            for(let i=0; i<backLineColumnsAvailable.length; i++)
            {
                if(backLineColumnsAvailable[i].querySelectorAll("*").length <= 1)
                {
                    backLineColumnsAvailable[i].classList.add("available");
                }
                else
                {
                    backLineColumnsAvailable[i].classList.add("unavailable");
                }
            }
        }
        else
        {
            if(karta.lineCompatibility === "FL")
            {
                let frontLineColumnAvailable = document.getElementsByClassName("yourFrontLine");
                for(let i=0; i<frontLineColumnAvailable.length; i++)
                {
                    if(frontLineColumnAvailable[i].querySelectorAll("*").length <= 1)
                    {
                        frontLineColumnAvailable[i].classList.add("available");
                    }
                    else
                    {
                        frontLineColumnAvailable[i].classList.add("unavailable");
                    }
                }
            }
        }
        setCardSelected(karta);
    }

    const showCardDetail = (card) =>
    {
        if(showDetails)
        {
            setShowDetails(false);
        }
        else
        {
            setDetailCard(card);
            setShowDetails(true);
        }
    }

    const handleBattleColumnClick = (event) =>
    {
        console.log(attackPhase);
        console.log(enemyTurn);
        if(attackPhase===true || enemyTurn === true)
        {
            setAttackPhase(false);
            setEnemyTurn(false);
            setTimeout(()=>{},1000);
        }
        if(cardSelected == null)
            return;
        let selectedCardDOM = [...document.querySelectorAll('[data-cardid]')].filter((element)=>{return element.dataset.cardid == cardSelected.id;})[0];
        if(cardSelected!=null && event.target.className.includes("available") && yourTurnPoints >= cardSelected.cost && enemyTurn === false && attackPhase===false)
        {
            setYourTurnPoints(yourTurnPoints-cardSelected.cost);
            let CardArray = yourCards;
            selectedCardDOM.classList.remove("chosen");
            CardArray = CardArray.filter(element => element !== cardSelected);
            setYourCards(CardArray);
            let cardsInPlayArray = cardsInPlay;
            cardsInPlayArray.push(new CardInPlay(cardSelected,event.currentTarget.dataset.columnnumber,"Y",cardSelected.lineCompatibility));
            setCardsInPlay(cardsInPlayArray);
            setCardSelected(null);
            let lastHighlightedColumns = null;
            if(cardSelected.lineCompatibility === "BL")
            {
                lastHighlightedColumns = document.getElementsByClassName("yourBackLine");
                for(let i=0; i<lastHighlightedColumns.length; i++)
                {
                    lastHighlightedColumns[i].className = "yourBackLine";
                }
            }
            if(cardSelected.lineCompatibility === "FL")
            {
                lastHighlightedColumns = document.getElementsByClassName("yourFrontLine");
                for(let i=0; i<lastHighlightedColumns.length; i++)
                {
                    lastHighlightedColumns[i].className = "yourFrontLine";
                }
            }
        }
        else
        {
            if(cardSelected != null)
            {
                selectedCardDOM.classList.add("wrongPlayedCard");
                setTimeout(()=>{selectedCardDOM.classList.remove("wrongPlayedCard")},2000);
            }
        }
    }

    const handleEndTurn = () =>
    {
        setEnemyTurn(true);
        setAttackPhase(true);
        setYourTurnPoints(yourMaxPoints+1);
        setYourMaxPoints(yourMaxPoints+1);
        setPossibleCardsToPlay(enemyCards.filter(element => {return element.cost <= enemyTurnPoints})); //triggers EnemyMove() function
    }

    const EnemyMove = () =>
    {
        console.log("Enemy Turn");
        if(possibleCardsToPlay.length > 0)
        {
            console.log("Can play a card");
            let randomSelection = Math.round(Math.random()*(possibleCardsToPlay.length-1));
            let selectedCard = possibleCardsToPlay[randomSelection];
            let possibleSpaces = [];
            console.log(possibleCardsToPlay);
            console.log(selectedCard);
            console.log("3"+randomSelection);
            if(selectedCard.lineCompatibility === "FL")
            {
                possibleSpaces = [...document.getElementsByClassName("enemyFrontLine")].filter(element => {return element.querySelectorAll("*").length < 1});
            }
            if(selectedCard.lineCompatibility === "BL")
            {
                possibleSpaces = [...document.getElementsByClassName("enemyBackLine")].filter(element => {return element.querySelectorAll("*").length < 1});
            }
            console.log(possibleSpaces);
            if(possibleSpaces.length > 0)
            {
                randomSelection = Math.round(Math.random()*(possibleSpaces.length-1));
                let selectedSpace = possibleSpaces[randomSelection];
                console.log(selectedSpace.parentElement);
                let playedCard = new CardInPlay(selectedCard,selectedSpace.parentElement.parentElement.dataset.columnnumber,"E",selectedCard.lineCompatibility);
                let currentCardsInPlay = cardsInPlay;
                console.log(playedCard);
                setEnemyTurnPoints(enemyTurnPoints-selectedCard.cost);
                setEnemyCards(enemyCards.filter((element) => {return element.id !== selectedCard.id}));
                currentCardsInPlay.push(playedCard);
                setCardsInPlay(currentCardsInPlay);
            }
            else
            {
                /*
                if(possibleCardsToPlay.length < 2)
                {
                    console.log("IF bo sprawdzono ostatni element, czyszczenie tablicy...");
                    setPossibleCardsToPlay([]);
                }
                else
                {
                    */
                    let possibleCardsToPlayArray = possibleCardsToPlay;
                    possibleCardsToPlayArray = possibleCardsToPlayArray.filter((element) => {return element.id !== selectedCard.id});
                    setPossibleCardsToPlay(possibleCardsToPlayArray);
                    console.log(possibleCardsToPlayArray);
                //}
            }
        }
        else
        {
            setEnemyTurn(false);
            setEnemyTurnPoints(enemyMaxPoints+1);
            setEnemyMaxPoints(enemyMaxPoints+1);
        }
    }

    const AttackPhase = () =>
    {
        console.log("AttackPhase");
        console.log(cardsInPlay);
        console.log(cardsInPlay.length);
        console.log("____________________");
        if(cardsInPlay.length <=0 )
        {
            setAttackPhase(false);
            FinishBattlePhase();
            return;
        }
        else
        {
            let column1E = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "1" && cardInPlay.team === "E"});
            let column2Y = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "2" && cardInPlay.team === "Y"});
            let column2E = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "2" && cardInPlay.team === "E"});
            let column3Y = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "3" && cardInPlay.team === "Y"});
            let column3E = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "3" && cardInPlay.team === "E"});
            let column4Y = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "4" && cardInPlay.team === "Y"});
            let column4E = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "4" && cardInPlay.team === "E"});
            let column1Y = cardsInPlay.filter((cardInPlay)=>{return cardInPlay.numberOfColumn === "1" && cardInPlay.team === "Y"});
            let dmgEnemy = 0;
            let dmgYou = 0;
            dmgYou += AttackPhaseCopyPastePart(column1Y,column1E);
            dmgYou += AttackPhaseCopyPastePart(column2Y,column2E);
            dmgYou += AttackPhaseCopyPastePart(column3Y,column3E);
            dmgYou += AttackPhaseCopyPastePart(column4Y,column4E);
            dmgEnemy += AttackPhaseCopyPastePart(column1E,column1Y);
            dmgEnemy += AttackPhaseCopyPastePart(column2E,column2Y);
            dmgEnemy += AttackPhaseCopyPastePart(column3E,column3Y);
            dmgEnemy += AttackPhaseCopyPastePart(column4E,column4Y);
            setAttackPhase(false);
            setEnemyHP(enemyHP-dmgEnemy);
            setYourHP(yourHP-dmgYou);
            FinishBattlePhase();
        }
    }

    const AttackPhaseCopyPastePart = (dmgTaker,dmgDealer) =>
    {
        let statusesAddArray = statusesAdded;
        console.log("attackphaseCopy");
        let dmgCards = 0;
        let dmgBase = 0;
        let remainingDFC = 0;
        let statusAdd = "";
        let statusAddArray = [];
        let kontrolka = 0;
        dmgDealer.forEach(element => {
            let cantAttack = false;
            let thisCardStatusesArray = statusesAddArray.filter((status)=>{return status[0] === element.card.id});
            console.log(kontrolka++);
            thisCardStatusesArray.forEach(stat =>{
                console.log(stat[1]);
                switch(stat[1])
                {
                    case "Webbed":
                        cantAttack = true;
                        //logike se ogarnij 
                        let index = statusesAddArray.indexOf([element.card.id,stat[1]]);
                        console.log(index);
                        console.log(statusesAddArray);
                        statusesAddArray.splice(index,1);
                        console.log(statusesAddArray)
                        //statusesAddArray = statusesAddArray.filter((status) => { return (status[0] !== element.card.id && status[1] !== stat[1]) });
                        console.log("SHOULD DELETE WEBBED");
                        console.log(statusesAddArray);
                        break;
                    default:
                        break;
                }
            })
            if(!cantAttack)
            {
                if(dmgTaker.length <= 0)
                {
                    dmgBase+=element.card.attack;
                }
                else
                {
                    console.log("Should check for Webber");
                    thisCardStatusesArray.forEach(stat =>{
                        switch(stat[1])
                        {
                            case "Webber":
                                console.log("WEBBER DETECTED");
                                statusAddArray.push("RecentlyWebbed");
                                break;
                        }
                    })
                    dmgCards += element.card.attack;
                }
            }
        });
        statusAdd = statusAddArray.join(" ");
        setStatusesAdded(statusesAddArray);
        console.log("DmgCards:"+dmgCards);
        let cardTakingTheHit = null;
        if(dmgTaker.length >= 2)
        {
            if(dmgTaker[0].card.lineCompatibility === "FL")
            {
                cardTakingTheHit = cardsInPlay.filter((element)=>{return dmgTaker[0].card.id === element.card.id});
                remainingDFC = dmgTaker[0].card.defence;
                DealDamage(cardTakingTheHit[0],remainingDFC-dmgCards,statusAdd);
            }
            else
            {
                cardTakingTheHit = cardsInPlay.filter((element)=>{return dmgTaker[1].card.id === element.card.id})
                remainingDFC = dmgTaker[1].card.defence;
                DealDamage(cardTakingTheHit[0],remainingDFC-dmgCards,statusAdd);
            }
        }
        else
        {
            if(dmgTaker.length === 1)
            {
                cardTakingTheHit = cardsInPlay.filter((element)=>{return dmgTaker[0].card.id === element.card.id});
                remainingDFC = dmgTaker[0].card.defence;
                DealDamage(cardTakingTheHit[0],remainingDFC-dmgCards,statusAdd);
            }
        }
        return dmgBase;
    }

    const InitialDrawCards = () =>
    {
        console.log("DrawCards😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐");
        let yourCurrentHand = yourCards;
        let enemyCurrentHand = enemyCards;
        let addedStatusesArray = [];
        if(yourCurrentHand.length < 8)
        {
            let randomCardSelection = Math.round(Math.random()*(fullCardLibrary.length-1));
            let randomCard = fullCardLibrary[randomCardSelection];
            console.log(randomCard.status);
            yourCurrentHand.push(new Card(maxId.current,randomCard.name,randomCard.cost,randomCard.attack,randomCard.defence,randomCard.lineCompatibility,randomCard.imgSrc));
            randomCard.status.forEach((cardStatus)=>{
                addedStatusesArray.push([maxId.current,cardStatus]);
            })
            maxId.current += 1;
        }
        if(enemyCurrentHand.length < 8)
        {
            let randomCardSelection = Math.round(Math.random()*(fullCardLibrary.length-1));
            let randomCard = fullCardLibrary[randomCardSelection];
            enemyCurrentHand.push(new Card(maxId.current,randomCard.name,randomCard.cost,randomCard.attack,randomCard.defence,randomCard.lineCompatibility,randomCard.imgSrc));
            randomCard.status.forEach((cardStatus)=>{
                addedStatusesArray.push([maxId.current,cardStatus]);
            })
            maxId.current += 1;
        }
        console.log("DLUGOSC"+addedStatusesArray.length);
        setYourCards(yourCurrentHand);
        setEnemyCards(enemyCurrentHand);
        return addedStatusesArray;
    }



    const DrawCards = () =>
    {
        console.log("DrawCards😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐");
        let yourCurrentHand = yourCards;
        let enemyCurrentHand = enemyCards;
        let addedStatusesArray = [];
        if(yourCurrentHand.length < 8)
        {
            let randomCardSelection = Math.round(Math.random()*(fullCardLibrary.length-1));
            let randomCard = fullCardLibrary[randomCardSelection];
            console.log(randomCard.status);
            yourCurrentHand.push(new Card(maxId.current,randomCard.name,randomCard.cost,randomCard.attack,randomCard.defence,randomCard.lineCompatibility,randomCard.imgSrc));
            randomCard.status.forEach((cardStatus)=>{
                addedStatusesArray.push([maxId.current,cardStatus]);
            })
            maxId.current += 1;
        }
        if(enemyCurrentHand.length < 8)
        {
            let randomCardSelection = Math.round(Math.random()*(fullCardLibrary.length-1));
            let randomCard = fullCardLibrary[randomCardSelection];
            enemyCurrentHand.push(new Card(maxId.current,randomCard.name,randomCard.cost,randomCard.attack,randomCard.defence,randomCard.lineCompatibility,randomCard.imgSrc));
            randomCard.status.forEach((cardStatus)=>{
                addedStatusesArray.push([maxId.current,cardStatus]);
            })
            maxId.current += 1;
        }
        console.log("DLUGOSC"+addedStatusesArray.length);
        setStatusesAddedByDrawingCards(addedStatusesArray);
        setYourCards(yourCurrentHand);
        setEnemyCards(enemyCurrentHand);
    }

    const DealDamage = (card,remainingDFC,statusAdd) =>
    {
        let addStatusesArray = statusesAdded;
        console.log("DealDamagePart");
        console.log(card);
        console.log(remainingDFC);
        console.log(statusAdd);
        console.log("_________________");
        if(remainingDFC <= 0)
        {
            let tempArray = destroyedCards;
            console.log("POWINNO ZGINAC");
            console.log(cardsInPlay);
            console.log("___________________________________________________________________________________________");
            console.log(card.card);
            addStatusesArray = addStatusesArray.filter((element)=>{return element[0] !== card.card.id});
            console.log(cardsInPlay);
            console.log("----------------------------------------------------------------------------------------------");
            tempArray.push(card);
            setDestroyedCards(tempArray);
        }
        else
        {
            if(statusAdd!=="")
            {
                let addedStatus = statusAdd.split(" ");
                addedStatus.forEach((newAddedStatus) =>{
                    addStatusesArray.push([card.card.id,newAddedStatus]);
                })
            }
            let tempArray1 = CardsDamagedOG.current;
            let tempArray2 = CardsDamaged.current;
            let damagedCard = new Card(card.card.id,card.card.name,card.card.cost,card.card.attack,remainingDFC,card.card.lineCompatibility,card.card.imgSrc);
            tempArray1.push(card.card);
            tempArray2.push(damagedCard);
            CardsDamagedOG.current = tempArray1;
            CardsDamaged.current = tempArray2;
            setStatusesAdded(addStatusesArray);
        }
    }

    const FinishBattlePhase = () =>
    {
        console.log("FinishBattlePhase");
        let currentCardsInPlay = cardsInPlay;
        let currentAddedStatuses = statusesAdded;
        console.log(currentAddedStatuses);
        console.log(currentCardsInPlay);
        console.log(destroyedCards);
        let tempArray = destroyedCards;
        tempArray.forEach(element =>{
            currentAddedStatuses = currentAddedStatuses.filter((card) => {return card[0] !== element.card.id});
            currentCardsInPlay = currentCardsInPlay.filter((card)=>{return card.card.id !== element.card.id});
        });
        console.log("AAAAAAAAAAAAAAAAA");
        console.log(currentAddedStatuses);
        for(let i=0; i<CardsDamaged.current.length; i++){
            let ChangedDamagedCardDetails = currentCardsInPlay.filter((card)=>{return card.card.id === CardsDamagedOG.current[i].id});
            currentCardsInPlay = currentCardsInPlay.filter((card)=>{return card.card.id !== CardsDamagedOG.current[i].id});
            currentCardsInPlay.push(new CardInPlay(CardsDamaged.current[i],ChangedDamagedCardDetails[0].numberOfColumn,ChangedDamagedCardDetails[0].team,ChangedDamagedCardDetails[0].lineCompatibility));
        };
        console.log(currentCardsInPlay);
        console.log(currentAddedStatuses);
        let webbedCards = currentAddedStatuses.filter((webbed) => {return webbed[1] === "RecentlyWebbed"});
        console.log("Recenlty Webbed Cards");
        console.log(webbedCards);
        let webbedChangedArray = currentAddedStatuses.filter((webbed) => {return webbed[1] !== "RecentlyWebbed"});
        console.log(webbedChangedArray);
        webbedCards.forEach(card =>{
                let indexOfWebbed = card[0];
                console.log(indexOfWebbed);
                webbedChangedArray.push([indexOfWebbed,"Webbed"]);
            }
        )
        console.log(webbedChangedArray);
        setStatusesAdded(webbedChangedArray);
        setCardsInPlay(currentCardsInPlay);
        setTimeout(()=>{
            setDestroyedCards([]);
            CardsDamaged.current = [];
            CardsDamagedOG.current = [];
            console.log(statusesAdded);
            DrawCards();
        },3000);
    }

    return(
        <div className="playArea">
            <EnemyCards enemyHP={enemyHP} enemyCards={enemyCards} enemyTurnPoints={enemyTurnPoints} enemyMaxPoints={enemyMaxPoints}></EnemyCards>
            <BattleColumns destroyedCards={destroyedCards} statusesAdded={statusesAdded} detailFunction={showCardDetail} showDetails={showDetails} playedCards={cardsInPlay} onColumnSelect={handleBattleColumnClick}></BattleColumns>
            <YourCards statusesAdded={statusesAdded} detailFunction={showCardDetail} showDetails={showDetails}  yourHP={yourHP} yourCards={yourCards} onCardSelect={handleClick} yourTurnPoints={yourTurnPoints} yourMaxPoints={yourMaxPoints} handleEndTurn={handleEndTurn}></YourCards>
            <EndScreen condition={win} text="Wygrałeś :D" textColor="green" backToMenu={backToMenu}></EndScreen>
            <EndScreen condition={loss} text="Przegrałeś D:" textColor="maroon" backToMenu={backToMenu}></EndScreen>
            <EndScreen condition={draw} text="Remis :/" textColor="lightsteelblue" backToMenu={backToMenu}></EndScreen>
            <EndScreen condition={loading} text="Ładowanie..." textColor="white"></EndScreen>
            <CardStatisticsScreen detailCardStatuses={detailCardStatuses} card={detailCard} showBool={showDetails} showBoolSet={(bool)=>{setShowDetails(bool);}}></CardStatisticsScreen>
        </div>
    );
}