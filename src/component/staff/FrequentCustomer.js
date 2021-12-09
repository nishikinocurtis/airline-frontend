import React, {useEffect, useState} from "react";
import {Card, Table, Tag, Space, DatePicker, Button, Modal, Pagination} from "antd";
import {
    getAirlineFlightsOfCustomer,
    viewAirlineCustomers,
} from "../../lib/requests";
import moment from "moment";
import {dateTimeFormat} from "../../lib/dateFormat";
import {agentInterfaceColumns, airlineInterfaceColumns} from "../../lib/flightData";

const {RangePicker} = DatePicker;


export default function FrequentCustomer(props) {
    const [customers, setCustomers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [target, setTarget] = useState("");
    const [flights, setFlights] = useState([]);


    const handleClick = (email) => () => {
        // open modal.
        setIsModalVisible(true);
        setTarget(email);
        getAirlineFlightsOfCustomer(email, props.username.split('@').slice(-1)[0]).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
            return [];
        }).then((response) => {
            setFlights(response);
        })
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const staffInterfaceColumns = [
        {
            title: "Email",
            dataIndex: "key",
            key: "email"
        },
        {
            title: "Tickets",
            dataIndex: "value",
            key: "num",
            sorter: (a, b) => a.num - b.num
        },
        {
            title: "Action",
            key: 'action',
            render: (text, record) => (
                <Space size={"middle"}>
                    <Button onClick={handleClick(record.key)}>Check User</Button>
                </Space>
            )
        }
    ];

    const handleDateRangeChange = (values) => {
        viewAirlineCustomers(props.username.split('@').slice(-1)[0],
            [{
                dateFrom: values[0].startOf('day').format(dateTimeFormat),
                dateTo: values[1].endOf('day').format(dateTimeFormat)
            }]).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            console.log("response", response);
            setCustomers(response);
        })
    }

    useEffect(() => {
        let dateFrom = moment().subtract(1, "years").format(dateTimeFormat);
        viewAirlineCustomers(props.username.split('@').slice(-1)[0],
            [{dateFrom, dateTo: moment().format(dateTimeFormat)}]).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
            return [];
        }).then((response) => {
            console.log("response", response);
            setCustomers(response);
        }).catch(e => console.log(e))

    }, [])


    return (
        <Card title={"Welcome, " + props.username + "!"}>
            <RangePicker
                onChange={handleDateRangeChange}
                defaultValue={[moment().subtract(1, "years"), moment()]}
            />
            <Table columns={staffInterfaceColumns} dataSource={customers} />
            <Modal title={"Flights of " + target} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'50vw'}>
                <Table columns={airlineInterfaceColumns} dataSource={flights} size={'small'} pagination={{pageSize: 5}}/>
            </Modal>
        </Card>
    )
}