import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Head from "./components/Head";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./styles/index.css";
const { Header, Footer, Content } = Layout;
const App: React.FC = () => {
  const [state, setState] = useState("");
  const updateAction = (updated:any) => {
    setState(updated);
  };
  return (
    <Layout>
      <Header className="header">
         
        <Head updateAction={updateAction} />
      </Header>
      <Content>
        <Dashboard data={state} updateAction={updateAction} />
      </Content>
      <Footer className="footer"></Footer>
    </Layout>
  );
};

export default App;
