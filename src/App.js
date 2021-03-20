import React from 'react';
import hookActions from './actions/hookActions';
import './App.css';
import { Congrats } from './components/Congrats/Congrats';

import { GuessedWords } from './components/GuessedWords/GuessedWords'
import { Input } from './components/Input/Input';
import LanguageContext from './contexts/LanguageContext';
import { LanguagePicker } from './components/LanguagePicker/LanguagePicker'
import SuccessContext from './contexts/SuccessContext';
import GuessedWordsContext from './contexts/GuessedWordsContext';
import { GuessesNumber } from './components/GuessesNumber/GuessesNumber';

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload }
    case "setLanguage":
      return { ...state, language: action.payload }
    default:
      throw new Error(`Invalid action type ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });

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
      <p>The secret word is {state.secretWord}</p>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsContext.GuessedWordsProvider>
          <SuccessContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessContext.SuccessProvider>
          <GuessedWords  />
          <GuessesNumber />
        </GuessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
