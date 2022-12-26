import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";

export function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isShow: false });

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    // if (alert.isShow) setAlert({ isShow: false });
    // setLoading(true);
    // // const response = await logInWithUserNameAndPassword(userName, password);
    // setLoading(false);
    // if (response.success) {
    // //   navigate("/", { replace: true });
    // } else {
    //   setAlert({ isShow: true, ...response });
    // }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 1 }}>
            {alert.isShow && (
              <Alert severity="error">
                <AlertTitle sx={{ textTransform: "capitalize" }}>
                  Error
                </AlertTitle>
                Message
              </Alert>
            )}
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="userName"
                name="userName"
                autoComplete="userName"
                label="User Name"
                type="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
            loadingPosition="end"
          >
            Log in
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
