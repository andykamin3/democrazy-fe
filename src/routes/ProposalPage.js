import {Chip, Grid, Stack, Typography} from "@mui/material";
import {DAOS, PROPOSALS} from "../constants/Mock";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";

export function ProposalPage(props) {
  const params =useParams()
  console.log(params);
  let daoLookUp =DAOS.find((e)=> e.id === params.daoId);
  console.log(daoLookUp);
  const {name, id, img_url, description, token_address} = daoLookUp;
  const {title:pTitle, author:pAuthor, status:pStatus, description:pDescription, id:pId} = PROPOSALS.find(e=> e.daoId===id && e.id===params.proposalId);

  return (<Grid container spacing={2}>
    <Grid item lg={8} xs={12} >
      <div>
        <Typography variant={"h4"}>
          {pTitle}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          By Author <Chip variant="outlined" color="primary" size="small" icon={<FaceIcon />} label={pAuthor} component={"span"} />
        </Typography>
        <Typography paragraph>{pDescription}</Typography>
        <Stack direction={"row"} spacing={1} className={"dao-title-container"}>
          {pStatus?.result !== undefined && <Chip color={pStatus?.result ? "success":"error"}   label={pStatus?.result ? "Aye" : "Nay"} component={"span"} /> }
          <Chip variant="outlined" color={new Date(pStatus?.date)>Date.now() ? "secondary":"error"} size="small" icon={<CalendarMonthIcon />} label={"Voting closes @ "+pStatus?.date} component={"span"} />
        </Stack>


      </div>
    </Grid>

    <Grid item lg={4} xs={12}>
      <Typography variant={"h4"}>
        Voting
      </Typography>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Cast your vote
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Be careful, this action cannot be undone!
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button variant="contained" color="success">Yes</Button>
            <Button variant="outline" color="error">No</Button>
          </Box>
        </Box>

      </Card>
    </Grid>
  </Grid> );
}
