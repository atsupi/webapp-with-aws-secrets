console.log("node.js started");

import express from 'express';
import { retrieveSecrets } from './retrieveSecrets.js';
const app = express();

console.log("NODE_ENV=%s", process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

const listener = app.listen(PORT, () => {
    console.log('express: port %d opened', listener.address().port);
});

app.set('view engine', 'hbs');
app.use(express.static('public'));

const SECRETS_ID = `apihandlebarsexample_${process.env.NODE_ENV}`;

app.get("/run_api.js", (req, res) => {
    res.contentType('javascript');
    if (process.env.NODE_ENV === "dev") {
        console.log("index.js:", SECRETS_ID);
        const params = {
            apiorigin: "http://localhost:3001"
        }
        res.render('run_api', params);
        return;
    }
    retrieveSecrets(SECRETS_ID).then((data) => {
        const url = data.apihandlebarsexample;
        const params = {
            apiorigin: url
        }
        res.render('run_api', params);
        console.log("API end point is %s", url + "/fruit/prices");
    });
});
