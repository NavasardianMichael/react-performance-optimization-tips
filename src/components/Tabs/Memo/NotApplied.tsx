import { FC } from 'react'
import { Country } from './Main';

type Props = {
    values: Country
}

const initialStyles: React.CSSProperties = {
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: '10px',
    padding: '.25rem 1rem',
    marginTop: '.5rem',
    marginBottom: '.5rem',
    color: '#ffff'
}

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
    <div style={{...initialStyles, background: '#'+Math.floor(Math.random()*16777215).toString(16)}}>
        <p>name: {name}</p> 
        <p>area: {area}</p> 
        <p>capital: {capital}</p> 
        <p>region: {region}</p> 
        <p>population: {population}</p> 
    </div>
  )
};

export default NotApplied
