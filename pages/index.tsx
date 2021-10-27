import type {NextPage} from 'next'
import MainContainer from "../components/MainContainer";
import Link from "next/link";
import useSWR from 'swr'
import React, {useState} from "react";
import {useRouter} from "next/router";


interface IPaginationButtons {
    name: string;
    offset: number
}

const Home: NextPage = () => {
    const router = useRouter()
    const [offset, setOffset] = useState(0);
    const [input, setInput] = useState('');
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const {data, error} = useSWR(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=40`, fetcher);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const paginationButtons: IPaginationButtons[] = []

    for (let i = 0; i < data.count; i = i + 40) {
        paginationButtons.push({
            name: `${i} - ${i + 40}`,
            offset: i
        })
    }

    return (
        <MainContainer keywords={'Pokemon by Ivan Skotar'} title='Pokemon List'>
            <button onClick={() => router.back()} style={{margin: '10px 0'}}>
                {'<-- Back'}
            </button>

            <h1>Pokemon List</h1>

            <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
            <button onClick={() => router.push(`/pokemon/${input}`)}>Search</button>

            <ul>
                {data.results.map(({ name }:{ name: string}) =>
                    <li key={name}>
                        <Link href={`/pokemon/${name}`}>
                            {name}
                        </Link>
                    </li>
                )}
            </ul>

            {
                paginationButtons.map(button => (
                    <button
                        key={button.name}
                        onClick={() => setOffset(button.offset)}
                    >
                        {button.name}
                    </button>
                ))
            }
        </MainContainer>
    )
}

export default Home
