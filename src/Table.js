const Table = (props) => {
    return (
        <div className='app__table'>
            {props.countries.map((country, keys) => (
                <tr>
                    <td> {country.country}</td>
                    <td align='right'> {country.cases}</td>
                </tr>
            ))}
        </div>
    )
}
export default Table