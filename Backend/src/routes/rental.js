const express = require('express');
const router = express.Router();
const rentalController = require('../app/controllers/RentalController');

router.post('/delete', rentalController.deleteRentalForm);
router.get('/get', rentalController.getRentalForm);
router.post('/create', rentalController.createRentalForm);

module.exports = router;
