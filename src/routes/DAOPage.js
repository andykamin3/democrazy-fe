import {Avatar, Divider, Grid, Link, Stack, Typography} from "@mui/material";
import ProposalCard from "../components/ProposalCard";
import {Outlet} from "@mui/icons-material";
import {Link as RouterLink, useParams} from "react-router-dom";
import Button from "@mui/material/Button";

export function DAOPage({ daos, proposals }) {
  const params = useParams();
  const dao = daos.find(e => e.id === params.daoId);

  const props = [];
  for (const proposal of proposals) {
    if (proposal.daoId === dao.id) {
      props.push(proposal);
    }
  }

  if (!dao) {
    return <p>No dao found with given id</p>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={8} xs={12}>
        <div>
          <Typography variant={"h4"}>Proposals</Typography>
          <Stack spacing={2}>
            {proposals.map((proposal, idx) => (
              <ProposalCard key={idx} proposal={proposal} />
            ))}
          </Stack>
        </div>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Stack
          sx={{ my: 2 }}
          direction="row"
          spacing={2}
          className={"dao-title-container"}
        >
          <Avatar
            alt={dao.name}
            src={dao.img_url}
     w       sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h4" component="h4">
            {dao.name}
          </Typography>
        </Stack>
        <Button size="small">
          <Link component={RouterLink} to={"create"}>
            Create a proposal
          </Link>
        </Button>        <Divider variant="middle" />
        <Typography sx={{ my: 2 }} variant="body1">
          {dao.description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export function DAOContainer() {
  console.log("Dao container page");
  return <Outlet />;
}
