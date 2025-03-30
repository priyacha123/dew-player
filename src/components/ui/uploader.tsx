"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, FileVideo, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploaderProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  label?: string;
  description?: string;
  value?: File | null;
  error?: string;
}

export function Uploader({
  accept,
  maxSize = 1024 * 1024 * 500, // 500MB default
  onUpload,
  onRemove,
  label = "Upload a file",
  description = "Drag and drop or click to upload",
  value,
  error,
}: UploaderProps) {
  const [progress, setProgress] = React.useState(0);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            onUpload?.(acceptedFiles[0]);
          }
        }, 100);
      }
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const FileIcon = value?.type.includes("video") ? FileVideo : FileText;

  return (
    <div className='w-full space-y-4'>
      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!value ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center",
            "hover:bg-accent/50 transition-colors cursor-pointer",
            isDragActive && "border-primary bg-accent/50",
            error && "border-destructive",
          )}
        >
          <input {...getInputProps()} />
          <Upload className={cn("h-10 w-10 mb-4", isDragActive ? "text-primary" : "text-muted-foreground")} />
          <p className='text-lg font-medium'>{label}</p>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      ) : (
        <div className='rounded-lg border p-6 space-y-4'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center space-x-4'>
              <FileIcon className='h-10 w-10 text-primary' />
              <div>
                <p className='font-medium'>{value.name}</p>
                <p className='text-sm text-muted-foreground'>{(value.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
          {progress < 100 && <Progress value={progress} />}
        </div>
      )}
    </div>
  );
}
