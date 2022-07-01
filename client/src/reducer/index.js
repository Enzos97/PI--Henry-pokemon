import {GET_CHARACTERS, FILTER, GET_DETAIL, FILTER_CREATED, ORDER_NAME, SEARCH_BY_NAME, ORDER_ATTACK, POST_POKEMON, CLEAR_PAGE, DELETE_POKEMON} from "../actions"
import { GET_TYPES,  } from './../actions/index';

const initialState = {
    characters : [],
    allCharacter : [],
    detail:{},
    types:[],
}

const rootReducer = (state= initialState,action)=>{
    switch(action.type){
        case GET_CHARACTERS: return{
            ...state,
            characters: action.payload,
            allCharacter: action.payload
        }
        case SEARCH_BY_NAME: return{
            ...state,
            characters: action.payload
        }
        case GET_TYPES: return{
            ...state,
            types:action.payload,
        }
        case ORDER_NAME:
        let sortArr = action.payload === 'a-z'? state.characters.sort(function(a,b){
            if( a.name > b.name){
                return 1;
            }
            if(b.name > a.name){
                return -1;
            }return 0;
        }): state.characters.sort(function(a,b){
            if(a.name>b.name){
                return -1;
            }
            if(b.name>a.name){
                return 1;
            }return 0;
        })
        return{
            ...state,
            characters:sortArr
        }
        case FILTER: 
            const pokemonsFilter = state.allCharacter
            const typesFilter = action.payload ==='all'? pokemonsFilter:pokemonsFilter.filter(f=>f.types[0]===action.payload || f.types[1]===action.payload)
            return{
            ...state,
            characters:typesFilter
        }
        case FILTER_CREATED:
            const pokemonsFilter1 = state.allCharacter
            const cratedFilter = action.payload === 'created'? pokemonsFilter1.filter(el=> el.InDB):pokemonsFilter1.filter(el=>!el.InDB)
            return{
                ...state,
                characters:action.payload==='all'?pokemonsFilter1:cratedFilter
            }
        case ORDER_ATTACK:
            let sortAttack = action.payload==='max'?state.characters.sort(function(a,b){
                return b.attack-a.attack;
            }):state.characters.sort(function(a,b){
                return a.attack-b.attack;
            })
            return{
                ...state,
                characters:sortAttack
            }
        case GET_DETAIL: return{
            ...state,
            detail: action.payload
        }
        case POST_POKEMON: return{
            ...state
        }
        case CLEAR_PAGE: return{
            ...state,
            detail:{}
        }
        case DELETE_POKEMON: return{
            ...state
        }
        // case GET_TYPES_IN_PAGE: return{
        //     ...state,

        // }
    default: return{...state}
    }
}

export default rootReducer;
