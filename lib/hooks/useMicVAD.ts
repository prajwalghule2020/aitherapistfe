import { MicVAD } from "@ricky0123/vad-web";

export async function setupStreamingVAD() {
  // 1. Open WebSocket connection
  const ws = new WebSocket("ws://localhost:8000/ws");

  ws.onopen = () => {
    console.log("Connected to backend");
  };

  const myvad = await MicVAD.new({
    onSpeechStart: () => {
      console.log("Speech started");
      ws.send(JSON.stringify({ event: "speech_start" }));
    },

    onFrameProcessed: (probs, frame) => {
      console.log("Frame processed, isSpeech:", probs.isSpeech);
      // Only stream if it's speech
      if (probs.isSpeech > 0.5 && ws.readyState === WebSocket.OPEN) {
        // Convert Float32Array to raw PCM bytes
        const pcm16 = floatTo16BitPCM(frame);
        ws.send(pcm16);
      }
    },

    onSpeechEnd: (audio) => {
      console.log("Speech ended");
      ws.send(JSON.stringify({ event: "speech_end" }));
     
    },
  });

  myvad.start();
}

// Utility: convert Float32Array → Int16 PCM
function floatTo16BitPCM(float32Array: Float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}




