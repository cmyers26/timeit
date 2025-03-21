import React, { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, TextField, Paper, IconButton, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [runners, setRunners] = useState([]);
  const [newRunnerName, setNewRunnerName] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const addRunner = () => {
    if (newRunnerName.trim() === "") return;
    setRunners([...runners, { id: Date.now(), name: newRunnerName, splits: [], lastSplitTime: 0, stopped: false }]);
    setNewRunnerName("");
  };

  const addSplit = (runnerId) => {
    setRunners((prevRunners) =>
      prevRunners.map((runner) => {
        if (runner.id === runnerId && !runner.stopped) {
          const lapTime = time - runner.lastSplitTime;
          return {
            ...runner,
            splits: [...runner.splits, lapTime],
            lastSplitTime: time,
          };
        }
        return runner;
      })
    );
  };

  const stopRunnerTimer = (runnerId) => {
    setRunners((prevRunners) =>
      prevRunners.map((runner) =>
        runner.id === runnerId && !runner.stopped
          ? { ...runner, stopped: true, totalTime: time }
          : runner
      )
    );
  };

  const deleteRunner = (runnerId) => {
    setRunners((prevRunners) => prevRunners.filter((runner) => runner.id !== runnerId));
  };

  const resetStopwatch = () => {
    setTime(0);
    setRunning(false);
    setRunners([]);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 1, px: isMobile ? 1 : 2 }}>
      {/* Timer Display */}
      <Typography variant={isMobile ? "h4" : "h3"}>{formatTime(time)}</Typography>

      {/* Controls */}
      <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={() => setRunning(!running)}
          sx={{ flex: isMobile ? 1 : "unset", minWidth: "120px" }}
        >
          {running ? "Stop" : "Start"}
        </Button>
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={resetStopwatch}
          sx={{ flex: isMobile ? 1 : "unset", minWidth: "120px" }}
        >
          Reset
        </Button>
      </Box>

      {/* Add Runner */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, alignItems: "center" }}>
        <TextField
          label="Runner Name"
          variant="outlined"
          value={newRunnerName}
          onChange={(e) => setNewRunnerName(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={addRunner}
          sx={{ minWidth: "120px" }}
        >
          Add Runner
        </Button>
      </Box>

      {/* Runners & Splits */}
      <Box 
        sx={{ mt: 2 }}
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
        }}
      >
        {runners.map((runner) => (
          <Paper key={runner.id} sx={{ p: 1, borderRadius: 2, width: "155px", height: "auto", mx: "auto" }} style={{ margin: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1">{runner.name}</Typography>
              <IconButton onClick={() => deleteRunner(runner.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => addSplit(runner.id)}
                disabled={!running || runner.stopped}
                sx={{ flex: 1, mr: 1 }}
              >
                Split
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => stopRunnerTimer(runner.id)}
                disabled={runner.stopped}
                sx={{ flex: 1 }}
              >
                Stop
              </Button>
            </Box>
            <List 
                style={{
                    marginTop: "10px"
                }}
            >
              {runner.splits.map((split, index) => (
                <ListItem 
                    key={index}
                    style={{
                        padding: "5px 12px"
                    }}    
                >
                  <Typography variant="body1">
                    Lap {index + 1}: {formatTime(split)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            {runner.totalTime !== undefined && (
              <Typography
                variant="subtitle2"
                style={{
                    fontWeight: "bold",
                    margin: "0"
                }}
            >
                Total Time: {formatTime(runner.totalTime)}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Stopwatch;
