const express = require("express")
const app = express()
const path = require("path")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Serve static assets path
// app.use(express.static('public')) // Simpler
app.use(express.static(path.join(__dirname, '/public')))

// Server setup
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})

// Homepage
app.get('/', (req, res) => {
    res.render("home")
})

app.get('/maro', (req, res) => {
    res.send("Agmad wa7ed fel denya")
})

// Passing data to templates
app.get('/random', (req, res) => {
    random = Math.floor(Math.random() * 10) + 1
    res.render('random', { random })
})

// Path parameters: passing data again
app.get('/profile/:username/', (req, res) => {
    const { username } = req.params
    res.render('profile', { username })
})

// Looping in EJS: passing a whole array
app.get('/friends', (req, res) => {
    const friends = ['maro', 'karo', 'taro', 'laro', 'paro']
    res.render('friends', { friends })
})

// Query strings
app.get('/search', (req, res) => {
    const { q } = req.query
    if (q) {
        res.send(`Searching for ${q}`)
    } else {
        res.send("Nothing found if nothing searched")
    }
})

// Catch-all route
app.get('*', (req, res) => {
    res.send("Not available")
})