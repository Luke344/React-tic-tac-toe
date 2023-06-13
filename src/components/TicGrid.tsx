type GridProps = {
    onClick: (rowIndex: number, colIndex: number) => void;
    board: (string | null)[][];
  };

// Grid component. Takes onClick function and board state as props.
function Grid({onClick, board}: GridProps) {
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



export default Grid;
