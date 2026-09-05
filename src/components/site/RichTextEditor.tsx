import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link2, ImagePlus, Heading2, Heading3, Quote, Loader2 } from "lucide-react";
import { uploadBlogImageAdmin } from "@/lib/blogs.server";

// Deliberately not TipTap/ProseMirror: those add ~100KB+ of JS for a single
// admin-only editor used by one person. `document.execCommand` is
// deprecated-but-still-supported in every current browser for exactly this
// use case (basic formatting in a trusted, non-public-facing editor), and
// keeps this file self-contained with zero extra dependencies. If browser
// support for execCommand is ever dropped, swap this component only — the
// rest of the blog pipeline (storage, sanitizing, rendering) doesn't care
// how the HTML was produced.

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const buttonClass =
  "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Set innerHTML once on mount / when switching which blog is being edited,
  // without fighting React on every keystroke.
  if (editorRef.current && !initializedRef.current) {
    editorRef.current.innerHTML = value;
    initializedRef.current = true;
  }

  const emitChange = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  function exec(command: string, arg?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    emitChange();
  }

  function handleLink() {
    const url = window.prompt("Link URL");
    if (!url) return;
    exec("createLink", url);
  }

  async function handleImagePick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Image is too large (max 5MB).");
      return;
    }
    setUploadingImage(true);
    try {
      const base64Data = await fileToDataUrl(file);
      const result = await uploadBlogImageAdmin({
        data: { fileName: file.name, contentType: file.type, base64Data },
      });
      exec("insertImage", result.url);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-input bg-background">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 p-1.5">
        <button type="button" className={buttonClass} title="Bold" onClick={() => exec("bold")}>
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" className={buttonClass} title="Italic" onClick={() => exec("italic")}>
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" className={buttonClass} title="Underline" onClick={() => exec("underline")}>
          <Underline className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button
          type="button"
          className={buttonClass}
          title="Heading"
          onClick={() => exec("formatBlock", "<h2>")}
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass}
          title="Subheading"
          onClick={() => exec("formatBlock", "<h3>")}
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass}
          title="Quote"
          onClick={() => exec("formatBlock", "<blockquote>")}
        >
          <Quote className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button
          type="button"
          className={buttonClass}
          title="Bullet list"
          onClick={() => exec("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass}
          title="Numbered list"
          onClick={() => exec("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button type="button" className={buttonClass} title="Link" onClick={handleLink}>
          <Link2 className="h-4 w-4" />
        </button>
        <label className={`${buttonClass} cursor-pointer`} title="Insert image">
          {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} disabled={uploadingImage} />
        </label>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        className="prose-editor min-h-[260px] max-w-none px-4 py-3 text-sm leading-relaxed text-foreground outline-none [&_blockquote]:border-l-2 [&_blockquote]:border-teal [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:mt-3 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mt-2 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_img]:my-3 [&_img]:rounded-lg [&_li]:ml-5 [&_ol]:list-decimal [&_p]:my-2 [&_ul]:list-disc"
        data-placeholder="Write your post…"
      />
    </div>
  );
}
