import { Box, Grid, Stack, Typography } from "@mui/material";
import { Header } from "../../components";

export function Dashboard() {
  return (
    <Box>
      <Header />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Stack spacing={3}>
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
                  25
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
                  Total Alerts
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
                  10
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
                  Current Active Alert
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
                  Active Alert
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
                  Recent Alert
                </Typography>
                <Stack spacing={2} p={1}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Packlne value
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Andon value
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Box borderRadius={4}>
              <Typography
                variant="subtitle2"
                sx={{
                  borderRadius: "16px 16px 0 0",
                  fontSize: 20,
                  bgcolor: "#2261a2",
                  color: "white",
                  p: 1,
                }}
              >
                Packlines
              </Typography>
              <Box
                bgcolor="#0e3c6f"
                p={2}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",
                  borderRadius: "0 0 16px 16px",
                }}
              >
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
                <Box
                  bgcolor="#993e27"
                  p={2}
                  py={3}
                  color="white"
                  borderRadius={4}
                  m={1}
                >
                  Packline 1
                </Box>
              </Box>
            </Box>
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

              <Box sx={{overflowY: "scroll"}} >
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
