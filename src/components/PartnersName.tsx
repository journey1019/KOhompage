import { Partner } from '@/service/partners';

type Props = { partner: Partner };
export default function PartnersName({partner: {index, name, category, issue, date, end}}: Props) {
    return(
        <article>
            <div className='flex flex-col items-center p-4'>
                <h3 className='text-4xl font-bold'>{name}</h3>
            </div>
        </article>
    )
}