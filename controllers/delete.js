const Product = require("../models/product");

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  const product = new Product(productId); 
  product.deleteProductById();
  res.redirect(`/delete/${productId}`); 
};
