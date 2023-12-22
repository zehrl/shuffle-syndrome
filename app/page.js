'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
    const [token, setToken] = useState("");

    useEffect(() => {
        console.log('useEffect start...')
        if (!token) {
            console.log('->no token found')
            fetch('http://localhost:3000/api/token')
                .then((response) => {
                    return response.json();
                })
                .then((tokenJson) => {
                    console.log('->token json: ', tokenJson)
                    setToken(tokenJson.id);
                });
        }
    }, [token])

    let bpm = 128;
    return (
        <main style={{ padding: '0.6em' }}>
            <h1>Shuffle Syndrome</h1>
            <p>BPM {bpm}</p>
            <p>token: {token ? token : 'loading...'}</p>
        </main>
    )
}