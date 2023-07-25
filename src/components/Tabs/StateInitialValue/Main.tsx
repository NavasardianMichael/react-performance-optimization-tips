import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react"
import AsValue from "./AsValue"
import AsFunction from "./AsFunction"

export default function UseStateInitialValue() {

    const [isAsValue, setIsAsValue] = useState(true)

    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Initial value of the useState is set as</FormLabel>
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
            <Box>
                {
                    isAsValue ?
                    <AsValue /> :
                    <AsFunction />
                }
            </Box>
        </Box>
    )
}
