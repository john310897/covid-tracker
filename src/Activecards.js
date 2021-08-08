import { Card, CardContent, Typography } from '@material-ui/core';
const Activecards = (props) => {

    return (
        <div>
            <Card className='active_status' variant="outlined" style={{ borderTop: `7px solid ${props.color}` }} onClick={props.handleCardClick} name={props.name}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <h3>+{props.todayCases}</h3>
                    </Typography>
                    <Typography color="textSecondary" variant="h6" component="h2">
                        Total:{props.totalNumber}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
export default Activecards;