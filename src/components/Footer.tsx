import React, { useMemo } from "react";
import { Layout } from "antd";
import "../styles/index.css";

const Footer = () => {
  return useMemo(() => <Layout.Footer className="footer" />, []);
};
export default Footer;
