import React from 'react';
import hookActions from './actions/hookActions';
import './App.css';
import { Congrats } from './components/Congrats/Congrats';

import { GuessedWords } from './components/GuessedWords/GuessedWords'
import { Input } from './components/Input/Input';

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

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading</span>
        </div>
        <p>Loading secret word</p>
      </div>
    )
  }
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Input secretWord={state.secretWord} />
      <Congrats success={true} />
      <GuessedWords guessedWords={[
        { guessedWord: 'train', letterMatchCount: 3 }
      ]} />
    </div>
  );
}

export default App;
