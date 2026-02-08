const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const ctrl = require("../controllers/medicalController");

router.get("/my", auth, ctrl.getMyRecords);

router.get("/doctor", auth, ctrl.getDoctorRecords);

router.get("/", auth, ctrl.getAll);

router.get("/search", auth, ctrl.search);

router.get("/date", auth, ctrl.byDate);

module.exports = router;
