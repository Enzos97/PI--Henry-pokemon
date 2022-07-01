import axios from 'axios';
export const GET_CHARACTERS = 'GET_CHARACTERS'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_TYPES = 'GET_TYPES'
export const FILTER = 'FILTER'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_NAME = 'ORDER_NAME'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const ORDER_ATTACK = 'ORDER_ATTACK'
export const POST_POKEMON = 'POST_POKEMON'
export const CLEAR_PAGE = 'CLEAR_PAGE'
export const DELETE_POKEMON = 'DELETE_POKEMON'


export function getCharacters(){
    return async function(dispach){
        let json = await axios.get("https://pokemonsbyenzo.herokuapp.com/api/pokemons")
        return dispach({
            type: 'GET_CHARACTERS',
            payload: json.data
        })
    }
}
export function getDetail(id){
    return (dispatch)=>{
            axios.get(`https://pokemonsbyenzo.herokuapp.com/api/pokemons/${id}`)
                .then((json) => dispatch({type: 'GET_DETAIL', payload:json.data}))
                .catch((err)=>{window.alert(err.response.data)})
    }
}
export function getTypes(){
    return async function(dispatch){
        try{
            let json = await axios.get('https://pokemonsbyenzo.herokuapp.com/api/types')
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            })
        }catch(err){
            window.alert(err.response.data)
        }
    }
}
export function postPokemon(payload){
    return function(dispatch){
            axios.post('https://pokemonsbyenzo.herokuapp.com/api/pokemons',payload)
            .then((json)=>dispatch({type:'POST_POKEMON', payload:json}))
            .catch((err)=>{window.alert(err.response.data)})
    }
}
export function orderName(payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
}
export function orderAttack(payload){
    return{
        type: 'ORDER_ATTACK',
        payload
    }
}
export function filterCharacter(payload){
    console.log(payload)
    return{
        type:'FILTER',
        payload
    }
}
export function filterCrated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}
export function searchByName(name){
    return async function(dispatch){
        try{
            let json = await axios.get(`https://pokemonsbyenzo.herokuapp.com/api/pokemons?name=${name}`)
            let arr=[]
            arr.push(json.data)
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload:arr
            })
        }catch(err){
            window.alert(err.response.data)
        }
    }
}

export function deletePokemonDb(id){
    return async function(dispatch){
        try{
            let json = await axios.delete(`https://pokemonsbyenzo.herokuapp.com/api/pokemons/${id}`)
            return dispatch({
                type: 'DELETE_POKEMON',
                payload:json
            })
        }catch(error){
            window.alert(error.response.data)
        }
    }
}

export function clearPage(){
    return{
        type:'CLEAR_PAGE'
    }
}