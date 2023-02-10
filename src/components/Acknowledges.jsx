import { Alert, AlertTitle, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export function Acknowledges({acks}) {
  return (
    <Alert severity="success" sx={{ height: "50vh", overflowY: "auto" }}>
      <AlertTitle>Acknowledges</AlertTitle>
      {acks.length > 0 ? (
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {acks.map((ack) => (
            <Alert
              key={ack.logId}
              severity="success"
              icon={false}
              variant="outlined"
              sx={{ mr: 1, mb: 1, textAlign: "center" }}
            >
              <Typography>{ack.groupName}</Typography>
              <Typography>{ack.deviceName}</Typography>
              <Typography>{ack.input}</Typography>
              <Typography sx={{ fontWeight: 700 }}>{ack.downTime}</Typography>
            </Alert>
          ))}
        </Stack>
      ) : (
        <Typography>No Acknowledges</Typography>
      )}
    </Alert>
  );
}
