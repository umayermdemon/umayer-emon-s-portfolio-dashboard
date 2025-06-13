/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextStyle from "@tiptap/extension-text-style";
import { useEffect } from "react";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const TextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: any;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-black text-white rounded-md px-2 py-1 font-mono w-1/3",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-200 pl-2",
        },
      }),
      CustomImage.configure({
        inline: true,
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "border-b border-gray-300 my-4",
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "bg-[0f172a] border text-white border-2 border-white rounded-md px-3 py-2 h-[360px] container mx-auto overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "", false);
    }
  }, [content, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
