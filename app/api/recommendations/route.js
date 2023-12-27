export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request) {
    let token;
    let bpm;


    // console.log("request: ", request);
    await request.formData().then((data) => {
        token = data.get('token');
        bpm = data.get('bpm');
    })

    const spotifyHeaders = new Headers();
    spotifyHeaders.append('Authorization', 'Bearer ' + token);

    console.log("spotifyHeaders: ", spotifyHeaders);

    const spotifyRequest = new Request(`https://api.spotify.com/v1/recommendations?seed_genres=dance&target_tempo=${bpm}`, {
        headers: spotifyHeaders
    });

    const resJson = await fetch(spotifyRequest)
    .then((res) => res.json())
    .then((resJson)=> {
        console.log('recommendations response: ', resJson);
        return resJson;
    })
    return Response.json({ resJson });
}