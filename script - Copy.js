// Select the necessary elements from the DOM
const start = document.getElementById('start');
const buttons = document.querySelectorAll('.o, .x');
const result = document.querySelector('#result');

let gameActive = true; // Variable to track if the game is active or not

// Function to begin the game
const gameBegins = () => {
  let i = 0;

  // Function to toggle the visibility of buttons based on the current player's turn
  const toggleButtons = () => {
    buttons.forEach((button) => {
      // Toggle the 'invisible' class based on the current player's turn
      button.classList.toggle('invisible', (button.classList.contains('o') && i % 2 !== 0) || (button.classList.contains('x') && i % 2 === 0));
    });
  };

  // Function to check the winning conditions
  const checkWinningCondition = () => {
    const winningConditions = [
      ['box-1', 'box-2', 'box-3'], // Top row
      ['box-4', 'box-5', 'box-6'], // Middle row
      ['box-7', 'box-8', 'box-9'], // Bottom row
      ['box-1', 'box-4', 'box-7'], // Left column
      ['box-2', 'box-5', 'box-8'], // Middle column
      ['box-3', 'box-6', 'box-9'], // Right column
      ['box-1', 'box-5', 'box-9'], // Diagonal from top-left to bottom-right
      ['box-3', 'box-5', 'box-7'], // Diagonal from top-right to bottom-left
    ];

    // Check each winning condition to determine the winner
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      const divA = document.querySelector(`.${a}`); // Find the element with a class name matching the value of 'a' (e.g., 'box-1')
      const divB = document.querySelector(`.${b}`); // Find the element with a class name matching the value of 'b' (e.g., 'box-2')
      const divC = document.querySelector(`.${c}`); // Find the element with a class name matching the value of 'c' (e.g., 'box-3')      

      const playerA = divA.innerHTML.trim(); // Get the HTML content of divA and remove leading/trailing whitespace
      const playerB = divB.innerHTML.trim(); // Get the HTML content of divB and remove leading/trailing whitespace
      const playerC = divC.innerHTML.trim(); // Get the HTML content of divC and remove leading/trailing whitespace      

      if (
        playerA === '<h2>O</h2>' &&
        playerB === '<h2>O</h2>' &&
        playerC === '<h2>O</h2>'
      ) {
        return 'O'; // Return 'O' if 'O' wins
      } else if (
        playerA === '<h2>X</h2>' &&
        playerB === '<h2>X</h2>' &&
        playerC === '<h2>X</h2>'
      ) {
        return 'X'; // Return 'X' if 'X' wins
      }
    }

    return null; // Return null if no winner is found
  };

  // Function to handle the button click event
  const handleClick = () => {
    if (!gameActive) {
      return; // Return early if the game is not active
    }
   
    const currentPlayer = i % 2 === 0 ? 'O' : 'X'; // Determine the current player based on the value of 'i'. If 'i' is even, assign 'O' to currentPlayer, otherwise assign 'X'.

    const button = event.target; // Get the button element that triggered the click event.
    const player = button.classList.contains('x') ? 'X' : 'O'; // Determine the player based on the class name of the button. If it contains 'x', assign 'X' to player, otherwise assign 'O'.
    button.parentElement.innerHTML = `<h2>${player}</h2>`; // Update the inner HTML of the button's parent element to display the player's symbol ('X' or 'O').
    
    const winner = checkWinningCondition();
    if (winner) {
      result.innerHTML = `Winner is: ${winner}! <a href="">Click here to play again</a>`;
      gameActive = false; // Set gameActive to false when a player wins
      buttons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    } else if (i === 8) {
      result.innerHTML = `It's a tie! <a href="">Click here to play again</a>`;
      gameActive = false; // Set gameActive to false when it's a tie
    }

    i++; // Increment the value of 'i' by 1 to track the number of button clicks.
    toggleButtons(); // Call the toggleButtons() function to update the visibility of the buttons based on the current value of 'i' and the player's turn. This function ensures that only the buttons corresponding to the current player are visible, while the others are hidden.
      };

  // Attach click event listeners to buttons
  buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
  });

  toggleButtons(); // Toggle the visibility of buttons at the beginning of the game
};

// Event listener for the start button
start.addEventListener('click', () => {
  start.classList.add('invisible');
  gameBegins();
});
