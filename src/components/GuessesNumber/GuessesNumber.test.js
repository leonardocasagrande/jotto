import { mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import GuessedWordsContext from '../../contexts/GuessedWordsContext'
import LanguageContext from '../../contexts/LanguageContext';
import { GuessesNumber } from './GuessesNumber';


const setup = (guessedWords = [], language = 'en') => {
    return mount(
        <LanguageContext.Provider value={language}>
            <GuessedWordsContext.GuessedWordsProvider value={[guessedWords, jest.fn()]}>
                <GuessesNumber />
            </GuessedWordsContext.GuessedWordsProvider>
        </LanguageContext.Provider>
    )
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'guesses-number');
    expect(component.length).toBe(1);
})

test('displays correct number of guesses with guesses', () => {
    const wrapper = setup(['test', 'party']);
    const component = findByTestAttr(wrapper, 'guesses-number');
    expect(component.text()).toBe("Total guesses: 2");
})

describe('languagePicker', () => {
    test('correctly renders total guesses string in english', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'guesses-number');
        expect(component.text()).toBe("Total guesses: 0");
    })
    test('correctly renders submit string in emoji', () => {
        const wrapper = setup([], 'emoji');
        const component = findByTestAttr(wrapper, 'guesses-number');
        expect(component.text()).toBe("🏴󠁧󠁢󠁥󠁮󠁧󠁿🤷‍🔤: 0");
    })
})