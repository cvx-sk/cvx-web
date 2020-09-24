import { NowRequest, NowResponse } from '@vercel/node';
import axios, { Method } from 'axios';

const googleFormApiUrl = 'https://script.google.com/macros/s/AKfycbzCa0mhWSKj1DrisiLXEZ-PYji_cUL6xS7B_nkr_A5_nz2hY8BT/exec'


export default async (request: NowRequest, response: NowResponse) => {
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Type', 'application/json');
    try {
        console.log(request.headers);
        const res = await axios.request({
            url: googleFormApiUrl,
            params: { code: request.query.code },
            method: request.method as Method,
            headers: {
                ...request.headers,
                host: 'script.google.com', // TODO extract host from googleFormApiUrl
            },
            data: request.body,
        });
        response.status(res.data.statusCode || 200).send(JSON.stringify(res.data));
    } catch (error) {
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send(JSON.stringify({
            error: error.name,
            message: error.message,
            stack: error.stack.split('\n'),
        }));
    }

}
