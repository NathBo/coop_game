var map3 = {
    "obstacles":[
        [
            "#########",
            "#.......#",
            "#######.#",
            "#######.#",
            "#######.#",
            "####....#",
            "#########"
        ],[
            "#########",
            "#.......#",
            "#.#######",
            "#...#####",
            "#.#.#####",
            "#.#..####",
            "#########"
        ]
    ],

    "spawn":[ {"x":1, "y":1},
              {"x":1, "y":1} ],

    "objects":[
        { "type":"exit", "player":0, "x":4, "y":5 },
        { "type":"exit", "player":1, "x":4, "y":5 },
        { "type":"look_door", "player":0, "x":7, "y":4, "id" : "door1" },
        { "type":"look_door", "player":1, "x":2, "y":3, "id" : "door2" },
        { "type":"item", "player":1, "x":1, "y":5, "category":"key" },
        { "type":"item", "player":0, "x":6, "y":5, "category":"key"},
    ]
}
