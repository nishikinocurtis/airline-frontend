import React, {useEffect, useState} from "react";
import {Column} from "@ant-design/charts";
import {Card, Divider, Typography, DatePicker} from "antd";
import moment from "moment";
import {
    viewAirlineAgentsByCommission,
    viewAirlineAgentsByNumber,
    viewCustomersByCommission,
    viewCustomersByNumber
} from "../../lib/requests";
import {dateTimeFormat} from "../../lib/dateFormat";

const {Title} = Typography;
const {RangePicker} = DatePicker;

export default function TopAgentChart(props) {
    const [agentTicketCount, setAgentTicketCount] = useState(null);
    const [agentCommission, setAgentCommission] = useState(null);


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

    const viewTopAgentNumber = (values) => {
        viewAirlineAgentsByNumber(props.username.split('@').slice(-1)[0],
            [{
                dateFrom: values[0].startOf('day').format(dateTimeFormat),
                dateTo: values[1].endOf('day').format(dateTimeFormat)
            }]
        ).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            console.log(response)
            let tableValue = response.map((item) => {
                return {
                    key: item.key ? item.key : "Customer",
                    value: item.value ?? 0
                }
            })
            setAgentTicketCount(tableValue)
        })
    }
    const viewTopAgentCommission = (values) => {
        viewAirlineAgentsByCommission(props.username.split('@').slice(-1)[0],
            [{
                dateFrom: values[0].startOf('day').format(dateTimeFormat),
                dateTo: values[1].endOf('day').format(dateTimeFormat)
            }]
        ).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            let tableValue = response.map((item) => {
                return {
                    key: item.key ? item.key : "Customer",
                    value: item.value ?? 0
                }
            })
            setAgentCommission(tableValue);
        })
    }

    useEffect(() => {
        viewTopAgentNumber([moment().subtract(180, 'days'), moment()]);
        viewTopAgentCommission([moment().subtract(1, 'years'), moment()])
    }, [])

    return (
        <Card title="Agent Statistics">
            <Title level={4}>Top 5 agents of ticket number</Title>
            <RangePicker
                onChange={handleDateRangeChange(viewTopAgentNumber)}
                defaultValue={[moment().subtract(180, 'days'), moment()]}
            />
            <p></p>
            {agentTicketCount ? <Column {...columnConfig}
                                           data={agentTicketCount}
            /> : null}
            <Divider />
            <Title level={4}>Top 5 agents of total commission</Title>
            <RangePicker
                onChange={handleDateRangeChange(viewTopAgentCommission)}
                defaultValue={[moment().subtract(1, 'years'), moment()]}
            />
            <p></p>
            {agentCommission ? <Column {...columnConfig}
                                          data={agentCommission}
            /> : null}
        </Card>
    )
}