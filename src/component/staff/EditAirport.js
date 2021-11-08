import React, {useState} from "react";
import {Input, Card, Button} from "antd";

export default function EditAirport() {
    const [inputCode, setInputCode] = useState(undefined);
    const [inputCity, setInputCity] = useState(undefined);

    return (
        <Card title="Airport Information Management">
            <Input.Group>
                <Input
                    addonBefore={"IATA Code"}
                    placeholder={"e.g. XXX"}

                />
                <Input addonBefore={"City"} placeholder={"e.g. Shanghai"}/>
            </Input.Group>
        </Card>
    )
}