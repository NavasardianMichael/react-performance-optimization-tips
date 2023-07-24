import { TextField } from "@mui/material"
import { memo, useState } from "react"
import { WithCodeHinter } from "../../WithCodeHinter/WithCodeHinter"

const code = `
export default memo(function AsFunction() {

    const getExpensiveCalculationsResult = () => {
        const msStart = Date.now()
        let iteration = 0

        while(iteration < 100_000_000) {
            iteration ++
        }

        const msEnd = Date.now()
        alert('getExpensiveCalculationsResult called, which took ' + (msEnd - msStart) + ' ms')

        return ''
    }

    const [value, setValue] = useState(getExpensiveCalculationsResult())

    return (
        <WithCustomProfiler id="asValue">
            <WithCodeHinter code={code}>
                <TextField 
                    value={value} 
                    onChange={e => setValue(e.currentTarget.value)} 
                />
            </WithCodeHinter>
        </WithCustomProfiler>
    )
})
`

export default memo(function AsFunction() {

    const getExpensiveCalculationsResult = () => {
        const msStart = Date.now()
        let iteration = 0

        while(iteration < 100_000_000) {
            iteration ++
        }

        const msEnd = Date.now()
        alert('getExpensiveCalculationsResult called, which took ' + (msEnd - msStart) + ' ms')

        return ''
    }

    const [value, setValue] = useState(getExpensiveCalculationsResult())

    return (
        <WithCodeHinter code={code}>
            <TextField 
                size="small"
                value={value} 
                onChange={e => setValue(e.currentTarget.value)} 
                placeholder="Type here"
            />
        </WithCodeHinter>
    )
})
