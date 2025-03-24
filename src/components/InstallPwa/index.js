import React, { useState, useEffect } from "react";
import { Button, Snackbar } from "@mui/material";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // Show install prompt button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt).prompt(); // Show native install prompt
      (deferredPrompt).userChoice.then(() => setShowPrompt(false));
    }
  };

  return (
    <>
      {showPrompt && (
        <Snackbar
          open={showPrompt}
          message="Install this app for quick access"
          action={
            <Button color="primary" variant="contained" onClick={handleInstallClick}>
              Install
            </Button>
          }
          onClose={() => setShowPrompt(false)}
        />
      )}
    </>
  );
};

export default InstallPWA;
