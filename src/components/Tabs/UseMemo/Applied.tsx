import { memo, useState, useMemo } from "react"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { getExpensiveCalculationsResult } from "helpers/functions/commons"
import { TextField } from "@mui/material"
import { WithCodeHinter } from "components/WithCodeHinter/Main"

const code = `
const Applied = () => {

    const [text, setText] = useState('')
  
    const exspensiveValue = useMemo(getExpensiveCalculationsResult, [])
  
    return (
      <WithCodeHinter code={code}>
        <TextField value={text} onChange={e => setText(e.target.value)} />
        <p>Expensive value: {exspensiveValue}</p>
      </WithCodeHinter>
    )
}
`

export default memo(function Applied() {

    const [text, setText] = useState('')
  
    const exspensiveValue = useMemo(getExpensiveCalculationsResult, [])

    return (
      <WithCodeHinter code={code}>
        <TextField size="small" value={text} onChange={e => setText(e.target.value)} />
        <p>Expensive value: {exspensiveValue}</p>
      </WithCodeHinter>
    )
})
