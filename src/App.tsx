import React, { useReducer } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { reducer } from "./reducer/";
import { initialContent, AppContext } from "./context/";
import { Layout, Alert } from "antd";
import "antd/dist/antd.css";
import "./styles/index.css";
const { Footer, Content } = Layout;

const App: React.FC = () => {
  const [content, dispatch] = useReducer(reducer, initialContent);
  return (
    <Layout>
      <AppContext.Provider value={{ content, dispatch }}>
        <Header />
        <Content className="content">
          {content.message && content.message !== "isSearch" ? (
            <Alert
              message={content.message}
              type="success"
              showIcon
              className="alert"
            />
          ) : null}
          <Dashboard data={content} />
        </Content>
      </AppContext.Provider>

      <Footer className="footer" />
    </Layout>
  );
};
export default App;
