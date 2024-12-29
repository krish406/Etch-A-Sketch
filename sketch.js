const canvasContainer = document.querySelector(".user-interface");
const colorChoices = document.querySelector(".color-choices");
const resize = document.querySelector(".resize");

const max_color = 255;

//margins will change actual width to 512px upon rendering
const canvas_width = 480;
let currentColor = "grey";

function removeCanvas(canvas){
    canvasContainer.removeChild(canvas);
}

function resizeCanvas(canvas, num_squares){
    let square_width = canvas_width / (num_squares);
    removeCanvas(canvas);
    buildCanvas(square_width, num_squares);
}

function generateRandomColor(){
    //used stack overlow
    //essentially a string concatenation of # character and a random number below 16777216 (which is 0xFFFFFF in hex)
    //" | 0" is used to turn the random number into an integer via bitwise OR. toString does decimal to hex conversion 
    //padStart ensures that the final string number is at least 6 characters
    let newColor = "#" + (0xFFFFFF * Math.random() | 0).toString(16).padStart(6, "0");
    return newColor;
}

function darkenSquare(pixel, darkenIncrement){
    //each pixel has an opacity property created when it was built through the setAttribute method
    //this will just store a string, so its copy needs to be converted to a float
    let currentOpacity = parseFloat(pixel.getAttribute("opacity"));

    //code onle runs while it is possible to darken the square
    if((currentOpacity + darkenIncrement) <= 1){
        //adds the darken to the opacity and applies operation to fix javascript addition error
        let newOpacity = Math.round((currentOpacity + darkenIncrement) * 10) / 10;
        pixel.style.opacity = newOpacity;
    
        //change the property of the pixel to reflect its new opacity
        pixel.setAttribute("opacity", newOpacity);
    }
}

function buildCanvas(square_width, num_squares){
    //there is margin width created on either side of the canvas
    const newCanvas = document.createElement("div");
    newCanvas.className = "canvas";
    let margin = 16/num_squares;
    //each square will have an addition width of margin size on both the left and right of the square
    let new_canvas_width = (square_width + (margin * 2)) * num_squares
    newCanvas.style.width = `${new_canvas_width}px`;

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
                //change background color to current color to revert to previous behaviour
                pixel.style.backgroundColor = currentColor;
                darkenSquare(pixel, 0.2);
            });

            newCanvas.appendChild(pixel);
        }
    }

    canvasContainer.insertBefore(newCanvas, colorChoices);
}

resize.addEventListener("click", () => {
    let message = "How many squares do you want on each side?\nRange (1 < 50)"
    let valid_input = false;
    let num_squares;

    do{
        num_squares = prompt(message);
        
        if(num_squares == null){
            return;
        }

        num_squares = Number(num_squares);
    
        if(Number.isInteger(num_squares) === true){
            if(num_squares <= 50 && num_squares >= 1){
                valid_input = true;
                break;
            }
        }
        message = "How many squares do you want on each side?\nRange (1 < 50)\nPlease enter an integer within the range";
    }
    
    while(valid_input === false);

    const canvas = document.querySelector(".canvas");
    resizeCanvas(canvas, num_squares);
});

let initialSquareWidth = canvas_width/16;
buildCanvas(initialSquareWidth, 16);
