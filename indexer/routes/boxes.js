const router = require("express").Router();
const boxModel = require("../models/box");

router.get("/", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.sendStatus(400);
  } else {
    const boxes = await boxModel.find({ creator: address });
    res.status(200).send(boxes);
  }
});

module.exports = router;
