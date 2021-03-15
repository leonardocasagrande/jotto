import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByTestAttr } from '../../../test/testUtils';
import { Input } from './Input';

const defaultProps = { secretWord: 'party' };

const setup = (props) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<Input {...setupProps} />);
}

test('Input renders without error', () => {
    const wrapper = setup();
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
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
        wrapper = setup();
    })
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    })
    test('current guess is reset when guess is submitted', () => {
    
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate("click", {preventDefault() {}});

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    })
})