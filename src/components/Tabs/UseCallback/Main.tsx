import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { CountriesState, getNormalizedCountriesList } from "api/countries"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import Item from "./Item"
import { WithCodeHinter } from "components/WithCodeHinter/Main"

export default function UseCallback() {

    const [isHookApplied, setIsHookApplied] = useState(false)
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

    const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value, name } = e.currentTarget
        setList(prev => {
            return {
                ...prev,
                byId: {
                    ...prev.byId,
                    [name]: {
                        ...prev.byId[name],
                        region: value
                    }
                }
            }
        })
    }

    const setNameCached = useCallback(setName, [])

    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useCallback is</FormLabel>
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
            <WithCustomProfiler id='useCallback'>
                <WithCodeHinter code={code}>
                    {
                        list.allIds.map(id => {
                            const values = list.byId[id]
                            return (
                                <Item 
                                    key={id} 
                                    values={values} 
                                    setName={isHookApplied ? setNameCached : setName} 
                                />
                            )
                        })
                    }
                </WithCodeHinter>
            </WithCustomProfiler>
        </Box>
    )
}

const code = `
export default function UseCallback() {

    const [isHookApplied, setIsHookApplied] = useState(false)
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

    const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value, name } = e.currentTarget
        setList(prev => {
            return {
                ...prev,
                byId: {
                    ...prev.byId,
                    [name]: {
                        ...prev.byId[name],
                        region: value
                    }
                }
            }
        })
    }
    
    const setNameCached = useCallback(setName, [])

    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useCallback is</FormLabel>
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
            <WithCustomProfiler id='useCallback'>
                <WithCodeHinter>
                    {
                        list.allIds.map(id => {
                            const values = list.byId[id]
                            return (
                                <Item 
                                    key={id} 
                                    values={values} 
                                    setName={isHookApplied ? setNameCached : setName} 
                                />                                
                            )
                        })
                    }
                </WithCodeHinter>
            </WithCustomProfiler>
        </Box>
    )
}


// Slow Component 
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
});

`