import React, {useEffect, useState} from "react";
import {Column} from "@ant-design/charts";
import {Card, Divider, Typography, DatePicker} from "antd";
import moment from "moment";
import {viewCustomersByCommission, viewCustomersByNumber} from "../../lib/requests";
import {dateTimeFormat} from "../../lib/dateFormat";

const {Title} = Typography;
const {RangePicker} = DatePicker;

export default function TopCustomerChart(props) {
    const [customerTicketCount, setCustomerTicketCount] = useState(null);
    const [customerCommission, setCustomerCommission] = useState(null);


    // for testing ONLY
    const testTicket = [
        {
            uid: "123",
            sum: 15,
        },
        {
            uid: "234",
            sum: 11,
        },
        {
            uid: "471",
            sum: 9,
        },
        {
            uid: "602",
            sum: 7,
        },
        {
            uid: "866",
            sum: 5,
        },
    ];
    const testCommission = [
        {
            uid: "123",
            sum: 9806.3,
        },
        {
            uid: "234",
            sum: 7503.5,
        },
        {
            uid: "471",
            sum: 6602.6,
        },
        {
            uid: "602",
            sum: 1025.2,
        },
        {
            uid: "866",
            sum: 897.8,
        },
    ]

    const columnConfig = {
        xField: 'key',
        yField: 'value',
        seriesField: '',
        columnWidthRatio: 0.5,
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.8
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            }
        },
    }

    const handleDateRangeChange = (callback) => (value) => {
        callback(value);
    }

    const viewTopCustomerNumber = (values) => {
        viewCustomersByNumber(props.username,
            values[0].startOf('day').format(dateTimeFormat),
            values[1].endOf('day').format(dateTimeFormat)).then((response) => {
                if (response.status == '200') {
                    return response.data
                }
                return [];
        }).then((response) => {
            console.log(response)
            let tableValue = response.map((item) => {
                return {
                    key: item.key,
                    value: item.value ?? 0
                }
            })
            setCustomerTicketCount(tableValue)
        })
    }
    const viewTopCustomerCommission = (values) => {
        viewCustomersByCommission(props.username,
            values[0].startOf('day').format(dateTimeFormat),
            values[1].endOf('day').format(dateTimeFormat)).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            let tableValue = response.map((item) => {
                return {
                    key: item.key,
                    value: item.value ?? 0
                }
            })
            setCustomerCommission(tableValue);
        })
    }

    useEffect(() => {
        viewTopCustomerNumber([moment().subtract(180, 'days'), moment()]);
        viewTopCustomerCommission([moment().subtract(1, 'years'), moment()])
    }, [])

    return (
        <Card title="Customer Statistics">
            <Title level={4}>Top 5 customers of ticket number</Title>
            <RangePicker
                onChange={handleDateRangeChange(viewTopCustomerNumber)}
                defaultValue={[moment().subtract(180, 'days'), moment()]}
            />
            <p></p>
            {customerTicketCount ? <Column {...columnConfig}
                    data={customerTicketCount}
                    /> : null}
            <Divider />
            <Title level={4}>Top 5 customers of total commission</Title>
            <RangePicker
                onChange={handleDateRangeChange(viewTopCustomerCommission)}
                defaultValue={[moment().subtract(1, 'years'), moment()]}
            />
            <p></p>
            {customerCommission ? <Column {...columnConfig}
                    data={customerCommission}
                    /> : null}
        </Card>
    )
}