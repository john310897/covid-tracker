import { FormControl, MenuItem, Select } from '@material-ui/core';
const Header = (props) => {
    return (
        <div className='app_header'>
            <h1>COVID 19 TRACKER</h1>
            <FormControl className='dropdown'>
                <Select
                    name='countries'
                    variant='outlined'
                    value={props.value}
                    onChange={props.onChange}
                >
                    <MenuItem value='worldwide'>Worldwide</MenuItem>
                    {props.options.map((country, value) => (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default Header