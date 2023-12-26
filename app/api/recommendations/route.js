export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request) {

    // console.log("request: ", request);
    const token = await request.formData().then((data) => {
        console.log(data.get('token'));
        return data.get('token');
    })

    const spotifyHeaders = new Headers();
    spotifyHeaders.append('Authorization', 'Bearer ' + token);

    console.log("spotifyHeaders: ", spotifyHeaders);

    const spotifyRequest = new Request('https://api.spotify.com/v1/recommendations?seed_genres=dance&target_tempo=128', {
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