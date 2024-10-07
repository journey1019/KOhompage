'use client';
import {useState} from 'react';

export default function MarkdownEditor() {
    const [content, setContent] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    return (
        <div className="markdown-editor max-w-2xl mx-auto p-4">
      <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={content}
          onChange={handleChange}
          placeholder="Write your markdown here..."
          rows={10}
      />
            <div className="mt-6 markdown-preview">
                <h2>Preview</h2>
                <div className="prose dark:prose-invert max-w-none">
                    {content}
                </div>
            </div>
        </div>
    );
}