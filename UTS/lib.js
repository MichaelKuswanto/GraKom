import * as lib from "./index.js";
import * as trf from "./matrix_transform.js";

export function visualisasi(){
    const myForm = document.getElementById("myForm");
    const csvFile = document.getElementById("csvFile");
    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = csvFile.files[0];

        if (!input) {
            console.error("No file selected");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            const dataArray = convertCSVToArray(text);
            
            let canvas = document.getElementById("mycanvas");
            let ctx = canvas.getContext("2d");
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let height = 20
            for (let i = 1; i < dataArray.length; i++){
                lib.dda_line(imageData,20, height, dataArray[i][3]*5, height, [0,0,0])
                height += 5
                ctx.putImageData(imageData, 0, 0);
            }

            // Your further processing with imageData or dataArray can be added here

            ctx.putImageData(imageData, 0, 0);
        };

        reader.onerror = function (error) {
            console.error(`Error reading the file: ${error}`);
        };

        reader.readAsText(input);
    });
}

export function convertCSVToArray(csvText) {
    const rows = csvText.split('\n');
    const result = [];
    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].split(',');
        result.push(cols);
    }
    return result;
}

