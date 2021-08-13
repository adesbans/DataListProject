/*
 * This is the code for a server that gives JSON data.
 *
 * @author Alex Desbans
 */

// set up dependencies: these modules export functions that can then be called below
// package for responding to requests for a specific URL
const express = require('express');
// package for logging attempts to access the server (for easier debugging)
const morgan = require('morgan');
// package that replicates fetch functionality built into the browser
const fetch = require('node-fetch');
// package that bundles up query parameters given as an Object into URL syntax
const querystring = require('querystring');
// package that allows certain URLs to access the server

// set up server specific configuration values
const { FLICKR_API, OPENWEATHER_API, REALTORCOM_API } = require('./secrets');
// allow code to be run locally or when deployed on a remote host

const PORT = process.env.PORT || 3000;

// make a generic server and start listening for requests
const app = express();

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

//---------------------------------------------------------------------
// set up middleware apps that manage "all" URL requests
// log all requests made to the server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// setup CORS options for maximum security
const whitelist = ['https://compsci290_2021spring.dukecs.io', 'http://localhost:8080/'];
const corsOptions = {
    origin: (origin, callback) => {
        // only allow sites listed above or dev-server proxies to access server data
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            const err = new Error('CORS Error: This site is not authorized to access this resource.');
            err.status = 401;
            callback(err);
        }
    },
};

const cors = require('cors');
app.use(cors());

//---------------------------------------------------------------------
// utility functions
// simple function to factor out common code from the API methods
// NOTE, queryParameters contains values meant to be passed along with the URL (i.e., after the ?)
// NOTE, protocolOptions contains values meant to be passed along with the request (i.e., GET/POST, headers, etc.)
async function getJSON(url, apiAction, queryParameters, protocolOptions) {
    const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
    const urlWithParameters = `${url}${apiAction}${parameters}`;
    console.log(urlWithParameters);
    const response = await fetch(urlWithParameters, protocolOptions);
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error(`API Access Error ${response.status} for URL: ${urlWithParameters}`);
    }
}

// access Realtor API to get useful data
async function fetchProperties() {
    // set up query parameters needed to get interesting data
    const parameters = {
        city: 'Durham',
        state_code: 'NC',
        offset: '0',
        limit: '200'
    };
    // fetch data from the API using the set parameters
    const jsonData = await getJSON(REALTORCOM_API.URL, '', parameters, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": REALTORCOM_API.TOKEN,
            "x-rapidapi-host": "realtor-com-real-estate.p.rapidapi.com"
        }
    });
    console.log(jsonData);
    console.log(jsonData.status);
    // pick random image from those returned
    if (jsonData) {
        console.log(jsonData);
        return jsonData;
    }

    
    throw new Error(`Realtor API Error: ${jsonData.message}`);
}

//---------------------------------------------------------------------
// set up URL responses:
// provide some response to visiting the server directly (i.e., its homepage)
app.get(
    '/',
    (req, res) => {
        res.status(200);
        res.send('<a href="api/get_data?lat=36&lon=-79">Get the Data!</a>');
    },
);

// return the JSON data resulting from remote API requests
// NOTE, lat/lon parameters are provided in the URL as request's query parameters
app.get(
    '/api/get_data',
    async (req, res, next) => {
        try {
            // use named query parameters to pass to our functions
            const propertiesData = await fetchProperties();
            // everything is OK, so report back to browser
            res.status(200);
            // construct JSON object to return, must match what frontend is expecting
            res.json({
                propertiesData
            });
        }
        catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);

// handle errors thrown by the application code
// NOTE, this actually must be defined LAST in order to catch any errors from others
app.use((err, req, res, next) => {
    console.log(err);
    // delegate to default Express error handler if HTTP header info has already been sent back
    if (res.headersSent) {
        next(err);
        return;
    }
    // set error status and return error message as JSON
    // since that is what the frontend is expecting
    res.status(err.status || 500).json({ message: err.message });
});