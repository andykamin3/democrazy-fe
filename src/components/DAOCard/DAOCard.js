import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Avatar, Link, Stack} from "@mui/material";
import "./DAOCard.css";
import {Link as RouterLink} from "react-router-dom";

export default function DAOCard(props) {
  const {name, id, img_url, description} = props.dao;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>



        <Stack direction="row" spacing={2} className={"dao-title-container"}>
          <Avatar
            alt={name}
            src={img_url}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h5" component="div">
            {name}
          </Typography>

      </Stack>


        <Typography variant="body2">
          {description}

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link component={RouterLink} to={"dao/"+id}>Learn More</Link></Button>
      </CardActions>
    </Card>
  );
}
