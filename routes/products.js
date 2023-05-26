const productSchema = require("../schema/productSchema");
const express = require("express");
const router = express.Router();

// app.use(express.json());

router.get("/products", async (req, res) => {
  try {
    const products = await productSchema.find({});
    return res.status(200).send(products);
  } catch (error) {
    return res.status(404).json({
      err: error,
    });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    const products = await productSchema.findById(_id, req.body);
    // console.log(_id);
    if (!products) {
      return res.status(404).send(`No product found for the give id.`);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: error,
    });
  }
});

router.post("/products/add", async (req, res) => {
  //working
  try {
    const { name, description, productImage, date, brand, cost } = req.body;
    // console.log(name, description, productImage, date, brand, cost )
    if (!name || !description || !productImage || !date || !brand || !cost) {
      return res.status(400).json({
        err: "Kindly provide all the details",
      });
    }

    const newProduct = await productSchema.create({
      name,
      description,
      productImage,
      date,
      brand,
      cost,
    });

    return res.status(201).send(newProduct);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let products = await productSchema.findByIdAndUpdate(_id, req.body);
    await products.save();
    if (!products) {
      return res.status(404).json({
        err: "No product found",
      });
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let products = await productSchema.findByIdAndRemove(_id, req.body);
    if (!products) {
      return res.status(404).json({
        err: "No products found",
      });
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
