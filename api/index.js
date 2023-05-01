const express = require('express');
const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'prod') {
    require('dotenv').config();
}
const web_origin = process.env.WEBORIGIN || "http://localhost:3000";
//const web_origin = "http://";
console.log("allow cors on web_origin:%s", web_origin);

const cors = require('cors');
app.use(cors({
//    origin: web_origin,
    origin: "*",
    methods: "GET, POST",
}));
const port = process.env.PORT || 3001;

var fruit_prices = [];
if (process.env.NODE_ENV !== 'prod') {
    fruit_prices = [
        {name: "banana", id: 1, price: 100},
        {name: "strawberry", id: 2, price: 300},
        {name: "apple", id: 3, price: 200},
    ];    
}

var listener = app.listen(port, () => {
    console.log('express: port %d opened', listener.address().port);
});

app.get("/fruit/prices", (req, res) => {
    console.log("GET: access to /fruit/prices");
    res.json(fruit_prices);
});

app.get("/fruit/prices/:id", (req, res) => {
    console.log("GET: access to /fruit/prices/:id");
    var item = fruit_prices.find(price => (price.id === parseInt(req.params.id)));
    res.json(item);
});

app.post("/fruit/prices", (req, res) => {
    console.log("POST: access to /fruit/prices");
    if (req.body) {
        const item = {
            name: req.body.name,
            id: fruit_prices.length + 1,
            price: req.body.price
        }
        fruit_prices = [...fruit_prices, item];
        res.json(fruit_prices);
    }
});
