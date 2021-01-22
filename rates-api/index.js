//Dependencies
const express = require("express");
const rates = require("./rates");

//Constants
const app = express();
const PORT = process.env.PORT || 3000;


app.get("/api/rates", async (req, res) => {
    const base = req.query.base;
    const currency = req.query.currency;
    
    const rate = await rates.getRate(base, currency);
    
    if(rate == null){
        return res.status(500).json("Error Getting Rate");
    }
    return res.status(200).json(rate);
});


app.listen(PORT, () => console.log(`Rates Service Listening On Port ${PORT}`));