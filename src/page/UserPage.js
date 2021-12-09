import React, {useEffect, useState} from "react"
import {Layout, Menu, Breadcrumb} from "antd";
import {CarryOutOutlined, SendOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CustomerSidebar from "../component/customer/CustomerSidebar";
import ViewFlights from "../component/customer/ViewFlights";
import SearchFlights from "../component/customer/SearchFlights";
import PurchaseTicket from "../component/customer/PurchaseTicket";
import SpendingChart from "../component/customer/SpendingChart";
import AgentSidebar from "../component/agent/AgentSidebar";
import TopCustomerChart from "../component/agent/TopCustomerChart";
import CustomerOrders from "../component/agent/CustomerOrders";
import CommissionStatistics from "../component/agent/CommissionStatistics";
import StaffSidebar from "../component/staff/StaffSidebar";
import EditAirport from "../component/staff/EditAirport";
import StaffViewFlights from "../component/staff/StaffViewFlights";
import CreateFlight from "../component/staff/CreateFlight";
import FlipStatus from "../component/staff/FlipStatus";
import CreateAirplane from "../component/staff/CreateAirplane";
import TopAgentChart from "../component/staff/TopAgentChart";
import FrequentCustomer from "../component/staff/FrequentCustomer";
import TopDestination from "../component/staff/TopDestination";
import RevenueComparison from "../component/staff/RevenueComparison";
import SalesReport from "../component/staff/SalesReport";
import AddBookingAgent from "../component/staff/AddBookingAgent";
import PermissionManagement from "../component/staff/PermissionManagement";

const {Header, Content, Sider, Footer} = Layout;
const {SubMenu} = Menu;

export default function UserPage({initializingTab, username, permissions}) {
    let navigate = useNavigate();

    const [navigateBar, setNavigateBar] = useState("customer");
    const [sidebar, setSidebar] = useState("");

    const handleNavigateBar = (page) => {
        setNavigateBar(page.key);
        navigate("/" + page.key, {replace: true});
    }

    const sidebarList = {
        customer: <CustomerSidebar updateSelection={setSidebar}/>,
        agent: <AgentSidebar updateSelection={setSidebar}/>,
        staff: <StaffSidebar updateSelection={setSidebar} username={username} permissons={permissions}/>,
    }

    const userContent = {
        "My flights": <ViewFlights username={username}/>,
        "Search flights": <SearchFlights username={username}/>,
        "Purchase tickets": <PurchaseTicket username={username}/>,
        "Track spending": <SpendingChart username={username}/>,
        "Top customers": <TopCustomerChart username={username}/>,
        "Create order": <PurchaseTicket />,
        "My customer orders": <CustomerOrders username={username}/>,
        "Commission statistics": <CommissionStatistics username={username}/>,
        "Add airport": <EditAirport username={username}/>,
        "View flights": <StaffViewFlights username={username}/>,
        "Create flight": <CreateFlight username={username}/>,
        "Change flight status": <FlipStatus username={username}/>,
        "Add airplane": <CreateAirplane username={username}/>,
        "Top agents": <TopAgentChart username={username}/>,
        "Frequent customers": <FrequentCustomer username={username}/>,
        "Top destinations": <TopDestination username={username}/>,
        "Revenue comparison": <RevenueComparison username={username}/>,
        "Sale report": <SalesReport username={username}/>,
        "Add booking agent": <AddBookingAgent username={username}/>,
        "Grant permission": <PermissionManagement username={username}/>
    }

    useEffect(() => {
        setNavigateBar(initializingTab)
    }, [])

    return (
        <Layout>
            <Header className={"header"} style={{position: 'fixed', zIndex: 2, width: '100%'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[initializingTab]}
                    selectedKeys={[navigateBar]}
                    onClick={handleNavigateBar}
                >
                    <Menu.Item key="customer">Customer</Menu.Item>
                    <Menu.Item key="agent">Agent</Menu.Item>
                    <Menu.Item key="staff">Staff</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{minHeight: '85vh', marginTop: 64}}>
                <Sider width={250} className="site-layout-background">
                    {sidebarList[navigateBar]}
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{navigateBar.charAt(0).toUpperCase() + navigateBar.slice(1)}</Breadcrumb.Item>
                        <Breadcrumb.Item>{sidebar}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{padding: 24, margin: 0}}
                    >
                        {userContent[sidebar]}
                    </Content>
                </Layout>
            </Layout>
            <Layout style={{textAlign: 'center', marginBottom: 0}}>
                <Footer>
                    2021 Global Airline All rights reserved.
                </Footer>
            </Layout>

        </Layout>
    )
}