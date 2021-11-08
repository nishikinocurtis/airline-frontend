import {agentInterfaceColumns} from "../../lib/flightData";
import ViewFlights from "../customer/ViewFlights";

export default function CustomerOrders() {
    return (
        <ViewFlights columns={agentInterfaceColumns} />
    )
}