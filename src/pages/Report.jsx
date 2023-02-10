import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useEffect } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Header } from "../components";
import axios from "axios";
import { useState } from "react";
import { CSVLink } from "react-csv";

const getYyyyMmDd = (date) => {
  return date.toLocaleDateString("en-IN", {year: 'numeric', month: '2-digit', day: '2-digit'})
            .split("/")
            .reverse()
            .join("-")
}

const headers = ["Index","Date", "Time", "Shift", "Group", "Device", "Input", "Status", "Down Time"];

export function Report() {
  const [rows, setRows] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const getReport = async () => {
    try {
      const response = await axios.post('/report', {fromDate, toDate});
      setRows(response.data.logs);
    } catch (error) {
      console.log(error);
    }
  }

  const data = rows.map((row, index) => (
    {
      Index: index,
      Date: new Date(row.date).toLocaleDateString(),
      Time: new Date(row.date).toLocaleTimeString("en"),
      Shift: row.shift,
      Group: row.groupName,
      Device: row.deviceName,
      Input: row.input,
      Status: row.status,
      'Down Time': row.downTime,
    }
  ));

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Header active="Report" />
      <Stack direction="row" m={2} spacing={2}>
        <TextField
          label="From date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextField
          label="To date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={fromDate === "" || toDate === ""}
          onClick={getReport}
        >
          Generate Report
        </Button>
        <Button
          variant="contained"
          color="info"
          disabled={rows.length < 1}
        >
          <CSVLink
            data={data}
            headers={headers}
            filename={Date.now()}
            style={{ textDecoration: "none", color: 'white' }}
          >
            Download Report
          </CSVLink>
        </Button>
      </Stack>
      <Box m={2}>
        <TableContainer
          sx={{
            mx: "auto",
            border: 1,
            borderColor: "#e0e0e0",
            maxHeight: "75vh",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Input</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Down Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.logId}
                  hover
                  sx={{
                    bgcolor: row.status === "Problem" ? "#f7b0b0" : "#d4f6d4",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(row.date).toLocaleTimeString("en")}
                  </TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.groupName}</TableCell>
                  <TableCell>{row.deviceName}</TableCell>
                  <TableCell>{row.input}</TableCell>
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
