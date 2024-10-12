const Product = require("../models/product.model");

// get All Products
exports.findAll = (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      req.status(500).send({
        message: err.message || "Some Error occured while retrieving Products ",
      });
    });
};

// get product by id

exports.findOne = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id : " + req.params.id,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      req.status(500).send({
        message:
          err.message ||
          "Some Error occured while retrieving Product with id " +
            req.params.id,
      });
    });
};

// create new product
exports.create = (req, res) => {
  const image = req.file.path
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    imageUrl: image
  });
  product
    .save()
    .then((data) => {
      res.status("201").send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while creating the product",
      });
    });
};

// update product

exports.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product Not found with id " + req.params.id,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while upditing the product with id" +
            req.params.id,
      });
    });
};

// delete product

exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id : " + req.params.id,
        });
      }
      res.send({ message: "Product deleted successfuly!" });
    })
    .catch((err) => {
      req.status(500).send({
        message:
          err.message ||
          "Some Error occured while delete Product with id " + req.params.id,
      });
    });
};

// dalete all products
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(() => {
      res.send({ message: "All products deleted successfuly!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting All Products ",
      });
    });
};

// find products by price
exports.findByPrice = (req, res) => {
  const price = req.query.price;

  Product.find({ price: { $lte: price } })
    .then((products) => {
      if (!products.length) {
        return res
          .status(404)
          .send({ message: "No Products found with price: " + price });
      }
      res.send(products);
    })
    .catch((err) => {
      req.status(500).send({
        message: err.message || "Some Error occured while retrieving Products with price "+ price,
      });
    });
};

// find products by product name
exports.findByName = (req, res) => {
    const keyword = req.query.name;

    Product.find({ name: {$regex : keyword , $options: 'i'} })
      .then((products) => {
        if (!products.length) {
          return res
            .status(404)
            .send({ message: "No Products found with name containing: " + keyword });
        }
        res.send(products);
      })
      .catch((err) => {
        req.status(500).send({
          message: err.message || "Some Error occured while retrieving Products with name containing: " + keyword,
        });
      });
  };