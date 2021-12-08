import {customerInterfaceColumns} from "../../lib/flightData";
import React, {useState} from "react";
import {Button, Card, DatePicker, Divider, Input, Select, Table} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import {dateFormat} from "../../lib/dateFormat";

const {Option} = Select;

export default function PurchaseTicket() {
    // result body:
    // [{most match: city if city, airport if airport},
    // {cities if city, airports if airport}, ...,
    // {airports if city, cities if airport}, {}]

    const [deptAirport, setDeptAirport] = useState(undefined);
    const [arriAirport, setArriAirport] = useState(undefined);
    const [deptDate, setDeptDate] = useState(""); //today
    const [searchResult, setSearchResult] = useState([]);
    const [flightsResult, setFlightResult] = useState(null);
    const [flightID, setFlightID] = useState(undefined);

    //for testing ONLY
    // const test = () => {setSearchResult(["Shanghai", "Shangrao", "Bashang", "SHA", "PVG", "SQD", "ZQZ"])};

    const options = searchResult.map(item => <Option key={item}>{item}</Option>);


    const handleExactSearch = () => {
        setFlightResult("testing");
    }


    return (
        <Card title="Start planning your journey, Username!">

            <p>Use exact searching:</p>
            <Input
                addonBefore="Flight Number"
                placeholder="Airline Code + Digits"
                value={flightID}
                allowClear
                maxLength={6}
                style={{width: '50vw'}}
            />
            <b style={{padding: 10}}> </b>
            <Button type={"primary"} onClick={handleExactSearch}>Exact Searching</Button>

            <Divider />
            {flightsResult ? <Table columns={customerInterfaceColumns} dataSource={flightsResult} /> : null}
        </Card>
    )
}