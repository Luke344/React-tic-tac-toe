import React, {useState} from 'react'; // Imports react and useState from react.

// StartScreen component. Takes in onStart function as a prop.
function StartScreen({onStart}) { 
    // Displays a title and a button. Clicking the button calls the onStart function.
    return(
        <div> 
            <h1>Welcome to Luke's TicTacToe!</h1> 
            <button onClick={onStart}>Click here to Start</button>
        </div>
    );
} 

// Grid component. Takes onClick function and board state as props.
function Grid({onClick, board}) {
    // Returns a flex container with a button for each cell in the board.
    // Each button's text is the state of the cell (either 'X', 'O' or null).
    // When a button is clicked, the onClick function is called with the cell's coordinates.
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{display: 'flex', flexDirection: 'row'}}> 
            {row.map((cell, colIndex) => (
              <button key={colIndex} style={{margin: '5px'}} onClick={() => onClick(rowIndex, colIndex)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
}

// Main Game component.
function Game() {
    // State variable for whether the game has started. Set with setGameStarted.
    const [gameStarted, setGameStarted] = useState(false);
    // State variable for the game board. Set with setBoard.
    const [board, setBoard] = useState(new Array(3).fill(0).map(() => new Array(3).fill(null)));
    // State variable for the current player. Set with setCurrentPlayer.
    const [currentPlayer, setCurrentPlayer] = useState('X');

    // Function for handling a cell click.
    const handleClick = (rowIndex, colIndex) => {
        // Only makes a move if the clicked cell is empty and no player has won yet.
        if (!board[rowIndex][colIndex] && !isWin(board)) {
            // Creates a new board, places the current player's mark in the clicked cell and switches to the other player.
            const newBoard = JSON.parse(JSON.stringify(board));
            newBoard[rowIndex][colIndex] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    // Array of all possible winning line coordinates.
    const winningLines = [[0, 0, 0, 1, 0, 2], [1, 0, 1, 1, 1, 2], [2, 0, 2, 1, 2, 2], [0, 0, 1, 0, 2, 0], [0, 1, 1, 1, 2, 1], [0, 2, 1, 2, 2, 2], [0, 0, 1, 1, 2, 2], [0, 2, 1, 1, 2, 0]];
    
    // Function to check if there's a winner.
    const isWin = (board) => {
        // For each line in winningLines, if all cells in the line have the same mark and it's not null, returns that mark. Otherwise, returns false.
        for(let line of winningLines){
            if(board[line[0]][line[1]] === board[line[2]][line[3]] &&
                board[line[2]][line[3]] === board[line[4]][line[5]] &&
                board[line[0]][line[1]] !== null)
                return board[line[0]][line[1]];
        }
        return false;
    };
    
    // Check if there's a winner.
    const winner = isWin(board);
    
    // If the game has started, displays the game board and the winner message if there's a winner. Otherwise, displays the start screen.
    return (
        <div>
            {gameStarted ?
                <>
                    <Grid onClick={handleClick} board={board} />
                    {winner && <h1>Congratulations {winner}, you won!</h1>}
                </>
                : <StartScreen onStart={() => setGameStarted(true)} />
            }
        </div>
    );
}

export default Game; // Exports the Game component.
