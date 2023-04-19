const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const draftData = {
  "1": { "name": "item A", "description": "Lorem ipsum dolor sit amet" }, 
  "2": { "name": "item B", "description": "consectetur adipiscing elit" }, 
  "3": { "name": "item C", "description": "sed do eiusmod tempor incididunt" }
}

router.get("/", (req, res) => {
  res.json({
    title: 'GITAPI PROJECT !',
    infos: 'multi is making very light node.js REST API',
    data: draftData
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
