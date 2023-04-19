// const express = require("express");
import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
  const data = req.app.get('data');
  res.json({
    title: 'GITAPI PROJECT !',
    infos: 'multi.coop is making a very light node.js express REST API',
    data: data
  });
});

// module.exports = router;

export default router;