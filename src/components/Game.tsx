import React, {useState} from 'react'; // Imports react and useState from react.
import StartScreen from './TicStartScreen';
import Grid from './TicGrid';
  
// Array of all possible winning line coordinates.
const winningLines = [[0, 0, 0, 1, 0, 2], [1, 0, 1, 1, 1, 2], [2, 0, 2, 1, 2, 2], [0, 0, 1, 0, 2, 0], [0, 1, 1, 1, 2, 1], [0, 2, 1, 2, 2, 2], [0, 0, 1, 1, 2, 2], [0, 2, 1, 1, 2, 0]];
    
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
    
    // Function to check if there's a winner.
    type Board = (string | null)[][];

    const isWin = (board: Board): string | false => {
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
