/**
 * FileUpload — Design System Component
 *
 * A styled file-selection trigger. Wraps a native <input type="file"> with a
 * drag-and-drop zone. Presentation-only — no HTTP upload logic.
 *
 * States: idle, drag-active, selected, disabled
 *
 * Accessibility:
 *   - The visible zone is a <label> wrapping a visually-hidden <input>.
 *   - <input> has aria-label describing the expected file.
 *   - Keyboard: Tab to focus the input; Enter/Space to open the picker.
 *   - Disabled: input has disabled attr; zone has aria-disabled="true".
 */

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { UploadCloud, X, File } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { composeRefs } from '../../../lib/composeRefs';

export interface FileUploadProps {
  /** Called when files are selected via picker or drop. */
  onFiles?: (files: File[]) => void;
  /** Accepted MIME types / extensions, forwarded to <input accept>. */
  accept?: string;
  /** Allow selecting multiple files. Default: false */
  multiple?: boolean;
  /** Disable the upload zone. */
  disabled?: boolean;
  /** Accessible label describing the expected file type. */
  'aria-label'?: string;
  /** Additional class on the root element. */
  className?: string;
  /** Controlled selected files. When provided, component uses this instead of internal state. */
  value?: File[];
  /** Called when files change in controlled mode. */
  onChange?: (files: File[]) => void;
  /** Ref forwarded to the hidden <input type="file"> element. */
  ref?: React.Ref<HTMLInputElement>;
}

export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  'aria-label': ariaLabel = 'Upload file',
  className = '',
  value,
  onChange,
  ref,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalFiles;

  const setFiles = (next: File[]) => {
    if (!isControlled) setInternalFiles(next);
    onChange?.(next);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    setFiles(multiple ? arr : [arr[0]!]);
    onFiles?.(multiple ? arr : [arr[0]!]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const removeFile = (i: number) => {
    setFiles(selected.filter((_, idx) => idx !== i));
  };

  const zoneClass = cn(
    'flex flex-col items-center justify-center gap-3',
    'rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer',
    'transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-blue/20',
    dragging
      ? 'border-brand-blue/60 bg-blue-50'
      : disabled
      ? 'border-slate-100 bg-slate-50/40 cursor-not-allowed'
      : 'border-slate-200 bg-white hover:border-brand-sky/50 hover:bg-[#eef2f8]',
    className,
  );

  return (
    <div className="space-y-3">
      <label
        className={zoneClass}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-disabled={disabled}
      >
        <input
          ref={composeRefs(inputRef, ref)}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          className="sr-only"
        />
        <UploadCloud
          size={32}
          className={dragging ? 'text-brand-blue' : disabled ? 'text-slate-300' : 'text-slate-400'}
          aria-hidden="true"
        />
        <div>
          <p className={`text-sm font-semibold ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>
            {dragging ? 'Drop to upload' : 'Click or drag files here'}
          </p>
          {accept && (
            <p className="mt-0.5 text-xs font-medium text-slate-400">{accept}</p>
          )}
        </div>
      </label>

      {selected.length > 0 && (
        <ul className="space-y-1.5" aria-label="Selected files">
          {selected.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
            >
              <File size={14} className="shrink-0 text-brand-sky" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">
                {file.name}
              </span>
              <span className="shrink-0 text-[10px] font-medium text-slate-400">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="ml-1 shrink-0 rounded p-0.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
