import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { useEffect, useState } from "react"
import Applied from "./Applied"
import NotApplied from "./NotApplied"

export type Country = {
    area: string,
    name: string,
    capital: string,
    region: string,
    population: string
}

type CountriesState = {
    allIds: (Country['name'])[]
    byId: Record<Country['name'], Country>
}

export default function Memo() {

    const [isMemoApplied, setIsMemoApplied] = useState(false)
    const [text, setText] = useState('')
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
                <FormLabel id="demo-radio-buttons-group-label">memo is</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isMemoApplied ? 'applied' : 'notApplied'}
                    row
                    onChange={() => setIsMemoApplied(prev => !prev)}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="notApplied" control={<Radio />} label="Not applied" />
                    <FormControlLabel value="applied" control={<Radio />} label="Applied" />
                </RadioGroup>
            </FormControl>
            <WithCustomProfiler id='memo'>
                <TextField 
                    size="small"
                    value={text} 
                    onChange={e => setText(e.currentTarget.value)}
                    sx={{display: 'block', marginBottom: '1.5rem'}} 
                    placeholder="Type here"
                />
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            isMemoApplied ?
                            <Applied key={id} values={values} /> :
                            <NotApplied key={id} values={values} />
                        )
                    })
                }                
            </WithCustomProfiler>
        </div>
    )
}
