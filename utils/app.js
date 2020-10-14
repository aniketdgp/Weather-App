//Not Required Via Command Line

const getGeoId = require("./geoid")
const tempData = require("./getTemp")
const getLocation = require("../src/app")

const fs = require('fs')

const location = process.argv[2]

    

    getGeoId(location,(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            tempData(response,(error,data)=>{
                if(error){
                    console.log(error)
                }
                else{
                    const saveData=(callback)=>{
                        const wData = data.consolidated_weather[0]
                        callback(wData)
                    }
                     
                    saveData((vdata)=>{
                        console.log(vdata)
                    })
                }
            })
        }
    })


    module.exports = getGeoId