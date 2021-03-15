import PropTypes from 'prop-types';
import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import stringModule from '../../helpers/strings';

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export function Congrats(props) {
    const language = React.useContext(LanguageContext);
    let content = <div data-test="component-congrats" />
    props.success && (
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

