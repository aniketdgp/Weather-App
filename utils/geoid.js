const request = require('request')


const getGeoId = (address,callback)=>{

    const url = "https://www.metaweather.com/api/location/search/?query="+address

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback("Unable to Connect to the Weather Service",undefined)
        }
        else if(response.body.length == 0){
            callback("Unable to find the search location ",undefined)
        }
        else{
            callback(undefined,response.body[0].woeid)
        }
       
    })

}


module.exports = getGeoId
