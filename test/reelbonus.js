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

    it("당첨확인 요청을 보내야 한다.", function (done) {
        var packet = { msg_code: '', data: {} };
        packet.msg_code = parseInt(protocols.NETMSG_REELBONUS, 10);
        packet.data.userid = "test";
        packet.data.seedMoney = 100;
        packet.data.machineNo = 6;
        packet.data.roomID = 2;
        client.emit('seastory', packet);
        done();
    });
});
