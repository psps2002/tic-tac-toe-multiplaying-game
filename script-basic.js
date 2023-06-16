const O = document.querySelectorAll('.o');
const X = document.querySelectorAll('.x');
const start = document.getElementById('start');

const gameBegins = () => {
  let i = 0;
  while (i < 8) {
    if (i % 2 == 0) {
      O.forEach((button) => {
        button.classList.add('invisible');
      });
      X.forEach((button) => {
        button.classList.remove('invisible');
      });
      i++;
    } else {
      X.forEach((button) => {
        button.classList.add('invisible');
      });
      O.forEach((button) => {
        button.classList.remove('invisible');
      });
      i++;
    }
  }
}

start.addEventListener('click', function() {
  gameBegins();
});

//////The issue lies in how you're using querySelectorAll. It returns a NodeList, which is an array-like object that represents a list of DOM elements. You cannot directly apply class manipulation methods like classList.add or classList.remove to the entire NodeList. Instead, you need to iterate over each element within the NodeList and apply the class manipulation to each individual element.

