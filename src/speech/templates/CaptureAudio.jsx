import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import '../static/css/CaptureAudio.css';

const CaptureAudio = ({ storyTitle }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [missedWords, setMissedWords] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null); // State for mediaRecorder
  const audioChunks = useRef([]);

  useEffect(() => {
    return () => {
      // Cleanup mediaRecorder on unmount
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder); // Set mediaRecorder state

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        sendFullAudio(); // Send full audio after stopping
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setAlertMessage('Error accessing the microphone.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  };

  const sendFullAudio = () => {
    if (audioChunks.current.length > 0) {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      audioChunks.current = []; // Reset the audio chunks

      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('title', storyTitle);

      const csrfToken = getCookie('csrftoken');
      setIsTranscribing(true); // Show transcribing message/loader

      fetch('http://127.0.0.1:8000/transcribe/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        }
      })
      .then(response => response.json())
      .then(data => {
        setIsTranscribing(false); // Hide loader
        if (data.error) {
          setAlertMessage(data.error);
        } else {
          setMissedWords(data.missed_words); // Display missed words
          setAudioFiles(data.audio_files); // Set audio files URLs
        }
      })
      .catch(error => {
        console.error('Error sending audio:', error);
        setAlertMessage('Error sending audio.');
        setIsTranscribing(false); // Hide loader on error
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
        {isRecording && (
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            width={200}
            height={75}
          />
        )}
      </div>

      {isTranscribing && !isRecording && (
        <div className="transcribing-message">
          <p>Transcribing your audio, please wait...</p>
        </div>
      )}

      {alertMessage && (
        <div className="alert-container">
          <p>{alertMessage}</p>
        </div>
      )}

      {missedWords.length > 0 && !alertMessage && (
        <div className="missed-words-container">
          <h2>Missed Words:</h2>
          <ul>
            {missedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          {audioFiles.length > 0 && (
            <div className="audio-files-container">
              <h3>Audio for Missed Words:</h3>
              {audioFiles.map((url, index) => (
                <div key={index} className="audio-player">
                  <audio controls>
                    <source src={url} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaptureAudio;
