import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler"
import { useEffect, useState } from "react"
import Applied from "./Applied"
import NotApplied from "./NotApplied"
import { CountriesState, getNormalizedCountriesList } from "api/countries"
import { WithCodeHinter } from "components/WithCodeHinter/Main"

export default function Memo() {

    const [isMemoApplied, setIsMemoApplied] = useState(false)
    const [text, setText] = useState('')
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
                <WithCodeHinter code={code}>
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
                </WithCodeHinter>            
            </WithCustomProfiler>
        </Box>
    )
}

const code = `
export default function Memo() {

    const [isMemoApplied, setIsMemoApplied] = useState(false)
    const [text, setText] = useState('')
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
                <WithCodeHinter code={code}>
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
                </WithCodeHinter>            
            </WithCustomProfiler>
        </Box>
    )
}


// Memo not applied component
const NotApplied: FC<Props> = ({
    values: { 
        area,
        name,
        capital,
        region,
        population
    }
}) => {

    return (
    <Box>
    <p>name: {name}</p> 
    <p>area: {area}</p> 
    <p>capital: {capital}</p> 
    <p>region: {region}</p> 
    <p>population: {population}</p> 
    </Box>
    )
}


// Memo applied component
const Applied: FC<Props> = memo(({
    values: { 
        area,
        name,
        capital,
        region,
        population
    }
}) => {

  return (
    <Box>
        <p>name: {name}</p> 
        <p>area: {area}</p> 
        <p>capital: {capital}</p> 
        <p>region: {region}</p> 
        <p>population: {population}</p> 
    </Box>
  )
})
`
