'use strict'

var async = require('async');
var assert = require('assert');
var io = require('socket.io-client');
var socketURL = 'http://127.0.0.1:15995';
var options = {
    transports: ['websocket']
};
var languages = require('../src/languages');
var protocols;
var client;
describe("바다이야기 테스트", function () {
    beforeEach('세팅을 진행합니다.', function (done) {
        languages.getjson('./protocols/seastory.protocol.json', function (err, result) {
            protocols = result;
            client = io.connect(socketURL, options);
            done();
        });
    });

    it("로그인이 되어야한다.", function (done) {
        var packet;
        var _next;
        client.on('seastory', function () {
            _next();
        });
        async.waterfall([            
            function (next) {
                packet = { msg_code: '', data: {} };
                packet.msg_code = parseInt(protocols.NETMSG_CLIENTLOGINID, 10);
                packet.data.userid = "test";
                packet.data.nickname = "test";
                packet.data.userpwd = "123";
                client.emit('seastory', packet);
                _next = next;
            }
        ], function (err) {
            done();
        })
    });

    it("방목록을 얻어와야한다.", function (done) {        
        var packet = { msg_code: '', data: {} };
        packet.msg_code = parseInt(protocols.NETMSG_ROOMLIST, 10);
        packet.data.userid = "test";
        packet.data.seedMoney = 100;
        client.emit('seastory', packet);
        done();
    });
});
