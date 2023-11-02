export function gbrTitik(imgData,x,y,warna){
    let [r,g,b] = warna;
    let index = 4 *(Math.ceil(x) + (Math.ceil(y) * imgData.width));
    imgData.data[index] = r;
    imgData.data[index + 1] = g;
    imgData.data[index + 2] = b;
    imgData.data[index + 3] = 255;
}


export function lingkaranPolar(imgData, xc, yc, radius, warna){
    for (var theta = 0; theta < Math.PI*2; theta += 0.01){
        let x = xc + radius*Math.cos(theta);
        let y = yc + radius*Math.sin(theta);

        gbrTitik(imgData, x, y, warna);
    }
}

export function ellipsePolar(imgData, xc, yc, radiusX, radiusY, warna){
    for (var theta = 0; theta < Math.PI*2; theta += 0.01){
        let x = xc + radiusX*Math.cos(theta);
        let y = yc + radiusY*Math.sin(theta);

        gbrTitik(imgData, x, y, warna);
    }
}

export function spiral(imgData, xc, yc, radius, warna){
    for (var theta = 0; theta < Math.PI*6; theta += 0.01){
        radius = 5*theta
        let x = xc + radius*Math.cos(theta);
        let y = yc + radius*Math.sin(theta);
        
        gbrTitik(imgData, x, y, warna);
    }
}

export function polygon (imgData, point, warna ){
    dda_line(imgData, point[0].x, point[0].y, point[1].x, point[1].y, warna);
    dda_line(imgData, point[1].x, point[1].y, point[2].x, point[2].y, warna);
    dda_line(imgData, point[2].x, point[2].y, point[3].x, point[3].y, warna);
    dda_line(imgData, point[3].x, point[3].y, point[0].x, point[0].y, warna);
}

export function polygon3 (imgData, point, warna ){
    dda_line(imgData, point[0].x, point[0].y, point[1].x, point[1].y, warna);
    dda_line(imgData, point[1].x, point[1].y, point[2].x, point[2].y, warna);
    dda_line(imgData, point[2].x, point[2].y, point[0].x, point[0].y, warna);
}

export function segiEmpat(imgData, xc, yc, radius, warna){
    for (var theta = 0; theta < Math.PI*2; theta += Math.PI/2){
        let x = xc + radius*Math.cos(theta);
        let y = yc + radius*Math.sin(theta);

        dda_line(imgData, x, y, xc + radius * Math.cos(theta + Math.PI/2) , yc + radius * Math.sin(theta + Math.PI/2), warna);;
    }
}

export function segiEnam(imgData, xc, yc, radius, warna){
    for (var theta = 0; theta < Math.PI*2; theta += Math.PI/3){
        let x = xc + radius*Math.cos(theta);
        let y = yc + radius*Math.sin(theta);

        dda_line(imgData, x, y, xc + radius * Math.cos(theta + Math.PI/3) , yc + radius * Math.sin(theta + Math.PI/3), warna);;
    }
}

export function segiLima(imgData, xc, yc, radius, warna){
    for (var theta = 0; theta < Math.PI*2; theta += Math.PI/2.5){
        let x = xc + radius*Math.cos(theta);
        let y = yc + radius*Math.sin(theta);

        dda_line(imgData, x, y, xc + radius * Math.cos(theta + Math.PI/2.5) , yc + radius * Math.sin(theta + Math.PI/2.5), warna);;
    }
}


export function dda_line(imgData, x1, y1, x2, y2, warna){
    
    var dx = x2 - x1;
    var dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)){
        if(x2 > x1){
            var y = y1;
            for (var x = x1; x<x2; x++){
                y = y + dy/Math.abs(dx);
                gbrTitik(imgData, x, y, warna);
            }
        } 
        else {
            var y = y1;
            for (var x = x1; x>x2; x--){
                y = y + dy/Math.abs(dx);
                gbrTitik(imgData, x, y, warna);
            }
        }
    } 
    else {
        if(y2 > y1){
            var x = x1;
            for (var y = y1; y<y2; y++){
                x = x + dx/Math.abs(dy);
                gbrTitik(imgData, x, y, warna);
            }
        } 
        else {
            var x = x1;
            for (var y = y1; y>y2; y--){
                x = x + dx/Math.abs(dy);
                gbrTitik(imgData, x, y, warna);
            }
        }
    }
}

export function flood_fill_naive(imgData, canvas, x, y, toFlood, color){
    let index = 4 * (x + y * canvas.width)

    let r1 = imgData.data[index];
    let g1 = imgData.data[index+1];
    let b1 = imgData.data[index+2];

    if ((r1 === toFlood.r) && (g1 === toFlood.g) && (b1 === toFlood.b)){
        imgData.data[index] = color.r;
        imgData.data[index + 1] = color.g;
        imgData.data[index + 2] = color.b;
        imgData.data[index + 3] = 255;

        flood_fill_naive(imgData, canvas, x+1, y, toFlood, color);
        flood_fill_naive(imgData, canvas, x, y+1, toFlood, color);
        flood_fill_naive(imgData, canvas, x-1, y, toFlood, color);
        flood_fill_naive(imgData, canvas, x, y-1, toFlood, color);
    }
}

export function flood_fill_stack(imgData, canvas, x, y, toFlood, color){


    let tumpukan = [];
    tumpukan.push({x:x, y:y});

    while(tumpukan.length > 0){
        let titikSekarang = tumpukan.pop();
        let indexSekarang = 4 * (titikSekarang.x + titikSekarang.y * canvas.width);

        let r1 = imgData.data[indexSekarang];
        let g1 = imgData.data[indexSekarang+1];
        let b1 = imgData.data[indexSekarang+2];

        if ((r1 === toFlood.r) && (g1 === toFlood.g) && (b1 === toFlood.b)){
            imgData.data[indexSekarang] = color.r;
            imgData.data[indexSekarang + 1] = color.g;
            imgData.data[indexSekarang + 2] = color.b;
            imgData.data[indexSekarang + 3] = 255;
    
            tumpukan.push({x : titikSekarang.x+1, y: titikSekarang.y} );
            tumpukan.push({x : titikSekarang.x-1, y: titikSekarang.y} );
            tumpukan.push({x : titikSekarang.x, y: titikSekarang.y+1} );
            tumpukan.push({x : titikSekarang.x, y: titikSekarang.y-1} );
        }
    }
}