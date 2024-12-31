import { useState, useEffect, useRef } from "react";
import { Input, Button, ConfigProvider } from 'antd';
import useSpeechToText from "../../hooks/useSpeechToText.jsx";

const VoiceInput = () => {
  const [textInput, setTextInput] = useState(""); // State to store the transcribed text
  const timeoutRef = useRef<any>(null); 
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({
    continuous: true, 
  });
  
  // Effect to update textInput whenever the transcript changes
  useEffect(() => {
    if (transcript !== null) {
      setTextInput(transcript); // Update the input with the latest transcript

      // Clear any existing timeout to avoid premature clearing of textInput
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to clear the textInput after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setTextInput("");
      }, 3000);
    }

    // Cleanup function to clear timeout when the component unmounts or transcript changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [transcript]);

  // Function to toggle between starting and stopping speech recognition
  const startStopListening = () => {
    isListening ? stopListening() : startListening(); // Toggle based on current listening state
  };

  return (
    <div
      style={{ padding: 20 }} 
    >
      <ConfigProvider wave={{ disabled: true }}>
      <Button 
        onClick={startStopListening} 
        style={{
          backgroundColor: isListening ? "#d62d20" : "#008744", 
          color: "white", 
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px", 
          cursor: "pointer", 
          transition: "background-color 0.3s ease",
        }}
      >
        {isListening ? "Stop Listening" : "Speak"} 
      </Button>
      </ConfigProvider>
      
      
      <Input
        style={{
          marginTop: "20px", 
          width: "100%", 
          height: "120px",
          padding: "12px",
          fontSize: "16px",
          lineHeight: "1.6",
          textAlign: "left",
        }}
        value={isListening ? textInput : ""}
        readOnly 
      />
    </div>
  );  
};

export default VoiceInput;
