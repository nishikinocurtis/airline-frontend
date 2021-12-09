import React, {useEffect, useState} from "react";
import {Column} from "@ant-design/charts";
import {Card, Divider, Typography, DatePicker} from "antd";
import moment from "moment";
import { viewTopDestinations } from "../../lib/requests";
import {dateTimeFormat} from "../../lib/dateFormat";

const {Title} = Typography;
const {RangePicker} = DatePicker;

export default function TopDestination(props) {
    const [destinations, setDestinations] = useState(null);
    const [longDestinations, setLongDestinations] = useState(null);

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

    const viewTopDestination = (values) => {
        viewTopDestinations(props.username.split('@').slice(-1)[0],
            [{
                dateFrom: values[0].startOf('day').format(dateTimeFormat),
                dateTo: values[1].endOf('day').format(dateTimeFormat)
            }, {
                dateTo: values[1].endOf('day').format(dateTimeFormat),
                dateFrom: values[1].subtract(1, 'years').format(dateTimeFormat),
            }]
        ).then((response) => {
            if (response.status == '200') {
                console.log(response);
                return response.data
            }
            return [];
        }).then((response) => {
            console.log(response)
            let tableValue = response['0'].map((item) => {
                return {
                    key: item.key,
                    value: item.value ?? 0
                }
            })
            let tableValueLong = response['1'].map((item) => {
                return {
                    key: item.key,
                    value: item.value ?? 0
                }
            })
            setDestinations(tableValue);
            setLongDestinations(tableValueLong);
        })
    }


    useEffect(() => {
        viewTopDestination([moment().subtract(90, 'days'), moment()]);
    }, [])

    return (
        <Card title="Destination Statistics">
            <Title level={4}>Top 3 destinations of ticket number in shorter past </Title>
            <RangePicker
                onChange={handleDateRangeChange}
                defaultValue={[moment().subtract(90, 'days'), moment()]}
            />
            <p></p>
            {destinations ? <Column {...columnConfig}
                                        data={destinations}
            /> : null}
            <Divider />
            <Title level={4}>Top 3 destinations of ticket number in longer past</Title>
            <p></p>
            {longDestinations ? <Column {...columnConfig}
                                       data={longDestinations}
            /> : null}
        </Card>
    )
}