import PropTypes from 'prop-types';

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export function Congrats(props) {
    let content = <div data-test="component-congrats" />
    props.success && (
        content = (
            <div data-test="component-congrats">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        )
    )
    return content;
}

