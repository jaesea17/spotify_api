const express = require('express');
const router = express.Router();

const Music = require('../models/Musics')

router.get('/', async (req, res) => {
    try{
        let allTracks = await Music.find();
        res.send(allTracks)
    }catch(err){
        console.log(err)
    }
})

//create new entry for hmusics
router.post('/', async ( req, res ) => {

    //preventing saving twice
    try{
        let title = await Music.findOne({title: req.body.title})
        let artist = await Music.findOne({artist: req.body.artist})
        if (title && artist) return res.send({alreadySaved: "already saved"})


        const music =  new Music({
            title: req.body.title,
            artist: req.body.artist      
        }) 
        
        //saving to database
        const savedMusic = await music.save()
        res.send(savedMusic);
    }catch(err){
        if(err) return console.log(err);
    }
});
    
 module.exports = router;
