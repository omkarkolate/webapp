import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useEffect } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { Header } from "../../components";
import axios from "axios";
import { useState } from "react";

export function Logs() {
  const [rows, setRows] = useState([]);
  const date = new Date();
  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = await axios.get("/log");
        setRows(response.data.logs);
      } catch (error) {
        
      }
      
    }
    getLogs();
  }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Header active="Logs" />
      <Box m={2}>
        <TableContainer
          sx={{
            mx: "auto",
            border: 1,
            borderColor: "#e0e0e0",
            maxHeight: "82vh"
          }}
        >
          <Table sx={{}} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Down Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.logId} hover>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.groupName}</TableCell>
                  <TableCell>{row.deviceName}</TableCell>
                  <TableCell>{row.status}</TableCell>
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
