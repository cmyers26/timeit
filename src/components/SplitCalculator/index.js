import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableRow, TableHead, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import raceDistances from "../../trackevents.json";

const CalculatorApp = () => {
    const [raceDistance, setRaceDistance] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [unit, setUnit] = useState('meters');
    const [splitDistances, setSplitDistances] = useState('');
    const [splits, setSplits] = useState([]);

    // Convert meters to miles
    const convertToMiles = (meters) => meters * 0.000621371;

    // Convert seconds to MM:SS format
    const formatTime = (totalSeconds) => {
        const min = Math.floor(totalSeconds / 60);
        const sec = Math.round(totalSeconds % 60);
        return min > 0 ? `${min}:${sec.toString().padStart(2, '0')}` : `${sec}s`;
    };

    // Reset form
    const resetForm = () => {
        setRaceDistance('');
        setMinutes('');
        setSeconds('');
        setUnit('meters');
        setSplitDistances('');
        setSplits([]);
    };

    // Calculate splits
    const calculateSplits = () => {
        if (!raceDistance || !minutes || !seconds || !splitDistances) return;

        const totalSeconds = parseFloat(minutes) * 60 + parseFloat(seconds); // Convert to total seconds

        let distanceInMeters = parseFloat(raceDistance);
        if (unit === 'miles') {
            distanceInMeters = convertToMiles(distanceInMeters);
        }

            const splitsArray = splitDistances.split(',').map((split) => {
            const splitDistance = parseFloat(split.trim());
            const splitTime = (splitDistance / distanceInMeters) * totalSeconds; // Time per split
            return { distance: splitDistance, time: formatTime(splitTime) };
        });

        setSplits(splitsArray);
    };

  const isDisabled = !raceDistance || !minutes || !seconds || !splitDistances;

  return (
    <div style={{ padding: '20px' }}>
      {/* Race Distance Dropdown */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Select a Race Distance</InputLabel>
        <Select
          value={raceDistance}
          onChange={(e) => setRaceDistance(e.target.value)}
          label="Race Distance"
        >
            {raceDistances.map(({ event, distance_meters }) => {
                return <MenuItem value={distance_meters}>{event}</MenuItem>
            })}
        </Select>
      </FormControl>

      {/* Time Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Seconds"
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          fullWidth
          required
        />
      </div>

      {/* Unit Dropdown */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Units</InputLabel>
        <Select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          label="Unit"
        >
          <MenuItem value="meters">Meters</MenuItem>
          <MenuItem value="miles">Miles</MenuItem>
          <MenuItem value="kilometers">Kilometers</MenuItem>
        </Select>
      </FormControl>

      {/* Split Distances Input */}
      <TextField
        label="Enter Split Distances (comma separated, Mile = 1609, etc)"
        value={splitDistances}
        onChange={(e) => setSplitDistances(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '20px' }}
      />

      {/* Calculate Button */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={calculateSplits} disabled={isDisabled}>
            Calculate
        </Button>
        <Button variant="contained" color="primary" onClick={resetForm} disabled={isDisabled}>
            Reset
        </Button>
      </div>

      {/* Splits Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Split Distance ({unit})</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {splits.map((split, index) => (
            <TableRow key={index}>
              <TableCell>{split.distance} {unit}</TableCell>
              <TableCell>{split.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CalculatorApp;
