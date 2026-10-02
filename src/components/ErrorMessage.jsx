import { AlertCircle } from "lucide-react";

function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 my-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm backdrop-blur-sm animate-in fade-in duration-200"
    >
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="font-semibold block text-rose-300">An error occurred</span>
        <p className="mt-0.5 text-rose-200/90">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
