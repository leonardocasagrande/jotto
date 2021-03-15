import PropTypes from 'prop-types';
import React, { useState } from 'react';

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export function Input({ secretWord }) {
    const [currentGuess, setCurrentGuess] = React.useState("")
    const submitHandler = (event) => {
        event.preventDefault();
        setCurrentGuess('');
    }
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                    placeholder="Enter guess" />
                <button data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={submitHandler}>
                    Submit
                    </button>
            </form>
        </div>
    )
}