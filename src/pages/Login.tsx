import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

function Login() {
  return (
    <>
      <Box position={"absolute"} top={"40%"} left={"60%"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <TextField label="Username" variant="outlined" />
          </Grid>
          <Grid>
            <TextField label="Password" variant="outlined" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
