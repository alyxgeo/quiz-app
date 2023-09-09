

const StartScreen = ({ numQuestions, dispatch }) => {

    return (
        <div className="start">
            <h2>welcome to react quiz</h2>
            <h3>{numQuestions} questions to test your skill</h3>

            <button className="btn btn-ui"
                onClick={() =>{ dispatch({ type: 'start' })}}>
                Let's start</button>
        </div>
    )
}

export default StartScreen