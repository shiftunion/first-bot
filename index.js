var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Yo man, I am a chat bot, i do exactly what other people told me to do... and I do it all night long')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me_213') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

/*app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "Text received, echo with love: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})*/

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'carboloading') {
                sendGenericMessage(sender)
                continue
            }
            sendTextMessage(sender, "I am echoing your words with some love, because I don't understand them: " + text.substring(0, 200))
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received-" + sender + " " + text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "EAALI023ztRYBAFkiqGCcjrkB04OZALVagcZB1zOXT8h7o5SwEpPFzKrMtei9YpWlCxRomvC3Jz0F5yPYBlSwYimdQA9EvClrOvTaZCJhqYRpZByMBiI1wQsL1dV5slQZC4JudI82uCZCD8XSZA74OXoZCfZAwe7O1l8rDciQMFxAL0AZDZD"

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Carb killer",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Glazed-Donut.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "www.holis.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Order these for $60",
                        "payload": "Order doughnuts #1",
                    }],
                }, {
                    "title": "Sickly sweet",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/81/Zeppula.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Order this for 0.99 cents",
                        "payload": "Order doughnuts #2",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
