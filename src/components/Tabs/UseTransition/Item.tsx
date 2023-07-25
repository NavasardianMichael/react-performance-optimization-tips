import { Country } from 'api/countries';
import { getExpensiveCalculationsResult, shuffle } from 'helpers/functions/commons';
import { FC, memo } from 'react';

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
        <div style={{...initialStyles, background: '#'+Math.floor(Math.random()*16777215).toString(16)}}>
            <p>name: {shuffle(name.split('')).join('')}</p> 
            <p>area: {shuffle(area.toString().split('')).join('')}</p> 
            <p>region: {shuffle(region.split('')).join('')}</p> 
            <p>population: {shuffle(population.toString().split('')).join('')}</p> 
        </div>
    )
};

export default memo(Item)
