const canvasContainer = document.querySelector(".user-interface");
const menuChoices = document.querySelector(".menu-choices");
const brushList = document.querySelectorAll(".brushes > button");
const utilitiesList = document.querySelectorAll(".utilities > button");
const colorChoiceList = document.querySelectorAll(".color-choices > input");

const hoverBtn = brushList[0];
const pencilBtn = brushList[1];
const paintbrushBtn = brushList[2];
const lightEraserBtn = brushList[3];
const hardEraserBtn = brushList[4];

const normalizeBtn = utilitiesList[0];
const randomizeBtn = utilitiesList[1];
const resizeBtn = utilitiesList[2];

//margins will change actual width to 512px upon rendering
const canvas_width = 480;
//might add hard and soft erasers in the futures
const brushes = ["hover", "pencil", "paint", "eraser", "hard-eraser"];
const modes = ["normal", "random"];

let pageColor = "white";
let currentColor = "grey";
let currentMode = modes[0];
let currentBrush = brushes[0]; 

//default brush and mode settings
hoverBtn.style.backgroundColor = "Gainsboro";
normalizeBtn.style.backgroundColor = "Gainsboro";

function removeCanvas(canvas){
    canvasContainer.removeChild(canvas);
}

function resizeCanvas(canvas, num_squares){
    let square_width = canvas_width / (num_squares);
    removeCanvas(canvas);
    buildCanvas(square_width, num_squares);
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
    }));
}

function generateRandomColor(){
    //used stack overflow
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

    //code only runs while it is possible to darken the square
    if((currentOpacity + darkenIncrement) <= 1){
        //adds the darken to the opacity and applies operation to fix javascript addition error
        let newOpacity = Math.round((currentOpacity + darkenIncrement) * 10) / 10;
        pixel.style.opacity = newOpacity;
    
        //change the property of the pixel to reflect its new opacity
        pixel.setAttribute("opacity", newOpacity);
    }
}

function lightenSquare(pixel, lightenIncrement){
    //each pixel has an opacity property created when it was built through the setAttribute method
    //this will just store a string, so its copy needs to be converted to a float
    let currentOpacity = parseFloat(pixel.getAttribute("opacity"));

    //don't erase a square that has not been modified
    if(currentOpacity == 0){
        return;
    }

    //code only runs while it is possible to lighten the square
    if((currentOpacity - lightenIncrement) > 0){
        //adds the darken to the opacity and applies operation to fix javascript addition error
        let newOpacity = Math.round((currentOpacity - lightenIncrement) * 10) / 10;
        pixel.style.opacity = newOpacity;
    
        //change the property of the pixel to reflect its new opacity
        pixel.setAttribute("opacity", newOpacity);
    }

    //this is an unfortunate consequence of not understanding how opacity works
    else if((currentOpacity - lightenIncrement) <= 0){
        pixel.style.backgroundColor = pageColor;
        pixel.style.opacity = 1;
        pixel.setAttribute("opacity", 0);
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
            pixel.style.backgroundColor = pageColor;

            //sets custom html element property called opacity
            //note that each square has a css style opacity that is predefined as 1 (however when you console.log this there is no value)
            //this is equivalent to each css style opacity being equal to 1
            //the custom opacity is equal to 0 because it represents the opacity of brush strokes 
            //since there are initially no brush strokes on the canvas it is 0
            pixel.setAttribute("opacity", 0);

            pixel.addEventListener('mouseenter', () => {

                //hover button, don't color any squares
                if(currentBrush == brushes[0]){
                    return;
                }

                if(currentMode == modes[0]){
                    if(currentBrush == brushes[1]){
                        pixel.style.backgroundColor = currentColor;
                        darkenSquare(pixel, 0.2);
                    }

                    else if(currentBrush == brushes[2]){
                        pixel.style.backgroundColor = currentColor;
                        pixel.setAttribute("opacity", 1);
                        pixel.style.opacity = 1;
                    }
                }

                else if(currentMode == modes[1]){
                    if(currentBrush == brushes[1]){
                        pixel.style.backgroundColor = generateRandomColor();
                        darkenSquare(pixel, 0.2);
                    }

                    else if(currentBrush == brushes[2]){
                        pixel.style.backgroundColor = generateRandomColor();
                        pixel.setAttribute("opacity", 1);
                        pixel.style.opacity = 1;
                    }
                }

                if(currentBrush == brushes[3]){
                    lightenSquare(pixel, 0.2);
                }

                if(currentBrush == brushes[4]){
                    lightenSquare(pixel, 1)
                }
                
            });

            newCanvas.appendChild(pixel);
        }
    }

    canvasContainer.insertBefore(newCanvas, menuChoices);
}

