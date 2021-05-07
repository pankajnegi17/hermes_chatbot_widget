import React, { Component } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
export default class StatusCard extends Component {
  render() {
    
    const statuscard = this.props.statuscard
   
    return (

        <Card  >
      <CardContent>
        <Typography  color="textSecondary" variant="button" gutterBottom>
         {statuscard["Header"]}
        </Typography>
        <Typography  color="textSecondary" gutterBottom>
        From date: {statuscard["From date"]}
        </Typography> 

        <Typography  color="textSecondary" gutterBottom>
        To date: {statuscard["To date"]}
        </Typography> 

        <Typography  color="textSecondary" gutterBottom>
        Request Date: {statuscard["Request Date"]}
        </Typography> 
        <Typography  color="textSecondary" gutterBottom>
        Leave Type: {statuscard["Leave Type"]}
        </Typography> 

        


        <Typography variant="body2" component="p">
        Leave Reason: {statuscard["Leave Reason"]}
          <br /> 
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
 
 
    );
  }
}
