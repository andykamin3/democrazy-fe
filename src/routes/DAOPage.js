import {DAOS, PROPOSALS} from "../constants/Mock";
import {Avatar, Divider, Grid, Stack, Typography} from "@mui/material";
import ProposalCard from "../components/ProposalCard";
import {Outlet} from "@mui/icons-material";
import {useParams} from "react-router-dom";


export function DAOPage(){
  const params =useParams()
  console.log(params);
  let daoLookUp =DAOS.find((e)=> e.id === params.daoId);
  console.log(daoLookUp);
  const {name, id, img_url, description, token_address} = daoLookUp;

  return (<Grid container spacing={2}>
    <Grid item lg={8} xs={12} >
      <div>
        <Typography variant={"h4"}>Proposals</Typography>
        <Stack spacing={2}>
          {PROPOSALS.filter((e)=> e.daoId === params.daoId).map((e)=><ProposalCard key={e.id} proposal={e}/>)}

        </Stack>
      </div>
    </Grid>

    <Grid item lg={4} xs={12}>
      <Stack sx={{ my: 2 }} direction="row" spacing={2} className={"dao-title-container"}>
        <Avatar
          alt={name}
          src={img_url}
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="h4" component="h4">
          {name}
        </Typography>
      </Stack>
      <Divider variant="middle" />
      <Typography sx={{ my: 2 }} variant="body1">
        {description}


      </Typography>
    </Grid>
  </Grid> );
}



export function DAOContainer(){
   console.log("Dao container page")
  return <Outlet/>
}
