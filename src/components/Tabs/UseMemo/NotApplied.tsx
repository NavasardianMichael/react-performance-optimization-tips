import { memo, useState } from "react"
import { TextField } from "@mui/material"
import { getExpensiveCalculationsResult } from "helpers/functions/commons"
import { WithCodeHinter } from "components/WithCodeHinter/WithCodeHinter"

const code = `
const NotApplied = () => {

    const [text, setText] = useState('')
  
    const exspensiveValue = getExpensiveCalculationsResult()
  
    return (
      <WithCodeHinter code={code}>
        <TextField value={text} onChange={e => setText(e.target.value)} />
        <p>Expensive value: {exspensiveValue}</p>
      </WithCodeHinter>
    )
}
`

export default memo(function NotApplied() {

    const [text, setText] = useState('')
 
    return (
      <WithCodeHinter code={code}>
        <TextField size="small" value={text} onChange={e => setText(e.target.value)} />
        <p>Expensive value: {getExpensiveCalculationsResult()}</p>
      </WithCodeHinter>
    )
})
