import axios from 'axios';

const baseURL = "http://localhost:2330/";
const config = {
    method: 'post',
    baseURL: baseURL,
    timeout: 36000,
    responseType: 'json'
};

// public part
export function searchAirport(keyword) {
    let localConfig = Object.assign({}, config, {
        params: {
            name: keyword,
        },
        url: '/search-airport',
    });
    localConfig.method = 'get';
    return axios.request(localConfig);
}

export function searchFlights(deptPort, arriPort, dateFrom, dateTo) {
    let localConfig = Object.assign({}, config, {
        data: {
            departurePort: deptPort,
            arrivalPort: arriPort,
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        url: "/search-flights",
    });
    return axios.request(localConfig);
}

export function createOrder(email, flightNum, airlineName, agentId="") {
    let localConfig = Object.assign({}, config, {
        data: {
            customerEmail: email,
            flightNum: flightNum,
            airlineName: airlineName,
            bookingAgentId: agentId,
        },
        url: "/create-order",
    });
    return axios.request(localConfig);
}

export function agentRegistration(email, pwdHash) {
    let localConfig = Object.assign({}, config, {
        data: {
            vId: email,
            vPassword: pwdHash,
        },
        url: "/create-agent",
    })
    return axios.request(localConfig);
}

// customer part
export function customerLogin(email, pwdHash) {
    let localConfig = Object.assign({}, config, {
        data: {
            vId: email,
            vPassword: pwdHash,
        },
        url: "/customer/verification",
    })
    return axios.request(localConfig);
}

export function viewCustomerFlights(email) {
    let localConfig = Object.assign({}, config, {
        data: email,
        url: "/customer/view-my-flights",
    })
    return axios.request(localConfig);
}

export function trackCustomerSpending(email, dateList) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: 0.0
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: email,
            data: dateRangeData,
        },
        url: "/customer/verification",
    });
    return axios.request(localConfig);
}

// agent part
export function agentLogin(email, hashPwd) {
    let localConfig = Object.assign({}, config, {
        data: {
            vId: email,
            vPassword: hashPwd,
        },
        url: "/agent/verification",
    });
    return axios.request(localConfig);
}

export function viewAgentFlights(bookingAgentId) {
    let localConfig = Object.assign({}, config, {
        data: bookingAgentId,
        url: "/agent/view-my-flights",
    });
    return axios.request(localConfig);
}

export function viewCommission(bookingAgentId) {
    let localConfig = Object.assign({}, config, {
        data: bookingAgentId,
        url: "/agent/view-commission",
    });
    return axios.request(localConfig);
}

export function viewCustomersByCommission(bookingAgentId, dateFrom, dateTo) {
    let localConfig = Object.assign({}, config, {
        data: {
            bookingAgentId: bookingAgentId,
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        url: "/agent/view-customers-commission",
    });
    return axios.request(localConfig);
}

export function viewCustomersByNumber(bookingAgentId, dateFrom, dateTo) {
    let localConfig = Object.assign({}, config, {
        data: {
            bookingAgentId: bookingAgentId,
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        url: "/agent/view-customers-number",
    });
    return axios.request(localConfig);
}

// staff part
export function staffLoginVerification(username, hashPwd) {
    let localConfig = Object.assign({}, config, {
        data: {
            vId: username,
            vPassword: hashPwd,
        },
        url: "/staff/verification",
    })
    return axios.request(localConfig);
}

export function getPermission(username) {
    let localConfig = Object.assign({}, config, {
        data: username,
        url: "/staff/get-permission",
    })
    return axios.request(localConfig);
}

export function staffViewFlights(airlineName, dateFrom, dateTo) {
    let localConfig = Object.assign({}, config, {
        data: {
            bookingAgentId: airlineName,
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        url: "/staff/get-permission",
    })
    return axios.request(localConfig);
}

export function viewCustomersOnFlight(flightNum) {
    let localConfig = Object.assign({}, config, {
        data: flightNum,
        url: "/staff/get-permission",
    })
    return axios.request(localConfig);
}

export function createFlight(airlineName, flightNum, deptPort, arriPort, status, airplaneId, deptTime, arriTime, price) {
    let localConfig = Object.assign({}, config, {
        data: {
            airlineName: airlineName,
            flightNum: flightNum,
            departurePort: deptPort,
            arrivalPort: arriPort,
            status: status,
            airplaneId: airplaneId,
            departureTime: deptTime,
            arrivalTime: arriTime,
            price: price,
        },
        url: "/staff/create-flight",
    });
    return axios.request(localConfig);
}

export function changeFlight(airlineName, flightNum, deptPort="", arriPort="", status, airplaneId="", deptTime="", arriTime="", price="") {
    let localConfig = Object.assign({}, config, {
        data: {
            airlineName: airlineName,
            flightNum: flightNum,
            departurePort: deptPort,
            arrivalPort: arriPort,
            status: status,
            airplaneId: airplaneId,
            departureTime: deptTime,
            arrivalTime: arriTime,
            price: price,
        },
        url: "/staff/change-flight",
    });
    return axios.request(localConfig);
}

export function createAirplane(airlineName, airplaneId, seats) {
    let localConfig = Object.assign({}, config, {
        data: {
            airlineName: airlineName,
            airplaneId: airplaneId,
            seats: seats,
        },
        url: "/staff/create-airplane",
    });
    return axios.request(localConfig);
}

export function createAirport(name, city) {
    let localConfig = Object.assign({}, config, {
        data: {
            name: name,
            city: city,
        },
        url: "/staff/create-airport"
    });
    return axios.request(localConfig);
}

export function viewAirlineCustomers(airlineName, dateList, limit=5) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: limit*1.0
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/view-customers",
    })
    return axios.request(localConfig);
}

export function getAirlineFlightsOfCustomer(email, airlineName) {
    let localConfig = Object.assign({}, config, {
        data: {
            key: email,
            value: airlineName,
        },
        url: "/staff/view-customers/get-flights",
    });
    return axios.request(localConfig);
}

export function viewAirlineAgentsByNumber(airlineName, dateList, limit=5) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: limit * 1.0,
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/view-agents/number",
    })
    return axios.request(localConfig);
}

export function viewAirlineAgentsByCommission(airlineName, dateList, limit=5) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: limit * 1.0,
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/view-agents/sales",
    })
    return axios.request(localConfig);
}

export function viewReports(airlineName, dateList) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: 0.0
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/reports",
    });
    return axios.request(localConfig);
}

export function revenueComparison(airlineName, dateList) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: 0.0
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/comparison",
    });
    return axios.request(localConfig);
}

export function viewTopDestinations(airlineName, dateList, limit=3) {
    const dateRangeData = dateList.map((period) => {
        return {
            dateFrom: period.dateFrom,
            dateTo: period.dateTo,
            value: limit * 1.0,
        }
    });
    let localConfig = Object.assign({}, config, {
        data: {
            key: airlineName,
            data: dateRangeData,
        },
        url: "/staff/destinations",
    });
    return axios.request(localConfig)
}

export function grantPermission(username, permission) {
    let localConfig = Object.assign({}, config, {
        data: {
            key: username,
            value: permission,
        },
        url: "/staff/grant-permissions",
    });
    return axios.request(localConfig);
}