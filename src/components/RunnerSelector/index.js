import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, List, ListItem, Paper, useMediaQuery } from "@mui/material";

const RunnerSelector = ({handleAddRunnerClick, onNewRunnerName, newRunnerName}) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    
    return (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
            <TextField
                label={"Runner Name"}
                variant="outlined"
                value={newRunnerName}
                onChange={(e) => onNewRunnerName(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
            />
            <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleAddRunnerClick}
            >
                Add A Runner
            </Button>
        </Box>
    );
};

export default RunnerSelector;