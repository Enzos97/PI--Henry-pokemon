import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postPokemon, getTypes, getCharacters} from './../actions/index';
import style from '../styles/Create.module.css'
import newg from '../img/new.gif'
export default function CreatePokemon(){
    const dispatch= useDispatch()
    const history=useHistory()
    const [errors,setErrors] = useState({})
    const types = useSelector((state)=>state.types)
    console.log('types',types)
    const pokemons = useSelector((state)=>state.characters)
    const [input,setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        weight:"",
        height:"",
        img:"",
        types:[],
    })
    console.log(input)
    
    function validateForm(input){
        let errors = {};
        const ReName = new RegExp(/^[A-Za-z\s]+$/g)
        const ReUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);

        if(pokemons.find(f=>f.name===input.name.toLowerCase())){
            errors.name = 'The pokemon you are trying to create already exists'
        }
        if (!ReName.test(input.name)){
            errors.name = 'The name must not have numbers or special characters'
        }
        if (!input.name){
            errors.name = 'A name is required'
        }
        if (input.hp.length?input.hp< 0:input.hp=0) {
            errors.hp = 'Must be greater than 0'
        }
        if (input.attack.length?input.attack< 0:input.attack=0) {
            errors.attack = 'Must be greater than 0'
        }
        if (input.defense.length?input.defense< 0:input.defense=0) {
            errors.defense = 'Must be greater than 0'
        }
        if (input.speed.length?input.speed< 0:input.speed=0) {
            errors.speed = 'Must be greater than 0'
        }
        if (input.weight.length?input.weight< 0:input.weight=0) {
            errors.weight = 'Must be greater than 0'
        }
        if (input.height.length?input.height< 0:input.height=0) {
            errors.height = 'Must be greater than 0'
        }
        if (input.types.length > 2){
            errors.types = 'You cannot choose more than two types'
        }
        if (input.types.length < 1){
             errors.types = 'You must choose at least one type...'
        }
        // if(input.img.length&&!ReUrl.test(input.img)){
        //     errors.img = 'Enter a valid url'
        // }
        if(input.img.length&&input.img.length){
            errors.img = 'The function of adding image has been temporarily disabled...'
        }
        return errors
    }
    useEffect(() => {
        setErrors(validateForm(input))
    }, [input])
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name]:e.target.value
        }))
    }
    function handleCheck(e){
        let checked= e.target.checked
        if(checked){
            setInput({
                ...input,
                types: [...input.types,e.target.value]
            })
        }
        if(!checked){
            setInput({
                ...input,
                types: input.types.filter(t=>t!==e.target.value)
            })
        }
    }
    console.log(errors)
    console.log('pokes',pokemons)
    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(errors).length===0){
                dispatch(postPokemon(input))
                setInput({
                    name:"",
                    hp:"",
                    attack:"",
                    defense:"",
                    speed:"",
                    weight:"",
                    height:"",
                    img:"",
                    types:[], 
                })
                alert('Pokemon created successfully')
                history.push('/home')
        }
        
        else{
            alert('Complete the form correctly')
        }
    }

    useEffect(()=>{
        dispatch(getTypes())
        dispatch(getCharacters())
    },[])

    return(
        <div className={style.div0}>
            <Link className={style.link} to='/home'><button className={style.btn}>POKEMONS</button></Link>
            <form className={style.form} onSubmit={(e)=>handleSubmit(e)}>
                <div className={style.div1} >
                    <h1 className={style.h1}>Create Pokemon</h1>
                    <img className={style.img} src={newg} alt="" />
                </div>
                <div className={style.div2}>
                    <div className={style.labelsInputs}>
                        <label>Name: </label>
                        <input 
                            type="text" 
                            value={input.name} 
                            name="name"
                            onChange={(e)=>handleChange(e)}
                        />{errors.name && (
                            <p className={style.error}>{errors.name}</p>
                        )}

                    </div>
                    <div className={style.labelsInputs}>
                        <label>Hp: </label>
                        <input 
                            type="number" 
                            value={input.hp} 
                            name="hp" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.hp && (
                            <p className={style.error}>{errors.hp}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Attack: </label>
                        <input 
                            type="number" 
                            value={input.attack} 
                            name="attack" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.attack&& (
                            <p className={style.error}>{errors.attack}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Defense: </label>
                        <input 
                            type="number" 
                            value={input.defense} 
                            name="defense" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.defense&& (
                            <p className={style.error}>{errors.defense}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Speed: </label>
                        <input 
                            type="number" 
                            value={input.speed} 
                            name="speed" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.speed&& (
                            <p className={style.error}>{errors.speed}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Weight: </label>
                        <input 
                            type="number" 
                            value={input.weight} 
                            name="weight" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.weight&& (
                            <p className={style.error}>{errors.weight}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Height: </label>
                        <input 
                            type="number" 
                            value={input.height} 
                            name="height" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.height&& (
                            <p className={style.error}>{errors.height}</p>
                        )}
                    </div>
                    <div className={style.divCheck}>
                        <label className={style.labelTypes}>Types: </label>
                            <div className={style.checkBox}>
                            {types.map((t)=>{
                                return(
                                        <label className={style.labelChek2}><input type="checkbox" value={t.name} name={t.name} onChange={(e)=>handleCheck(e)} />{t.name}</label>
                                        )
                            })}
                            </div>
                        {errors.types&& (
                                <p className={style.error}>{errors.types}</p>
                        )}
                    </div>
                    <div className={style.labelsInputs}>
                        <label>Img: </label>
                        <input type="text" 
                            value={input.img} 
                            name="img" 
                            autoComplete="off"
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.img && (
                            <p className={style.error}>{errors.img}</p>
                        )}
                    </div>
                    <button className={style.btn2} type="submit">create</button>
                </div>
            </form>
        </div>
    )
}
