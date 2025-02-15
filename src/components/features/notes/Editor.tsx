'use client'

import { useEditor, EditorContent, EditorContentProps, Extension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown';
import React from 'react'
interface EditorProps extends Partial<EditorContentProps>{
  value?:string|undefined;
  onSave?: (s:string) => void;
  disableEnter?: boolean;
  getMarkdownValue?:(data:string)=> void
}
const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});

const Tiptap = ({value ,className ,disableEnter=false, getMarkdownValue}:EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, ...(disableEnter ? [DisableEnter] : []),Markdown.configure({breaks:true})],
    content: value,
    autofocus:false,
    immediatelyRender:false,
    onUpdate({editor}) {
      const markdown = editor.storage.markdown.getMarkdown()
      getMarkdownValue?.(markdown)
    },
  })

  return <EditorContent className={className} editor={editor} />
}

export default Tiptap
