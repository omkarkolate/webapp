import { Box, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alerts, Acknowledges } from "./index";

export function DashboardMain() {
  const [data, setData] = useState({
    alerts: [],
    acks: [],
    recentAlert: {
      groupName: "",
      deviceName: "",
      input: "",
    },
    currentActiveAlerts: 0,
    totalTime: "00:00:00",
    totalAlerts: 0,
  });

  const getData = async () => {
    try {
      const response = await axios.get("/dashboard");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    const dataInterval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(dataInterval);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack spacing={3}>
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
              <Stack spacing={0.5} p={1}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {data.recentAlert?.groupName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {data.recentAlert?.deviceName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {data.recentAlert?.input}
                </Typography>
              </Stack>
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
                Current Active Alerts
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
                {data.currentActiveAlerts}
              </Typography>
            </Box>
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
                {data.totalTime}
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
                {data.totalAlerts}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={2} sx={{ maxHeight: "85vh", overflow: "hidden" }}>
            <Alerts alerts={data.alerts} />
            <Acknowledges acks={data.acks} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
