import {getAllHardwares} from '@/service/movie';
import {notFound} from 'next/navigation';

// export default function MovieDetail({ params: { path }}: {params: {path: string};}) {
//     return <h1>Movie {path}</h1>
// }

export default async function MovieDetail({params: {path}}: {params: {path: string}}) {
    const movies = await getAllHardwares();
    const movie = movies.find((movie) => movie.path === path);
    if(!movie){
        notFound();
    }
    return(
        <div>
            <h1>{movie.title}</h1>
            <h1>{movie.path}</h1>
            <h1>{movie.description}</h1>
        </div>
    )
}


// export default async function MovieDetail({ params: {path}}: {params: {path: string}}) {
//     const movie = await getAllHardwares(path);
//     return <h6>{JSON.stringify(movie)}</h6>
// }