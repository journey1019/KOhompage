'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { useEffect } from 'react';

const TiptapEditor = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Underline,
            Highlight,
            Image,
            Typography,
            Link.configure({ openOnClick: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Table.configure({ resizable: false }),
            TableRow,
            TableHeader,
            TableCell,
            Blockquote,
            HardBreak,
            HorizontalRule,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full min-h-[300px] px-4 py-3 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="border rounded p-2 space-y-2">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b pb-2">
                {[
                    { name: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
                    { name: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
                    { name: 'Underline', action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline') },
                    { name: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike') },
                    { name: 'Code', action: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code') },
                    { name: 'Highlight', action: () => editor.chain().focus().toggleHighlight().run(), isActive: editor.isActive('highlight') },
                    { name: 'P', action: () => editor.chain().focus().setParagraph().run() },
                    { name: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }) },
                    { name: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
                    { name: '• List', action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
                    { name: '1. List', action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
                    { name: '❝ Quote', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
                    { name: '↵ Line Break', action: () => editor.chain().focus().setHardBreak().run() },
                    { name: '― Divider', action: () => editor.chain().focus().setHorizontalRule().run() },
                    { name: 'Left', action: () => editor.chain().focus().setTextAlign('left').run() },
                    { name: 'Center', action: () => editor.chain().focus().setTextAlign('center').run() },
                    { name: 'Right', action: () => editor.chain().focus().setTextAlign('right').run() },
                    {
                        name: '📊 Table',
                        action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
                    },
                    {
                        name: '📷 Image',
                        action: () => {
                            const url = window.prompt('Image URL');
                            if (url) editor.chain().focus().setImage({ src: url }).run();
                        },
                    },
                    {
                        name: '🔗 Link',
                        action: () => {
                            const url = window.prompt('링크를 입력하세요');
                            if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                        },
                    },
                ].map(({ name, action, isActive }) => (
                    <button
                        key={name}
                        type="button"
                        onClick={action}
                        className={`text-sm px-2 py-1 rounded border ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