hoverBtn.addEventListener('click', (event) => {
    currentBrush = brushes[0];
    colorBrushButtons(event.target);
});

pencilBtn.addEventListener('click', (event) => {
    currentBrush = brushes[1];
    colorBrushButtons(event.target);
});

paintbrushBtn.addEventListener('click', (event) => {
    currentBrush = brushes[2];
    colorBrushButtons(event.target);
});

lightEraserBtn.addEventListener('click', (event) => {
    currentBrush = brushes[3];
    colorBrushButtons(event.target);
})

hardEraserBtn.addEventListener('click', (event) => {
    currentBrush = brushes[4];
    colorBrushButtons(event.target);
})

resizeBtn.addEventListener("click", () => {
    let message = "How many squares do you want on each side?\nRange: [1, 50]"
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
        message = "How many squares do you want on each side?\nRange: [1, 50]\nPlease enter an integer within the range";
    }

    while(valid_input === false);

    const canvas = document.querySelector(".canvas");
    resizeCanvas(canvas, num_squares);
});

normalizeBtn.addEventListener("click", (event) => {
    currentMode = modes[0];
    colorModes(event.target);
});

randomizeBtn.addEventListener("click", (event) => {
    currentMode = modes[1];
    colorModes(event.target);
});

document.addEventListener("keydown", (event) => {

    switch (event.key){
        case "h":
            currentBrush = brushes[0];
            colorBrushButtons(hoverBtn);
            break;

        case "d":
            currentBrush = brushes[1];
            colorBrushButtons(pencilBtn);
            break;

        case "p":
            currentBrush = brushes[2];
            colorBrushButtons(paintbrushBtn);
            break;

        case "l":
            currentBrush = brushes[3];
            colorBrushButtons(lightEraserBtn);
            break;

        case "e":
            currentBrush = brushes[4];
            colorBrushButtons(hardEraserBtn);
            break;

        case "n":
            currentMode = modes[0];
            colorModes(normalizeBtn);
            break;

        case "r":
            currentMode = modes[1];
            colorModes(randomizeBtn);
            break;
    }
});

function colorBrushButtons(target){

    //every time a button is pressed, all buttons are set to whitesmoke so that only the newly pressed button will be dark grey
    //this prevents multiple buttons from being grey at the same time
    brushList.forEach((element) => element.style.backgroundColor = "whitesmoke");

    target.style.backgroundColor = "Gainsboro";
}

//function to color the backgrounds of the mode buttons upon click
function colorModes(target){
    utilitiesList.forEach((element) => element.style.backgroundColor = "whitesmoke");

    target.style.backgroundColor = "Gainsboro";
}

colorChoiceList.forEach((element) => element.addEventListener('change', (event) => {
    currentColor = event.target.value;
}, false));

colorChoiceList.forEach((element) => element.addEventListener('click', (event) => {
    currentColor = event.target.value;
}, false));


let initialSquareWidth = canvas_width/16;
buildCanvas(initialSquareWidth, 16);

//----for future background modifications

document.addEventListener('DOMContentLoaded', () => {
    const changePageBackground = document.querySelector(".change-back > input");

    const allPixels = document.querySelectorAll(".canvas > div");

    changePageBackground.addEventListener('change', (event) => {
        pageColor = event.target.value;
        allPixels.forEach((element) => {
            if(parseFloat(element.getAttribute("opacity")) == 0){
                element.style.backgroundColor = pageColor;
            }
        });
    });

});
