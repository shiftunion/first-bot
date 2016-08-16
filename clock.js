
// https://github.com/ncb000gt/node-cron
// http://blog.andyjiang.com/intermediate-cron-jobs-with-heroku/
// http://momentjs.com/timezone/

var CronJob = require('cron').CronJob;
var worker = require('./worker.js');

var job = new CronJob({
    cronTime: "*/5 * * * * *",
    onTick: worker.start(),
    start: true,
    timeZone: "Pacific/Auckland"
});