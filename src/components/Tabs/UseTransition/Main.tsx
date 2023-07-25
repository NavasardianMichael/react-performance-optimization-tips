import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { CountriesState, getNormalizedCountriesList } from "api/countries"
import { shuffle } from "helpers/functions/commons"
import { ChangeEventHandler, useEffect, useState, useTransition } from "react"
import Item from "./Item"
import { WithCodeHinter } from "components/WithCodeHinter/Main"

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
            const normalizedList = await getNormalizedCountriesList()
            setList(normalizedList)
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
        <Box>
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
            <WithCodeHinter code={code}>
                {pending && <h2>Shuffling...</h2>}
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            <Item key={id} values={values} />
                        )
                    })
                }
            </WithCodeHinter>
        </Box>
    )
}


const code = `
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
            const normalizedList = await getNormalizedCountriesList()
            setList(normalizedList)
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
        <Box>
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
            <WithCodeHinter code={code}>
                {pending && <h2>Shuffling...</h2>}
                {
                    list.allIds.map(id => {
                        const values = list.byId[id]
                        return (
                            <Item key={id} values={values} />
                        )
                    })
                }
            </WithCodeHinter>
        </Box>
    )
}

// Slow Component
const Item: FC<Props> = ({
    values: { 
        area,
        name,
        region,
        population
    },
}) => {

    getExpensiveCalculationsResult(10000000)

    return (
        <Box>
            <p>name: {shuffle(name.split('')).join('')}</p> 
            <p>area: {shuffle(area.toString().split('')).join('')}</p> 
            <p>region: {shuffle(region.split('')).join('')}</p> 
            <p>population: {shuffle(population.toString().split('')).join('')}</p> 
        </Box>
    )
}
`