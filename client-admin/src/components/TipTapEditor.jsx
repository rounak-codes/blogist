// client-admin/src/components/TipTapEditor.jsx
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EditorContent, useEditor, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Blockquote from "@tiptap/extension-blockquote";
import axios from "axios";

/**
 * TipTapEditor
 *
 * Props:
 * - value: initial HTML content
 * - onChange: (html) => void
 * - apiBase: base API url (e.g. import.meta.env.VITE_API_BASE)
 * - className: optional wrapper className
 *
 * Exposed methods via ref:
 * - getHTML()
 * - setHTML(html)
 * - insertImage(url)
 * - insertText(text)
 * - focus()
 */

const TipTapEditor = forwardRef(
  ({ value = "", onChange = () => {}, apiBase = "/api", className = "" }, ref) => {
    const token = localStorage.getItem("admin_secret") || "";

    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [linkHref, setLinkHref] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
      extensions: [
        StarterKit.configure({ history: true }),
        Underline,
        Highlight,
        Link.configure({ openOnClick: true, autolink: true }),
        Image.configure({ inline: false, HTMLAttributes: { class: "rounded" } }),
        Dropcursor,
        Placeholder.configure({ placeholder: "Start writing your post..." }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Blockquote,
      ],
      content: value,
      onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    // expose API to parent
    useImperativeHandle(ref, () => ({
      getHTML: () => editor?.getHTML(),
      setHTML: (html) => editor?.commands.setContent(html),
      insertImage: (url) => editor?.chain().focus().setImage({ src: url }).run(),
      insertText: (t) => editor?.chain().focus().insertContent(t).run(),
      focus: () => editor?.commands.focus(),
    }), [editor]);

    // upload helper for paste/drop/tool
    const uploadFileToServer = useCallback(
      async (file) => {
        if (!file) throw new Error("No file");
        setIsUploading(true);
        try {
          const fd = new FormData();
          fd.append("image", file);
          const res = await axios.post(`${apiBase}/uploads/image`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-admin-secret": token,
            },
          });
          setIsUploading(false);
          return res.data.secure_url || res.data.url || res.data;
        } catch (err) {
          setIsUploading(false);
          console.error("Upload failed", err);
          throw err;
        }
      },
      [apiBase, token]
    );

    // handle paste (images)
    useEffect(() => {
      if (!editor) return;
      const node = editor.view.dom;

      const onPaste = async (e) => {
        const file = e.clipboardData?.files?.[0];
        if (file && file.type.startsWith("image/")) {
          e.preventDefault();
          try {
            const url = await uploadFileToServer(file);
            editor.chain().focus().setImage({ src: url }).run();
          } catch {
            // ignore
          }
        }
      };

      node.addEventListener("paste", onPaste);
      return () => node.removeEventListener("paste", onPaste);
    }, [editor, uploadFileToServer]);

    // handle drop (images)
    useEffect(() => {
      if (!editor) return;
      const node = editor.view.dom;

      const onDrop = async (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image/")) {
          e.preventDefault();
          try {
            const url = await uploadFileToServer(file);
            editor.chain().focus().setImage({ src: url }).run();
          } catch {
            // ignore
          }
        }
      };

      node.addEventListener("drop", onDrop);
      return () => node.removeEventListener("drop", onDrop);
    }, [editor, uploadFileToServer]);

    // link modal handlers
    const openLinkModalForSelection = () => {
      if (!editor) return;
    
      setLinkHref("");
      setLinkModalOpen(true);
    
      setTimeout(() => {
        const el = document.getElementById("tiptap-link-input");
        if (el) el.focus();
      }, 50);
    };
    
    

    const applyLink = () => {
      if (!editor) return;
      if (!linkHref) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: linkHref }).run();
      }
      setLinkModalOpen(false);
      setLinkHref("");
    };

    if (!editor) return null;

    return (
      <div className={`tiptap-editor ${className}`}>
        {/* Toolbar */}
        <div className="mb-2 flex flex-wrap gap-2 items-center">
          <div className="bg-[#071422] border border-white/6 rounded flex gap-1 p-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-2 ${editor.isActive("bold") ? "bg-white/10 rounded" : ""}`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-2 ${editor.isActive("italic") ? "bg-white/10 rounded" : ""}`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-2 ${editor.isActive("underline") ? "bg-white/10 rounded" : ""}`}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-2 ${editor.isActive("strike") ? "bg-white/10 rounded" : ""}`}
              title="Strike"
            >
              S
            </button>

            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2" title="Bulleted list">•</button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2" title="Numbered list">1.</button>

            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-2" title="Blockquote">❝</button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-2 ${editor.isActive("heading", { level: 2 }) ? "bg-white/10 rounded" : ""}`}
              title="Heading H2"
            >
              H2
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().setTable({ rows: 2, cols: 2 }).run()}
              className="px-2"
              title="Insert table"
            >
              Tbl
            </button>

            <button
              type="button"
              onClick={() => openLinkModalForSelection()}
              className="px-2"
              title="Insert / edit link"
            >
              🔗
            </button>

            <label
              className="
                px-2 
                h-[44px] 
                flex items-center justify-center 
                cursor-pointer 
                select-none
                rounded
                hover:bg-white/10
              "
              title="Upload image"
            >
              <span className="text-[18px] leading-none">🖼️</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadFileToServer(file);
                    editor.chain().focus().setImage({ src: url }).run();
                  } catch {
                    alert("Upload failed");
                  } finally {
                    e.target.value = "";
                  }
                }}
              />
            </label>
          </div>

          <div className="text-sm text-white/60 ml-2">
            {isUploading ? "Uploading..." : ""}
          </div>
        </div>

        {/* Floating menu (contextual) */}
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-[#071422] border border-white/6 rounded p-1 flex gap-1">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2">B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2">I</button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-2">❝</button>
          </div>
        </FloatingMenu>

        {/* Bubble menu (selection) */}
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-[#071422] border border-white/6 rounded p-1 flex gap-1">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2">B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2">I</button>
            <button onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }} className="px-2">🔗</button>
          </div>
        </BubbleMenu>

        {/* Editor Content */}
        <div className="border border-white/10 rounded bg-[#021321] p-3 min-h-[320px]">
          <EditorContent editor={editor} />
        </div>

        {/* Link modal (simple) */}
        {linkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setLinkModalOpen(false)} />
            <div className="relative bg-[#071422] rounded p-4 w-[420px] border border-white/6">
              <h3 className="text-lg mb-2">Set link</h3>
              <input
                id="tiptap-link-input"
                value={linkHref}
                onChange={(e) => setLinkHref(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-2 rounded bg-[#021321] border border-white/6 outline-none"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={() => setLinkModalOpen(false)} className="px-3 py-1 rounded border border-white/6">Cancel</button>
                <button onClick={applyLink} className="px-3 py-1 rounded bg-[var(--accent)]">Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default TipTapEditor;
