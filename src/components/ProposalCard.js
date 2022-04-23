import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import {Chip, Link, Stack} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Link as RouterLink} from "react-router-dom";

export default function ProposalCard(props) {
  const {title, author, status, description, id, daoId} = props.proposal
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            By Author <Chip variant="outlined" color="primary" size="small" icon={<FaceIcon />} label={author.substring(0,6)+"..."} component={"span"} />

          </Typography>
          <Typography variant="h5">
            {title}
          </Typography>

          <Typography variant="body2">
            {description.substring(0,140)}
            {description.length>140?"...":""}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Status
          </Typography>
          <Stack direction={"row"} spacing={1} className={"dao-title-container"}>
            {status.result !== undefined && <Chip color={status.result ? "success":"error"}   label={status?.result ? "Aye" : "Nay"} component={"span"} /> }
            <Chip variant="outlined" color={new Date(status?.date)>Date.now() ? "secondary":"error"} size="small" icon={<CalendarMonthIcon />} label={status?.date} component={"span"} />

          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small"><Link component={RouterLink} to={"proposal/"+id}>Learn More</Link></Button>
        </CardActions>
      </React.Fragment>
      </Card>
    </Box>
  );
}
