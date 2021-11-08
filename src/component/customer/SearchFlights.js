import {Input, Space, DatePicker, Select, Card, Button, Divider, Tag, Table} from 'antd';
import React, {useState} from "react";
import {SwapOutlined} from "@ant-design/icons";
import {statusColor} from "../../lib/statusTag";
import {dateFormat} from "../../lib/dateFormat";
import {customerInterfaceColumns} from "../../lib/flightData";

const {Search} = Input;
const {Option} = Select;

export function FlightsResultTable(data) {
    const columns = customerInterfaceColumns;

    // for testing ONLY
    const testData = [
        {
            key: '1',
            ticket_id: "TK2021110600001",
            flight_id: "MU682",
            dept: "PVG",
            arri: "JFK",
            dept_time: "2021-11-06 08:00",
            arri_time: "2021-11-06 21:00",
            price: 1299.70,
            status: ['upcoming']
        },
        {
            key: '1',
            ticket_id: "TK2021110400001",
            flight_id: "MU681",
            dept: "JFK",
            arri: "PVG",
            dept_time: "2021-11-04 08:00",
            arri_time: "2021-11-04 21:00",
            price: 1318.50,
            status: ['finished']
        }
    ]

    return (
        <Table columns={columns} dataSource={testData} size="middle"/>
    )
}

export default function SearchFlights() {
    // result body:
    // [{most match: city if city, airport if airport},
    // {cities if city, airports if airport}, ...,
    // {airports if city, cities if airport}, {}]

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today
    const [searchResult, setSearchResult] = useState([]);
    const [flightsResult, setFlightResult] = useState(null);

    //for testing ONLY
    const test = () => {setSearchResult(["Shanghai", "Shangrao", "Bashang", "SHA", "PVG", "SQD", "ZQZ"])};

    const options = searchResult.map(item => <Option key={item}>{item}</Option>);

    const handleSearch = (value) => {
        if (value) {
            setTimeout(test, 500);
        } else {
            setSearchResult([]);
        }
    }
    const handleChange = (callBack) => (value) => {
        callBack(value);
    }

    const swapDeptArri = () => {
        let tmp = deptAirport;
        setDeptAirport(arriAirport);
        setArriAirport(tmp);
    }

    const handleSearchFlights = () => {
        // search flights
        setFlightResult("testing")
    }

    return (
        <Card title="Start planning your journey, Username!">
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
                    onSearch={handleSearch}
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
                    onSearch={handleSearch}
                    onChange={handleChange(setArriAirport)}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                <DatePicker format={dateFormat} onChange={handleChange(setDeptDate)} style={{width:200}} />
                <span style={{padding: 10}}> </span>
                <Button type="primary" onClick={handleSearchFlights}>Search</Button>
            </Input.Group>
            <Divider />
            {flightsResult ? <FlightsResultTable data={flightsResult} /> : null}
        </Card>
    )
}