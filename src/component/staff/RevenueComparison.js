import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Card, DatePicker, Divider} from "antd";
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../lib/dateFormat";
import {revenueComparison} from "../../lib/requests";

export default function RevenueComparison(props) {

    const [spendingData, setSpendingData] = useState(null);
    const [longSpendingData, setLongSpendingData] = useState(null);

    const handleChange = (callback) => (value) => {
        revenueComparison(props.username.split('@').slice(-1)[0], [{
            dateFrom: value.startOf('day').format(dateTimeFormat),
            dateTo: moment().endOf('day').format(dateTimeFormat)
        }]).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
        }).then((response) => {
            callback([
                {
                    type: 'agent',
                    value: response['agent']
                },
                {
                    type: 'nonAgent',
                    value: response['nonAgent']
                }
            ])
        })
    }

    useEffect(() => {
        handleChange(setSpendingData)(moment().subtract(30, 'days'));
        handleChange(setLongSpendingData)(moment().subtract(1, 'years'))
    }, [])

    const chartConfig = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        meta: {
            type: {
                alias: 'Date Range',
            },
            value: {
                alias: 'Total Earning',
                formatter: (v) => ("RMB " + v.toString()),
            },
        },
        label: {
            type: 'inner',
            offset: '-30%',
        }
    }

    return (
        <Card title={"Revenue Comparison"}>
            <DatePicker defaultValue = {moment().subtract(30, 'days')} format={dateFormat} onChange={handleChange(setSpendingData)} style={{width:200}} />
            <Divider />
            {spendingData ? <Pie {...chartConfig} data={spendingData}/> : null}
            <Divider />
            <DatePicker defaultValue = {moment().subtract(1, 'years')} format={dateFormat} onChange={handleChange(setLongSpendingData)} style={{width:200}} />
            <Divider />
            {longSpendingData ? <Pie {...chartConfig} data={longSpendingData}/> : null}
        </Card>
    )
}