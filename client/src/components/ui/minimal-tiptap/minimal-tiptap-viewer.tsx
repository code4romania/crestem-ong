import "./styles/index.css";

import type { Content } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useMinimalTiptapEditor } from "./hooks/use-minimal-tiptap";

export interface MinimalTiptapViewerProps {
  value?: Content;
  className?: string;
  editorContentClassName?: string;
}

export function MinimalTiptapViewer({
  value,
  className,
  editorContentClassName,
}: MinimalTiptapViewerProps) {
  const editor = useMinimalTiptapEditor({
    value,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
    </div>
  );
}

export default MinimalTiptapViewer;
