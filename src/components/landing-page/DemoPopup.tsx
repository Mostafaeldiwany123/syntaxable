
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DemoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the demo
    const hasSeenDemo = localStorage.getItem("hasSeenDemoPopup");
    
    if (!hasSeenDemo) {
      // Show the popup after a short delay for a better entry feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem("hasSeenDemoPopup", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Welcome to Syntaxable</h3>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Content */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dtmqKdI5Bms?si=VmGMuW9dZTw5RgU3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Footer / CTA Area */}
            <div className="p-5 bg-background border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-medium text-foreground">See how it works</p>
                <p className="text-xs text-muted-foreground">
                  Quick walkthrough of our real-time collaborative features.
                </p>
              </div>
              <button
                onClick={closePopup}
                className="px-8 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity w-full sm:w-auto shadow-sm"
              >
                Start Exploring
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
