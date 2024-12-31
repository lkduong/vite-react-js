import { useEffect, useRef, useState } from 'react'

// Custom hook for speech-to-text functionality
const useSpeechToText = (options: any): SpeechToTextHook => {
    const [isListening, setIsListening] = useState(false) // State to track whether the microphone is active
    const [transcript, setTranscript] = useState("") // State to store the recognized speech text
    const recognitionRef = useRef<any>(null) // Ref to hold the speech recognition instance
    console.log('Trans', transcript)

    useEffect(() => {
        // Check if the Web Speech API is supported by the browser
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Web speech API is not supported.")
            return
        }

        // Initialize the speech recognition object
        recognitionRef.current = new (window as any).webkitSpeechRecognition();
        const recognition: any = recognitionRef.current;

        
            // Set up speech recognition options
        recognition.interimResults = options.interimResults || true 
        recognition.lang = options.lang || "en-US" // Language for speech recognition
        recognition.continuous = options.continuous || false 
        // Add a custom grammar for punctuation
        if ("webkitSpeechGrammarList" in window) {
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new (window as any).webkitSpeechGrammarList()
            speechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionList
        }

        // Handle speech recognition results
        recognition.onresult = (event: any) => {
            let latestResult = "" 
            for (let i = event.resultIndex; i < event.results.length; i++) {
                latestResult += event.results[i][0].transcript 
            }
            setTranscript(latestResult) 
        }

        // Handle speech recognition errors
        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error)
        }

        // Handle when speech recognition ends
        recognition.onend = () => {
            setIsListening(false) 
            setTranscript("") 
        }

        // Cleanup function to stop recognition when the component unmounts
        return () => {
            recognition.stop()
        }
        

        
    }, [])

    // Start speech recognition
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start() 
            setIsListening(true) 
            setTranscript("") 
        }
    }

    // Stop speech recognition
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false) 
        }
    }

    return {
        isListening, 
        transcript, 
        startListening, 
        stopListening 
    }
}

interface SpeechToTextHook {
    isListening: boolean;
    transcript: string | null;
    startListening: () => void;
    stopListening: () => void;
};

export default useSpeechToText
