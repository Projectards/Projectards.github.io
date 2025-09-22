import {React,useRef,useEffect,useState} from "react";
import { CardVisible } from "./CardVisible";
import { CardDestroyed } from "./CardDestroyed";

export const BattleColumn = ({destroyedCards,statusesAdded,detailFunction,showDetails,playedCards,onColumnSelect,numberOfColumn}) =>
{
    /*
    function useForceRerender(){
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }

    const force = useForceRerender();

    const cardsDestroyedRef = useRef(destroyedCards);
    let cardsDestroyedId = [];

    if(cardsDestroyedRef.current !== destroyedCards)
    {
        cardsDestroyedId = destroyedCards.filter((element)=>{return element.numberOfColumn === numberOfColumn})
        cardsDestroyedRef.current = cardsDestroyedId;
        if(cardsDestroyedId.length!==0)
        {
            console.log("Zaczynam timer");
            setTimeout(()=>{
                cardsDestroyedId=[];
                cardsDestroyedRef.current = cardsDestroyedId;
                console.log("Powinno wyczyścić");
                force();
            },2000);
        }
        else
        {
            console.log("no timer");
        }
    }
*/

    /*
    const [enemyBackLine,setEnemyBackLine] = useState([]);
    const [enemyFrontLine,setEnemyFrontLine] = useState([]);
    const [yourBackLine,setYourBackLine] = useState([]);
    const [yourFrontLine,setYourFrontLine] = useState([]);

    const cardsOnColumn = playedCards.filter(element=>element.numberOfColumn === numberOfColumn);

    const enemyCardsOnColumn = cardsOnColumn.filter(element => element.team === "E");
    const yourCardsOnColumn = cardsOnColumn.filter(element => element.team === "Y");
    
    if(enemyCardsOnColumn.length > 0)
    {
        let enemyBackLineCard = enemyCardsOnColumn.filter(element => element.lineCompatibility === "BL");
        if(enemyBackLineCard.length > 0)
            setEnemyBackLine(enemyBackLineCard[0]);
        let enemyFrontLineCard = enemyCardsOnColumn.filter(element => element.lineCompatibility === "FL");
        if(enemyFrontLineCard.length > 0)
            setEnemyFrontLine(enemyFrontLineCard[0]);
    }

    if(yourCardsOnColumn.length > 0)
    {
        let yourBackLineCard = yourCardsOnColumn.filter(element => element.lineCompatibility === "BL");
        if(yourBackLineCard.length > 0)
            setYourBackLine(yourBackLineCard[0]);
        let yourFrontLineCard = yourCardsOnColumn.filter(element => element.lineCompatibility === "FL");
        if(yourFrontLineCard.length > 0)
            setYourFrontLine(yourFrontLineCard[0]);
    }
    */
    return(


        <div onClick={(event) => {onColumnSelect(event)}} data-columnnumber={numberOfColumn} className="battleColumn">
            <div className="enemyBattleColumn">
                <div className="enemyBackLine">
                    {playedCards.filter(element => element.team === "E" && element.lineCompatibility==="BL" && element.numberOfColumn === numberOfColumn).map(element=>(
                            <CardVisible statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} card={element.card}></CardVisible>
                        ))
                    }
                    {destroyedCards.filter(element => element.team === "E" && element.lineCompatibility==="BL" && element.numberOfColumn == numberOfColumn).map(element =>
                            <div>
                                <img className="deadCard" src="/cardImages/Destruction.gif"></img>
                            </div>
                        )
                    }
                </div>
                <div className="enemyFrontLine">
                    {playedCards.filter(element => element.team === "E" && element.lineCompatibility==="FL" && element.numberOfColumn === numberOfColumn).map(element=>(
                            <CardVisible statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} card={element.card}></CardVisible>
                        ))
                    }
                    {destroyedCards.filter(element => element.team === "E" && element.lineCompatibility==="FL" && element.numberOfColumn == numberOfColumn).map(element =>
                            <div>
                                <img className="deadCard" src="/cardImages/Destruction.gif"></img>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="yourBattleColumn">
                <div className="yourFrontLine">
                    {playedCards.filter(element => element.team === "Y" && element.lineCompatibility==="FL" && element.numberOfColumn == numberOfColumn).map(element=>(
                            <CardVisible statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} card={element.card}></CardVisible>
                        ))
                    }
                    {destroyedCards.filter(element => element.team === "Y" && element.lineCompatibility==="FL" && element.numberOfColumn == numberOfColumn).map(element =>
                            <div>
                                <img className="deadCard" src="/cardImages/Destruction.gif"></img>
                            </div>
                        )
                    }
                </div>
                <div className="yourBackLine">
                    {playedCards.filter(element => element.team === "Y" && element.lineCompatibility==="BL" && element.numberOfColumn == numberOfColumn).map(element=>(
                            <CardVisible statusesAdded={statusesAdded} detailFunction={detailFunction} showDetails={showDetails} card={element.card}></CardVisible>
                        ))
                    }
                    {destroyedCards.filter(element => element.team === "Y" && element.lineCompatibility==="BL" && element.numberOfColumn == numberOfColumn).map(element =>
                            <div>
                                <img className="deadCard" src="/cardImages/Destruction.gif"></img>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}