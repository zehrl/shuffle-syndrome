'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react';

const getRecommendations = () => {

}

export default function Home() {
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!token) {
            fetch('http://localhost:3000/api/token', { method: "POST" })
                .then((res) => res.json())
                .then(({resJson}) => {
                    setToken(resJson.access_token);
                    return;
                })
        }
    }, [token])

    let bpm = 128;
    return (
        <main style={{ padding: '4.6em' }}>
            <h1>Shuffle Syndrome</h1>
            <p>BPM {bpm}</p>
            <p>token: {token ? token : 'loading...'}</p>
            {token && <button onClick={getRecommendations()}>Start</button>}
        </main>
    )
}