import React from 'react'

const GuessedWordsContext = React.createContext();

function useGuessedWords() {
    const context = React.useContext(GuessedWordsContext);

    if (!context) {
        throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
    }

    return context;
}

function GuessedWordsProvider(props) {
    const [guessedWords, setGuessedWords] = React.useState([]);

    const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

    return <GuessedWordsContext.Provider value={value} {...props} />
}

const exportFuncs = {GuessedWordsProvider, useGuessedWords}

export default exportFuncs;