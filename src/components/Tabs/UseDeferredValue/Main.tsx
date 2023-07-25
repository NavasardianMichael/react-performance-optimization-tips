import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { CountriesState, getNormalizedCountriesList } from "api/countries"
import { useDeferredValue, useEffect, useState } from "react"
import Item from "./Item"
import { WithCodeHinter } from "components/WithCodeHinter/Main"

export default function UseDeferredValue() {

    const [isHookApplied, setIsHookApplied] = useState(false)
    const [customText, setCustomText] = useState('Some Custom Text')
    const deferredCustomText = useDeferredValue(customText)
    const [list, setList] = useState<CountriesState>({
        byId: {},
        allIds: []
    })

    useEffect(() => {
        const getData = async () => {
            const normalizedList = await getNormalizedCountriesList()
            setList(normalizedList)
        }

        getData()
    }, [])

    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useDeferredValue is</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isHookApplied ? 'applied' : 'notApplied'}
                    row
                    onChange={() => setIsHookApplied(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="notApplied" control={<Radio />} label="Not applied" />
                    <FormControlLabel value="applied" control={<Radio />} label="Applied" />
                </RadioGroup>
            </FormControl>
            <Box>
                <TextField size="small" value={customText} onChange={e => setCustomText(e.target.value)} />
            </Box>
            <WithCodeHinter code={code}>
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            <Item 
                                key={id} 
                                values={values} 
                                customText={isHookApplied ? deferredCustomText : customText} 
                            />
                        )
                    })
                }
            </WithCodeHinter>
        </Box>
    )
}

const code = `
export default function UseDeferredValue() {

    const [isHookApplied, setIsHookApplied] = useState(false)
    const [customText, setCustomText] = useState('Some Custom Text')
    const deferredCustomText = useDeferredValue(customText)
    const [list, setList] = useState<CountriesState>({
        byId: {},
        allIds: []
    })

    useEffect(() => {
        const getData = async () => {
            const normalizedList = await getNormalizedCountriesList()
            setList(normalizedList)
        }

        getData()
    }, [])

    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useDeferredValue is</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isHookApplied ? 'applied' : 'notApplied'}
                    row
                    onChange={() => setIsHookApplied(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="notApplied" control={<Radio />} label="Not applied" />
                    <FormControlLabel value="applied" control={<Radio />} label="Applied" />
                </RadioGroup>
            </FormControl>
            <Box>
                <TextField size="small" value={customText} onChange={e => setCustomText(e.target.value)} />
            </Box>
            <WithCodeHinter code={code}>
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            <Item 
                                key={id} 
                                values={values} 
                                customText={isHookApplied ? deferredCustomText : customText} 
                            />
                        )
                    })
                }
            </WithCodeHinter>
        </Box>
    )
}


// Slow component
const Item: FC<Props> = memo(({
    values: { 
        area,
        name,
        capital,
        region,
        population
    },
    customText
}) => {
    
    getExpensiveCalculationsResult(2000000)

    return (
        <Box>
            <p>custom text: {customText}</p> 
            <p>name: {name}</p> 
            <p>area: {area}</p> 
            <p>capital: {capital}</p> 
            <p>region: {region}</p> 
            <p>population: {population}</p> 
        </Box>
    )
})
`