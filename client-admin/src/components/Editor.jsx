import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] bg-[#021321] border border-white/6 rounded px-3 py-2 outline-none text-white",
      },
    },
  });

  return (
    <div className="text-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
