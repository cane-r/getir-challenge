const request = require ('supertest');
const db = require("../database/connector");
const record = require('../database/models/record');

beforeAll (async () => {
    await db.connect();
  });

afterAll (async () => {
    await db.disconnect();
});

//didnt test if db is down.Returned response is the same..
describe("Record mongo model",  () => {
  //dont need to test the "empty body" case..
  test('returns results for getRecords method', async () => {
    const body = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
          };
    const {startDate,endDate,maxCount,minCount} = body;

    const filtered = await record.getRecords(startDate,endDate,maxCount,minCount);
    const withid = await record.find({key: filtered[0].key}, 'createdAt counts');
    const arr = withid[0]._doc.counts;
    const sum = arr.reduce((partial_sum, a) => partial_sum + a, 0);
    expect(filtered[0].totalCount).toBe(sum);
    expect(new Date(filtered[0].createdAt) >= new Date(startDate)).toBe(true);
    expect(new Date(filtered[0].createdAt) <= new Date(endDate)).toBe(true);
  });
   
  test('returns results for find method', async () => {
    const startdate = "2010-01-26",enddate="2016-01-26";
    const res = await record.find({createdAt: {
        $gte: new Date(startdate), 
        $lt: new Date(enddate)
    } }, 'key createdAt counts', function(err, docs) {
        //console.log(docs.length);
    });
    //according to returned json,cant be null/undefined.so didnt check..
    const object = res[0]._doc;
    expect(new Date(object.createdAt) >= new Date(startdate)).toBe(true);
    expect(new Date(object.createdAt) <= new Date(enddate)).toBe(true);
    expect(res.length).not.toBe(0); 
  });
});