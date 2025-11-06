import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={3} />,
    error: <AlertCircle className="w-6 h-6 text-red-600" strokeWidth={3} />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-600" strokeWidth={3} />
  };

  const emoji = {
    success: "✅",
    error: "❌",
    warning: "⚠️"
  };

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-5 duration-300">
      <div className="bg-white rounded-xl border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] p-4 w-80">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{emoji[type]}</span>
          <div className="flex-1">
            <p className="text-black" style={{ fontWeight: 500 }}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
