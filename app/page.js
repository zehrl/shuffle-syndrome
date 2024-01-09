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