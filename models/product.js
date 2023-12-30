const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      if (err.code === 'ENOENT') {
        
        return cb([]);
      }
     
      console.error('Error reading file:', err);
      return cb([]);
    } else {
      try {
        const products = JSON.parse(fileContent);
        // Check if it's an array
        if (Array.isArray(products)) {
          cb(products);
        } else {
          console.error('Invalid JSON content. Expected an array.');
          cb([]);
        }
      } catch (jsonError) {
        
        console.error('Error parsing JSON:', jsonError);
        cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
