import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import stringModule from '../../helpers/strings';
import SuccessContext from '../../contexts/SuccessContext'

export function Congrats() {
    const [success] = SuccessContext.useSuccess();
    const language = React.useContext(LanguageContext);
    let content = <div data-test="component-congrats" />
    success && (
        content = (
            <div data-test="component-congrats" className="alert alert-success">
                <span data-test="congrats-message">
                    {stringModule.getStringByLanguage(language, 'congrats')}
                </span>
            </div>
        )
    )
    return content;
}

