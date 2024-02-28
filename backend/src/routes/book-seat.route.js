const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
// router.route('/book-seat').post(bookingController.book_seat);
router.route('/get-booking/:associate_id').get(bookingController.get_booking);
// router.route('/delete-booking').delete(bookingController.deleteBooking);
// router.route('/edit-booking').patch(bookingController.edit_booking);
router.route('/get-cancel-booking/:associate_id').get(bookingController.cancel_booking);
router.route('/is-date-available/:date').post(bookingController.is_date_available);
router.route('/is-already-booked').post(bookingController.is_already_booked);

module.exports = router;