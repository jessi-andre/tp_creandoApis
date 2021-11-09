const express = require('express');
const router = express.Router();
const {} = require('../../controllers/api/moviesRouters')
router
    .get('/', list)
    .get('/:id', detail)

module.exports = router;