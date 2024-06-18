function initialize3DArray(x, y, z, val) {
    return Array.from({ length: x }, () => 
        Array.from({ length: y }, () => 
            Array(z).fill(val)
        )
    );
}



function read_map(obj_init){
    console.log(obj_init);
    let largeur = obj_init.obstacles[0][0].length;
    let hauteur = obj_init.obstacles[0].length;

    var object_final = obj_init;
    var new_obstacles = initialize3DArray(2, largeur, hauteur, '#' );
    for (let player = 0; player < 2; player++)
        for (let x = 0; x < largeur; x++)
            for (let y = 0; y < hauteur; y++)
                new_obstacles[player][x][y] = obj_init.obstacles[player][y][x];
    
    object_final.obstacles = new_obstacles;
    return object_final;
}


