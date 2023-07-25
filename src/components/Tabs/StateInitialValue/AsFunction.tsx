import { TextField } from "@mui/material"
import { WithCodeHinter } from "components/WithCodeHinter/WithCodeHinter"
import { memo, useState } from "react"

const code = `
export default memo(function AsFunction() {

    const getExpensiveCalculationsResult = () => {
        let iteration = 0

        while(iteration < 100_000_000) {
            iteration ++
        }

        return ''
    }

    const [value, setValue] = useState(getExpensiveCalculationsResult)

    return (
        <WithCodeHinter>
            <TextField 
                value={value} 
                onChange={e => setValue(e.currentTarget.value)} 
            />
        </WithCodeHinter>
    )
})
`

export default memo(function AsFunction() {

    const getExpensiveCalculationsResult = () => {
        let iteration = 0

        while(iteration < 100_000_000) {
            iteration ++
        }

        return ''
    }

    const [value, setValue] = useState(getExpensiveCalculationsResult)

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
