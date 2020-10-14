const request = require("request")

const tempData = (geoid,callback)=>{

    const url = "https://www.metaweather.com/api/location/"+geoid

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback("Could not connect to the geoid",undefined)
        }
        if(response.body.length == 0){
            callback("Geoid Not Found for the location",undefined)
        }
        else{
            callback(undefined,response.body)
        }

    })

}


module.exports = tempData