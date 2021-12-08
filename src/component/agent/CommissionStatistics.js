import {DatePicker, Statistic, Card, Space} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import moment from "moment";
import {viewCommission} from "../../lib/requests";
import {dateTimeFormat} from "../../lib/dateFormat";

const {RangePicker} = DatePicker;

export default function CommissionStatistics(props) {
    const [commissionData, setCommissionData] = useState({value: 0.0});

    const handleDateRangeChange = (values) => {
        viewCommission(props.username,
            values[0].startOf('day').format(dateTimeFormat),
            values[1].endOf('day').format(dateTimeFormat)).then((response) => {
            if (response.status == '200') {
                return response.data;
            }
            return 0.0;
        }).then((response) => {
            if (!response) {
                setCommissionData({value: 0.0});
            } else setCommissionData({value: response});
        })
    }

    const loadingHolder = Boolean(commissionData);

    useEffect(() => {
        viewCommission(props.username,
            moment().subtract(30, 'days').format(dateTimeFormat),
            moment().format(dateTimeFormat)).then((response) => {
                console.log(response);
                if (response.status == '200') {
                    return response.data;
                }
                return 0.0;
        }).then((response) => {
            console.log(response);
            if (!response) {
                setCommissionData({value: 0.0});
            } else setCommissionData({value: response});
        })
    }, []);



    return (
        <Card title="Checking Total Commission for Username">
            <Space direction="vertical" size='large' style={{width: '100%'}}>
                <RangePicker
                    onChange={handleDateRangeChange}
                    defaultValue={[moment().subtract(30, 'days'), moment()]}
                />
                <div style={{textAlign: 'center', width: '100%'}}>
                    <Statistic
                        title="Total Commission in XXX (USD)"
                        value={commissionData.value}
                        loading={!loadingHolder}
                        precision={2}
                        style={{width: '100%'}}
                    />
                </div>
            </Space>
        </Card>
    )

}