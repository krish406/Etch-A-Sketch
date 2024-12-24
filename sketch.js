let margin = 3;
let num_squares = 16;
const canvas = document.querySelector(".canvas");
let opacity = 0.1;
let darkenIncrement = 0.2;

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
            //sets custom html element property called opacity
            pixel.dataset.opacity = 0;

            pixel.addEventListener('mouseenter', () => {
                if(parseFloat(pixel.dataset.opacity) + darkenIncrement <= 1){
                    pixel.dataset.opacity = parseFloat(pixel.dataset.opacity) + darkenIncrement;
                    pixel.dataset.opacity = Math.round((pixel.dataset.opacity) * 10) / 10;
                    pixel.style.backgroundColor = "grey";
                    console.log(pixel.dataset.opacity)
                    pixel.style.opacity = parseFloat(pixel.dataset.opacity);
                }
            });

            canvas.appendChild(pixel);
        }
    }
}

buildboard(30);