import SuccessContext from '../../contexts/SuccessContext';
import hookActions from '../../actions/hookActions';
import stringModule from '../../helpers/strings';
import LanguageContext from '../../contexts/LanguageContext';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';
import React from 'react';
import propTypes from 'prop-types'

NewWord.propTypes = {
    setSecretWord: propTypes.func.isRequired
}

export function NewWord({ setSecretWord }) {
    const [, setGuessedWords] = GuessedWordsContext.useGuessedWords();
    const [success, setSuccess] = SuccessContext.useSuccess();
    const language = React.useContext(LanguageContext);
    const newWordHandler = () => {
        setSuccess(false);
        hookActions.getSecretWord(setSecretWord);
        setGuessedWords([]);
    }
    return (
        <>
            {
                success &&
                <button className="btn btn-primary" data-test="new-word" onClick={newWordHandler}>
                    {stringModule.getStringByLanguage(language, 'newWord')}
                </button>
            }
        </>
    )
}