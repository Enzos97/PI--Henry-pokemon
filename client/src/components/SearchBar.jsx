import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";
import style from "../styles/Search.module.css"

export default function SearchBar ({setCurrent}){
    const dispatch = useDispatch()
    const [name,setName] = useState("")

    function handleInput(e){
        e.preventDefault()   
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(name.length){
            dispatch(searchByName(name))
        }else {
            alert('Enter a word before searching...')
        }
        setName("")
        setCurrent(1)
    }
    
    return(
        <div>
            <input 
            className={style.input}
            type="text" 
            placeholder = 'Search...'
            value={name}
            onChange={(e)=>handleInput(e)}
            />
            <button className={style.btn} type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}