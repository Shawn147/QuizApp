import './public/App.css';
import questions from '../assets/questions.json';
import StarRatings from 'react-star-ratings';
import {useEffect, useState} from 'react';

const App = () => {
  const [state, setState] = useState({
    active: null,
    category: '',
    message: 'Sorry',
    difficult: 'easy',
    ind: 0,
    btn: true,
  });
  const arr = [];
  const greyColor = '#A7A9A8';
  // console.log(questions);
  const question = state.ind + 1;
  const width = `${(question * 100) / questions.length}%`;
  // console.log(width);
  useEffect(() => {
    setState({
      ...state,
      difficult: questions[state.ind].difficulty,
      category: questions[state.ind].category,
    });
  }, []);
  const nextQuestion = () => {
    setState({
      ...state,
      active: null,
      btn: true,
      ind: state.ind + 1,
    });
  };
  const ValidationFunc = (ans, v, ind) => {
    setState({
      ...state,
      active: ans,
      difficult: v.difficulty,
      btn: false,
      message: v.correct_answer == ans ? 'Correct' : 'Sorry!',
    });
    arr.push(v.correct_answer == ans ? 'Correct' : 'Sorry!');
    console.log(ans, state.active);
  };
  return (
    <div className="App">
      <div style={{backgroundColor: greyColor, height: 20, width: width}} />
      <div style={{marginLeft: '8%', marginTop: '8%'}}>
        <h1 style={{lineHeight: 0.5}}>
          Questions {question} of {questions.length}
        </h1>
        <p style={{lineHeight: 0.5, fontSize: 12}}>{state.category}</p>
        <div style={{lineHeight: 0.5}}>
          <StarRatings
            rating={state.difficult == 'easy' ? 1 : 3}
            starColor={'red'}
            starDimension="10px"
            starSpacing="3px"
          />
        </div>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          {questions.map((v, i) => {
            return (
              i == state.ind && (
                <div
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <p>{v.question.split('%20') + ' ?'}</p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    {[
                      ...v.correct_answer.split('%20'),
                      ...v.incorrect_answers,
                    ].map((ans) => {
                      return (
                        <div
                          onClick={() =>
                            state.btn ? ValidationFunc(ans, v, i) : null
                          }
                          style={{
                            marginLeft: 12,
                            marginTop: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 200,
                            borderRadius: 4,
                            borderWidth: 2,
                            borderStyle: 'outset',
                            borderColor: '#000',
                            height: 40,
                            opacity:
                              state.active === ans || state.active == null
                                ? 1
                                : 0.5,
                            backgroundColor: greyColor,
                          }}>
                          <p
                            style={
                              {
                                // color: '#fff',
                              }
                            }>
                            {ans}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
          {state.active && (
            <h3 style={{textAlign: 'center'}}>{state.message}</h3>
          )}
          {state.active && (
            <div
              onClick={() => nextQuestion()}
              style={{
                marginLeft: 12,
                marginTop: 12,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                borderRadius: 4,
                borderWidth: 2,
                borderStyle: 'outset',
                borderColor: '#000',
                height: 40,
                backgroundColor: greyColor,
              }}>
              <p
                style={
                  {
                    // color: '#fff',
                  }
                }>
                {state.ind != 19 ? 'Next Question' : 'Done'}
              </p>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            width: '90%',
            borderStyle: 'groove',
            marginTop: 20,
            borderRadius: 4,
            borderColor: '#000',
            borderWidth: 1,
          }}>
          {['#000', '#999', greyColor, '#fff'].map((col) => {
            return (
              <div
                style={{
                  alignSelf: 'center',
                  backgroundColor: col,
                  height: 20,
                  width: '100%',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
