import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux'
import { getCharacters, filterCharacter } from '../actions';
import { Link } from 'react-router-dom';
import style from '../styles/Home.module.css'
import Card from './Card';
import Paginated from './Paginated';
import { filterCrated, getTypes, orderName, orderAttack } from './../actions/index';
import SearchBar from './SearchBar';
import pokeicon from '../img/pokeicon.png'
import loadingGif from '../img/pikachu.gif'

export default function Home(){
    const dispatch = useDispatch()
    const allCharacters = useSelector((state)=>state.characters)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrent]=useState(1)
    const [charactersPerPage,setCharactersPerPage]=useState(12)
    const indexOfLastCharacter = currentPage*charactersPerPage
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
    const currentCharacters = allCharacters?.slice(indexOfFirstCharacter,indexOfLastCharacter)
    const types = useSelector((state)=>state.types)
    useEffect(()=>{
        dispatch(getCharacters());
        dispatch(getTypes())
        //eslint-disable-next-line
    },[])
    const paginated = (pageNumber)=>{
        setCurrent(pageNumber)
    }
    const numOfPage= (num)=>{
        if(num===currentPage)return true
        return false
    }
    function handleClick(e){
        e.preventDefault();
        dispatch(getCharacters())
        setCurrent(1)
    }
    function handleSortName(e){
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrent(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleSortAttack(e){
        e.preventDefault();
        dispatch(orderAttack(e.target.value))
        setCurrent(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleFilter(e){
        e.preventDefault();
        dispatch(filterCharacter(e.target.value))
        setCurrent(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleFilterCreated(e){
        dispatch(filterCrated(e.target.value))
        setCurrent(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    return(
        <div className={style.div}>
            <div className={style.contenedor1}>
                <div className={style.homeBar}>
                    <Link className={style.linkH1} to='/'><h1 className={style.h1h}>Home</h1></Link>
                    <button className={style.btnImg} onClick={e=>{handleClick(e)}}>
                        <img className={style.img} src={pokeicon} alt="" width="220em" height="95em" />
                    </button>
                    <Link className={style.createLink} to='/Create'>Create Pokemon</Link>
                </div>
                <div className={style.divSelectorYbar}>
                    <div className={style.searchbar}>
                        <SearchBar setCurrent={setCurrent}/>
                     </div>
                    <div className={style.divSelector}>
                    <label className={style.labels}>Order Pokemons: 
                        <select className={style.select} onChange={e=>handleSortName(e)}>
                            <option value="none">None</option>
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                        </select>
                    </label>
                    <label  className={style.labels}>Order By Attack:
                        <select className={style.select} onChange={e=>handleSortAttack(e)}>
                            <option value='attack'>Attack</option>
                            <option value='max'>Max</option>
                            <option value='min'>Min</option>
                        </select>
                    </label>
                    <label className={style.labels}>Filter by Type: 
                        <select className={style.select} onChange={e=> handleFilter(e)}>
                            <option value="all">All</option>
                            {types.map(m=>{
                                return(
                                    <option value={m.name}>{m.name}</option>
                                )
                            })}
                        </select>
                    </label>
                    <label className={style.labels}>Show Pokemons: 
                    <select className={style.select} onChange={e=> handleFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="created">From DB</option>
                        <option value="api">From Api</option>
                    </select>
                    </label>
                    </div>
                </div>
            </div>
                <div className={style.paginatedYCard}>
                    <Paginated
                        charactersPerPage= {charactersPerPage}
                        allCharacters={allCharacters.length}
                        paginated= {paginated}
                        numOfPage={numOfPage}
                        />
                    <div className={style.card}>
                    {
                        currentCharacters.length!==0?currentCharacters.map(m=>{
                            return(
                                <Link key={m.id} to={'/Details/'+m.id} className={style.link}>
                                <Card name={m.name} img={m.img} types={m.types} />
                            </Link>
                            )
                        }):
                        <div>
                            <img src={loadingGif}/>
                            <p className={style.load}>Loading...</p>
                        </div>
                    }
                    </div>
                    <Paginated
                        charactersPerPage= {charactersPerPage}
                        allCharacters={allCharacters.length}
                        paginated= {paginated}
                        numOfPage={numOfPage}
                    />
                </div>
            </div>
    )
}