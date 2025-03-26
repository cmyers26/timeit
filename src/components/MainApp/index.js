import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, Typography, FormControl } from '@mui/material';
import CalculatorApp from '../SplitCalculator';
import StopWatch from '../StopWatch';

const MainApp = () => {
    const [appSelection, setAppSelection] = useState("stop-watch");
    
    return (
        <div style={{ padding: '10px 10px' }}>
            <div style={{ padding: '10px 10px 20px 10px', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1
                    style={{fontSize: "18px", textAlign: "center", margin: "5px 0"}}
                >Best Stopwatch for Runners and Coaches</h1>
                <h2
                    style={{fontSize: "12px", textAlign: "center", margin: "5px 0"}}
                >Track Race Times and Lap Splits with Ease</h2>
                <Typography 
                    variant="body2"
                    style={{fontSize: "11px", textAlign: "center", margin: "5px 0"}}    
                >Our stopwatch app helps runners and coaches track lap splits, total race times, and relay exchanges with ease.</Typography>
            </div>
            <FormControl fullWidth size="small" style={{ marginBottom: '10px' }}>
                <InputLabel>Select One</InputLabel>
                <Select
                    value={appSelection}
                    onChange={(e) => setAppSelection(e.target.value)}
                    label="Timing Needs"
                >
                    <MenuItem value={"split-calculator"}>Split Calculator</MenuItem>
                    <MenuItem value={"stop-watch"}>Stop Watch</MenuItem>
                </Select>
            </FormControl>
            {appSelection === "stop-watch" ? (
                <StopWatch />
            ) : (
                <CalculatorApp />
            )}
        </div>
    );
};

export default MainApp;
