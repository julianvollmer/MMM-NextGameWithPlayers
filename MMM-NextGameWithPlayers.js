Module.register("MMM-NextGameWithPlayers",{
    defaults: {
        options : { 
          url: 'http://api.football-data.org/v1/soccerseasons/', 
          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
          shortNameLeague: "BL1",
          shortNameTeam: "HSV",
        },
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification === 'GET_ALL_PLAYERS_NEXT_GAME'){
          this.players = payload;
          
          this.updateDom(3000); 
        }
    },

    // Override dom generator.
    getDom: function() {
       
        var wrapper = document.createElement("table");
        
        wrapper.style.backgroundImage = "url('http://localhost:8080/MMM-NextGameWithPlayers/soccer_court.png')";
        // wrapper.style.height = "100%";
        // wrapper.style.width = "100%";
        wrapper.style.backgroundRepeat= 'no-repeat';
        wrapper.style.backgroundSize = "100%";
        // wrapper.style.minHeight = this.config.height;
        // wrapper.style.minWidth = this.config.width;
        wrapper.style.backgroundSize = "cover";
    
        wrapper.className = "normal small light";
      
        var court = this.getCourtModel();
        
        for (var i = 0; i < this.players.home.length; i++) {
          this.addToCourt(court, this.players.home[i]);
        }
      
        this.addCourtToWrapper(court, wrapper);

        var middleRow = document.createElement("tr");
        var middleCell = document.createElement("td");
        middleCell.innerHTML = "--------------------"
        middleCell.colSpan = "3";
        middleRow.appendChild(middleCell);
        wrapper.appendChild(middleRow);

        var court = this.getCourtModelOpponent();
        
        for (var i = 0; i < this.players.away.length; i++) {
          this.addToCourt(court, this.players.away[i]);
        }
      
        this.addCourtToWrapper(court, wrapper);
      
        return wrapper;
    },

    start: function() {        
        this.players = {};
        this.players.home = {};
        this.players.away = {};
        this.sendSocketNotification("CONNECTED", this.config.options);
    },

    createTableTdElement: function(id, text, colSpan) {
      var element = document.createElement('td');
      element.id = id;
      // element.style.border = '1px solid grey';
      element.colSpan = colSpan;
      element.innerHTML = text;
      return element;
    },

    createTableTrElement: function(id, colSpan) {
      var element = document.createElement('tr');
      element.id = id;
      return element;
    },

    camelCase: function (item) {
      item = item.toLowerCase();
      item = this.cleaner(item, '-');
      item = this.cleaner(item, ' ');
      return item;
    },

    cleaner: function (string, replacement) {
      if(string.indexOf(replacement) != -1){
        var index = string.indexOf(replacement);
        var char = string.charAt(index + 1);
        string = string.substr(0, index) + char.toUpperCase() + string.substr(index + char.length);
        string = string.replace(replacement , '');
        string = string.slice(0, index + 1) + string.slice(index + 2);
      }
      return string;
    },

    addToCourt: function(court, player) {
      for (var key in court) {
        if (court.hasOwnProperty(key)) {
          var val = court[key];
          for(var item in val){
            if(val.hasOwnProperty(item)){
              if(item == this.camelCase(player.position)){
                court[key][item].push(player);
              }
            }
          }
        }
      }
    },

    addCourtToWrapper: function (court, wrapper) {
      for (var key in court) {
        
        if (court.hasOwnProperty(key)) {
          
          var val = court[key];
          var tr = this.createTableTrElement(val + 'Row');
          var tdsAdded = false;
        
          for(var item in val){
            
            if(val.hasOwnProperty(item)){
                
                var text = "";
                var separator = "<br>"
                var colSpan = 4 - Object.keys(val).length;
                var players = court[key][item];

                for (var i = players.length - 1; i >= 0; i--) {
                  tdsAdded = true;
                  if(colSpan == 3){
                    separator = ","
                  }
                  
                  if(i == players.length - 1){
                    text = players[i].name;
                  }
                  
                  else{
                    text += separator + " " + players[i].name;  
                  }
                }
                  
                  tr.appendChild(this.createTableTdElement(item, text, colSpan));
            }
          }
          if(tdsAdded){
            wrapper.appendChild(tr);
          }
        }
      }
    },
    getCourtModel: function (argument) {
      var court = {};

      court.keeperRow = {};
      court.keeperRow.keeper = [];

      court.backRow = {};
      court.backRow.rightBack = [];
      court.backRow.centreBack = [];
      court.backRow.leftBack = [];

      court.defMidRow = {};
      court.defMidRow.defensiveMidfield = [];

      court.centreMidRow = {};
      court.centreMidRow.rightMidfield = [];
      court.centreMidRow.centralMidfield = [];
      court.centreMidRow.leftMidfield = [];

      court.attackMidRow = {};
      court.attackMidRow.attackingMidfield = [];

      court.secForwardRow = {};
      court.secForwardRow.secondaryStriker = [];
      
      court.forwardRow = {};
      court.forwardRow.rightWing = [];
      court.forwardRow.centreForward = [];
      court.forwardRow.leftWing = [];

      return court;
    },
    getCourtModelOpponent: function (argument) {
      var court = {};

      court.forwardRow = {};
      court.forwardRow.rightWing = [];
      court.forwardRow.centreForward = [];
      court.forwardRow.leftWing = [];

      court.secForwardRow = {};
      court.secForwardRow.secondaryStriker = [];
      
      court.attackMidRow = {};
      court.attackMidRow.attackingMidfield = [];

      court.centreMidRow = {};
      court.centreMidRow.rightMidfield = [];
      court.centreMidRow.centralMidfield = [];
      court.centreMidRow.leftMidfield = [];

      court.defMidRow = {};
      court.defMidRow.defensiveMidfield = [];

      court.backRow = {};
      court.backRow.rightBack = [];
      court.backRow.centreBack = [];
      court.backRow.leftBack = [];

      court.keeperRow = {};
      court.keeperRow.keeper = [];

      return court;
    }
});




