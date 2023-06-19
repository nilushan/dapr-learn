// create dapr state access apis via axios 

import axios from 'axios';

interface StateResponse {
    data: object;
    etag: string;
}

interface StateRequest {
    value: object;
    etag?: string;
}

const DARP_PORT = process.env.DAPR_HTTP_PORT ?? "3500";
const storeName = 'statestore';
const baseUrl = `http://localhost:${DARP_PORT}/v1.0/state/${storeName}`;

export function getState(field: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}/${field}`;
        axios.get<any>(url)
            .then(ret => {
                console.info(ret.data)
                resolve(ret.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export async function setState(field: string, value: object, etag?: string): Promise<void> {
    const url = `${baseUrl}/${field}`;
    const data: StateRequest = { value };
    if (etag) {
        data.etag = etag;
    }
    await axios.put(url, data);
}

// create state
export async function createState(field: string, value: object): Promise<any> {
    return new Promise((resolve, reject) => {

        const url = `${baseUrl}`;
        // const data: StateRequest =  value ;
        axios.post(url, [{ key: field, value}],
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(ret => {
                console.info(ret.data)
                resolve(ret.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

// delete state
export async function deleteState(field: string): Promise<any> {
    const url = `${baseUrl}/${field}`;
    return new Promise((resolve, reject) => {

        axios.delete(url)
            .then(ret => {
                console.info(ret)
                resolve(ret);
            })
            .catch(err => {
                reject(err);
            })
    })
}