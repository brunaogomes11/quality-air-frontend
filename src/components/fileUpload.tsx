import { cn } from "@/utils/cn";
import {
  File as FileIcon,
  FileImage,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { toast } from "sonner";

type ExistingFile = {
  name: string;
  type: string;
  url?: string;
};

interface FileUploaderProps {
  onFilesSelected: (files: (File | ExistingFile)[]) => void;
  /** Aceita string (".xml", "application/xml,text/xml,.xml") OU o objeto Accept do react-dropzone */
  accept?: Accept | string;
  error?: string;
  multiple?: boolean;
  className?: string;
  label?: string;
  resetKey?: string | number;
  values?: (File | ExistingFile)[];
}

const isBrowserFile = (f: File | ExistingFile): f is File =>
  typeof File !== "undefined" && f instanceof File;

const getDisplayName = (f: File | ExistingFile) =>
  isBrowserFile(f) ? f.name : f.name;
const getMimeType = (f: File | ExistingFile) =>
  isBrowserFile(f) ? f.type : f.type;

// ---------- helpers de validação ----------
type NormalizedAccept = {
  mimes: Set<string>;
  wildcardMimes: Set<string>;
  exts: Set<string>;
};

const normalizeAccept = (accept?: Accept | string): NormalizedAccept | null => {
  if (!accept) return null;

  const mimes = new Set<string>();
  const wildcardMimes = new Set<string>();
  const exts = new Set<string>();

  if (typeof accept === "string") {
    accept
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((tok) => {
        if (tok.startsWith(".")) exts.add(tok.toLowerCase());
        else if (tok.includes("/*")) wildcardMimes.add(tok.toLowerCase());
        else if (tok.includes("/")) mimes.add(tok.toLowerCase());
      });
  } else {
    Object.entries(accept).forEach(([mime, extList]) => {
      if (mime.includes("/*")) wildcardMimes.add(mime.toLowerCase());
      else mimes.add(mime.toLowerCase());
      (extList ?? []).forEach((e) => exts.add(e.toLowerCase()));
    });
  }

  return { mimes, wildcardMimes, exts };
};

const fileMatches = (file: File, acc: NormalizedAccept | null) => {
  if (!acc) return true;
  const type = (file.type || "").toLowerCase();
  const ext = ("." + (file.name.split(".").pop() || "")).toLowerCase();

  if (type && acc.mimes.has(type)) return true;
  for (const w of acc.wildcardMimes) {
    const base = w.split("/")[0];
    if (type.startsWith(base + "/")) return true;
  }
  if (ext && acc.exts.has(ext)) return true;

  // casos de arquivos que vêm sem MIME: valida pela extensão
  if (!type && ext && acc.exts.size > 0) return acc.exts.has(ext);

  return false;
};

const acceptLabel = (accept?: Accept | string) => {
  if (!accept) return "qualquer tipo";
  if (typeof accept === "string") return accept;
  const parts: string[] = [];
  Object.entries(accept).forEach(([mime, exts]) => {
    parts.push(mime);
    (exts ?? []).forEach((e) => parts.push(e));
  });
  return parts.join(", ");
};
// ---------- fim helpers ----------

const FileUploader = ({
  onFilesSelected,
  accept, // default útil pro seu caso
  error,
  multiple,
  className,
  label,
  resetKey,
  values,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<(File | ExistingFile)[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  const isControlled = values !== undefined;
  const currentFiles = useMemo(
    () => (isControlled ? values! : files),
    [isControlled, values, files]
  );

  const accNorm = useMemo(() => normalizeAccept(accept), [accept]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejections: FileRejection[]) => {
      // validação manual adicional (ext/MIME)
      const passed: File[] = [];
      const blocked: File[] = [];

      acceptedFiles.forEach((f) =>
        fileMatches(f, accNorm) ? passed.push(f) : blocked.push(f)
      );

      const invalidCount = blocked.length + (rejections?.length || 0);
      if (invalidCount > 0) {
        setLocalError(
          `Tipo de arquivo não permitido. Aceitos: ${acceptLabel(accept)}.`
        );
        toast.error(
          `Tipo de arquivo não permitido. Aceitos: ${acceptLabel(accept)}.`
        );
      }

      if (passed.length === 0) return;

      const next = multiple ? [...currentFiles, ...passed] : [passed[0]];
      if (isControlled) onFilesSelected(next);
      else {
        setFiles(next);
        onFilesSelected(next);
      }
    },
    [accNorm, multiple, currentFiles, isControlled, onFilesSelected, accept]
  );

  // NOTE: useDropzone aceita objeto Accept; se vier string, passamos no input abaixo
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: typeof accept === "string" ? undefined : accept,
    multiple: multiple ?? false,
  });

  const renderFileIcon = (type: string) => {
    if (type?.startsWith("image/"))
      return <FileImage className="h-5 w-5 text-primary" />;
    if (type === "application/pdf")
      return <FileText className="h-5 w-5 text-destructive" />;
    return <FileIcon className="h-5 w-5 text-gray" />;
  };

  const removeFile = (indexToRemove: number) => {
    const updated = currentFiles.filter((_, index) => index !== indexToRemove);
    if (isControlled) onFilesSelected(updated);
    else {
      setFiles(updated);
      onFilesSelected(updated);
    }
  };

  useEffect(() => {
    if (!isControlled) setFiles([]);
  }, [resetKey, isControlled]);

  useEffect(() => {
    return () => {
      currentFiles.forEach((f) => {
        if (isBrowserFile(f)) {
          try {
            URL.revokeObjectURL(f as any);
          } catch {}
        }
      });
    };
  }, [currentFiles]);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="pt-4">
        {label && (
          <div className="pb-2">
            <label>{label}</label>
          </div>
        )}

        <div
          {...getRootProps()}
          className={cn(
            "hover:bg-accent cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all",
            isDragActive
              ? "border-blue/40 bg-blue/5"
              : error || localError
              ? "border-red/50"
              : "border-gray/30"
          )}
        >
          {/* aqui forçamos o atributo accept quando vier string */}
          <input
            {...getInputProps({
              accept: typeof accept === "string" ? accept : undefined,
            })}
          />

          <div className="flex flex-col items-center space-y-2">
            <UploadCloud className="h-6 w-6" />
            <p className="text-sm">
              {isDragActive
                ? "Solte os arquivos aqui..."
                : "Arraste ou clique para selecionar"}
            </p>
            <p className="text-xs text-muted-foreground">
              Aceitos: {acceptLabel(accept)}
            </p>

            {currentFiles?.length > 0 && (
              <div className="mt-4 w-full max-w-sm space-y-2">
                {currentFiles.map((item, index) => {
                  const type = getMimeType(item);
                  const name = getDisplayName(item);
                  return (
                    <div
                      key={`${name}-${index}`}
                      className="flex items-center justify-between rounded border px-3 py-2 text-left"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {renderFileIcon(type)}
                        {!isBrowserFile(item) && item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-sm underline underline-offset-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {name}
                          </a>
                        ) : (
                          <span className="truncate text-sm">{name}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="text-gray-500 hover:text-red-500"
                        aria-label={`Remover ${name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {(error || localError) && (
          <p className="text-xs text-red-500 mt-1">{error ?? localError}</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
