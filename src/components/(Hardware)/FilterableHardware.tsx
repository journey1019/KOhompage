'use client';

import { useState } from 'react';
import { Post } from '@/service/hardware';
import PostGrid from '@/components/(Hardware)/PostGrid';
import Tags from '@/components/(Hardware)/Tags';

type Props = {
    posts: Post[],
    tags: string[];
};
const ALL_HARDWARE = 'All Hardware';

export default function FilterableHardware({ posts, tags }: Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
    const [selected, setSelected] = useState(ALL_HARDWARE); // 선택한 태그
    const [searchValue, setSearchValue] = useState('') // 입력값 상태

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleTagSelect = (tag: string) => {

    }

    const filtered =
        selected === ALL_HARDWARE
            ? posts
            : posts.filter((post) => post.category === selected);
            // : posts.filter((post) => post.tag.includes(selected));
    return(
        <section>
            <Tags tags={[ALL_HARDWARE, ...tags]} selected={selected} onClick={setSelected}/>
            <PostGrid posts={filtered}/>
        </section>
    )
}