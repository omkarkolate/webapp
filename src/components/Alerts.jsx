import { Alert, AlertTitle, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export function Alerts({alerts}) {
    return (
      <Alert severity="error" sx={{ height: "50vh", overflowY: "auto" }}>
        <AlertTitle>Alerts</AlertTitle>
        {alerts.length > 0 ? (
          <Stack direction="row" sx={{ flexWrap: "wrap" }}>
            {alerts.map((alert) => (
              <Alert
                key={alert.alertId}
                severity="error"
                icon={false}
                variant="outlined"
                sx={{ mr: 1, mb: 1, textAlign: "center" }}
              >
                <Typography>{alert.groupName}</Typography>
                <Typography>{alert.deviceName}</Typography>
                <Typography>{alert.input}</Typography>
              </Alert>
            ))}
          </Stack>
        ) : (
          <Typography>No Alerts</Typography>
        )}
      </Alert>
    );
}