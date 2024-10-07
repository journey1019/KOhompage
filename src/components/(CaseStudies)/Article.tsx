export default function Article() {
    return(
        <article className="mx-auto w-full max-w-screen-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    Best practices for successful prototypes
                </h1>
            </header>

            <p className="lead">
                Flowbite is an open-source library of UI components built with the utility-first classes from
                Tailwind CSS...
            </p>
            <p>
                Before going digital, you might benefit from scribbling down some ideas in a sketchbook...
            </p>
            <figure>
                <img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                     alt="Digital art" />
                <figcaption>Digital art by Anonymous</figcaption>
            </figure>
            <h2>Getting started with Flowbite</h2>
            <p>First of all, you need to understand how Flowbite works...</p>
            <ol>
                <li><strong>Usability testing</strong>...</li>
                <li><strong>Involving stakeholders</strong>...</li>
                <li><strong>Impressing a client</strong>...</li>
                <li><strong>Communicating your vision</strong>...</li>
            </ol>
            <h3>Laying the groundwork for best design</h3>
            <p>Before going digital, you might benefit from scribbling down some ideas...</p>
        </article>
    )
}