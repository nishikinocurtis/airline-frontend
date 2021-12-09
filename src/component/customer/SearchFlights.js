import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table, Modal, Form, message} from 'antd';
import React, {useState} from "react";
import {SwapOutlined} from "@ant-design/icons";
import {statusColor} from "../../lib/statusTag";
import {dateFormat} from "../../lib/dateFormat";
import {customerInterfaceColumns} from "../../lib/flightData";
import {searchFlights, searchAirport, createOrder} from "../../lib/requests";
import moment from "moment";

const {Search} = Input;
const {Option} = Select;




export default function SearchFlights(props) {
    // result body:
    // [{most match: city if city, airport if airport},
    // {cities if city, airports if airport}, ...,
    // {airports if city, cities if airport}, {}]


    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(moment()); //today
    const [searchResult, setSearchResult] = useState([]);
    const [secondSearchResult, setSecondSearchResult] = useState([]);
    const [flightsResult, setFlightResult] = useState(null);
    const [tableLoading, setTableLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [target, setTarget] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleClick = (value) => () => {
        setTarget(value);
        setIsModalVisible(true);
    }

    const handleFinish = (values) => {
        createOrder(values.email, values.flightNum, values.airlineName, values.agentId).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
        }).then((response) => {
            if (response.indexOf("Error") > -1) {
                message.error("Creating order failed" + response);
            } else {
                message.success("Created Successfully");
                setIsModalVisible(false);
                setConfirmLoading(false);
            }
        })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const innerCustomerInterfaceColumns = [
        {
            title: "Flight No.",
            dataIndex: "flightNum",
            key: "flight"
        },
        {
            title: "Airplane",
            dataIndex: "airplaneId",
            key: "airplane"
        },
        {
            title: "Dept. Airport",
            dataIndex: "departurePort",
            key: "dept"
        },
        {
            title: "Arri. Airport",
            dataIndex: "arrivalPort",
            key: "arri"
        },
        {
            title: "Dept. Time",
            dataIndex: "departureTime",
            key: "dept_time"
        },
        {
            title: "Arri. Time",
            dataIndex: "arrivalTime",
            key: "arri_time"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: tags => (
                <>
                    {
                        <Tag color={statusColor[tags]} key={tags}>
                            {tags.toUpperCase()}
                        </Tag>
                    }
                </>
            )
        },
        {
            title: "Action",
            key: 'action',
            render: (text, record) => (
                <Space size={"middle"}>
                    <Button onClick={handleClick(record.flightNum)} disabled={record.status==("finished"||"onBoarding")}>Book {record.flightNum}</Button>
                </Space>
            )
        }
    ];

    //for testing ONLY
    // const test = () => {setSearchResult(["Shanghai", "Shangrao", "Bashang", "SHA", "PVG", "SQD", "ZQZ"])};

    const options = searchResult.map(item => <Option key={item}>{item}</Option>);
    const secondOptions = secondSearchResult.map(item => <Option key={item}>{item}</Option>)

    let timeout, currentValue;

    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const fake = () => {
            searchAirport(value).then((response) => {
                if (response.status == '200') {
                    return response.data;
                }
                return [];
            }).then((result) => {
                if (currentValue === value) {
                    const data = [];
                    result.map((airport) => {
                        data.push(airport.name);
                    })
                    callback(data);
                }
            }).catch(err => {console.log(err)});
        }

        timeout = setTimeout(fake, 300);
    }


    const handleSearch = (callback) => (value) => {
        if (value) {
            fetch(value, callback);
        } else {
            callback([]);
        }
    }
    const handleChange = (callBack) => (value) => {
        callBack(value);
    }

    const swapDeptArri = () => {
        let tmp = deptAirport;
        setDeptAirport(arriAirport);
        setArriAirport(tmp);
        tmp = searchResult;
        setSearchResult(secondSearchResult);
        setSecondSearchResult(tmp);
    }

    const handleSearchFlights = () => {
        // search flights
        setTableLoading(true);
        const datsString = deptDate.format(dateFormat);
        console.log(datsString);
        searchFlights(deptAirport, arriAirport,
             datsString + " 00:00:00", datsString + " 23:59:59").then((response) => {
                 if (response.status == '200') {
                     return response.data;
                 }
                 return [];
        }).then((response) => {
            let counter = 1;
            console.log(response);
            let tableData = response.map((flight) => {
                flight['key'] = counter.toString();
                counter += 1;
                return flight;
            })
            setFlightResult(tableData);
            setTableLoading(false);
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Card title={"Start planning your journey, " + props.username + "!"}>
                <Input.Group>
                    <b>From:</b>
                    <Select
                        showSearch
                        addonBefore="From"
                        style={{width: 300, padding: 10}}
                        placeholder={"Departure Airport"}
                        value={deptAirport}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch(setSearchResult)}
                        onChange={handleChange(setDeptAirport)}
                        notFoundContent={null}
                    >
                        {options}
                    </Select>
                    <Button shape="circle" icon={<SwapOutlined />} onClick={swapDeptArri} />
                    <b style={{paddingLeft: 10}}>To:</b>
                    <Select
                        showSearch
                        addonBefore="To"
                        style={{width: 300, padding: 10}}
                        placeholder={"Arrival Airport"}
                        value={arriAirport}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch(setSecondSearchResult)}
                        onChange={handleChange(setArriAirport)}
                        notFoundContent={null}
                    >
                        {secondOptions}
                    </Select>
                    <DatePicker defaultValue = {moment()} format={dateFormat} onChange={handleChange(setDeptDate)} style={{width:200}} />
                    <span style={{padding: 10}}> </span>
                    <Button type="primary" onClick={handleSearchFlights}>Search</Button>
                </Input.Group>
                <Divider />
                {flightsResult ? <Table loading={tableLoading} columns={innerCustomerInterfaceColumns} dataSource={flightsResult} /> : null}
            </Card>
            <Modal
                title={"Book " + target}
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                footer={null}
            >
                <Form
                    name="create-order"
                    className="create-order"
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name="flightNum"
                        initialValue={target}
                        rules={[{required: true, message: "Please input Flight No."}]}>
                        <Input placeholder="Flight No." />
                    </Form.Item>
                    <Form.Item
                        name="airlineName"
                        rules={[{required: true, message: "Please input Airline Name"}]}>
                        <Input placeholder="Airline Name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: "Please input E-mail"}]}>
                        <Input placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        name="agentId"
                    >
                        <Input placeholder="bookingAgentId(Required for Booking Agents)" />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleCancel} className="login-cancel-button">Cancel</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}