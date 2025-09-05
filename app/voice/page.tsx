// VADComponent.tsx
"use client"; // if using Next.js App Router
import { useState } from "react";
import { setupStreamingVAD } from "@/lib/hooks/useMicVAD";

export default function VADComponent() {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);
    await setupStreamingVAD();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">🎤 Voice Activity Detection</h2>
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          Start VAD
        </button>
      ) : (
        <p className="text-green-600 font-medium">Listening... Speak now!</p>
      )}
    </div>
  );
}
