import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
const LineGraph = (props) => {

    // declaring constants in usestate
    const [graphData, setGraphData] = useState({})
    const [labels, setLabels] = useState([])
    const [totalData, setTotalData] = useState([])

    // getting data on load
    useEffect(() => {
        setApi(props.selectedCountry)
        console.log('selected country data', props.selectedCountry)
    }, [props.type])

    // set selected api
    const setApi = (country) => {
        let api = "";
        if (country === 'worldwide') {
            api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=60'
        } else {
            api = `https://disease.sh/v3/covid-19/historical/${props.selectedCountry}?lastdays=60`
        }
        getCases(api)
    }

    // get data of active recovered and death cases reported in a week
    const getCases = async (api) => {
        if (props.selectedCountry === 'worldwide') {
            await fetch(api).then((res) => res.json()).then((res) => {
                console.log("historical data", res[props.type])
                setLabels(Object.keys(res[props.type]))
                setTotalData(Object.values(res[props.type]))
            })
        } else {
            await fetch(api).then((res) => res.json()).then((res) => {
                console.log("historical data", res.timeline[props.type])
                setLabels(Object.keys(res.timeline[props.type]))
                setTotalData(Object.values(res.timeline[props.type]))
            })
        }
    }
    const chartData = () => {
        const data = {
            type: 'line',
            labels: labels,
            datasets: [
                {
                    label: props.type,
                    data: totalData,
                    fill: true,
                    backgroundColor: props.type === 'cases' ? "blue" : props.type === 'recovered' ? 'greenyellow' : props.type === 'deaths' ? 'red' : '',
                    borderColor: props.type === 'cases' ? "blue" : props.type === 'recovered' ? 'greenyellow' : props.type === 'deaths' ? 'red' : ''
                }
            ]
        }
        return data
    }
    return (
        <div className='app_graph'>
            <Line data={chartData} />
        </div>
    )
}
export default LineGraph