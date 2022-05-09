import React from "react";
import style from "../styles/Paginated.module.css"


export default function Paginated({charactersPerPage,allCharacters,paginated,numOfPage}){
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allCharacters/charactersPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul className={style.ul}>
                {pageNumbers&&pageNumbers.map(number=>(
                    <li className={style.li} key={number}>   
                        {
                            numOfPage(number)?<a className={style.a} onClick={()=> paginated(number)}>{number}</a>:
                            <a className={style.a2} onClick={()=> paginated(number)}>{number}</a>
                        } 
                    </li>
                ))}
            </ul>
        </nav>
    )
}