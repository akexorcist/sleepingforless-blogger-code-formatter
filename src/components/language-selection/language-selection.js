import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function LanguageSelection(props) {
    const [language, setLanguage] = React.useState(props.defaultLanguage || "kotlin");

    const onChange = (event) => {
        setLanguage(event.target.value);
        if (props.onLanguageChanged) {
            props.onLanguageChanged(event.target.value)
        }
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="language" name="language" value={language} onChange={onChange}>
                <FormControlLabel value="kotlin" control={<Radio />} label="Kotlin" labelPlacement="bottom" />
                <FormControlLabel value="java" control={<Radio />} label="Java" labelPlacement="bottom" />
                <FormControlLabel value="groovy" control={<Radio />} label="Gradle" labelPlacement="bottom" />
                <FormControlLabel value="markup" control={<Radio />} label="XML" labelPlacement="bottom" />
                <FormControlLabel value="json" control={<Radio />} label="JSON" labelPlacement="bottom" />
            </RadioGroup>
        </FormControl>
    );
}