import React from 'react';
import Layout from "./components/LayoutComponent";
import MainApp from './components/MainApp';
import InstallPWA from './components/InstallPwa';

const App = () => {
  
  return (
    <>
      <InstallPWA />
      <Layout>
        <MainApp />
      </Layout>
    </>
  );
};

export default App;
