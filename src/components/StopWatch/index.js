import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, List, ListItem, Paper, useMediaQuery } from "@mui/material";

const Stopwatch = ({runner, startAllWatches, setStartAllWatches, addSplit}) => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [splitTimes , setSplitTimes] = useState([])
    const [lastSplitTime, setLastSplitTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    const startTimer = (id) => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    };

    const stopTimer = (id) => {
        setIsRunning(false);
        if (splitTimes.length > 0) {
            takeSplit();
            const lapTime = elapsedTime - lastSplitTime;
            addSplit(id, splitTimes, lapTime, elapsedTime)
        }
    };

    const resetTimer = () => {
        setElapsedTime(0);
        setIsRunning(false);
        setSplitTimes([]);
        setLastSplitTime(0);
        setStartAllWatches(false);
    };

    const takeSplit = (id) => {
        const lapTime = elapsedTime - lastSplitTime;
        setSplitTimes([...splitTimes, lapTime]);
        setLastSplitTime(elapsedTime);
        addSplit(id, splitTimes, lapTime, elapsedTime)
    };

    const formatRunningTime = () => {
        // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        // hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}.${milliseconds}`;
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

    useEffect(() => {
        if (startAllWatches) {
            startTimer();
        } else {
            stopTimer();
        }

        return () => {}

    }, [startAllWatches]);

    return (
        <Box sx={{ textAlign: "center", mt: 1}}>
            <Paper sx={{ p: 2, borderRadius: 2, width: "100%", height: "auto"}} style={{ margin: "5px 0" }}>
                {runner.name && (
                    <Box sx={{ 
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px"
                    }}>
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>
                            {runner.name}
                        </Typography>
                    </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                        variant="contained"
                        size="large"
                        color={!isRunning ? "success" : "error"}
                        onClick={!isRunning ? () => startTimer(runner.id) : () => stopTimer(runner.id)}
                        sx={{ width: "100px" }}
                    >
                        {!isRunning ? "Start" : "Stop"}
                    </Button>
                    <Typography variant={"h5"}>{formatRunningTime()}</Typography>
                    <Button
                        variant="outlined"
                        color={!isRunning ? "error" : "primary"}
                        size="large"
                        onClick={!isRunning ? resetTimer : () => takeSplit(runner.id)}
                        sx={{ width: "100px"}}
                    >
                        {!isRunning ? "Reset" : "Lap"}
                    </Button>
                </Box>
                {splitTimes.length > 0 && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderTop: "1px solid grey" }}>
                        <List 
                            style={{ 
                                display: "flex",
                                textAlign: "center",
                                flexWrap: "wrap",
                                gap: "3px",
                                paddingBottom: "0px"
                            }}
                        >
                            {splitTimes.map((split, index) => (
                                <ListItem
                                    key={index}
                                    style={{
                                        padding: "5px",
                                        width: "auto"
                                    }}
                                >
                                    <Typography variant="body2">
                                        <span style={{ fontWeight: "bold" }}>Lap {index + 1}: </span>{formatTime(split)}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Stopwatch;