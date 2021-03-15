import { mount } from 'enzyme';
import React from 'react';
import { checkProps, findByTestAttr } from '../../../test/testUtils';
import { Input } from './Input';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import GuessedWordsContext from '../../contexts/GuessedWordsContext'

const setup = ({ secretWord, language, success }) => {
    secretWord = secretWord || 'party';
    language = language || 'en';
    success = success || false;
    return mount(
        <LanguageContext.Provider value={language}>
            <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
                <GuessedWordsContext.GuessedWordsProvider>
                    <Input secretWord={secretWord} />
                </GuessedWordsContext.GuessedWordsProvider>
            </SuccessContext.SuccessProvider>
        </LanguageContext.Provider>
    )
}

test('Input renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
})
test('does not throw warning with expected props', () => {
    const expectedProps = { secretWord: 'party' };
    checkProps(Input, expectedProps);
})

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    let originalUseState = React.useState;
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
        wrapper = setup({});
    })
    afterEach(() => {
        React.useState = originalUseState;
    })
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    })
    test('current guess is reset when guess is submitted', () => {

        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate("click", { preventDefault() { } });

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    })
})

describe('languagePicker', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({});
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe("Submit");
    })
    test('correctly renders submit string in emoji', () => {
        const wrapper = setup({ language: 'emoji' });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe("🚀");
    })
})

test('input component does not show when success is true', () => {
    const wrapper = setup({ secretWord: 'party', success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
})