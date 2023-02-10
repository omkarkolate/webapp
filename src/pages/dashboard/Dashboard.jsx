import { Box } from "@mui/material";
import { Header, DashboardMain } from "../../components";

export function Dashboard() {
  return (
    <Box>
      <Header active="Dashboard" />
      <DashboardMain />
    </Box>
  );
}
