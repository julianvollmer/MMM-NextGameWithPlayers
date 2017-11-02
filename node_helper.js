"use strict";
var Football = require('football-data-api');
var fball = null;

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
		
		if(notification === "CONNECTED"){
			console.log(this.name + " received a socket notification: " + notification);
			fball = new Football(payload, this, true)
		}

		if (notification === "LOG"){
			console.log("GET_ALL_PLAYERS_NEXT_GAME");
			console.log(JSON.stringify(payload, null, 4));
		}

		if (notification === "GET_ALL_PLAYERS_NEXT_GAME"){
			console.log("GET_ALL_PLAYERS_NEXT_GAME");
			console.log(payload);
		}
	},

    start: function() {        
        this.sendSocketNotification("CONNECTED", "connected");
    },

    update: function () {
    	var self = this;
        self.sendSocketNotification("UPDATEUI", "options");
        var players = {};
        players.home = fball.players.getPlayers();
        players.away = fball.opponent.players.getPlayers();
        players.info = fball.fixtures.getNextGame();
        self.sendSocketNotification("GET_ALL_PLAYERS_NEXT_GAME", players);
    },

    callbackFromFootballApi: function (argument) {
    	this.update();
    }
});

