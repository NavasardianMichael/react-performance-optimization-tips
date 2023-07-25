import { ChangeEventHandler, FC, memo } from 'react'
import { Country } from './Main';
import { TextField } from "@mui/material"

type Props = {
    values: Country
    setName: ChangeEventHandler<HTMLInputElement>
}

const initialStyles: React.CSSProperties = {
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: '10px',
    padding: '.25rem 1rem',
    marginTop: '.5rem',
    marginBottom: '.5rem',
    color: '#ffff'
}

const Item: FC<Props> = ({
    values: { 
        area,
        name,
        capital,
        region,
        population
    },
    setName
}) => {

  return (
    <div style={{...initialStyles, background: '#'+Math.floor(Math.random()*16777215).toString(16)}}>
        <p>name: {name}</p> 
        <TextField 
            size="small"
            value={region}
            name={name} 
            onChange={setName}
            sx={{display: 'block', marginBottom: '1.5rem'}} 
            placeholder="Type here"
        />
        <p>area: {area}</p> 
        <p>capital: {capital}</p> 
        <p>region: {region}</p> 
        <p>population: {population}</p> 
    </div>
  )
};

export default memo(Item)
