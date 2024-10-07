type Props = {
    tags: string[];
    selected: string;
    onClick: (tag: string) => void;
}


export default function Tags({tags, selected, onClick}: Props) {
    return (
        <section>
            {tags.map(tag => (
                <li key={tag} onClick={() => onClick(tag)}>{tag}</li>
            ))}
        </section>
    )
}