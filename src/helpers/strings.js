const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnHeader: 'Guessed Words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters',
        totalGuesses: 'Total guesses: ',
        newWord: 'New Word',
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
        totalGuesses: '🏴󠁧󠁢󠁥󠁮󠁧󠁿🤷‍🔤: ',
        newWord: '🆕💬'
    }
}

function getStringByLanguage(languageCode, stringKey,
    strings = languageStrings) {
    if (!strings[languageCode] || !strings[languageCode][stringKey]) {
        console.warn(`Could not get string [${stringKey}] for [${languageCode}]`)
        return strings.en[stringKey]
    }
    return strings[languageCode][stringKey]
}

const exportFuncs = {getStringByLanguage}

export default exportFuncs;