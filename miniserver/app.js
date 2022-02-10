const express = require('express')

const omdb = require('./movies.js')

const app = express()

const port = process.env.PORT || 3000

app.get('',function(req,res){
    res.send('Hola Mundo!')
})

app.get('/omdb',function(req,res){
    if( !req.query.search ){
        res.send({
            error: 'Debes enviar un titulo de una pelicula o serie'    
        })
    }

    omdb.omdbMovie( req.query.search, function(error,response){
        if( error ){
            return res.send({
                error: error
            })
        }
        if( response.seasons ){
            var title = response.title
            omdb.omdbSeason(response.title ,function(error,response){
                if( error ){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    title: title,
                    season: response.season,
                    episodes: response.episodes
                })
            })
        }
        else{
            res.send(response)
        }
    })
    
})

app.get('*',function(req,res){
    res.send({
        error: 'Ruta no valida'
    })
})

app.listen(port,function(){
    console.log('Up and running!')
})