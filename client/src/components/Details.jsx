import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPage, deletePokemonDb, getDetail} from "../actions";
import { useEffect } from "react";
import style from '../styles/Details.module.css'
import loadingGif from '../img/pikachu.gif'
import dinoErr from '../img/Dino-Err.jpg'

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
    return( ()=>{
        dispatch(clearPage())
    })
    //eslint-disable-next-line
},[dispatch])
// useEffect(()=>{
//     dispatch(deletePokemonDb())
// })
const navigate = useNavigate();
const characterDetail = useSelector((state)=>state.detail)
const handleClick=(e)=>{
    dispatch(deletePokemonDb(characterDetail.id));
    navigate('/home');
}
return(
    <div className={style.div}>
        <Link className={style.link} to='/home'><button className={style.btn}>POKEMONS</button></Link>
        {
            Object.keys(characterDetail).length!==0?
            <div className={style.div1}>
                {characterDetail.InDB?<button onClick={handleClick}>x</button>:null}
                <div className={style.div105}>
                    <h1 className={style.h1}>{characterDetail.name.toUpperCase()}</h1>
                </div>
                <div className={style.div2}>
                    <img src={characterDetail.img?characterDetail.img:dinoErr} alt="" width="150em" height="200em" className={style.img}/>
                    <div className={style.div3}>
                        <p>Hp: {characterDetail.hp}</p>
                        <p>Attack: {characterDetail.attack}</p>
                        <p>Defense: {characterDetail.defense}</p>
                        <p>speed: {characterDetail.speed}</p>
                        <p>weight: {characterDetail.weight}</p>
                        <p>Height: {characterDetail.height}</p>
                        <p>Types: {characterDetail.types.map(m=>m[0].toUpperCase()+m.slice(1)+' ')}</p>
                    </div>
                </div>
            </div>:
            <div>
                <img src={loadingGif} alt="" />
                <p className={style.load}>Loading...</p>
            </div>
        }
    </div>
)
}