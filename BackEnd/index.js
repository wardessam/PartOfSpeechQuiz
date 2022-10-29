const express = require("express");
const fs =require("fs");
const bodyParser =require("body-parser");
const cors =  require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());
var fileData = fs.readFileSync("routes/api/TestData.json", { encoding: 'utf-8' });
var wordjsonData = JSON.parse(fileData).wordList;
var scorejsonData = JSON.parse(fileData).scoresList;

app.get("/getWordList", (req, res) => {
    res.send(JSON.stringify(wordjsonData));
   
});
const ranking = (arr) => arr.map((x, y, z) => z.filter((w) => w > x).length + 1);
app.get("/getScore/:score", (req, res) => {
    scorejsonData.push(req.params.score);
    var rank = ranking(scorejsonData)[scorejsonData.length-1];
    scorejsonData.pop();
    res.send({"Rank":rank});
   
});
app.listen("3001", () => console.log("listening at 3001"));


