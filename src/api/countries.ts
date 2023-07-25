export type Country = {
    area: string,
    name: string,
    capital: string,
    region: string,
    population: string
    cioc: string
}

export type CountriesState = {
    allIds: (Country['name'])[]
    byId: Record<Country['name'], Country>
}

export const getNormalizedCountriesList = async () => {
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

    return processed
}