var express = require('express');
var router = express.Router();
var moment = require('moment');
var test = require('assert');

var isUnixTime = (time) => {
    //test.equal(true, !isNaN(Number(time)), "isUnixTime Not a number");
    return !isNaN(Number(time));
}

var isNatural = (time) => {
    return (isNaN(time) && moment(time ,"MMMM D, YYYY").isValid());
}

router.get('/:time', (req, res) => {
    console.log('handle with params');   
    var time = req.params.time;

    var unix = null;
    var natural = null;

    if(isUnixTime(time)){
        console.log('is unix');
        unix = time;
        natural = moment.unix(unix).format("MMMM D, YYYY");
    }
    if(isNatural(time)){
        console.log('Is natural');
        unix = moment(time, 'MMMM D, YYYY').format('X');
        natural = moment.unix(unix).format("MMMM D, YYYY");
    }

    var sendObj = {
        unix: unix,
        natural: natural
    };
    res.send(sendObj);
});

 module.exports = router;
 
