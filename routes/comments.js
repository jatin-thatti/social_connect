const express = require('express');
const router = express.Router();
const comments_controller = require('../controllers/comments_controller');
const passport = require('../config/passport-local');

router.post('/create',passport.checkAuthentication,comments_controller.create);
router.get('/destroy/:id',passport.checkAuthentication,comments_controller.destroy);
module.exports = router;
