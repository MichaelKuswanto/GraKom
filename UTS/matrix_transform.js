export function createIdentity(){
    let identitas = 
    [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ];

    return identitas;
}

export function multiplyMatrix(m1, m2){
    let hasil = 
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    for (let i = 0; i<3; i++){
        for (let j = 0; j<3; j++){
            for (let k = 0; k<3; k++){
                hasil[i][k] += m1[i][j] * m2[j][k];
            }
        }
    }

    return hasil;
}

export function createTranslation(Tx,Ty){
    let translasi = 
    [
        [1,0,Tx],
        [0,1,Ty],
        [0,0,1]
    ];

    return translasi;
}

export function createScale(Sx,Sy){
    let skala = 
    [
        [Sx,0,0],
        [0,Sy,0],
        [0,0,1]
    ];

    return skala;
}

export function createRotation(theta){
    let rotasi = 
    [
        [Math.cos(theta),-Math.sin(theta),0],
        [Math.sin(theta),Math.cos(theta),0],
        [0,0,1]
    ];

    return rotasi;
}

export function rotation_fp (xc, yc, theta){
    let m1 = createTranslation(-xc, -yc);
    let m2 = createRotation(theta);
    let m3 = createTranslation(xc, yc);

    let hasil;
    hasil = multiplyMatrix(m3,m2);
    hasil = multiplyMatrix(hasil,m1);
    return hasil;
}

export function scale_fp (xc, yc, Sx, Sy){
    let m1 = createTranslation(-xc, -yc);
    let m2 = createScale(Sx, Sy);
    let m3 = createTranslation(xc, yc);

    let hasil;
    hasil = multiplyMatrix(m3,m2);
    hasil = multiplyMatrix(hasil,m1);
    return hasil;
}

export function transfrom_titik(titik_lama, m) {
    let x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
    let y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;
    
    return {x:x_baru, y:y_baru};
}

export function transform_array(array_titik, m) {
    let hasil = []
    for (let i = 0; i < array_titik.length; i++) {
        let titik_hasil;
        titik_hasil = transfrom_titik(array_titik[i], m);
        hasil.push(titik_hasil);
    }

    return hasil;
}