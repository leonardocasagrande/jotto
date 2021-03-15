import PropTypes from 'prop-types';
import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings'

export function GuessedWords(props) {
    const language = React.useContext(LanguageContext)
    let contents
    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessedWordsRows =
            props.guessedWords.map((word, index) => (
                <tr key={index} data-test="guessed-word">
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
        <div data-test="component-guessed-word">
            {contents}
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
}