import PropTypes from 'prop-types';
import React from 'react';

import LanguageContext from '../../contexts/LanguageContext';
import stringModule from '../../helpers/strings';
import SuccessContext from '../../contexts/SuccessContext';
import { getLetterMatchCount } from '../../helpers/index';
import GuessedWordsContext from '../../contexts/GuessedWordsContext'


Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export function Input({ secretWord }) {
    const [currentGuess, setCurrentGuess] = React.useState("");
    const language = React.useContext(LanguageContext);
    const [success, setSuccess] = SuccessContext.useSuccess();
    const [guessedWords, setGuessedWords] = GuessedWordsContext.useGuessedWords();
    const submitHandler = (event) => {
        event.preventDefault();
        const letterMatchCount =
            getLetterMatchCount(currentGuess, secretWord);
        const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }]
        setGuessedWords(newGuessedWords);
        if (currentGuess === secretWord) {
            setSuccess(true);
        }
        setCurrentGuess('');
    }
    if (success) { return null }
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                    placeholder={stringModule.getStringByLanguage(language, 'guessInputPlaceholder')} />
                <button data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={submitHandler}>
                    {stringModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    )
}