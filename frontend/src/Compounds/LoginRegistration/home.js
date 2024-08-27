


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [originalImage, setOriginalImage] = useState(null);
  const [predictionImage, setPredictionImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [predictionProbability, setPredictionProbability] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (selectedModel === 'llm-classification' || selectedModel === 'deep-learning-classification') {
      setOriginalImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setOriginalImage(null);
    }
  };

  const handleModelSelection = (model) => {
    setSelectedModel(model);
    setSelectedFile(null); // Reset selectedFile when changing the model
    setPredictionImage(null); // Reset predictionImage when changing the model
    setOriginalImage(null);
    setPredictionResult(''); // Reset predictionResult when changing the model
    setPredictionProbability(''); // Reset predictionProbability when changing the model
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    let endpoint;
    let baseUrl = 'http://localhost:5000';
    switch (selectedModel) {
      case 'llm-segmentation':
        endpoint = '/predict';
        break;
      case 'deep-learning-classification':
        baseUrl = 'http://localhost:5003';
        endpoint = '/predict-dp';
        break;
      case 'llm-classification':
        baseUrl = 'http://localhost:5004';
        endpoint = '/predictllm';
        formData.delete('file'); // Removing file key
        formData.append('image', selectedFile); // Adding image key
        break;
      case 'deep-learning-segmentation':
        baseUrl = 'http://localhost:5002';
        endpoint = '/predictdpseg';
        formData.delete('file'); // Removing file key
        formData.append('image', selectedFile); // Adding image key
        break;
      default:
        alert('Please select a model first.');
        return;
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*', // Add this line if necessary
        },
      });

      if (response.ok) {
        if (endpoint === '/predict' || endpoint === '/predictdpseg') {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPredictionImage(url);
        } else if (endpoint === '/predict-dp' || endpoint === '/predictllm') {
          const data = await response.json();
          setPredictionResult(data.prediction);
          if (data.probability !== undefined) {
            setPredictionProbability(data.probability);
          }
        }
      } else {
        console.error('Prediction failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred during prediction:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
    <header className="flex justify-between items-center py-4 px-4 sm:px-6 bg-white shadow-md">
      <div className="text-xl sm:text-2xl font-bold">BQUICK🧠</div>
      <div>
        <button
          className="text-black-500 font-bold py-2 px-2 sm:px-4"
          onClick={() => navigate('/login')}
        >
          Login/Sign Up
        </button>
        
      </div>
    </header>
    <div className="text-center mt-6 sm:mt-10">
      <h1 className="text-txl sm:text-4xl font-bold mb-4">Brain Tumor Prediction</h1>
    </div>
    <div className="flex flex-col sm:flex-row justify-center mt-4 sm:mt-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-1/3">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">What is Brain Tumor?</h2>
        <p className="text-sm sm:text-base">
          A brain tumor is a mass or growth of abnormal cells in your brain. Many different types of brain tumors exist. Some brain tumors are noncancerous (benign), and some brain tumors are cancerous (malignant).
          Brain tumors can begin in your brain (primary brain tumors), or cancer can begin in other parts of your body and spread to your brain (secondary, or metastatic, brain tumors).
        </p>
      </div>
    </div>
    <div className="text-center mt-8">
      <h3 className="text-lg sm:text-2xl font-bold mb-4">Select a model to predict brain tumor:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
        <button
          className="bg-green-300 text-black font-bold py-1 px-2 sm:py-1 sm:px-2 rounded mb-2 text-xs sm:text-sm"
          onClick={() => handleModelSelection('llm-segmentation')}
        >
          LLM Model Segmentation
        </button>
        <button
          className="bg-green-300 text-black font-bold py-2 px-2 sm:py-1 sm:px-2 rounded mb-2 text-xs sm:text-sm"
          onClick={() => handleModelSelection('llm-classification')}
        >
          LLM Model Classification
        </button>
        <button
          className="bg-green-300 text-black font-bold py-2 px-2 sm:py-1 sm:px-2 rounded mb-2 text-xs sm:text-sm"
          onClick={() => handleModelSelection('deep-learning-classification')}
        >
          Deep Learning Model Classification
        </button>
        <button
          className="bg-green-300 text-black font-bold py-2 px-2 sm:py-1 sm:px-2 rounded mb-2 text-xs sm:text-sm"
          onClick={() => handleModelSelection('deep-learning-segmentation')}
        >
          Deep Learning Model Segmentation
        </button>
      </div>
      {selectedModel && (
        <div className="my-4">
          <h2 className="text-lg sm:text-2xl font-bold mb-4">
            {selectedModel === 'llm-segmentation' ? 'LLM Model Segmentation' : 
             selectedModel === 'llm-classification' ? 'LLM Model Classification' :
             selectedModel === 'deep-learning-classification' ? 'Deep Learning Model Classification' :
             'Deep Learning Model Segmentation'}
          </h2>
          <input
            type="file"
            className="form-control-file mb-3"
            onChange={handleFileChange}
          />
          <button
            className="bg-blue-500 text-white font-bold py-2 px-2 sm:px-4 rounded"
            onClick={handlePredict}
          >
            Predict
          </button>
        </div>
      )}
      <div className="my-4 flex justify-center">
        {(selectedModel === 'llm-classification' || selectedModel === 'deep-learning-classification') && originalImage && (
          <div className="d-flex flex-column align-items-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Input Image</h3>
            <img src={originalImage} alt="Original" className="img-fluid w-50 mt-2" />
          </div>
        )}
      </div>
      {predictionImage && (
        <div className="my-4 flex justify-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Prediction Result</h3>
            <img src={predictionImage} alt="Prediction" className="img-fluid w-100" />
          </div>
        </div>
      )}
      {predictionResult && (
        <div className="my-4">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Prediction Result</h3>
          <h3 className="text-2xl sm:text-3xl font-bold">The image contains a brain tumor: {predictionResult}</h3>
          {predictionProbability && (
            <h3 className="text-2xl sm:text-3xl font-bold">Probability: {predictionProbability}</h3>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default HomePage;