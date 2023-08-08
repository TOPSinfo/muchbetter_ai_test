import { useRef, useState, useEffect } from "react";
import "./App.css";
import { scripts } from "./scripts";

function App() {
  const [isListening, setIsListening] = useState(false);

  const microphoneRef = useRef(null);

  useEffect(() => {
    scripts.forEach(function (url) {
      let script = document.createElement("script");
      script.src = url;
      script.async = false;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    });
  }, []);

  const loadVadDetector = async () => {
    // eslint-disable-next-line no-undef
    const myvad = await vad.MicVAD.new({
      onSpeechStart: () => {
        console.log("Started Speaking");
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
      },
      onSpeechEnd: (audio) => {
        console.log("Stoped Speaking");
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
      },
    });
    myvad.start();
  };

  const handleListing = () => {
    setIsListening(true);
    loadVadDetector();
  };

  const stopHandle = () => {
    setIsListening(false);
  };

  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Not Listening...."}
        </div>
        {isListening ? (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop Listening
          </button>
        ) : (
          <button className="microphone-stop btn" onClick={handleListing}>
            Start Listening
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
