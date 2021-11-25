const request = require('postman-request')

const forecast = (lati, long, callback) => {
    url = "http://api.weatherstack.com/current?access_key=a4c0f1b63b7ce71524ad42e39e14332a&query="
    + long + ',' + lati + "&units=m"

    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +
                            ". It is currently " + 
                            body.current.temperature + 
                            " degrees out. It feels like " + 
                            body.current.feelslike + " degrees out")
        }
    })

}

module.exports = forecast