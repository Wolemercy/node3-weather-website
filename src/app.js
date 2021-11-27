const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Wole Ajewole"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Wole Ajewole"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        info: "Enter the location you want to retrieve weather data for, e.g. Boston",
        name: "Wole Ajewole"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    address = req.query.address

    geocode(address, (error, {longitude, latitude, location}={}) => {
        if (error) {
            console.log(error)
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(error)
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address
            })
            
          })
    })
    
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Wole Ajewole',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wole Ajewole',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is listening on port' + port)
})