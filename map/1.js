var map1 = {
    "obstacles":[
        [
            ".........",
            "#.#.##.##"
        ],[
            "..#...#..",
            "#...#...#"
        ]
    ],

    "spawn":[ {"x":0, "y":0},
              {"x":0, "y":0} ],

    "objects":[
        { "type":"exit", "player":0, "x":7, "y":1 },
        { "type":"exit", "player":1, "x":7, "y":1 },
        { "type":"door", "player":0, "x":2, "y":1 },
        { "type":"levier", "player":1, "x":4, "y":1, "effect":["door1"] },
        { "type":"light", "player":1, "x":1, "y":1, "id":"light1" },
        { "type":"light", "player":0, "x":1, "y":1, "id":"light2" },
        { "type":"levier", "player":1, "x":5, "y":1, "effect":["light1","light2"] }
    ]
}