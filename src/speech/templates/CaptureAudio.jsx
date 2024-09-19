import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, LoaderIcon } from 'lucide-react';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import '../static/css/CaptureAudio.css';

const CHUNK_SIZE_MS = 5000; 

const CaptureAudio = ({ storyTitle, onStartRecording, onPauseRecording, onResults }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [missedWords, setMissedWords] = useState([]); 
  const [audioFiles, setAudioFiles] = useState([]);   
  const [alertMessage, setAlertMessage] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunksBuffer = useRef([]);

  useEffect(() => {
    return () => {
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksBuffer.current.push(event.data);
          if (audioChunksBuffer.current.length * (CHUNK_SIZE_MS / 1000) >= CHUNK_SIZE_MS) {
            sendChunkedAudio();
          }
        }
      };

      mediaRecorder.current.onstop = () => {
        sendChunkedAudio(true);
      };

      mediaRecorder.current.start();
      setIsRecording(true);

      if (onStartRecording) {
        onStartRecording();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      setAlertMessage('Error accessing the microphone.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);

    if (onPauseRecording) {
      onPauseRecording();
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  };

  const sendChunkedAudio = (isFinal = false) => {
    if (audioChunksBuffer.current.length > 0) {
      const audioBlob = new Blob(audioChunksBuffer.current, { type: 'audio/webm' });
      audioChunksBuffer.current = [];

      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('title', storyTitle);
      formData.append('email', localStorage.getItem('email'))

      const csrfToken = getCookie('csrftoken');
      setIsTranscribing(true);

      fetch('http://127.0.0.1:8000/transcribe/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        }
      })
      .then(response => response.json())
      .then(data => {
        setIsTranscribing(false);
        if (data.error) {
          setAlertMessage(data.error);
        } else {
          setMissedWords(data.missed_words || []); // Ensure missed_words is an array
          setAudioFiles(data.audio_files || []);   // Ensure audio_files is an array
          // Pass the results to the parent component
          if (onResults) {
            onResults({
              missedWords: data.missed_words || [],
              audioFiles: data.audio_files || [],
              totalWords: data.total_words || 0,
              correctWords: data.correct_words || 0,
            });
          }
        }
      })
      .catch(error => {
        console.error('Error sending audio:', error);
        setAlertMessage('Error sending audio.');
        setIsTranscribing(false);
      });
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
      </div>

      {isRecording && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder.current}
          width={200}
          height={75}
        />
      )}

      {isTranscribing && (
        <div className="transcribing-message">
          <LoaderIcon className="loader" />
          <p>Transcribing your audio, please wait...</p>
        </div>
      )}

      {alertMessage && (
        <div className="alert-container">
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CaptureAudio;
