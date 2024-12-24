let margin = 3;
let num_squares = 16;
const canvas = document.querySelector(".canvas");
let opacity = 0.1;

function buildboard(square_width){
    canvas_width = (square_width + margin * 2) * num_squares
    canvas.style.width = `${canvas_width}px`;
    //console.log(canvas.style.width);
    for(let i = 0; i < num_squares; i++){
        for(let j = 0; j < num_squares; j++){
            const pixel = document.createElement("div");
            pixel.style.width = `${square_width}px`;
            pixel.style.height = `${square_width}px`;
            pixel.style.margin = `${margin}px`;
            pixel.style.backgroundColor = "white";

            pixel.addEventListener('mouseenter', () => {
                pixel.style.backgroundColor = "grey";
                pixel.style.opacity = opacity;
            });

            canvas.appendChild(pixel);
        }
    }
}

buildboard(30);