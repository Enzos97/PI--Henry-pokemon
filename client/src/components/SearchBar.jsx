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
        dispatch(searchByName(name))
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