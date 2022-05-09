const { Router } = require('express')
const router= Router()
const {bullTypeInDb} = require('../controllers/controlls')

router.get('/',async(req,res)=>{
    try{
        res.status(200).json(await bullTypeInDb())
    }catch(err){
        res.status(404).send({msg: 'algo hiciste mal.'})
    }
})

module.exports = router