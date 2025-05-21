// 글자색 & 글자 배경 색 추가(임의 새로)

// text-color-extension.ts
import { Mark, mergeAttributes } from '@tiptap/core'

export const TextColor = Mark.create({
    name: 'textColor',
    addOptions() {
        return {
            types: ['textStyle'],
        }
    },
    addAttributes() {
        return {
            color: {
                default: null,
                parseHTML: el => el.style.color,
                renderHTML: attributes => {
                    if (!attributes.color) return {}
                    return { style: `color: ${attributes.color}` }
                },
            },
        }
    },
    parseHTML() {
        return [
            {
                style: 'color',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0]
    },
})
