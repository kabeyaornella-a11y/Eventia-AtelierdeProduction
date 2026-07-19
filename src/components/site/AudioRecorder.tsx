import { useRef, useState } from "react";
import { Mic, Square, Send, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

function mimeToExt(mime: string): string {
  if (mime.includes("mp4")) return "m4a";
  if (mime.includes("ogg")) return "ogg";
  if (mime.includes("wav")) return "wav";
  return "webm";
}

/** Enregistreur de message vocal navigateur (MediaRecorder), sans dépendance. */
export function AudioRecorder({
  onSend,
  disabled = false,
}: {
  onSend: (blob: Blob, ext: string, durationSeconds: number) => Promise<void>;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<{ data: Blob; ext: string; url: string } | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [sending, setSending] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const start = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      toast.error("Micro non disponible sur cet appareil/navigateur.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const mime = mr.mimeType || "audio/webm";
        const data = new Blob(chunksRef.current, { type: mime });
        setBlob({ data, ext: mimeToExt(mime), url: URL.createObjectURL(data) });
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      recorderRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      toast.error("Impossible d'accéder au micro — vérifiez les autorisations.");
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    if (blob) URL.revokeObjectURL(blob.url);
    setBlob(null);
    setSeconds(0);
  };

  const send = async () => {
    if (!blob) return;
    setSending(true);
    try {
      await onSend(blob.data, blob.ext, seconds);
      reset();
    } finally {
      setSending(false);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (blob) {
    return (
      <div className="bg-ivory border border-primary/15 p-5 space-y-3">
        <audio src={blob.url} controls className="w-full" />
        <div className="flex gap-2">
          <button
            onClick={send}
            disabled={sending || disabled}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50"
          >
            {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}{" "}
            Envoyer
          </button>
          <button
            onClick={reset}
            disabled={sending}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.18em] uppercase text-muted-foreground border border-border hover:text-destructive"
          >
            <Trash2 className="size-4" /> Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory border border-primary/15 p-5 text-center">
      {recording ? (
        <button
          onClick={stop}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-destructive hover:opacity-90"
        >
          <Square className="size-4" /> Arrêter ({mm}:{ss})
        </button>
      ) : (
        <button
          onClick={start}
          disabled={disabled}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50"
        >
          <Mic className="size-4" /> Enregistrer un message
        </button>
      )}
    </div>
  );
}
