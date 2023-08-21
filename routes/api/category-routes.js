const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });

    !category
      ? res.status(404).json({ message: "Category not found." })
      : res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({ category_name: req.body.category_name});

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update({ category_name: req.body.category_name}, {
      where: {
        id: req.params.id,
      },
    });

    updateCategory[0] === 0
      ? res.status(404).json({ message: "Category not found." })
      : res.status(200).json({ message: "Category updated." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //have to delete product since it's a protected child row
    const deleteProduct = await Product.destroy({
      where: {
        category_id: req.params.id
      }
    });

    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

   

    !deleteCategory || !deleteProduct
      ? res.status(404).json({ message: "Category not found." })
      : res.status(200).json({ message: "Category deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
