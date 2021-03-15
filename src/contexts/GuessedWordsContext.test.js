import {shallow, mount} from 'enzyme';

import GuessedWordsContext from './GuessedWordsContext';

const FunctionalComponent = () => {
    GuessedWordsContext.useGuessedWords();
    return <div></div>
}

test('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
    expect(() => {
        shallow(<FunctionalComponent />);
    }).toThrow('useGuessedWords must be used within a GuessedWordsProvider')
})

test('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
    expect(() => {
        mount(
            <GuessedWordsContext.GuessedWordsProvider>
                <FunctionalComponent />
            </GuessedWordsContext.GuessedWordsProvider>
        )
    }).not.toThrow();
})