let margin = 3;
let num_squares = 16;
const canvas = document.querySelector(".canvas");

function buildboard(square_width){
    canvas_width = (square_width + margin * 2) * num_squares
    canvas.style.width = `${canvas_width}px`;
    //console.log(canvas.style.width);
    for(let i = 0; i < num_squares; i++){
        for(let j = 0; j < num_squares; j++){
            const pixel = document.createElement("div");
            pixel.textContent = `${j}`;
            pixel.style.width = `${square_width}px`;
            pixel.style.height = `${square_width}px`;
            pixel.style.margin = `${margin}px`;
            console.log(canvas.style.margin);
            pixel.style.backgroundColor = "white";
            canvas.appendChild(pixel);
        }
    }
}

buildboard(30);