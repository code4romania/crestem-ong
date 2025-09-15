import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoUploadProps {
  disabled?: boolean;
  onImageChange?: (file: File | null) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LogoUpload({
  disabled = false,
  onImageChange,
  className,
  size = "md",
}: LogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const handleFileSelect = (file: File) => {
    if (disabled) return;
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageChange?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDelete = () => {
    if (disabled) return;
    setPreview(null);
    onImageChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative group transition-all duration-200",
          sizeClasses[size],
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          isDragOver && !disabled && "scale-105"
        )}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Avatar
          className={cn(
            "w-full h-full",
            isDragOver && !disabled && "ring-2 ring-primary"
          )}
        >
          <AvatarImage src={preview || undefined} alt="Previzualizare siglă" />
          <AvatarFallback className="bg-muted">
            <ImageIcon className="w-1/2 h-1/2 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {!disabled && (
          <>
            {/* Upload overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                isDragOver && "opacity-100"
              )}
            >
              <Upload className="w-6 h-6 text-white" />
            </div>

            {/* Delete button */}
            {preview && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {disabled
            ? "Încărcarea este dezactivată"
            : preview
            ? "Apasă pentru a schimba poza"
            : "Apasă sau trage fișierul pentru a încărca poza"}
        </p>
        {!disabled && (
          <p className="text-xs text-muted-foreground mt-1">
            Formate acceptate: PNG, JPG
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
