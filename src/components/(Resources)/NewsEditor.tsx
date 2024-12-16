"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const NewsEditor = ({ onSave }: { onSave: (data: { title: string; content: string }) => void }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    const handleSave = () => {
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }
        onSave({ title, content });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <Editor
                apiKey="YOUR_TINYMCE_API_KEY"
                value={content}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={handleEditorChange}
            />
            <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Save News
            </button>
        </div>
    );
};

export default NewsEditor;
