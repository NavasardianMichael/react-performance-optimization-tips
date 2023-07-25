import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react"
import Applied from "./Applied"
import NotApplied from "./NotApplied"

export default function UseMemo() {

    const [isUseMemoApplied, setIsUseMemoApplied] = useState(false)

    return (
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useMemo is</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isUseMemoApplied ? 'applied' : 'notApplied'}
                    row
                    onChange={() => setIsUseMemoApplied(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="notApplied" control={<Radio />} label="Not applied" />
                    <FormControlLabel value="applied" control={<Radio />} label="Applied" />
                </RadioGroup>
            </FormControl>
            <div>
                {
                    isUseMemoApplied ?
                    <Applied /> :
                    <NotApplied />
                }
            </div>
        </div>
    )
}
