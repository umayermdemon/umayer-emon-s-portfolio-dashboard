/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CornerDownLeft,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Minus,
  RedoDotIcon,
  Strikethrough,
  TextQuoteIcon,
  Underline,
  UndoDotIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "../../toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <UndoDotIcon className="size-4" />,
      tooltip: "Undo",
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <RedoDotIcon className="size-4" />,
      tooltip: "Redo",
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Heading1 className="size-4" />,
      tooltip: "Heading 1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      tooltip: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      tooltip: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      tooltip: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      tooltip: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-4" />,
      tooltip: "Underline",
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      tooltip: "Strikethrough",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <TextQuoteIcon className="size-4" />,
      tooltip: "Blockquote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      tooltip: "Align Left",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      tooltip: "Align Center",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      tooltip: "Align Right",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      tooltip: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      tooltip: "Ordered List",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      tooltip: "Code Block",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("CodeBlock"),
    },
    {
      icon: <Minus className="size-4" />,
      tooltip: "Horizontal Rule",
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: editor.isActive("horizontalRule"),
    },
    {
      icon: <ImageIcon className="size-4" />,
      tooltip: "Insert Image",
      onClick: () => {
        const url = window.prompt("Enter image URL");
        if (!url) return;
        const width = window.prompt("Enter width (e.g. 300px or 50%)", "300px");
        const align = window.prompt(
          "Enter alignment (left, center, right)",
          "center"
        );

        let style = `width: ${width}; display: block;`;
        if (align === "left") {
          style += "margin-left: 0; margin-right: auto;";
        } else if (align === "right") {
          style += "margin-left: auto; margin-right: 0;";
        } else {
          style += "margin-left: auto; margin-right: auto;";
        }

        editor
          .chain()
          .focus()
          .setImage({
            src: url,
            style,
          } as any)
          .run();
      },
      pressed: false,
    },
    {
      custom: (
        <div className="control-group">
          <div className="button-group flex items-center gap-1">
            <input
              type="color"
              onInput={(event) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes("textStyle").color || "#000000"}
              data-testid="setColor"
              className="w-6 h-6 border p-0"
            />
            {[
              { color: "#FF0000" },
              { color: "#F9A825" },
              { color: "#0000FF" },
              { color: "#008000" },
            ].map(({ color }) => (
              <button
                key={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className={`rounded-full p-2 border cursor-pointer ${
                  editor.isActive("textStyle", { color }) ? "bg-black" : ""
                }`}
                style={{
                  backgroundColor: color,
                }}
                type="button"></button>
            ))}
            <button
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="rounded px-2 py-1 border cursor-pointer flex items-center justify-center"
              data-testid="unsetColor"
              type="button"
              title="Remove Color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m2 0V2m0 2v2m0 0h4m-4 0h4m-7 7l10 10"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
      tooltip: "Text Color",
      pressed: false,
    },
    {
      icon: <CornerDownLeft className="size-4" />,
      tooltip: "Enter",
      onClick: () => editor.chain().focus().setHardBreak().run(),
      pressed: editor.isActive("hardBreak"),
    },
  ];

  return (
    <TooltipProvider>
      <div className="border rounded-md p-1 bg-slate-50 space-x-2 z-50 flex flex-wrap items-center">
        {Options.map((option, index) =>
          option.custom ? (
            <div key={index} className="inline-block">
              {option.custom}
            </div>
          ) : (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={option.pressed}
                  onPressedChange={option.onClick}
                  className="cursor-pointer">
                  {option.icon}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{option.tooltip}</TooltipContent>
            </Tooltip>
          )
        )}
      </div>
    </TooltipProvider>
  );
}
