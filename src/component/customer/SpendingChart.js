import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Card} from "antd";

export default function SpendingChart() {

    const [spendingData, setSpendingData] = useState(null);

    //for testing ONLY
    const testData = [
        {
            type: 'January',
            value: 2930.8,
        },
        {
            type: 'February',
            value: 1034.2,
        },
        {
            type: 'March',
            value: 3832.9,
        },
        {
            type: 'April',
            value: 1564.0,
        },
        {
            type: 'May',
            value: 3013.6,
        },
        {
            type: 'June',
            value: 4566.2,
        },
    ];

    const chartConfig = {
        appendPadding: 10,
        data: testData, // TODO: use props or ask for the server
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        meta: {
            type: {
                alias: 'Date Range',
            },
            value: {
                alias: 'Total Spending',
                formatter: (v) => ("$" + v.toString()),
            },
        },
        label: {
            type: 'inner',
            offset: '-30%',
        }
    }

    return (
        <Card title="See your amazing trips, Username!">
            <Pie {...chartConfig} />
        </Card>
    )
}