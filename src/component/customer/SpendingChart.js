import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Card, DatePicker, Divider} from "antd";
import {trackCustomerSpending} from "../../lib/requests";
import moment from "moment";
import {dateFormat, dateTimeFormat} from "../../lib/dateFormat";

export default function SpendingChart(props) {

    const [spendingData, setSpendingData] = useState(null);
    const [dateRange, setDateRange] = useState(moment().subtract(6, 'month'));

    const handleChange = (date) => setDateRange(date);


    useEffect(() => {
        const dateList = [];
        let currentPtr = dateRange;
        while (currentPtr.endOf("month").format(dateFormat) != moment().endOf("month").format(dateFormat)) {
            dateList.push({
                dateFrom: currentPtr.startOf("month").format(dateFormat) + " 00:00:00",
                dateTo: currentPtr.endOf("month").format(dateFormat) + " 23:59:59"
            });
            currentPtr = currentPtr.endOf("month").add(1, 'day');
        }
        dateList.push({
            dateFrom: currentPtr.format(dateFormat) + " 00:00:00",
            dateTo: moment().format(dateTimeFormat)
        })
        trackCustomerSpending(props.username, dateList).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {

            let tableData = response.map((item) => {
                return {
                    type: item.dateFrom.split(' ')[0] + " to " + item.dateTo.split(' ')[0],
                    value: item.value ? item.value : 0
                }
            });
            console.log(tableData);
            setSpendingData(tableData);
        })
    }, []);

    const chartConfig = {
        appendPadding: 10,
        data: spendingData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        meta: {
            type: {
                alias: 'Date Range',
            },
            value: {
                alias: 'Total Spending',
                formatter: (v) => ("RMB " + v.toString()),
            },
        },
        label: {
            type: 'inner',
            offset: '-30%',
        }
    }

    return (
        <Card title={"See your amazing trips, " + props.username + "!"}>
            <DatePicker defaultValue = {moment()} format={dateFormat} onChange={handleChange} style={{width:200}} />
            <Divider />
            {spendingData ? <Pie {...chartConfig} /> : null}
        </Card>
    )
}