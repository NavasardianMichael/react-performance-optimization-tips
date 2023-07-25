import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { getExpensiveCalculationsResult, shuffle } from "helpers/functions/commons"
import { ChangeEventHandler, useEffect, useState, useTransition } from "react"
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

export default function UseTransition() {

    const [isHookApplied, setIsHookApplied] = useState(false)
    const [query, setQuery] = useState('')
    const [pending, setTransition] = useTransition()
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

    const setShuffledList = () => {
        setList(prev => {
            return {
                ...prev,
                allIds: shuffle(prev.allIds)
            }
        })
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuery(e.target.value)

        if(isHookApplied) {
            setTransition(() => {
                setShuffledList();
            })
        } else {
            setShuffledList()
        }
    }

    return (
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">useTransition is</FormLabel>
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
                <TextField size="small" value={query} onChange={handleChange} />
            </Box>
            {pending && <h2>Shuffling...</h2>}
            {
                list.allIds.map(id => {
                    const values = list.byId[id]
                    return (
                        <Item key={id} values={values} />
                    )
                })
            }
        </div>
    )
}
