import { mount } from 'enzyme';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';
import { NewWord } from './NewWord';
import { checkProps, findByTestAttr } from '../../../test/testUtils';
import hookActions from '../../actions/hookActions';

const mockSetSuccess = jest.fn();
const mockSetGuessedWords = jest.fn();

const setup = ({ success = 'true', language = 'en', setSecretWord = function () { } }
    = { success: 'true', language: 'en', setSecretWord: function () { } }) => {
    return mount(
        <LanguageContext.Provider value={language}>
            <GuessedWordsContext.GuessedWordsProvider value={[[],mockSetGuessedWords]}>
                <SuccessContext.SuccessProvider value={[success, mockSetSuccess]}>
                    <NewWord setSecretWord={setSecretWord} />
                </SuccessContext.SuccessProvider>
            </GuessedWordsContext.GuessedWordsProvider>
        </LanguageContext.Provider>
    )
}

test('renders without error', () => {
    const wrapper = setup();
    const newWord = findByTestAttr(wrapper, 'new-word');
    expect(newWord.length).toBe(1);
})

test('only appears when success is true', () => {
    const wrapper = setup({ success: false });
    const newWord = findByTestAttr(wrapper, 'new-word');
    expect(newWord.length).toBe(0);
})

describe('actions on click', () => {
    // this just that resetAction was called, and not the effects
    const mockGetSecretWord = jest.fn();
    beforeEach(() => {
        hookActions.getSecretWord = mockGetSecretWord;

        const wrapper = setup({ success: true, setSecretWord: jest.fn() });
        const component = findByTestAttr(wrapper, 'new-word');
        component.simulate('click');
    });
    test('calls getSecretWord on click', () => {
        expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    });
    test('resets success to false on click', () => {
        expect(mockSetSuccess).toHaveBeenCalledWith(false);
    });
    test('calls setGuessedWords on click', () => {
        expect(mockSetGuessedWords).toHaveBeenLastCalledWith([]);
    })
});
test('does not throw warning with expected props', () => {
    const expectedProps = { setSecretWord: function () { } };
    checkProps(NewWord, expectedProps);
});

describe('languagePicker', () => {
    test('correctly renders new word string in english', () => {
        const wrapper = setup();
        const newWord = findByTestAttr(wrapper, 'new-word');
        expect(newWord.text()).toBe("New Word");
    })
    test('correctly renders new word string in emoji', () => {
        const wrapper = setup({ language: 'emoji' });
        const newWord = findByTestAttr(wrapper, 'new-word');
        expect(newWord.text()).toBe("🆕💬");
    })
})