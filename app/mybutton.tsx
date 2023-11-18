'use client';
import { useState } from 'react';
export default function MyButton() {
    const [count, setCount] = useState(0);
    const [searches, setSearches] = useState<number[]>([]);


    function handleClick(): void {
        let num = Math.floor(Math.random() * 11);
        setSearches(searches => [...searches, num]);
        setCount(num);
        //alert(count);
    }

    return (
        <div>
            
            <button onClick={handleClick}>
                click
            </button>
            <p>{searches.join(" ")}</p>
        </div>
    );
}