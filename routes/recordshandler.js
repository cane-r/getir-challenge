const express     = require('express');
const router      = express.Router();
const record = require('../database/models/record');

router.route('/v1').get(getHandler).post(postHandler);

function getHandler(req, res) {
    res.send(`Current environment : ${process.env.NODE_ENV}`);
}

function postHandler(req, res) {
    // or bad alternative,pass req,res to downstream i.e record.getRecords(req,res) 
    const {startDate,endDate,maxCount,minCount} = req.body;

    return record.getRecords(startDate,endDate,maxCount,minCount).then(result => {
        const resultlength = result.length;
        return res.status(200).json({
            "code" : resultlength === 0 ? -1 : 0,
            "msg" : resultlength === 0 ? "No Record" : "Success",
            "records" : result,
        });
    })
    .catch(err=>{
        return res.status(500).json({
            "msg" : `Error happened while fetching from the database.Please try again.Cause : ${err.message}`,
        });
    });
}

module.exports = router;