const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req,res) =>{
    res.render("index")
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
});