import React from "react";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          style={{ diplay: "flex", justifyContent: "center" }}
        >
          <Typography
            variant="h6"
            noWrap
          >
            Track and Cross Country Time Split Calculator
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
          }}>
            <p>Add Space Top</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr 150px",
            gridTemplateRows: "auto",
            gap: "10px",
            height: "100vh",
            margin: "0 20px",
          }}>
            <div style={{
              border: "1px solid lightgrey",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
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
            }}>
              <p>Add Space</p>
            </div>
          </div>
      </Box>
    </Box>
  );
};

export default Layout;
