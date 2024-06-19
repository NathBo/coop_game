var map0 = {
    "obstacles":[
        [
            "###############",
            "############0##",
            "############0##",
            "##00000000000##",
            "##00000000000##",
            "##00000000000##",
            "#####000#######",
            "###############",
        ],[
            "###############",
            "############0##",
            "############0##",
            "##00000000000##",
            "##00000000000##",
            "##00000000000##",
            "#####000#######",
            "###############",
        ]
    ],

    "spawn":[ {"x":3, "y":4},
              {"x":3, "y":4} ],

    "objects":[
        { "type":"exit", "player":0, "x":12, "y":1 },
        { "type":"exit", "player":1, "x":12, "y":1 },
        { "type":"light", "player":1, "x":8, "y":2, "id":"light1" },
        { "type":"light", "player":0, "x":8, "y":2, "id":"light2" },
        { "type":"levier", "player":1, "x":8, "y":3, "effect":["light1","light2"] }
    ]
}