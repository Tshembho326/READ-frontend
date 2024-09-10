import React, { useState, useRef } from 'react';
import { PlayIcon, PauseIcon } from 'lucide-react';
import '../static/css/CaptureAudio.css';

const CaptureAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const websocketRef = useRef(null); 

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    // Open a WebSocket connection to the server
    websocketRef.current = new WebSocket('ws://127.0.0.1:8000/ws/transcribe/');

    websocketRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.alert) {
        setAlertMessage(data.alert); // Display alert if mistakes were made
      } else {
        setTranscription(data.transcription); // Set the transcription text
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      audioChunks.current = [];

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64AudioMessage = reader.result.split(',')[1]; // Extract the base64 string

        // Send the audio data to the WebSocket server
        websocketRef.current.send(JSON.stringify({ audio: base64AudioMessage }));
      };
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);

    // Close WebSocket connection after recording
    if (websocketRef.current) {
      websocketRef.current.close();
    }
  };

  return (
    <div className="capture-audio">
      <div className="controls">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={isRecording ? 'stop-button' : 'start-button'}
        >
          {isRecording ? <PauseIcon className="icon" /> : <PlayIcon className="icon" />}
        </button>
        {isRecording && <div className="wave-effect"></div>}
      </div>
      {alertMessage && (
        <div className="alert-container">
          <p>{alertMessage}</p>
        </div>
      )}
      {transcription && !alertMessage && (
        <div className="transcription-container">
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default CaptureAudio;
