//Import all required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cache = require('memory-cache');

// Initialize express app
const app = express();

// Import router routes
const {addAPY, apy, deleteAPY} = require('./routes/router');

const port = 3000;

// create and connect to sqlite database
const db = new sqlite3.Database('./db/opareta.db', (err) => {
    if (err) {
      return console.error(err.message);
    } else {
    console.log('Connected to Opareta database.');
    }
});
  
db.run('CREATE TABLE IF NOT EXISTS apy(id INTEGER PRIMARY KEY, deposit TEXT, customer_id TEXT, interest_rate TEXT, date TEXT, yearly_compound_times TEXT, deleted INTEGER, apy_value TEXT)');

global.db = db;  

let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key,body,duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

// configure middleware
app.set('port', process.env.port || port); // set express to use this port

app.use(express.json()); // Express has already a method to parse json
app.use(express.urlencoded({ extended: false })); //Also for the url encoded

// App's API endpoint Routes
app.post('/apy', addAPY); // Route to calculate APY
app.get('/apy/:id', cacheMiddleware(15), apy); // Route to get customer APY History
app.delete('/apy/:id', deleteAPY); // Route to 'delete' customer APY

// Set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

