let margin = 3;
let num_squares = 16;
const canvas = document.querySelector(".canvas");

function removeCanvas(){
    let canvasContainer = document.querySelector("body");
    canvasContainer.removeChild(canvas);
}

function darkenSquare(pixel, darkenIncrement){
    let currentOpacity = parseFloat(pixel.getAttribute("opacity"));
    console.log(currentOpacity);
    if((currentOpacity + darkenIncrement) <= 1){
        let newOpacity = Math.round((currentOpacity + darkenIncrement) * 10) / 10;
        pixel.style.backgroundColor = "grey";
        pixel.style.opacity = newOpacity;
        pixel.setAttribute("opacity", newOpacity);
        console.log(pixel.getAttribute("opacity"));
    }
}

function buildCanvas(square_width){
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
            //sets custom html element property called opacity
            pixel.setAttribute("opacity", 0);

            pixel.addEventListener('mouseenter', () => {
                darkenSquare(pixel, 0.2);
            });

            canvas.appendChild(pixel);
        }
    }
}

buildCanvas(30);
//removeCanvas();