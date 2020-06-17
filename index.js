const cards = document.querySelectorAll('.card');
const background = document.querySelector('#transition');
const blackout = document.querySelector('#blackout');
const container = document.querySelector('.container');
const transitionContainer = document.querySelector('#transition-container');

let autoRow = (window.innerHeight - 15) / 3;

let sheet = document.createElement('style');
sheet.innerHTML = `.container {grid-auto-rows: ${autoRow}px;}`;
document.body.appendChild(sheet);

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    moveToCard(e, card)
  })
})

const moveToCard = (e, card) => {
  if (card.classList.contains('undiscovered') && background.classList.contains('available')) {

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = e.target;
    const title = card.childNodes[1];
    const content = card.childNodes[3];
    transitionContainer.style.display = 'block';
    transitionContainer.style.left = `${offsetLeft}px`;
    transitionContainer.style.top = `${offsetTop}px`;
    transitionContainer.style.width = `${offsetWidth}px`;
    transitionContainer.style.height = `${offsetHeight}px`;
    
    setTimeout(() => {
      card.classList.remove('undiscovered')
      background.classList.remove('available');
      background.style.display = 'block';
      background.style.width = `${offsetWidth}px`;
      background.style.height = '20px';
    
      blackout.style.display = 'block';
      blackout.style.width = `${offsetWidth + 2}px`;
    }, 50);

    setTimeout(() => {
      background.classList.add('fix-height');
      background.style.top = `${offsetHeight - background.offsetHeight}px`;
      blackout.style.height = `${offsetHeight - background.offsetHeight}px`;
    }, 100);
    setTimeout(() => {
      
      title.classList.add('hidden');
      content.classList.add('visible');
      blackout.style.height = `0px`;
      background.style.top = `0px`;
    }, 650);
    setTimeout(() => {
      blackout.style.display = 'none';
      background.classList.remove('fix-height');
      background.style.height = '0px';
    }, 1200);
    setTimeout(() => {
      background.style.display = 'none';
      card.classList.add('finished');
      background.classList.add('available');
      background.classList.add('finished');
      transitionContainer.style.display = 'none';
    }, 1300);
    first = false;
  }
}