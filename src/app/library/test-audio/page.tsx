'use client';
import React, { useState, useRef, useEffect } from 'react';

const Visualizer = () => {
    // create audiofile from audio file path
    // const audioFile = new Uint8Array(100);

    // const [blob, setBlob] = useState<Blob>();
    // const visualizerRef = useRef<HTMLCanvasElement>(null)


    // useEffect(() => {
    //     const url = 'http://localhost:10049/api/v1/media/d086f2aa-3e9e-4f50-a3f7-6529375b598c'
    //     async function fetchData() {
    //         let blob = await fetch(url).then(r => r.blob());
    //         setBlob(blob);
    //     }
    //     fetchData();
    // }, []);

    const [audioLists, setAudioLists] = useState([
        { musicSrc: 'http://localhost:10049/api/v1/media/d086f2aa-3e9e-4f50-a3f7-6529375b598c' },
        { musicSrc: 'http://localhost:10049/api/v1/media/d086f2aa-3e9e-4f50-a3f7-6529375b598c' },
    ])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAudioLists([{ musicSrc: 'A' }, { musicSrc: 'C' }, { musicSrc: 'B' }])
    //     }, 1000)
    // }, [setAudioLists])




    return (
        <div>
            HI
            {/* <ReactJkMusicPlayer
                audioLists={[{ musicSrc: 'http://localhost:10049/api/v1/media/d086f2aa-3e9e-4f50-a3f7-6529375b598c' }]}
            /> */}
            <audio controls>
                <source src="http://localhost:10049/api/v1/media/stream/d086f2aa-3e9e-4f50-a3f7-6529375b598c" type="audio/mpeg"></source>
            </audio>
        </div>
    )
}

export default Visualizer;