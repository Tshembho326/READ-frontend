import React, { useState, useRef } from 'react';
import '../static/css/CaptureAudio.css';

const CaptureAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      audioChunks.current = [];
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        const response = await fetch('http://127.0.0.1:8000/transcribe/', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setTranscription(data.transcription);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  return (
    <>
      <div className="controls">
        <button 
          onClick={isRecording ? handleStopRecording : handleStartRecording} 
          className={isRecording ? 'stop-button' : 'start-button'}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      {transcription && (
        <div className="transcription-container">
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </>
  );
};

export default CaptureAudio;
