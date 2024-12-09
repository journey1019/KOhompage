import React from "react";
import Case from '@/components/(Hard)/Case';
import { blogPosts } from "../../../data/case";

export default function Resources() {
    return(
        <section className="py-24 bg-gray-50">
            <Case posts={blogPosts}/>
        </section>
    )
}