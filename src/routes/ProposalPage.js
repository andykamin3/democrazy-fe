import {Chip, Grid, Stack, Typography} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";

export function ProposalPage({ daos, proposals }) {

  const { account, active } = useWeb3React();
  const vote = async (vote, address, proposal) => {
    if (account) {
      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: ["kck", account, "Random text"],
      });
      console.log(await sign);
    } else {
      alert("Connect Wallet on Optimism Kovan net");
    }
  };

  const params = useParams();
  console.log(params);
  let daoLookUp = daos.find(e => e.id === params.daoId);
  console.log(daoLookUp);
  let name, id, img_url, description, token_address;
  if(daoLookUp !== undefined){
    name = daoLookUp.name;
    id= daoLookUp.id;
    img_url = daoLookUp.img_url;
    description = daoLookUp.description;
    token_address = daoLookUp.token_address;
  }
  const proposalLookup = proposals.find(
    e => e.daoId === id && e.id === params.proposalId
  );
  let pTitleO, pAuthorO, pDateO, pTimeO, pStatusO, pDescriptionO, pFdtO;
  if(proposalLookup !== undefined){
    const {
      title: pTitle,
      author: pAuthor,
      status: pStatus,
      description: pDescription,
      id: pId,
      date:pDate,
      time:pTime
    } = proposalLookup;
    pTitleO=pTitle;
    pAuthorO = pAuthor;
    pStatusO = pStatus;
    pDescriptionO = pDescription;
    pFdtO= pDate+pTime;

  }



  return (
    <Grid container spacing={2}>
      <Grid item lg={8} xs={12}>
        <div>
          <Typography variant={"h4"}>{pTitleO}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            By Author{" "}
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              icon={<FaceIcon />}
              label={pAuthorO}
              component={"span"}
            />
          </Typography>
          <Typography paragraph>{pDescriptionO}</Typography>
          <Stack
            direction={"row"}
            spacing={1}
            className={"dao-title-container"}
          >
            {pStatusO?.result !== undefined && (
              <Chip
                color={pStatusO?.result ? "success" : "error"}
                label={pStatusO?.result ? "Aye" : "Nay"}
                component={"span"}
              />
            )}
            <Chip
              variant="outlined"
              color={
                new Date(pDateO) > Date.now() ? "secondary" : "error"
              }
              size="small"
              icon={<CalendarMonthIcon />}
              label={
                "Voting closes @ " +
                new Date(pFdtO).toLocaleDateString() +
                " " +
                new Date(pFdtO).toLocaleTimeString()
              }
              component={"span"}
            />
          </Stack>
        </div>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Typography variant={"h4"}>Voting</Typography>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Cast your vote
              </Typography>
              {new Date(pFdtO) > Date.now() ? (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Be careful, this action cannot be undone!
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Voting is no longer available
                </Typography>
              )}
            </CardContent>
            {new Date(pFdtO) > Date.now() ? (
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    vote();
                  }}
                >
                  Aye
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    vote();
                  }}
                >
                  Nay
                </Button>
              </Box>
            ) : null}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
