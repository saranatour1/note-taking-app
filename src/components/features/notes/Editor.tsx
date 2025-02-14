'use client'

import { useEditor, EditorContent, EditorContentProps, Extension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
interface EditorProps extends Partial<EditorContentProps>{
  value?:string|undefined;
  onSave?: (s:string) => void;
  disableEnter?: boolean;
}
const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});

const Tiptap = ({value ,className ,disableEnter=false}:EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, ...(disableEnter ? [DisableEnter] : [])],
    content: value,
    autofocus:false,
  })

  return <EditorContent className={className} editor={editor} disabled/>
}

export default Tiptap
