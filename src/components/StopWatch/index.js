import React, { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, TextField, Paper, IconButton, useMediaQuery, Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [timerStopped, setTimerStopped] = useState(true);
  const [running, setRunning] = useState(false);
  const [runners, setRunners] = useState([]);
  const [newRunnerName, setNewRunnerName] = useState("");
  const [singleRunnerSplits, setSingleRunnerSplits] = useState([]);
  const [lastSplitTime, setLastSplitTime] = useState(0);
  const [raceName, setRaceName] = useState("");
  const [isRelayRace, setIsRelayRace] = useState(false);

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
    setRunners((prevRunners) => {
      const updatedRunners = prevRunners.map((runner) =>
        runner.id === runnerId && !runner.stopped
          ? { ...runner, stopped: true, totalTime: time}
          : runner
      );

      const allRunnersStopped = updatedRunners.every((element) => element.stopped);

      if (allRunnersStopped) {
        setRunning(false);
      }

      // Automatically start next runner's time if it's a relay race
      if (isRelayRace) {
        const nextRunnerIndex = prevRunners.findIndex((runner) => runner.id === runnerId) + 1;
        if (nextRunnerIndex < updatedRunners.length) {
          const nextRunner = updatedRunners[nextRunnerIndex];
          nextRunner.lastSplitTime = time;
          setRunning(true); // Start the next runner's timer
        }
      }

      return updatedRunners;
    });
  };

  const deleteRunner = (runnerId) => {
    setRunners((prevRunners) => prevRunners.filter((runner) => runner.id !== runnerId));
  };

  const addSingleRunnerLap = () => {
    const lapTime = time - lastSplitTime;
    setSingleRunnerSplits([...singleRunnerSplits, lapTime]);
    setLastSplitTime(time);
  };

  const resetStopwatch = () => {
    setTime(0);
    setRunning(false);
    setRunners([]);
    setSingleRunnerSplits([]);
    setLastSplitTime(0);
    setRaceName("");
  };

  const downloadResults = () => {
    if (runners.length === 0) return;

    let fileContent = `Race: ${raceName || "Untitled Race"}\n\n`;

    runners.forEach((runner) => {
      fileContent += `Runner: ${runner.name}\n`;
      runner.splits.forEach((split, index) => {
        fileContent += `Lap ${index + 1}: ${formatTime(split)}\n`;
      });
      if (runner.totalTime !== undefined) {
        fileContent += `Total Time: ${formatTime(runner.totalTime)}\n`;
      }
      fileContent += `\n`;
    });

    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `race_results.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 1, px: isMobile ? 1 : 2 }}>
      <Box sx={{ mt: 2, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, alignItems: "center" }}>
        <TextField
          label="Race Name"
          variant="outlined"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          size="small"
          sx={{ mb: 2, width: "100%" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <FormControlLabel
          control={<Checkbox checked={isRelayRace} onChange={(e) => setIsRelayRace(e.target.checked)} />}
          label="Relay Race?"
        />
      </Box>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
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

      <Box sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
        <Typography variant={isMobile ? "h3" : "h2"}>{formatTime(time)}</Typography>
      </Box>

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
        {runners.length === 0 && running && (
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={addSingleRunnerLap}
            sx={{ flex: isMobile ? 1 : "unset", minWidth: "120px" }}
          >
            Lap
          </Button>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={downloadResults}>
          Download Results
        </Button>
      </Box>

      <Box sx={{ mt: 2 }} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {runners.map((runner, index) => (
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
                disabled={!running || runner.stopped || (isRelayRace && index > 0 && !runners[index - 1].stopped)}
                sx={{ flex: 1, mr: 1 }}
              >
                Split
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => stopRunnerTimer(runner.id)}
                disabled={!running || runner.stopped || (isRelayRace && index > 0 && !runners[index - 1].stopped)}
                sx={{ flex: 1 }}
              >
                Stop
              </Button>
            </Box>
            <List sx={{ mt: 1 }}>
              {runner.splits.map((split, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">
                    Lap {index + 1}: {formatTime(split)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            {runner.totalTime !== undefined && (
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Total Time: {formatTime(runner.totalTime)}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>

        {runners <= 1 && (
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 2, flexWrap: "wrap", flexDirection: "column" }}>
            <List sx={{ mt: 1, textAlign: "center"}}>
                {singleRunnerSplits.map((split, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1">
                      Lap {index + 1}: {formatTime(split)}
                    </Typography>
                  </ListItem>
                ))}
            </List>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Total Time: {formatTime(time)}
            </Typography>
          </Box>
        )}
    </Box>
  );
};

export default Stopwatch;
