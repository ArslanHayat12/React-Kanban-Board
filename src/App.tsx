import React, { useReducer, useMemo } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { reducer } from "./reducer/";
import { initialContent, AppContext } from "./context/";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./styles/index.css";

const App: React.FC = () => {
  const [content, dispatch] = useReducer(reducer, initialContent);
  return (
    <Layout>
      <AppContext.Provider value={{ content, dispatch }}>
        <Header />
        <Layout.Content >
          <Dashboard data={content} />
        </Layout.Content>
      </AppContext.Provider>
      <Footer />
    </Layout>
  );
};
export default App;
