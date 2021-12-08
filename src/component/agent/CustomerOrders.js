import {agentInterfaceColumns} from "../../lib/flightData";
import ViewFlights from "../customer/ViewFlights";

export default function CustomerOrders(props) {
    return (
        <ViewFlights username={props.username} columns={agentInterfaceColumns} type={"agent"}/>
    )
}