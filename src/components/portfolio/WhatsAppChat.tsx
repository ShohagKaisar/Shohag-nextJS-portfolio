"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { developerInfo } from "@/lib/portfolio-data";
import { MessageCircle, X, Send, Minus } from "lucide-react";

export function WhatsAppChat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; isMe: boolean; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      if (messages.length === 0) {
        setMessages([
          {
            text: `Hi! I'm ${developerInfo.name}. Thanks for visiting my portfolio! 👋`,
            isMe: false,
            time: getTime(),
          },
          {
            text: "How can I help you today?",
            isMe: false,
            time: getTime(),
          },
        ]);
      }
    } else {
      setIsOpen(false);
      setIsMinimized(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { text: userMessage, isMe: true, time: getTime() },
    ]);

    // Simulate auto-reply after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! For a direct conversation, please click below to chat with me on WhatsApp.",
          isMe: false,
          time: getTime(),
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openWhatsApp = () => {
    window.open(developerInfo.social.whatsapp, "_blank");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center relative group"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Notification dot */}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
            />
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {t.whatsapp.tooltip}
            </span>
          </motion.button>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-background"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src={developerInfo.profileImage}
                    alt={developerInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    {developerInfo.name}
                  </h4>
                  <p className="text-xs text-green-100">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-8 h-8 rounded-full hover:bg-green-700 flex items-center justify-center transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={handleOpen}
                  className="w-8 h-8 rounded-full hover:bg-green-700 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-muted/30">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      msg.isMe
                        ? "bg-green-500 text-white rounded-br-md"
                        : "bg-card text-foreground border border-border/50 rounded-bl-md"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        msg.isMe ? "text-green-100" : "text-muted-foreground"
                      } text-right`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp CTA */}
            <div className="px-4 py-2 bg-muted/30 border-t border-border/30">
              <button
                onClick={openWhatsApp}
                className="w-full py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue on WhatsApp
              </button>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-full bg-muted/50 border border-border/50 text-sm outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Button */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsMinimized(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center relative"
            >
              <MessageCircle className="h-6 w-6" />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold"
              >
                {messages.length}
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
