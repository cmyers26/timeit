import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import StopWatch from '../StopWatch';

const StopWatchApp = () => {
    const [runners, setRunners] = useState([]);
    const [newRunnerName, setNewRunnerName] = useState("");
    const [startAllWatches, setStartAllWatches] = useState(null);

    const addRunner = () => {
        if (newRunnerName.trim() === "") return;
        setRunners([...runners, { id: Date.now(), name: newRunnerName, isRunning: false, splits: [], totalTime: 0, stopped: false }]);
        setNewRunnerName("");
    };

    const resetStopWatches = () => {
        setRunners([]);
        setNewRunnerName("");
        setStartAllWatches(false);
    };

    const addSplit = (runnerId, splitTimes, lapTime, elapsedTime) => {
        setRunners((prevRunners) =>
          prevRunners.map((runner) => {
            if (runner.id === runnerId) {
              return {
                ...runner,
                splits: [...splitTimes, lapTime],
                totalTime: elapsedTime,
              };
            }
            return runner;
          })
        );
    };

    const formatTime = (timeInMilliSeconds) => {
        // let hours = Math.floor(timeInMilliSeconds / (1000 * 60 * 60));
        let minutes = Math.floor(timeInMilliSeconds / (1000 * 60) % 60);
        let seconds = Math.floor(timeInMilliSeconds / (1000) % 60);
        let milliseconds = Math.floor(timeInMilliSeconds % 1000 / 10);

        // hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}.${milliseconds}`;
    };

    const downloadResults = () => {
        if (runners.length === 0) return;
    
        // let fileContent = `Race: ${raceName || "Untitled Race"}\n\n`;
        let fileContent = "";

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
        <div style={{ padding: '10px 10px' }}>
            <Box sx={{ 
                mt: 2,
                mb: 2,
                pb: 2,
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "center",
                gap: 2, 
                alignItems: "center", 
                borderBottom: "1px solid grey"
            }}>
                <TextField
                    label={"Runner Name"}
                    variant="outlined"
                    value={newRunnerName}
                    onChange={(e) => setNewRunnerName(e.target.value)}
                    size="small"
                />
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={addRunner}
                >
                    Add A Runner
                </Button>
            </Box>
            <Box sx={{ 
                mt: 2,
                mb: 2,
                pb: 2,
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2, 
                alignItems: "center", 
                borderBottom: "1px solid grey"
            }}>
                {runners.length > 1 && (
                    <>
                        <Button
                            variant="contained"
                            size="medium"
                            disabled={runners.length === 0}
                            color={"success"}
                            onClick={() => setStartAllWatches(true)}
                            style={{
                                width: "100%"
                            }}
                        >
                            START ALL
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            disabled={runners.length === 0}
                            color={"error"}
                            onClick={() => setStartAllWatches(false)}
                            style={{
                                width: "100%"
                            }}
                        >
                            STOP ALL
                        </Button>
                    </>
                )}
                <Button
                    variant="outlined"
                    size="medium"
                    color="error"
                    disabled={runners.length === 0}
                    onClick={resetStopWatches}
                    style={{
                        width: "100%"
                    }}
                >
                    {runners.length > 1 ? "RESET ALL" : "RESET TIMER"}
                </Button>
            </Box>
            {runners.length >= 0 && runners.map((runner, index) => (
                <StopWatch runner={runner} startAllWatches={startAllWatches} setStartAllWatches={setStartAllWatches} addSplit={addSplit} />
            ))}
            {runners.length >= 0 && (
                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" color="primary" onClick={downloadResults}>
                        Download Results
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default StopWatchApp;
