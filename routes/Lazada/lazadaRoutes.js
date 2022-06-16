const express = require("express");
const router = express.Router();
const { lazadaScraper } = require("../../script/index");
const constant = require("../../constant");
const ErrorMessage = (param = null) => constant.ErrorMessage(param);

router.post("/stock/check", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json(ErrorMessage().MissingParameter);
      return;
    }
    if (!req.body.link) {
      res.status(400).json(ErrorMessage("Link").SpecificMissingParameter);
      return;
    }

    const data = await shopeeScraper.checkStock(req.body.link);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json(ErrorMessage(err.message).SomethingHappened);
  }
});

module.exports = router;
