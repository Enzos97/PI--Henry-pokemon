const { Router, json } = require('express')
const { Pokemon } = require('../db.js')
const router= Router()
const {getallCharacters, charactersById, createCharacter, charactersByNameInDbOrApi}= require('../controllers/controlls')
router.use(json())

router.get('/', async (req,res)=>{
    try{
        let {name} = req.query
        if(!name) return res.status(201).json(await getallCharacters())
        res.status(200).json(await charactersByNameInDbOrApi(name))
    }catch(err){
        res.status(404).json(err.message)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        let {id} = req.params
        res.send(await charactersById(id))
    }catch(err){
        res.status(404).json(err.message)
    }
})

router.post('/',async(req,res)=>{
    try{
        let {name,height,hp,attack,defense,speed,weight,types,img, isInDataBase} = req.body
        res.status(200).json(await createCharacter(name,height,hp,attack,defense,speed,weight,types,img, isInDataBase))
    }catch(err){
        res.status(400).json(err.message)
    }
})

// router.get('/', async (req, res) => {
//     try {
//        // const apiPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=40&limit=40');
//        //const pokemonsLLamados = await llamadaApiLimit.data.results.map(m=>{return axios.get(m.url)})
//        const apiPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon');
//        let secondApiPokemon = apiPokemon.data.next;
//        secondApiPokemon = await axios.get(secondApiPokemon);
 
//        let apiDex = apiPokemon.data.results.map(poke => poke.name);
//        secondApiPokemon.data.results.map(poke => apiDex.push(poke.name));
 
//        res.json(apiDex);
//     } catch (err) {
//        console.log(err);
//     }
//  })
module.exports = router 