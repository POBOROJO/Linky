const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/connect");
const app = express();

mongoose.connect('mongodb+srv://parijatbhatt1:XriKznROSZhGhSL8@cluster0.2nwhboq.mongodb.net/urlShortener',{

});

app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}))

app.get("/", async(req,res) =>{
    const shortUrls = await ShortUrl.find();
    res.render("index", {shortUrls: shortUrls});
})

app.post("/shortUrls",async (req,res) =>{
    await ShortUrl.create({full : req.body.fullUrl})

    res.redirect("/")
})

app.get("/:shortUrl", async(req,res) =>{
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl})
    if(shortUrl == null){
        return res.status(404)
    }

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
});