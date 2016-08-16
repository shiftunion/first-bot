var request = require('request');

var myJSONObject = {
    "recipient": {"id": "1255533624481471"},
    "message": {"text": "hello, dude! do you want to get fat @ " + getFormattedDate()}
};

function workathon() {

    request({
        url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAALI023ztRYBAFkiqGCcjrkB04OZALVagcZB1zOXT8h7o5SwEpPFzKrMtei9YpWlCxRomvC3Jz0F5yPYBlSwYimdQA9EvClrOvTaZCJhqYRpZByMBiI1wQsL1dV5slQZC4JudI82uCZCD8XSZA74OXoZCfZAwe7O1l8rDciQMFxAL0AZDZD",
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        console.log(response);
    })
};

function getFormattedDate() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + " " + sec +"s";

    /*alert(str);*/

    return str;
}

exports.start = workathon;


