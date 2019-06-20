import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Head from "./components/Head";
import { Layout, Alert } from "antd";
import "antd/dist/antd.css";
import "./styles/index.css";
const { Header, Footer, Content } = Layout;
const App: React.FC = () => {
  const [state, setState] = useState("");
  const [message, setMessage] = useState<string>("");
  const updateAction = (updated: any,message:string) => {
    setState(updated);
    setMessage(message);
    setTimeout(() => setMessage(""), 3000);
  };
  return (
    <Layout>
      <Header className="header">
        <Head updateAction={updateAction} />
      </Header>
      <Content>
        {message ? <Alert message={message} type="success" showIcon /> : null}
        <Dashboard data={state} updateAction={updateAction} />
      </Content>

      <Footer className="footer" />
    </Layout>
  );
};

export default App;
