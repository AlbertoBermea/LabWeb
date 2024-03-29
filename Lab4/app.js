
const credentials = require('./credentials.js')

const request = require('request');

const forecastWeather = function(lat,lon,callback) {
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/'+ lat + ',' + lon + '?lang=es&units=si'

    request({ url, json: true }, function(error, response) {
      if (error) {
        callback(error,undefined)
      } else {
          
        const data = response.body

        if( data.error ){
            callback(data)
        } else {
            const info = {
                summary: data.currently.summary,
                temp: data.currently.temperature,
                probabilidad: data.currently.precipProbability * 100,
                days: []
    
            }
    
    
            for (i in data.daily.data){
                const aux = {
                    auxSummary: data.daily.data[i].summary,
                    auxProbabilidad: data.daily.data[i].precipProbability * 100,
                    auxMax: data.daily.data[i].temperatureMax,
                    auxMin: data.daily.data[i].temperatureMin
                }
                
                info.days.push(aux)
            }
    
            callback(info)
        }
        
      }  
    })
  
}

const forwardGeoCode = function(place,callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + credentials.MAPBOX_TOKEN

    //console.log(url)

    request({ url, json: true }, function(error, response) {
      if (error) {
        console.log(error)
      } else {
        const data = response.body

        //console.log(data)
        
        
        if ( data.message ) {
          callback(data)
        } else {
          
            const info = {
                lon: data.features[0].geometry.coordinates[0],
                lat: data.features[0].geometry.coordinates[1]
            }

            callback(info)

        }
      }  
    })
  
}



forwardGeoCode("Monterrey",function(data){  
    
    if(data.message){
        console.log(data)
    }
    else{
        forecastWeather(data.lat,data.lon,function(data){

            if(data.error){
                console.log(data)
            }
            else{
                console.log(data.summary + ". Actualmente esta a " + data.temp +"°C. Hay " + data.probabilidad + "% de posibilidad de lluvia" )

                console.log("")

                console.log("Resumen de los siguientes 7 dias estara asi")

                for (i in data.days){
                    console.log(i)
                    console.log(data.days[i].auxSummary )
                    console.log("Probabilidad de lluvia de " + data.days[i].auxProbabilidad + "%" )
                    console.log("Minima de " + data.days[i].auxMin )
                    console.log("Maxima de " + data.days[i].auxMax )
                }
            }
        })
    }
})