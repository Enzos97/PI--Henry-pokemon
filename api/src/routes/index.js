const { Router } = require('express');
const axios= require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemons = require('./pokemons')
const types = require('./types')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokemons)
router.use('/types',types)
// router.get('/', async (req,res)=>{
//     try {
//         const llamadaApi = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
//         let primero20 = llamadaApi.data.results.map(p=> p.name)
//         //console.log(llamadaApi.data.results[0].url)
//         console.log(primero20)
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;
