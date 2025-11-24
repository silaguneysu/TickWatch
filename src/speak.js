export function speakText(text) {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support speech.');
      return;
    }
  
    // Stop any current speech
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;     // speed (0.5–2)
    utterance.pitch = 1;    // voice pitch
  
    window.speechSynthesis.speak(utterance);
  }
  