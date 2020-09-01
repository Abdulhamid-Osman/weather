const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/index.html")
});
app.post("/",(req,res)=>{
  const query = req.body.cityName
  const apiKey = "my api key";
  const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+  query +"&appid="+ apiKey +"&units=" + unit
  https.get(url,(response)=>{
      console.log(response.statusCode);

      response.on("data", (data)=>{
          const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp
          const weatherDescription = weatherData.weather[0].description
          const icon = weatherData.weather[0].icon
          const imgUrl =  "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        //   res.send("The weather is " + weatherDescription);
          res.write("<h1>The weather currently in " + query + " is " + weatherDescription + "</h1>")
          res.write("<h1>And the temperature is " + temp + "</h1>")
          res.write("<img src="  + imgUrl + ">")
          res.send();
      });
  })
})



app.listen(3000,()=>{
    console.log("Server is up");
});

// app.get("/",(req,res)=>{
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=94b6c4141993bc7abe0f37271a10d4e9&units=metric"
//     https.get(url, (res)=>{
//         res.on("data",(data)=>{
//             const weatherData = JSON.parse(data);
//             console.log(weatherData);
//         })
//         console.log(res.statusCode)
//     });
//     res.send("App is up and running")
// })
