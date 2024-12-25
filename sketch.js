const canvas = document.querySelector(".canvas");

//properties of each individual square
let margin = 1;
let num_squares = 16;

function removeCanvas(){
    let canvasContainer = document.querySelector("body");
    canvasContainer.removeChild(canvas);
}

function darkenSquare(pixel, darkenIncrement){
    //each pixel has an opacity property created when it was built through the setAttribute method
    //this will just store a string, so its copy needs to be converted to a float
    let currentOpacity = parseFloat(pixel.getAttribute("opacity"));
    
    //code onle runs while it is possible to darken the square
    if((currentOpacity + darkenIncrement) <= 1){
        //adds the darken to the opacity and applies operation to fix javascript addition error
        let newOpacity = Math.round((currentOpacity + darkenIncrement) * 10) / 10;
        
        pixel.style.backgroundColor = "grey";
        pixel.style.opacity = newOpacity;

        //change the property of the pixel to reflect its new opacity
        pixel.setAttribute("opacity", newOpacity);
    }
}

function buildCanvas(square_width){
    //there is margin width created on either side of the canvas
    canvas_width = (square_width + margin * 2) * num_squares
    canvas.style.width = `${canvas_width}px`;

    //row, column use of nested loops
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