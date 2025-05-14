import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import PermissionManagement from "./components/PermissionManagement";

const App: React.FC = () => {
	return (
		<Layout>
			<Header style={{ color: "#fff", textAlign: "center" }}>
				项目权限管理系统
			</Header>
			<Content style={{ height: "calc(100vh - 152px)" }}>
				<div>
					<PermissionManagement />
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>项目权限管理系统@2025</Footer>
		</Layout>
	);
};
export default App;
