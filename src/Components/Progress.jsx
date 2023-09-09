

const Progress = ({ index, numQuestions, points, maxPoints }) => {


console.log(index)

    return (
        <header className="progress">


            <progress max={numQuestions} value={index+1} />


            <p>
                question <strong>{index + 1}</strong>/{numQuestions}{" "}
            </p>

            <p>
                <strong>{points}</strong>/{maxPoints}
            </p>
        </header>
    );
};

export default Progress;
