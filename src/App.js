import React from 'react';
import hookActions from './actions/hookActions';
import './App.css';
import { Congrats } from './components/Congrats/Congrats';

import { GuessedWords } from './components/GuessedWords/GuessedWords'

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`Invalid action type ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  )

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord) },
    []
  )
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords guessedWords={[
        { guessedWord: 'train', letterMatchCount: 3 }
      ]} />
    </div>
  );
}

export default App;
