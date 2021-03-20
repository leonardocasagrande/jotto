import React from 'react';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';
import LanguageContext from '../../contexts/LanguageContext';
import stringModule from '../../helpers/strings';


export function GuessesNumber() {
    const [guessedWords] = GuessedWordsContext.useGuessedWords();
    const language = React.useContext(LanguageContext);
    const count = guessedWords.length;
    return (
        <p data-test="guesses-number">
            {stringModule.getStringByLanguage(language, 'totalGuesses')}{count}
        </p>
    );
}