'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
    const [token, setToken] = useState("");
    const [bpm, setBpm] = useState("129");
    const [trackList, setTrackList] = useState();

    useEffect(() => {
        if (!token) {
            console.log("fetching new token...");
            fetch('http://localhost:3000/api/token', { method: "GET" })
                .then((res) => res.json())
                .then(({ resJson }) => {
                    setToken(resJson.access_token);
                    return;
                })
        }
    }, [token])

    const getRecommendations = () => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('bpm', bpm);

        const request = new Request('http://localhost:3000/api/recommendations',
            {
                method: 'POST',
                body: formData,
            });

        fetch(request)
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
            <p>BPM {bpm}</p>
            <p>token: {token ? token : 'loading...'}</p>
            {token && <button onClick={getRecommendations}>Start</button>}
            {trackList && <ul>{trackList}</ul>}

        </main>
    )
}