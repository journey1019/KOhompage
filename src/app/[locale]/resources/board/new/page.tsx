"use client";

import React from "react";
import NewsEditor from "@/components/(Resources)/NewsEditor";

const CreateNewsPage = () => {
    const handleSave = async (data: { title: string; content: string }) => {
        const newNews = {
            id: Date.now(),
            title: data.title,
            content: data.content,
            date: new Date().toISOString(),
        };

        const response = await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNews),
        });

        if (response.ok) {
            alert("News saved successfully!");
        } else {
            alert("Failed to save news.");
        }
    };

    return (
        <div className="p-6 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-6">Create News</h1>
            <NewsEditor onSave={handleSave} />
        </div>
    );
};

export default CreateNewsPage;
