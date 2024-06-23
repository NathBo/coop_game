var map5 = {
    "obstacles":[
        [
            "#########",
            "#...#####",
            "#.#######",
            "#.......#",
            "#########"
        ],[
            "#########",
            "#...#####",
            "##.######",
            "##......#",
            "#########"
        ]
    ],

    "spawn":[ {"x":2, "y":1},
              {"x":2, "y":2} ],

    "objects":[
        { "type":"exit", "player":0, "x":7, "y":3 },
        { "type":"exit", "player":1, "x":7, "y":3 },
        
        { "type":"door", "player":0, "x":2, "y":3, "id" : "door0A"},
        { "type":"door", "player":0, "x":3, "y":3, "id" : "door0B"},
        { "type":"door", "player":0, "x":4, "y":3, "id" : "door0C"},
        { "type":"door", "player":0, "x":5, "y":3, "id" : "door0D"},
        { "type":"door", "player":0, "x":6, "y":3, "id" : "door0E"},
        
        { "type":"door", "player":1, "x":2, "y":3, "id" : "door1A"},
        { "type":"door", "player":1, "x":3, "y":3, "id" : "door1B"},
        { "type":"door", "player":1, "x":4, "y":3, "id" : "door1C"},
        { "type":"door", "player":1, "x":5, "y":3, "id" : "door1D"},
        { "type":"door", "player":1, "x":6, "y":3, "id" : "door1E"},

        { "type":"levier", "player":0, "x":1, "y":1, "effect" : ["door0B", "door0C", "door0D", "door1B", "door1C", "door1D"]},
        { "type":"levier", "player":0, "x":3, "y":1, "effect" : ["door0C", "door0D", "door0E", "door1C", "door1D", "door1E"]},
        { "type":"levier", "player":0, "x":1, "y":3, "effect" : ["door0A", "door0B", "door0C", "door1A", "door1B", "door1C"]},

        { "type":"levier", "player":1, "x":1, "y":1, "effect" : ["door0A", "door0B", "door0E", "door1A", "door1B", "door1E"]},
        { "type":"levier", "player":1, "x":3, "y":1, "effect" : ["door0A", "door0D", "door0E", "door1A", "door1D", "door1E"]},
    ]
}
