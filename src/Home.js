import { useEffect, useState } from "react";
import Activecards from "./Activecards"
import Header from "./Header"
import Map from "./Map";
import { Card, CardContent } from '@material-ui/core';
import Table from './Table'
import LineGraph from "./LineGraph";
const Home = () => {

    // initializing constants
    const [country, setCountry] = useState([]);
    const [selectedCountry, setselectedCountry] = useState('worldwide')
    const [selectedCountryData, setSelectedCountryData] = useState({})
    const [tableData, setTableData] = useState([])
    const [type, setType] = useState('cases')
    const _ = require('lodash');

    // loading countries in onload
    useEffect(() => {
        getCountries()
        countryData('https://disease.sh/v3/covid-19/all')
    }, [])

    // fetching country names and code through api
    const getCountries = async () => {
        await fetch('https://disease.sh/v3/covid-19/countries').then((res) =>
            res.json()
        ).then((data) => {
            const countries = data.map((countries) => ({
                name: countries.country,
                value: countries.countryInfo.iso2
            }));
            var sorted_data = _.orderBy(data, ['cases'], ['desc'])
            setCountry(countries)
            setTableData(sorted_data)
        })
    }

    // onchange function
    const handleOnChange = (e) => {
        console.log('in handle change')
        setselectedCountry(e.target.value)
        const api = e.target.value === 'worldwide' ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/` + e.target.value
        countryData(api)
        console.log(e.target.value)
        console.log(selectedCountry)

    }

    // setting up specific country data
    const countryData = async (api) => {
        await fetch(api).then(res => res.json()).then(data => {
            setSelectedCountryData(data)
        })
        console.log('selectedCountryData', selectedCountryData)
    }
    // handling card click
    const handleCardClick = (name) => {
        setType(name)
        console.log(name)
    }

    return (
        <div>
            {/* setting header component */}
            <Header
                onChange={handleOnChange}
                value={selectedCountry}
                options={country}
            />

            {/* setting app structure */}
            <div className='main__parent'>
                <div className='app__left'>
                    {/* total number of cases */}
                    <div className='total__status'>
                        <Activecards
                            name='cases'
                            title='Active'
                            color='blue'
                            handleCardClick={(e) => { handleCardClick('cases') }}
                            todayCases={selectedCountryData.todayCases}
                            totalNumber={selectedCountryData.cases}
                        />
                        <Activecards
                            name='recovered'
                            title='Recovered'
                            color='greenyellow'
                            handleCardClick={(e) => { handleCardClick('recovered') }}
                            todayCases={selectedCountryData.todayRecovered}
                            totalNumber={selectedCountryData.recovered}
                        />
                        <Activecards
                            name='deaths'
                            title='Deaths'
                            color='red'
                            handleCardClick={(e) => { handleCardClick('deaths') }}
                            todayCases={selectedCountryData.todayDeaths}
                            totalNumber={selectedCountryData.deaths}
                        />
                    </div>

                    {/* graph */}
                    <br />
                    <h3>Data of last  60 days</h3>
                    <LineGraph selectedCountry={selectedCountry} type={type} />
                </div>
                <div className='app__right'>
                    <Card>
                        <CardContent>
                            <h3>World wide cases</h3>
                            <Table countries={tableData} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}
export default Home