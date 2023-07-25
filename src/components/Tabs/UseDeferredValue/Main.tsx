import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { ChangeEventHandler, useCallback, Suspense, useDeferredValue, useEffect, useState } from "react"
import Item from "./Item"
import { getExpensiveCalculationsResult } from "helpers/functions/commons"

export type Country = {
    area: string,
    name: string,
    capital: string,
    region: string,
    population: string
    cioc: string
}

type CountriesState = {
    allIds: (Country['name'])[]
    byId: Record<Country['name'], Country>
}

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
            const res = await fetch('https://restcountries.com/v3.1/all')
            const data = await res.json()
            let processed: CountriesState = {
              byId: {},
              allIds: []
            }
            data.forEach((item: any) => {
                processed.byId[item.name.common] = {
                    area: item.area,
                    name: item.name.common,
                    capital: item?.capital?.[0],
                    region: item.region,
                    population: item.population,
                    cioc: item.cioc
                }
                processed.allIds.push(item.name.common)
            })
            
            setList(processed)
          }
          getData()
    }, [])

    return (
        <div>
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
            {
                list.allIds.map(id => {
                    const values = list.byId[id]
                    return (
                        <Item customText={isHookApplied ? deferredCustomText : customText} key={id} values={values} />
                    )
                })
            }
        </div>
    )
}
