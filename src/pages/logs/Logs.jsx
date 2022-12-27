import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { Header } from "../../components";

const rows = [
  {
    date: "01/01/23",
    time: "02:24:11",
    device_name: "XYZ",
    group: "First",
    input: "Problem 1",
    downTime: "00:05:12",
  },
  {
    date: "01/01/23",
    time: "02:24:11",
    device_name: "XYZ",
    group: "First",
    input: "Problem 1",
    downTime: "00:05:12",
  },
  {
    date: "01/01/23",
    time: "02:24:11",
    device_name: "XYZ",
    group: "First",
    input: "Problem 1",
    downTime: "00:05:12",
  },
  {
    date: "01/01/23",
    time: "02:24:11",
    device_name: "XYZ",
    group: "First",
    input: "Problem 1",
    downTime: "00:05:12",
  },
  {
    date: "01/01/23",
    time: "02:24:11",
    device_name: "XYZ",
    group: "First",
    input: "Problem 1",
    downTime: "00:05:12",
  },
];

export function Logs() {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Header />
      <Box m={2}>
        <TableContainer
          sx={{
            mx: "auto",
            border: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Table sx={{}} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Input</TableCell>
                <TableCell>Down Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{}} hover>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.device_name}</TableCell>
                  <TableCell>{row.group}</TableCell>
                  <TableCell>{row.input}</TableCell>
                  <TableCell>{row.downTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
