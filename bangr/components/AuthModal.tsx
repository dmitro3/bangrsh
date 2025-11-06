import { useState } from "react";
import { X, Mail, Wallet, Twitter, User, Sparkles } from "lucide-react";
import { Input } from "./ui/input";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (method: string, address?: string) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async () => {
    setIsLoading(true);
    // Simulate email auth flow
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess?.("email");
      onClose();
    }, 1500);
  };

  const handleWalletAuth = () => {
    // Simulate wallet connection
    onAuthSuccess?.("wallet", "0x1234...5678");
    onClose();
  };

  const handleTwitterAuth = () => {
    // Simulate Twitter OAuth
    onAuthSuccess?.("twitter");
    onClose();
  };

  const handleGuestAuth = () => {
    // Guest mode - create temporary account
    onAuthSuccess?.("guest");
    onClose();
  };

  const authMethods = [
    {
      id: "email",
      icon: Mail,
      label: "Continue with Email",
      description: "Gasless, no wallet needed",
      color: "from-yellow-400 to-orange-500",
      action: handleEmailAuth,
      recommended: true,
    },
    {
      id: "wallet",
      icon: Wallet,
      label: "Connect Wallet",
      description: "MetaMask, WalletConnect, etc.",
      color: "from-purple-500 to-pink-500",
      action: handleWalletAuth,
    },
    {
      id: "twitter",
      icon: Twitter,
      label: "Sign in with Twitter",
      description: "Claim markets + verified badge",
      color: "from-blue-400 to-cyan-500",
      action: handleTwitterAuth,
    },
    {
      id: "guest",
      icon: User,
      label: "Continue as Guest",
      description: "Trade now, save account later",
      color: "from-gray-400 to-gray-600",
      action: handleGuestAuth,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl border-6 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl" style={{ fontWeight: 700 }}>
              Sign in to Bangr
            </h2>
          </div>
          <p className="text-gray-600 text-sm">
            Choose your preferred sign-in method
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 border-2 border-yellow-400 rounded-full">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-black" style={{ fontWeight: 600 }}>
              Gasless transactions enabled
            </span>
          </div>
        </div>

        {/* Auth Options */}
        <div className="space-y-3">
          {authMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={method.action}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-150 bg-gradient-to-r ${method.color} text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {method.recommended && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full border-2 border-black" style={{ fontWeight: 700 }}>
                    RECOMMENDED
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-lg mb-1" style={{ fontWeight: 700 }}>
                      {method.label}
                    </div>
                    <div className="text-sm opacity-90">{method.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Email Input (if email selected) */}
        {selectedMethod === "email" && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border-2 border-black">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 h-12 border-4 border-black rounded-xl"
            />
            <button
              onClick={handleEmailAuth}
              disabled={!email || isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontWeight: 700 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Send Magic Link ✨"
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to Bangr's Terms of Service. All transactions are gasless via Biconomy Account Abstraction.
          </p>
        </div>
      </div>
    </div>
  );
}

