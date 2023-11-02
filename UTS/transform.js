export function translasi (titik_lama, t){
    let x_baru = titik_lama.x + t.x;
    let y_baru = titik_lama.y + t.y;

    return {x:x_baru, y:y_baru};
}

export function scale(titik_lama, s){
    let x_baru = titik_lama.x * s.x;
    let y_baru = titik_lama.y * s.y;

    return {x:x_baru, y:y_baru};
}

export function rotasi(titik_lama, sudut) {
    let x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut);
    let y_baru = titik_lama.x * Math.sin(sudut) + titik_lama.y * Math.cos(sudut);

    return {x:x_baru, y:y_baru};
}

export function rotasi_fp(titik_lama, titik_putar, sudut){
    let p1 = translasi(titik_lama, {x:-titik_putar.x, y:-titik_putar.y});
    let p2 = rotasi(p1, sudut);
    let p3 = translasi(p2, titik_putar);

    return p3;
}

export function scale_fp(titik_lama, titik_pusat, s){
    let p1 = translasi(titik_lama, {x:-titik_pusat.x, y:-titik_pusat.y});
    let p2 = scale(p1, s);
    let p3 = translasi(p2, titik_pusat);

    return p3;
}

export function translasi_array(array_titik, t){
    let array_hasil = [];
    for (let i = 0; i < array_titik.length; i++) {
        let temp = translasi(array_titik[i], t);
        array_hasil.push(temp);
    }
    return array_hasil;
}

export function rotasi_array(array_titik,  titik_pusat, sudut){
    let array_hasil = [];
    for (let i = 0; i < array_titik.length; i++) {
        let temp = rotasi_fp(array_titik[i], titik_pusat, sudut);
        array_hasil.push(temp);
    }
    return array_hasil;
}

export function scale_array(array_titik, titik_pusat,s){
    let array_hasil = [];
    for (let i = 0; i < array_titik.length; i++) {
        let temp = scale_fp(array_titik[i], titik_pusat, s);
        array_hasil.push(temp);
    }
    return array_hasil;
}