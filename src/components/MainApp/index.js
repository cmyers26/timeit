import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CalculatorApp from '../SplitCalculator';
import StopWatch from '../StopWatch';

const MainApp = () => {
    const [appSelection, setAppSelection] = useState("stop-watch");
    
    return (
        <div style={{ padding: '20px 10px' }}>
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
