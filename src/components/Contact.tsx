import {AiFillGithub, AiFillLinkedin, AiFillYoutube} from 'react-icons/ai';
import ContactForm from '@/components/ContactForm';

const LINKS = [
    {icon: <AiFillGithub />, url: ''},
    {icon: <AiFillLinkedin />, url: ''},
    {icon: <AiFillYoutube />, url: ''},
]

export default function Contact() {
    return(
        <section className='flex flex-col items-center'>
            <h2 className='text-3xl font-bold my-2'>Contact Us</h2>
            <p>info@orbcomm.co.kr</p>
            <ul className='flex gap-4 my-2'>
                {LINKS.map((link, index) =>
                    <a
                        key={index}
                        href={link.url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-5xl hover:text-yellow-400'
                    >
                        {link.icon}
                    </a>)
                }
            </ul>
            <h2 className='text-3xl font-bold my-8'>Or Send me an email</h2>
            <ContactForm/>
        </section>
    )
}