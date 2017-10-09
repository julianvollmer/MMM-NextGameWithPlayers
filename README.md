# MMM-AllPlayers

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Shows a table with all the players from your favorite team.

## Visualisation
![visualisation of the court](https://forum.magicmirror.builders/assets/uploads/files/1507461935811-all-player.png)

## Using the module
Install the package football-data-api.
```js
npm install football-data-api
```

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
	        module: 'MMM-AllPlayers',
	        position: 'top_center',  // This can be any of the regions. Best results in left or right regions.
	        header: 'Alle Spieler', // Topic of your modul.
		    config: {
	            options: {
		          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
		          shortNameLeague: "BL1", //Short name of your League.
		          shortNameTeam: "HSV", //Short name of your team. Team must be in the League.
		        },
		    }
		}
    ]
}
```

## Configuration options

| Option                    | Description
|-------------------------- |-----------
| `X-Auth-Token`    		| *Required* You can get it from [here](http://football-data.org/index).
| `shortNameLeague`        	| *Required* Short name of your League
| `shortNameTeam`        	| *Required* Short name of your team. Team must be in the League.

Names for the different leagues:

|Short Name | Long Name
|-----|----
| AAL | Australian A-League
| CL  | Champions League 2017/18
| SB  | Serie B 2017/18
| DFB | DFB-Pokal 2017/18
| PPL | Primeira Liga 2017/18
| SA  | Serie A 2017/18
| PD  | Primera Division 2017
| BL2 | 2. Bundesliga 2017/18
| BL1 | 1. Bundesliga 2017/18
| FL2 | Ligue 2 2017/18
| FL1 | Ligue 1 2017/18
| DED | Eredivisie 2017/18
| EL2 | League Two 2017/18
| EL1 | League One 2017/18
| ELC | Championship 2017/18
| PL  | Premier League 2017/18
| BSA | Campeonato Brasileiro da Série A





