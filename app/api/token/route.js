export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST() {

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const res = await fetch(`https://accounts.spotify.com/api/token`, {
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "grant_type=client_credentials",
        method: 'POST'
    }).then((response) => {
        return response;
    })

    const resJson = await res.json();
    return Response.json({ resJson });
}