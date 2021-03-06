import propTypes from 'prop-types'

LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
}

export function LanguagePicker({ setLanguage }) {
    const languages = [
        { code: 'en', symbol: 'πΊπΈ' },
        { code: 'emoji', symbol: 'π' },
    ]
    const languageIcons = languages.map(el => (
        <span data-test="language-icon"
        style={{marginRight: '1rem', cursor: 'pointer'}}
            key={el.code}
            onClick={() => setLanguage(el.code)}>
            {el.symbol}
        </span>
    ))
    return (
        <div data-test="component-language-picker">
            {languageIcons}
        </div>
    )
}

