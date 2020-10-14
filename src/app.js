const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoId = require('../utils/geoid')
const tempData = require('../utils/getTemp')

//Setting up port for Heroku servers
const port = process.env.PORT || 3000

const app = express()

app.set('view engine','hbs')

//setting dir address
const dir = path.join(__dirname,"../public")
const viewdir = path.join(__dirname,"../templates/view")
const pardir = path.join(__dirname,"../templates/partials")

//setting the directory for use
app.use(express.static(dir))
app.set('views',viewdir)
hbs.registerPartials(pardir)




app.get('/',(req,res)=>{
    res.render('index',{
        title : "Weather App",
        author :"aniketdgp"
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title : "About The App",
        author :"aniketdgp"
    })
})


app.get("/docs",(req,res)=>{
    res.render('docs',{
        title : "Docs",
        author :"aniketdgp"
    })
})


app.get("/api",(req,res)=>{

    if(!req.query.address){
        res.send({
            error : "Address Query is not passed"
        })
    }else{

        const address = req.query.address
        getGeoId(address,(error,response)=>{
            if(error){
                res.send({error})
            }
            else{
                tempData(response,(error,tData)=>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.send({
                            forecast : tData.consolidated_weather[0].weather_state_name,
                            temprature : Math.round(tData.consolidated_weather[0].the_temp),
                            location : address
                        })
                    }
                })
            }
        })

        
      

    }

    
})


app.get("/product",(req,res)=>{
   
    if(!req.query.search){
        res.send({
            error : "You need to provide a Query for Search"
        })
    }else{
        const search = req.query.search
        const rating = req.query.rating
        res.send({
            product:[]
        }) 
        console.log("Searched Key : "+search +"\nRating : "+rating)
    }

    
})


app.get('/*',(req,res)=>{
    res.render('404.hbs',{
        title : "404",
        author :"aniketdgp"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        title : "/help/404",
        author :"aniketdgp"
    })
})


app.listen(port,()=>{
    console.log("Server is Up and Running on port :"+port)
})


