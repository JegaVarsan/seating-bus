const express=require('express')
const router=express.Router();

const generate_seat_controller = require('../controllers/generate_seat.controller')


router.route('/').post(generate_seat_controller.generate);
router.route('/get-seat-info/:date').get(generate_seat_controller.get_seat_info);
router.route('/block-seats').get(generate_seat_controller.block_seats);


module.exports = router;