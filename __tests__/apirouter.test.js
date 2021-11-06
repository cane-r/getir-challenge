const request = require ('supertest');
const express = require ('../server');
const db = require("../database/connector");

beforeAll (async () => {
  await db.connect();
});

afterAll (async () => {
  await db.disconnect();
});

//didnt test if db is down.Returned response is the same..
describe("Api request of",  () => {
  test('GET request should returns result', async () => {
    const res = await request (express).get ('/records/v1');
    expect(res.text).toBe ('Current environment : test');
    expect(res.statusCode).toBe (200);
  });

  test('empty POST request should returns result', async () => {
    const body = {};
    const res = await request (express).post('/records/v1').send(body);
    expect(res.statusCode).toBe (200);
    expect(res.body.records.length).toBe(0);
  });

  test('POST request should returns result', async () => {
    const body = {
      "startDate": "2016-01-26",
      "endDate": "2018-02-02",
      "minCount": 2700,
      "maxCount": 3000
      };
    const res = await request (express).post('/records/v1').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.records.length).not.toBe(0);
    expect(res.body.msg).toBe('Success');
  });
});