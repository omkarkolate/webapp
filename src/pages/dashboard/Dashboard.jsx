import { Box, Grid, Stack, Typography } from "@mui/material";
import { Header } from "../../components";

export function Dashboard() {
  return (
    <Box>
      <Header />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Stack spacing={4}>
              <Box sx={{ borderRadius: 4, bgcolor: "#cd8942" }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    bgcolor: "#c66920",
                    color: "white",
                    p: 1,
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  Total Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    px: 4,
                    py: 3,
                    color: "white",
                  }}
                >
                  Time
                </Typography>
              </Box>
              <Box sx={{ borderRadius: 4, bgcolor: "#5fbfd1" }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    bgcolor: "#40b0cb",
                    color: "white",
                    p: 1,
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  Total Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    px: 4,
                    py: 3,
                    color: "white",
                  }}
                >
                  Time
                </Typography>
              </Box>
              <Box sx={{ borderRadius: 4, bgcolor: "#a9b1cd" }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    bgcolor: "#98a4ca",
                    color: "white",
                    p: 1,
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  Total Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    px: 4,
                    py: 3,
                    color: "white",
                  }}
                >
                  Time
                </Typography>
              </Box>
              <Box sx={{ borderRadius: 4, bgcolor: "#66a191" }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    bgcolor: "#468574",
                    color: "white",
                    p: 1,
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  Total Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    px: 4,
                    py: 3,
                    color: "white",
                  }}
                >
                  Time
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            Center
          </Grid>
          <Grid item xs>
            <Box sx={{ borderRadius: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  bgcolor: "#1e3f66",
                  color: "white",
                  p: 1,
                  borderRadius: "16px 16px 0 0",
                }}
              >
                Alerts
              </Typography>

              <Box borderBottom={1} borderColor="#a9a9a1">
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      bgcolor: "#dededa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>0</Typography>
                  </Grid>
                  <Grid item xs>
                    <Stack spacing={2} p={1}>
                      <Typography>Packlne value</Typography>
                      <Typography>Andon value</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <Box borderBottom={1} borderColor="#a9a9a1">
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      bgcolor: "#dededa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>0</Typography>
                  </Grid>
                  <Grid item xs>
                    <Stack spacing={2} p={1}>
                      <Typography>Packlne value</Typography>
                      <Typography>Andon value</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
