var map4 = {
    "obstacles":[
        [
            "###############",
            "#.........#####",
            "#.....#...#####",
            "#.....#...#####",
            "########.######",
            "#......#.######",
            "#....#.#.######",
            "######.#.######",
            "######.#.######",
            "######...######",
            "###############"
        ],[
            "###############",
            "#.........#####",
            "#.....#...#####",
            "#.....#...#####",
            "#######..######",
            "#........######",
            "#....#.########",
            "######.##.#####",
            "######.##.#####",
            "######....#####",
            "###############"
        ]
    ],

    "spawn":[ {"x":2, "y":2},
              {"x":2, "y":2} ],

    "objects":[
        { "type":"exit", "player":0, "x":2, "y":5 },
        { "type":"exit", "player":1, "x":2, "y":5 },
        { "type":"door", "player":0, "x":6, "y":1, "color" : "red", "id" : "door1a"},
        { "type":"door", "player":1, "x":6, "y":1, "color" : "red", "id" : "door1b"},
        { "type":"bouton", "player":0, "x":5, "y":2, "color" : "red", "effect" : ["door1a", "door1b"]},
        { "type":"bouton", "player":1, "x":5, "y":2, "color" : "red", "effect" : ["door1a", "door1b"]},
        { "type":"door", "player":1, "x":6, "y":6, "color" : "green", "id" : "door2a"},
        { "type":"door", "player":1, "x":7, "y":9, "color" : "green", "id" : "door2b"},
        { "type":"bouton", "player":0, "x":8, "y":3, "color" : "green", "effect" : ["door2a", "door2b"]},
        { "type":"door", "player":0, "x":8, "y":4, "color" : "blue", "id" : "door3a"},
        { "type":"door", "player":0, "x":6, "y":5, "color" : "blue", "id" : "door3b"},
        { "type":"bouton", "player":1, "x":9, "y":7, "color" : "blue", "effect" : ["door3a", "door3b"]},
    ]
}
