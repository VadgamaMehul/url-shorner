const url_shortner_db = require("../Model/url_shortner_db");

//routes
const router = require("express").Router();

router.get("/", async (req, res) => {
  const shortUrls = await url_shortner_db.find();
  res.render("index", { shortUrls: shortUrls });
});

//Post
router.post("/shortUrls", async (req, res) => {
  await url_shortner_db.create({ full: req.body.fullUrl });
  res.redirect("/");

  //   const task = req.body;
  //   url_shortner_db
  //     .create(task)
  //     .then((data) => {
  //       console.log("Data has been added successfully");
  //       console.log(data);
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     console.log(task);
  //     if (!task) return res.status(400).json({ msg: "No Task Provided" });
});

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await url_shortner_db.findOne({
    short: req.params.shortUrl,
  });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

//delete
router.delete("/remove/:id", async (req, res) => {
  try {
    const removeResult = await url_shortner_db.findByIdAndRemove(req.params.id);
    if (!removeResult) {
      return res.status(404).send("No Task Found");
    }
    res.send(`Deleted ${removeResult}`);
  } catch (err) {
    console.log("Error in deleting the data : ", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
