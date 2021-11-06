const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordschema = new Schema({}, { strict: false });
const record = mongoose.model('Record', recordschema, 'records');

record.getRecords = (startDate,endDate,maxCount,minCount) => {
  return new Promise((resolve, reject) => {
    record.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
          }
        }
      },
      {
        $unwind: "$counts"
      },
      {
        $group: {
          _id: "$key",
          createdAt: {
            $first: "$createdAt"
          },
          totalCount: {
            $sum: {
              $toInt: "$counts"
            }
          }
        }
      },
      {
        $match: {
          totalCount: {
            $lte: maxCount,
            $gte: minCount
          }
        }
      },
      {
        $project: {
          _id: 0,
          key: "$_id",
          createdAt: 1,
          totalCount: 1
        }
      }
    ] , function(err, result) {
          if (err) {
            return reject(err);
          }
            return resolve(result);
        });
  });
};

module.exports = record;
