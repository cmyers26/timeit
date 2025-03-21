import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const Layout = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ backgroundColor: "#aa2e25"}}>
        <Toolbar
          style={{ diplay: "flex", justifyContent: "center", flexDirection: "column" }}
        >
          <Typography
            variant={width < 768 ? "p" : "h6"}
            style={{
              display: "flex",
              height: "auto",
              padding: "15px 0",
              ...(width < 768 ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : { flexDirection: "row", alignItems: "center", textAlign: "center" }),
            }}
          >
            <span style={{ display: "flex"}}>
              SPLIT IT! <TimerOutlinedIcon style={{
                ...(width < 768 ? { margin: "0 5px" } : { margin: "3px 5px" }),
              }} />
            </span>
            Track and Cross Country Time Split Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" style={{marginBottom: "100px", marginTop: "40px"}}>
        <Toolbar />
          <div style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid lightgrey",
            padding: "5px",
            backgroundColor: "lightgrey",
          }}>
            <p>Add Space Top</p>
          </div>
          <div style={{
            height: "100vh",
            margin: "0 10px",
            ...(width < 768 ? { display: "flex", flexDirection: "column", } : { display: "grid", gridTemplateColumns: "150px 1fr 150px", gridTemplateRows: "auto", gap: "10px",}),
          }}>
            <div style={{
              border: "1px solid lightgrey",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "lightgrey",
            }}>
              <p>Add Space</p>
            </div>
            <div>
              {children}
            </div>
            <div style={{
              border: "1px solid lightgrey",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "lightgrey",
            }}>
              <p>Add Space</p>
            </div>
          </div>
      </Box>
    </Box>
  );
};

export default Layout;
