import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions'
import React from 'react';


const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    const mockUseReducer = jest.fn()
        .mockReturnValue([
            { secretWord },
            jest.fn()
        ]);
    React.useReducer = mockUseReducer;
    return mount(<App />);
}

test('App renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.length).toBe(1);
})

describe('getSecretWord calls', () => {
    test('getSecretWord gets called on App mount', () => {
        setup();

        expect(mockGetSecretWord).toHaveBeenCalled();
    })
    test('secretWord does not update on App update', () => {
        const wrapper = setup();
        mockGetSecretWord.mockClear();
        //Atualiza componente.
        wrapper.setProps();
        expect(mockGetSecretWord).not.toHaveBeenCalled();
    })
});

describe("secretWord is not null", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup("party");
    })
    test("renders app when secretWord is not null", () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(true);
    })
    test("does not render spinner when secretWord is not null", () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(false);
    })
});

describe("secretWord is null", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup(null);
    })
    test("does not render app when secretWord is not null", () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(false);
    })
    test("renders spinner when secretWord is not null", () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(true);
    })
})