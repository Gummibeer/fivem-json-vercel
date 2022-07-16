import fetch from "node-fetch";

export default async function handler(request, response) {
    const ip = request.query.ip;
    const port = request.query.port;

    if(!ip) {
        return response.status(412).json({
            error: 'ip missing',
        });
    }

    if(!port) {
        return response.status(412).json({
            error: 'port missing',
        });
    }

    try {
        const json = await fetch(`http://${ip}:${port}/players.json`);
        const players = await json.json();

        return response.status(200).json(players);
    } catch(e) {
        return response.status(500).json(e);
    }
}