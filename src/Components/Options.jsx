

const Options = ({ question, dispatch, answer }) => {

    //console.log(answer)
     // initial state of answer is null

    const hasAnswered = answer !== null

    return (

        <div className="options">
            {question.options.map((option, index) => (
                <button key={option}

                    className={`btn btn-option 
                 ${index === answer ? 'answer' : ''} 
                 ${hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''} `}

                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                    disabled={hasAnswered}
                >{option}</button>
            ))}
        </div>
    )
}

export default Options