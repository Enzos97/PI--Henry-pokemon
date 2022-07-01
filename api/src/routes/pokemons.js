const { Router, json } = require('express')
const {Pokemon} = require('../db.js')
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
        res.status(200).send(await charactersById(id))
    }catch(err){
        res.status(404).json(err.message)
    }
})

router.post('/',async(req,res)=>{
    try{
        let {name,height,hp,attack,defense,speed,weight,types,img, InDB} = req.body
        res.status(200).json(await createCharacter(name,height,hp,attack,defense,speed,weight,types,img, InDB))
    }catch(err){
        res.status(400).json(err.message)
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        let {id}= req.params;
        await Pokemon.destroy({
            where:{id}
        })
        res.status(201).json('pokemons deleted')
    }catch(err){
        res.status(418).json(err.message)
    }
})
module.exports = router 