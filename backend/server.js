const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY =
process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {

  try{

    const message = req.body.message;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method:"POST",

        headers:{
          "Authorization":
          `Bearer ${API_KEY}`,

          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({

          model:"openai/gpt-4o-mini",

          messages:[
            {
              role:"user",
              content:message
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json(data);

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      error:"Server error"
    });
  }
});

app.listen(PORT, () => {

  console.log(
    "Server running on port " + PORT
  );

});
