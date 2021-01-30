Node Version v15.2.0

start : {
    npm start => node app.mjs
    npm run dev => nodemon app.mjs
    npm test => mocha
}

syntax : {
    ES6,
    import , export module
}

DB => set env variable named DB_URI  and initialize it to your MongoDB URI :  DB_URI = "YOUR MongoDB URI"