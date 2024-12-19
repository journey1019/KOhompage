import { HardwareCards } from '@/components/(Hardware)/HardwareCards';
import { getAllHardwares } from '@/service/movie';

export default async function HardwareGrid() {
    const movies = await getAllHardwares();
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">moviess</h2>
            <p className='w-full justify-center text-4xl dark:text-white'>ALL</p>
            <div
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {movies.map((movie) => (
                    <HardwareCards
                        key={movie.path}
                        path={movie.path}
                        title={movie.title}
                        description={movie.description}
                        brochure={movie.brochure}
                        devkit={movie.devkit}
                        category={movie.category}
                        tag={movie.tag}
                        featured={movie.featured}
                    />
                ))}
            </div>
        </div>
    )
}