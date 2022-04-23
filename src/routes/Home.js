import Typography from "@mui/material/Typography";
import DAOCard from "../components/DAOCard/DAOCard";
import {Grid} from "@mui/material";
import {DAOS} from "../constants/Mock";
//  const {name, id, img_url, description} = props.dao;
export function Home() {



  return <>
      <Grid container spacing={3}>
        {
          DAOS.map((e)=>(<Grid md={4} xs={12} key={e.id} item><DAOCard dao={e} /></Grid>))
        }
      </Grid>
  </>;
}
