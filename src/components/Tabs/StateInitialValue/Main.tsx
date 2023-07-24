import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react"
import AsValue from "./AsValue"
import AsFunction from "./AsFunction"

export default function UseStateInitialValue() {

    const [isAsValue, setIsAsValue] = useState(true)

    return (
        <div>
            <h2>useState initial value</h2>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Initial Value is set as</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isAsValue ? 'asValue' : 'asFunction'}
                    row
                    onChange={() => setIsAsValue(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="asValue" control={<Radio />} label="value" />
                    <FormControlLabel value="asFunction" control={<Radio />} label="function" />
                </RadioGroup>
            </FormControl>
            <div key={isAsValue ? 'asValue' : 'asFunction'}>
                {
                    isAsValue ?
                    <AsValue /> :
                    <AsFunction />
                }
            </div>
        </div>
    )
}
