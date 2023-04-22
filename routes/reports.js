const express = require("express");
const router = express.Router();
const reportModel = require("../models/reportModel");
const auth = require("../middleware/auth")

//posting a report
router.post("/newReport", auth, (req, res) => {
    if (!req.body.userid || !req.body.location || !req.body.picurl || !req.body.cat) {
        return res.status(400).json({ message: "Not all fields have been filled" });
    }
    const newReport = new reportModel({
        userid: req.body.userid,
        location: req.body.location,
        picurl: req.body.picurl,
        cat: req.body.cat,
        curstatus: req.body.curstatus
    })
    try {
        newReport.save().then((report) => {
            res.status(200).json(report);
        })


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//getting all reports of a user
router.get("/unireport", auth, (req, res) => {
    const id = req.body.id;
    try {
        reportModel.find({ userid: id }).then((data) => {
            res.status(200).json(data);
        });
    } catch (error) {

        res.status(400).json({ message: error.message });
    }


});

//getting all reports
router.get("/allreport", auth, (req, res) => {
    try {
        reportModel.find().then((data) => {
            res.status(200).json(data);
        });

    } catch (error) {

        res.status(400).json({ message: error.message });

    }


});
function isInCircle(lat1, lon1, lat2, lon2, radius) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance <= radius;
}

//verifying whether given point is in the circle or not
router.post("/check",auth, (req, res) => {
    const lat1 = req.body.lat1;
    const lon1 = req.body.lon1;
    const lat2 = req.body.lat2;
    const lon2 = req.body.lon2;
    const radius = req.body.radius;
    try {
        if (isInCircle(lat1, lon1, lat2, lon2, radius)) {
            const b=1;
            res.status(200).json({b});

        }
        else {
             const b=0;
            res.status(200).json({b});
        }
    }catch(error)
    {

           res.status(400).json({message:error.message});

    }

});

module.exports = router;