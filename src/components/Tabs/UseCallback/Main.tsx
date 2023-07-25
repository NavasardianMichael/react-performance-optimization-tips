import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import Item from "./Item"

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

export default function UseCallback() {

    const [isUseCallbackApplied, setIsUseCallbackApplied] = useState(false)
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
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useCallback is</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isUseCallbackApplied ? 'applied' : 'notApplied'}
                    row
                    onChange={() => setIsUseCallbackApplied(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="notApplied" control={<Radio />} label="Not applied" />
                    <FormControlLabel value="applied" control={<Radio />} label="Applied" />
                </RadioGroup>
            </FormControl>
            <WithCustomProfiler id='useCallback'>
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            <Item setName={isUseCallbackApplied ? setNameCached : setName} key={id} values={values} />
                        )
                    })
                }
            </WithCustomProfiler>
        </div>
    )
}
