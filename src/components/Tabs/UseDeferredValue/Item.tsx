import { ChangeEventHandler, FC, memo } from 'react'
import { Country } from './Main';
import { TextField } from "@mui/material"
import { getExpensiveCalculationsResult } from 'helpers/functions/commons';

type Props = {
    values: Country
    customText: string
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
    customText
}) => {

    getExpensiveCalculationsResult(2000000)

  return (
    <div style={{...initialStyles, background: '#'+Math.floor(Math.random()*16777215).toString(16)}}>
        <p>custom text: {customText}</p> 
        <p>name: {name}</p> 
        <p>area: {area}</p> 
        <p>capital: {capital}</p> 
        <p>region: {region}</p> 
        <p>population: {population}</p> 
    </div>
  )
};

export default memo(Item)
