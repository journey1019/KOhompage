interface GreetProps {
    solutionNumber: string;
    title: string;
    solutionName: string;
    description?: string; // 선택적으로 추가 가능
}

export default function Greet({ solutionNumber, title, solutionName, description}: GreetProps){
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className='py-36 text-center'>
                <h1 className='text-xl text-red-800 font-semibold py-1'>{solutionNumber}</h1>
                <h1 className='text-6xl text-black font-bold py-3 dark:text-white'>{title}</h1>
                <h1 className='text-3xl text-gray-400 font-semibold py-4'>{solutionName}</h1>
            </div>
        </section>
    )
}