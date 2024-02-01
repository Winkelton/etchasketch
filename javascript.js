const grid = document.querySelector('.grid');
let gridValue = document.querySelector('.grid-size');
let gridSize = document.querySelector('input');
const resetBtn = document.querySelector('.reset');
const applyGridSize = document.querySelector('.change');
let squareSize = 8;
const pickColor = document.querySelector('#pickacolor');
const rainbowBtn = document.querySelector('#rainbowmodebtn');
const clearBtn = document.querySelector('#cleargrid');
let newColor = '';
let baseColor = '#000000';
let randomMode = 0;
let colorMode = 0;
createGrid(squareSize);

// Creating boxes
function createBox(size) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.width = `${size}px`;
  box.style.height = `${size}px`;

  return box;
}

// Creat The Grid and append it to gamecontainer
function createGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid.appendChild(createBox(grid.clientWidth / gridSize));
    }
  }
}

//colormode changing
function changeColorMode(mode){
  if(mode == 1){
    colorMode = 0;
    return colorMode;
  } else if (colorMode == 0){
    colorMode = 1;
    return colorMode;
  }
  
  }

// Reset the grid size
function reset() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  createGrid(squareSize);
}

// Return the backgroundcolor to white while keeping gridsize
function clearGrid(){
   let gridselection = document.querySelectorAll(".box");
   gridselection.forEach(element => {
    element.style.backgroundColor = '#f5f5f5';
   });
}

// Random color for rainbow mode
function getRandomColor (){
return "#"+Math.floor(Math.random()*16777215).toString(16);
}

// Coloring mode
function startPainting(e){
  if (e.target.matches('.box')) {
    if(randomMode == 1){ 
     e.target.style.backgroundColor = getRandomColor();
    }else if(newColor){
      e.target.style.backgroundColor = newColor;
    }else{
      e.target.style.backgroundColor = baseColor;
    }
  }
}

// Add Eventlistener for the coloring function
grid.addEventListener('click',()=>{
let Status = changeColorMode(colorMode);
console.log(Status);
if(Status == 1){
grid.addEventListener('mouseover', startPainting, false);
} else if (Status == 0)  {
  grid.removeEventListener('mouseover',startPainting, false);
}
})

// Add Eventlistener to change the grid size
gridSize.addEventListener('input', function (e) {
  squareSize = e.target.value;
  gridValue.textContent = `${squareSize}x${squareSize}`;
});
// Add Eventlistener to reset the grid 
applyGridSize.addEventListener('click', function () {
  reset();
});

resetBtn.addEventListener('click', reset);

// Add Eventlistener to the pick-a-color button, saves the current color and allows coloring with the color
pickColor.addEventListener('input', function (e){
  newColor = e.target.value;
  randomMode = 0;
  console.log(newColor);
});
// Add Eventlistener to the rainbow button, de/-activating the rainbow mode
rainbowBtn.addEventListener('click', function(e){
  randomMode = 1;
});
// Add Eventlistener to the clear button, clearing the whole grid
clearBtn.addEventListener('click', clearGrid);