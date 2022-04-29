const axios = require('axios')
const { Pokemon, Type } = require('../db');

async function charactersByNameInApi(value){
    try{
        const charaterPrueba = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
        const characterValue = {
            id:charaterPrueba.data.id,
            name:charaterPrueba.data.name,
            height:charaterPrueba.data.height,
            hp:charaterPrueba.data.stats[0].base_stat,
            attack: charaterPrueba.data.stats[1].base_stat,
            defense: charaterPrueba.data.stats[2].base_stat,
            speed: charaterPrueba.data.stats[5].base_stat,
            weight: charaterPrueba.data.weight,
            types: charaterPrueba.data.types.map(m=>m.type.name),
            img: charaterPrueba.data.sprites.other.dream_world.front_default,
        }
        return characterValue
    }catch(err){
        throw new Error('El Pokemon no existe')
    }
}

async function charactersByNameInDbOrApi(name){
    let findNameInDb = await Pokemon.findAll({
        where:{name:name.toLowerCase()},
        attributes:["id","name","hp","attack","defense","speed","height","weight","img",],
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })

    findNameInDb= findNameInDb.map(m=>{
        return {
        ...m.dataValues, 
       types: m.types?.map(m=>m.name)
    }})

    if(!findNameInDb[0]) return charactersByNameInApi(name)

    return findNameInDb[0]
}

async function allCharacters(){
    //const llamadaApiLimit = await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
    const primerllamadaApiLimit = await axios.get("https://pokeapi.co/api/v2/pokemon")
    const pokemonsLLamados1 = await primerllamadaApiLimit.data.results.map(m=>{return axios.get(m.url)})

    const llamada2 = await axios.get(primerllamadaApiLimit.data.next)
    const pokemonsLLamados2 = await llamada2.data.results.map(m=>{return axios.get(m.url)})
    
    const totalPokemons = [...pokemonsLLamados1,...pokemonsLLamados2]

    const resPromises = await Promise.all(totalPokemons)

    const pokemonsData = resPromises.map(p=>{
        return{ 
                id: p.data.id,
                name: p.data.name,
                img: p.data.sprites.other.dream_world.front_default,
                types: p.data.types.map(m=>m.type.name),
              }
    })

    let llamadaDataDb = await Pokemon.findAll({
        attributes:['name','img','id'],
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })

    llamadaDataDb= llamadaDataDb.map(m=>{
        return {
        ...m.dataValues, 
        types: m.types?.map(m=>m.name)
    }})

    let llamadaTotal = [...llamadaDataDb,...pokemonsData]

    return llamadaTotal
}

async function charactersById(value){
    if(value.length>10){
        try{
            const findDbID= await Pokemon.findByPk(value, {include:Type})
            const detailOfPoquemonInDb = {
                id:findDbID.id,
                name: findDbID.name,
                height:findDbID.height,
                hp:findDbID.hp,
                attack:findDbID.attack,
                defense:findDbID.defense,
                speed: findDbID.speed,
                weight: findDbID.weight,
                types: findDbID.types.map(m=>m.name),
                img: findDbID.img,
                isInDataBase:findDbID.isInDataBase
            }
            return detailOfPoquemonInDb
        }catch(err){
            throw new Error('El Pokemon no existe')
        }
    }else{ 
        return charactersByNameInApi(value)
    }
}

async function findCharacterInApi(name){
        let callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .catch(()=>{ return false})
        if(callApi)return true
}

async function createCharacter(name,height,hp,attack,defense,speed,weight,types,img,isInDataBase){
    if(name){
        let findDB = await Pokemon.findOne({
                where: {name: name.toLowerCase()}
            })
        if(await findCharacterInApi(name))throw new Error ('El pokemon que intenta crear ya existe')
        else if(findDB) throw new Error ('El pokemon que intenta crear ya existe')
        else {let pokemonCreate= await Pokemon.create({
            name: name.toLowerCase(),
            height:height,
            hp:hp,
            attack:attack,
            defense:defense,
            speed: speed,
            weight: weight,
            img: img,
            isInDataBase:isInDataBase
        })
        
        let typesDb = await Type.findAll({
            where: {name:types}
        })
        
        pokemonCreate.addType(typesDb)
        
        return 'Pokemon creado correctamente'
    }
    }else{
        return 'Debe ingesar un nombre'
    }
}

async function bullTypeInDb(){
    let typeInDb = await Type.findAll()
    
    if(typeInDb.length===0){
        console.log('helloooo')
        let llamadoALaApi = await axios.get('https://pokeapi.co/api/v2/type');
        let typeInApi = llamadoALaApi.data.results.map(t =>{return {name: t.name}});
        typeInDb = await Type.bulkCreate(typeInApi)
    }

    return typeInDb
}
// let llamadoALaApi = await axios.get('https://pokeapi.co/api/v2/type');
// var typeInDb=[];
// for (let pokemonT = 0; pokemonT < llamadoALaApi.data.results.length; pokemonT++) {
//     const [types] = await Type.findOrCreate({where:{name: llamadoALaApi.data.results[pokemonT].name}})
//     typeInDb.push(types)
// }
// return typeInDb
    
    //console.log(bullTypeInDb())
    //bullTypeInDb().then(val=> console.log(val))
    
    //for(let pokemosT of llamadoALaApi.data.results){
    //}
    // llamadoALaApi.data.results.map(async t =>{ 
    //     const [types] = await Type.findOrCreate({where:{name: t.name}})
    //     typeInDb.push(types)
    // })
    // console.log(typeInDb.length)
    // return typeInDb
module.exports = {
    charactersByNameInApi,
    allCharacters,
    charactersById,
    createCharacter,
    bullTypeInDb,
    charactersByNameInDbOrApi
}