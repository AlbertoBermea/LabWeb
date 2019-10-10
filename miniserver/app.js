const express = require('express')

const app = express()

const path = require('path')

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('',function(req,res){
    res.send('Hola Mundo!')
})

app.get('/about',function(req,res){
    res.send('Un about muy interesante')
})

app.get('/contact',function(req,res){
    res.send('Contact me ;)')
})

app.get('/misc',function(req,res){
    res.send({
        dia: 'Jueves',
        descripcion: 'Casi viernes de ahorcar rucas'
    })
})

app.get('*',function(req,res){
    res.send('Ooops!')
})

app.listen(3000,function(){
    console.log('Up and running!')
})