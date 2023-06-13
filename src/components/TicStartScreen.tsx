type StartScreenProps = {
    onStart: () => void;
  };

// StartScreen component. Takes in onStart function as a prop.
function StartScreen({onStart}: StartScreenProps) { 
    // Displays a title and a button. Clicking the button calls the onStart function.
    return(
        <div> 
            <h1>Welcome to Luke's TicTacToe!</h1> 
            <button onClick={onStart}>Click here to Start</button>
        </div>
    );

}


export default StartScreen;
