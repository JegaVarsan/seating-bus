const express=require('express')
const router=express.Router();

const generatereport_controller = require('../controllers/generatereport.controller')

router.route('/').get(generatereport_controller.main);

module.exports = router;