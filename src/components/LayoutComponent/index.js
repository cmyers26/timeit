import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";

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
            variant="h6"
            noWrap
          >
            Split It! Track and Cross Country Time Split Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" style={{marginBottom: "100px"}}>
        <Toolbar />
          <div style={{
            margin: "20px",
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
            margin: "0 20px",
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
