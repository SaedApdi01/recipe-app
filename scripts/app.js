// Selecting elements
const headerEl = document.querySelector('.header');
const headerInfo = document.querySelector('.header-info');


// Array of image URLs to slide through
const imageUrls = [
    'https://images.unsplash.com/photo-1627683962231-c1fc5488e9da?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fDB8fHww'
];

let currentIndex = 0 ; 
function headerBGSlider(){
 headerEl.style.backgroundImage = `Url(${imageUrls[currentIndex]})`; 
 currentIndex  = (currentIndex + 1) % imageUrls.length ;
  setTimeout(headerBGSlider , 4000)
}

headerBGSlider()
