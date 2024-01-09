'use client'

import styles from '../page.module.css'
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
    const [token, setToken] = useState("");
    const [bpm, setBpm] = useState("129");
    const [trackList, setTrackList] = useState();

    // useEffect(() => {
    //     if (!token) {
    //         console.log("fetching new token...");
    //         fetch('implicit/api/token', { method: "GET" })
    //             .then((res) => res.json())
    //             // .then(({ resJson }) => {
    //             //     setToken(resJson.access_token);
    //             //     return;
    //             // })
    //             .then(stuff => console.log(stuff))
    //     }
    // }, [token])

    const generateRandomString = () => "hf&5Juf9^184916f";

    useEffect(() => {
        if (!token) {
            let client_id = '02cae4c245f449fdad5b26f62a653b5a';
            let redirect_uri = 'http://localhost:3000/callback';
            let stateKey = 'CoolStateName'

            let state = generateRandomString(16);

            localStorage.setItem(stateKey, state);
            let scope = 'user-read-private user-read-email';

            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);

            redirect(url);
            setToken('coolbeans');
        }


        // let headers = new Headers();
        // headers.append("Access-Control-Allow-Origin", "http://localhost:3000/")

        // fetch(url, {headers}).then(res=>console.log(res)).catch(err=>console.log(err));

    }, [token])

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        formData.append('token', token);
        const response = await fetch('/api/recommendations', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(({ resJson }) => {
                console.log('resJson: ', resJson)
                let trackListEl = resJson.tracks.map(trackJson => {
                    const artistNames = trackJson.artists.map((artist) => {
                        return artist.name
                    }).join(' & ')

                    return <li key={trackJson.id}>{artistNames} - {trackJson.name}<audio controls><source src={trackJson.preview_url} /></audio></li>
                })

                console.log(trackListEl);
                setTrackList(trackListEl);
                return;
            })
            .catch((err) => {
                console.log('Error fetching recommendations: ', err)
                console.log('Clearing token...');
                setToken(null);
            })
    }


    return (
        <main style={{ padding: '4.6em' }}>
            <h1>Shuffle Syndrome</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="bpm" />
                <button type="submit" disabled={!token}>Set</button>
            </form>
            <p>token: {token ? token : 'loading...'}</p>
            {trackList && <ul>{trackList}</ul>}
        </main>
    )
}