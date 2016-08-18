// https://github.com/ncb000gt/node-cron
// http://blog.andyjiang.com/intermediate-cron-jobs-with-heroku/
// http://momentjs.com/timezone/

var worker = require('./worker.js');

var timeZone = "Pacific/Auckland";


var CronJob = require('cron').CronJob;
new CronJob('00 0 */2 * * *', function() {
    worker.start();
}, function(){ console.log('finished cron')}

, true, timeZone, null, true);

// '0 0 */4 * * *'
