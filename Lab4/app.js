
const credentials = require('./credentials.js')

const request = require('request');

const forecastWeather = function(lat,lon) {
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/'+ lat + ',' + lon + '?lang=es&units=si'

    request({ url, json: true }, function(error, response) {
      if (error) {
        console.log(error)
      } else {
        const data = response.body

        //console.log( data.daily )

        const summary = data.currently.summary
        const temp = data.currently.temperature
        const probabilidad = data.currently.precipProbability * 100

        const days = []

        for (i in data.daily.data){
            const aux = {
                auxSummary: data.daily.data[i].summary,
                auxProbabilidad: data.daily.data[i].precipProbability * 100,
                auxMax: data.daily.data[i].temperatureMax,
                auxMin: data.daily.data[i].temperatureMin
            }
            
            days.push(aux)
        }

        //console.log(days)

        console.log(summary + ". Actualmente esta a " + temp +"°C. Hay " + probabilidad + "% de posibilidad de lluvia" )

        console.log("")

        console.log("Resumen de los siguientes 7 dias estara asi")

        for (i in days){
            console.log(i)
            console.log(days[i].auxSummary )
            console.log("Probabilidad de lluvia de " + days[i].auxProbabilidad + "%" )
            console.log("Minima de " + days[i].auxMin )
            console.log("Maxima de " + days[i].auxMax )
        }
        

        //console.log(summary)
        //console.log(temp)
        //console.log(probabilidad)

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

        
        if ( data.Response == 'False' ) {
          console.log(data.Error)
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
    
    forecastWeather(data.lat,data.lon)
})