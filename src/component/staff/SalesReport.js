import {DatePicker, Statistic, Card, Space, Divider} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import moment from "moment";
import {trackCustomerSpending, viewCommission, viewReports} from "../../lib/requests";
import {dateFormat, dateTimeFormat} from "../../lib/dateFormat";
import {Pie} from "@ant-design/charts";

const {RangePicker} = DatePicker;

export default function SalesReport(props) {
    const [salesData, setSalesData] = useState(null);
    const [salesValue, setSalesValue] = useState(0);
    const [dateRange, setDateRange] = useState([moment().subtract(6, 'month'), moment()]);

    const handleDateRangeChange = (values) => {
        setDateRange(values)
        updateReport(values);
    }

    const preprocess = (values=null) => {
        const dateList = [];
        let currentPtr = values ?? dateRange;
        while (currentPtr[0].endOf("month").format(dateFormat) != currentPtr[1].endOf("month").format(dateFormat)) {
            dateList.push({
                dateFrom: currentPtr[0].startOf("month").format(dateFormat) + " 00:00:00",
                dateTo: currentPtr[0].endOf("month").format(dateFormat) + " 23:59:59"
            });
            currentPtr[0] = currentPtr[0].endOf("month").add(1, 'day');
        }
        dateList.push({
            dateFrom: currentPtr[0].format(dateFormat) + " 00:00:00",
            dateTo: currentPtr[1].format(dateTimeFormat)
        })
        return dateList;
    }

    const updateReport = (values=null) => {
        let dateList = preprocess(values=null);
        viewReports(props.username.split('@').slice(-1)[0], dateList).then((response) => {
            if (response.status == '200') {
                return response.data
            }
            return [];
        }).then((response) => {
            let sum = 0;
            let tableData = response.map((item) => {
                sum += item.value ? item.value : 0;
                return {
                    type: item.dateFrom.split(' ')[0] + " to " + item.dateTo.split(' ')[0],
                    value: item.value ? item.value : 0
                }
            });
            console.log(tableData);
            setSalesData(tableData);
            setSalesValue(sum);
        })
    }

    useEffect(() => {
        updateReport();
    }, []);

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
        <Card title="Checking Total Sales">
            <Space direction="vertical" size='large' style={{width: '100%'}}>
                <RangePicker
                    onChange={handleDateRangeChange}
                    defaultValue={[moment().subtract(180, 'days'), moment()]}
                />
                <div style={{textAlign: 'center', width: '100%'}}>
                    <Statistic
                        title="Total Sales"
                        value={salesValue}
                        precision={0}
                        style={{width: '100%'}}
                    />
                </div>
            </Space>
            <Divider />
            {salesData ? <Pie {...chartConfig} data={salesData}/> : null}
        </Card>
    )

}