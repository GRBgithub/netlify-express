const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = req.app.get('data');
  res.json({
    title: 'GITAPI PROJECT !',
    infos: 'multi is making very light node.js REST API',
    data: data
  });
});

module.exports = router;
