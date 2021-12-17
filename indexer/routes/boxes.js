const router = require("express").Router();
const boxModel = require("../models/box");

router.get("/", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    const numBoxes = await boxModel.countDocuments();
    res.status(200).send({ numBoxes });
  } else {
    const boxes = await boxModel.find({ creator: address });
    res.status(200).send(boxes);
  }
});

module.exports = router;
