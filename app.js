// 3x grid rows and images
const grid_row_arr= document.getElementById('grid-tab').getElementsByClassName('row'); 
const grid_img_arr= document.getElementsByClassName('AAA-grid-image');

// body onload callback
function onLoad()
{
  // this prevents client from seeing uncropped ugly images on the very first frames
  document.getElementById('grid-tab').classList.remove('visually-hidden');

  refreshImageCropping();

  // apply base classes to images on startup based on image's largest side, still using Bootstrap classes
  for(const image of grid_img_arr){
    if(image.naturalWidth >= image.naturalHeight) image.classList.add('w-auto');
    else image.classList.add('h-auto');
  }
}

// 3x grid tab button click event (prevents a bug of not showing images until resizing if initial active tab isn't the 3x grid)
document.getElementById('tab-btn-grid').addEventListener('click', function(e) { refreshImageCropping(); });

// window resize event
window.addEventListener('resize', function(e) { refreshImageCropping(); });

// refresh image sizes and margins
function refreshImageCropping()
{
  // get current column width and use it as row height to force square shapes
  let lColSize= grid_row_arr[0].children[0].clientWidth;
  for(const row of grid_row_arr) row.style.height= `${lColSize}px`;

   // apply required margin to center each image in the cropped square container
  for(const img of grid_img_arr){

    if(img.naturalWidth >= img.naturalHeight)
    {
      img.style.height= `100%`; // re-apply required to force size recalculation, haven't found other way
      img.style.marginLeft= `-${__getMarginSize(img.naturalWidth, img.naturalHeight, lColSize)}px`;
    }
    else 
    {
      img.style.width= `100%`;
      img.style.marginTop= `-${__getMarginSize(img.naturalHeight, img.naturalWidth, lColSize)}px`;
    }
  }
}

// ecuation to get margin as: natural-longest-side-px * (scale-factor-from-natural-to-current-client-size) - current-square-size * half
const __getMarginSize = (pSideA, pSideB, pSquareSize) => Math.floor((pSideA * (pSquareSize / pSideB) - pSquareSize) * .5);