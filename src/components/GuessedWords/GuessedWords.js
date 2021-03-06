import React from 'react';

import GuessedWordsContext from '../../contexts/GuessedWordsContext';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings'

export function GuessedWords() {
    const [guessedWords] = GuessedWordsContext.useGuessedWords();
    const language = React.useContext(LanguageContext)
    let contents
    if (guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessedWordsRows =
            guessedWords.map((word, index) => (
                <tr key={index} data-test="guessed-word">
                    <td>
                        {index + 1}
                    </td>
                    <td>
                        {word.guessedWord}
                    </td>
                    <td>
                        {word.letterMatchCount}
                    </td>
                </tr>
            ));
        contents = (
            <div data-test="guessed-words">
                <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                <table className="table table-sm">
                    <thead className="table-light">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                {stringsModule.getStringByLanguage(language, 'guessColumnHeader')}
                            </th>
                            <th>
                                {stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {guessedWordsRows}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div data-test="component-guessed-word" style={{marginTop:'1rem'}}>
            {contents}
        </div>
    )
}