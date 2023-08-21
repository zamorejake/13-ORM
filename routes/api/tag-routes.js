const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (_req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });

    !tag
      ? res.status(404).json({ message: "Tag not found." })
      : res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id,
      },
    });

    updateTag[0] === 0
      ? res.status(404).json({ message: "Tag not found." })
      : res.status(200).json({ message: "Tag updated." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    !deleteTag
      ? res.status(404).json({ message: "Tag not found." })
      : res.status(200).json({ message: "Tag deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
