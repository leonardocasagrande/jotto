import {shallow, mount} from 'enzyme';

import SuccessContext from './SuccessContext';

const FunctionalComponent = () => {
    SuccessContext.useSuccess();
    return <div></div>
}

test('useSuccess throws error when not wrapped in SuccessProvider', () => {
    expect(() => {
        shallow(<FunctionalComponent />);
    }).toThrow('useSuccess must be used within a SuccessProvider')
})

test('useSuccess does not throw error when wrapped in SuccessProvider', () => {
    expect(() => {
        mount(
            <SuccessContext.SuccessProvider>
                <FunctionalComponent />
            </SuccessContext.SuccessProvider>
        )
    }).not.toThrow();
})