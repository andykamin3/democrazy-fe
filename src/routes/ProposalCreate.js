import { Paper, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { generate_pk } from "../utilities/CryptographicGoodies";
import * as ipns from 'ipns';

export function ProposalCreate() {
  const { daoId } = useParams();

  const { handleSubmit, control } = useForm();
  const { account, active } = useWeb3React();

  const onSubmit = async (data) => {
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [`Creating a proposal for ${daoId}`, account],
    });
    let publicKey = generate_pk(String(sign)).toString();
    let proposalId;
    await axios
      .post("https://dc-backend-rpal.vercel.app/addproposal", {
        ...data,
        daoId,
        publicKey,
        author: account,
      })
      .then(function (response) {
        console.log(response);
        proposalId = response.data.id;
      })
      .catch(function (error) {
        console.log(error);
      });
    let ipfsCid;
    await axios
      .post("https://dc-backend-rpal.vercel.app/takeSnapshot/" + proposalId)
      .then((res) => {
        ipfsCid = res.data.cid;
      });
    const entryData = await ipns.create(String(sign), ipfsCid, 1, 60000)
    
  };
  /**
   * title
   * author
   * daoId:
   * status:{
   *     result
   *     date
   *   }
   *   id
   *  description
   *  public_key
   */

  return (
    <Paper sx={{ padding: 8, borderRadius: 5 }}>
      <h2>Register a proposal</h2>
      <form>
        <Stack spacing={2}>
          <Controller
            name={"title"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={"Title"} />
            )}
          />
          <Controller
            name={"date"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Date DD-MM-YYYY"}
              />
            )}
          />
          <Controller
            name={"time"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Time HH:MM"}
              />
            )}
          />
          <Controller
            name={"description"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                multiline={true}
                onChange={onChange}
                value={value}
                label={"Description"}
              />
            )}
          />

          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
