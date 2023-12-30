const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/delete');


router.post('/:id', deleteController.deleteProduct);

module.exports = router;
