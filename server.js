require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// create payload
const payload = JSON.stringify({
    title: 'Returned Data',
    btnIndex: -1,
    btnValue: -1
});
const pushSubscription = {
    endpoint: '',
    keys: {
        p256dh: '',
        auth: ''
    }
};

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:tuan.phan3@propzy.com', publicVapidKey, privateVapidKey);

app.post('/cmd', (req, res) => {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    var objPayload = JSON.parse(payload) ;
    var objReceivedData =  req.body ;

    objPayload.btnIndex = objReceivedData.btnIndex ;

    var strCmd = "./btnShell" + objReceivedData.btnIndex + ".sh" ;
    var strFileOutput = "btnShell" + objReceivedData.btnIndex + ".out" ;
    console.log(req.body) ;
    console.log(strCmd) ;
    console.log(strFileOutput) ;
    async function callDocker(cmd, file) {
        const { stdout, stderr } = await exec(cmd);
        var fs = require('fs');
        try {
            var dataReadF = fs.readFileSync(file, 'utf8');
            objPayload.btnValue = dataReadF.trim();
        } catch(e) {
            console.log('Error:', e.stack);
        }

        console.log(objPayload) ;
        webPush.sendNotification(pushSubscription, JSON.stringify(objPayload)).catch(error => console.error(error));
    }
    try {
        callDocker(strCmd , strFileOutput);
    } catch (err) {
        console.log(err) ;
        webPush.sendNotification(pushSubscription, JSON.stringify(objPayload)).catch(error => console.error(error));
    };
});

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    //cache info to send back
    pushSubscription.endpoint = subscription.endpoint ;
    pushSubscription.keys.auth = subscription.keys.auth  ;
    pushSubscription.keys.p256dh = subscription.keys.p256dh  ;
    res.status(201).json({});
});

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log('Express running → PORT ' + process.env.PORT);
});
