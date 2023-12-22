export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET() {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    
    // const res = await fetch(`https://accounts.spotify.com/api/token`, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    //   options: {
    //     method: "GET"
    //   }
    // })
    // const product = await res.json()
   
    // return Response.json({ product })

    // const res = await fetch('https://google.com', {
    //     method: "GET" 
    // });

    // const resJson = await res.json();

    return Response.json({id: "192048"});
  }