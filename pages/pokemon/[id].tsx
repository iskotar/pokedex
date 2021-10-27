import MainContainer from "../../components/MainContainer";
import React from "react";
import {useRouter} from "next/router";

interface IProps {
    pokemon: {
        name: string
        weight: number
        height: number
        base_experience: number
        abilities: {
            ability: {
                name: string
            }
        }[]
        held_items: {
            item: {
                name: string
            }
        }[]
        sprites: {
            front_default: string
        }
    }

}

export default function Pokemon({pokemon}: IProps) {
    const router = useRouter()

    return (
        <MainContainer keywords={pokemon.name} title={pokemon.name}>
            <button onClick={() => router.back()} style={{margin: '10px 0'}}>
                {'<-- Back'}
            </button>
            <div>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprites.front_default}/>
                <div><b>Weight:</b> {pokemon.weight}</div>
                <div><b>Height:</b> {pokemon.height}</div>
                <div><b>Experience:</b> {pokemon.base_experience}</div>
                <div><b>Abilities:</b></div>
                <ul>
                    {
                        pokemon.abilities.map(({ ability }) => <li key={ability.name}>{ability.name}</li>)
                    }
                </ul>
                <div><b>Held items:</b></div>
                <ul>
                    {
                        pokemon.held_items.map(({ item } ) => <li key={item.name}>{item.name}</li>)
                    }
                </ul>

            </div>
        </MainContainer>
    )
};

export async function getServerSideProps({params}: any) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const pokemon = await response.json()

    return {
        props: {pokemon}
    }
}
