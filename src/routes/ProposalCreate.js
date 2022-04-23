import {Paper, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useParams} from "react-router-dom";

export function ProposalCreate() {
  const {daoId} = useParams();

  const { handleSubmit, control } = useForm();
  const onSubmit = async data => {
    axios
      .post("https://dc-backend-rpal.vercel.app/addproposal", {...data, daoId})
      .then(function (response) {
        console.log(response);
        alert("Done");
      })
      .catch(function (error) {
        console.log(error);
      });
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
    <Paper sx={{ padding: 8 }}>
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
