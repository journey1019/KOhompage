import Image from 'next/image';

export default function Diagram() {
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-36">
                <Image
                    src="/images/casestudies/configuration.png"
                    className="w-full h-auto filter brightness-80 dark:brightness-75 object-cover rounded-lg"
                    alt="Configuration_1"
                    width={500}
                    height={700}
                    unoptimized
                />
                <Image className="h-auto w-full rounded-lg" src="https://flowbite.com/docs/images/examples/image-1@2x.jpg" alt="image description" width={500} height={300} unoptimized/>
            </div>
        </section>
    )
}