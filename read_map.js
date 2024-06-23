function initialize3DArray(x, y, z, val) {
    return Array.from({ length: x }, () => 
        Array.from({ length: y }, () => 
            Array(z).fill(val)
        )
    );
}



function read_map(map){
    let largeur = map.obstacles[0][0].length;
    let hauteur = map.obstacles[0].length;
    let nb_objects = map.objects.length;
    
    // rotate map
    var new_obstacles = initialize3DArray(2, largeur, hauteur, '#' );
    for (let player = 0; player < 2; player++)
        for (let x = 0; x < largeur; x++)
            for (let y = 0; y < hauteur; y++)
                new_obstacles[player][x][y] = map.obstacles[player][y][x];
    map.obstacles = new_obstacles;


    // well define the ... for each objects
    for (let i_object = 0; i_object < nb_objects; i_object++)  {
        if (map.objects[i_object].type == "item")
            map.objects[i_object].player = 2;
        if (map.objects[i_object].x === undefined || map.objects[i_object].y === undefined || map.objects[i_object].player === undefined)
            alert("niveau invalide !!!");
        if (map.objects[i_object].id === undefined)
            map.objects[i_object].id = 'new id -> ' + i_object.toString();
        if (map.objects[i_object].effect === undefined)
            map.objects[i_object].effect = [];
        if (map.objects[i_object].category === undefined)
            map.objects[i_object].category = "";
        if (map.objects[i_object].color === undefined)
            map.objects[i_object].color = "rgb(100,100,100)";
    }

    return map;
}


