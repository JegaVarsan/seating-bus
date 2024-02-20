const router = require('express').Router();
const associatesinfo_controller = require('../controllers/associatesinfo.controller');
router.route('/get-associates/:manager_id').get(associatesinfo_controller.getAssociates);
router.route('/get-associate/:associate_id').get(associatesinfo_controller.getAssociate);
module.exports = router;