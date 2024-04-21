// import React, { useState } from 'react';
// import axios from 'axios';

// const PotatoDiseaseDetection = () => {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [result, setResult] = useState('');

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     const objectUrl = URL.createObjectURL(selectedFile);
//     console.log('Object URL:', objectUrl); // Log object URL here
//     setImageUrl(objectUrl);
//     setResult('');
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/predict/potato', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setResult(response.data.result);
//     } catch (error) {
//       if (error.response) {
//         console.error('Server Error:', error.response.data);
//       } else if (error.request) {
//         console.error('Request Error:', error.request);
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   return (
//     <section className="text-gray-600 flex flex-row body-font" style={{ backgroundColor: '#006A4E' }}>
//       <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
//         {imageUrl && (
//           <div className="lg:w-2/6 md:w-3/8 w-9/7 mb-10 relative">
//             <img className="w-full h-full object-cover object-center rounded border border-gray-300" alt="hero" src={imageUrl} />
//           </div>
//         )}
//         <div className="text-center lg:w-2/3 w-full">
//           <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white" style={{ fontFamily: 'Fira Sans' }}>Upload to Predict the Crop Disease</h1>
//           <p className="mb-8 leading-relaxed text-white" style={{ fontFamily: 'Sedan' }}>Gain invaluable agricultural insights with our Potato Disease Detection technology. Simply upload an image of your potato crop for accurate analysis, ensuring optimal yield and crop health.</p>
//           <div className="flex justify-center">
//             <input type="file" onChange={handleFileChange} className="hidden" id="uploadMRI" />
//             <label htmlFor="uploadMRI" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-2 cursor-pointer">Upload Image</label>
//             <button onClick={handleSubmit} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-2">Predict</button>
//           </div>
//           {result && <p className="mb-10 leading-relaxed font-bold text-xl text-white">Prediction: {result}</p>}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PotatoDiseaseDetection;


import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './bg11.jpg'; // Import the background image

const PotatoDiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log('Object URL:', objectUrl); // Log object URL here
    setImageUrl(objectUrl);
    setResult('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/predict/potato', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data.result);
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <section className="text-gray-600 body-font relative" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col relative z-25">
        {imageUrl && (
          <div className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 relative">
            <img className="w-full h-full object-cover object-center rounded border-8 border-white" alt="hero" src={imageUrl} />
          </div>
        )}
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-medium text-white" style={{ fontFamily: 'Georgia' }}>Upload to Predict the Crop</h1>
          <p className="mb-8 leading-relaxed sm:text-2xl text-xl text-white">"Protecting Harvests, Preserving Futures: Detecting Crop Diseases for a Flourishing Agriculture"</p>
          <div className="flex justify-center">
            <input type="file" onChange={handleFileChange} className="hidden" id="uploadMRI" />
            <label htmlFor="uploadMRI" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg m-2 cursor-pointer">Upload Image</label>
            <button onClick={handleSubmit} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-2">Predict</button>
          </div>
          {result && <p className="mb-10 leading-relaxed font-bold  text-2xl text-white">Prediction: {result}</p>}
        </div>
      </div>
    </section>
  );
};

export default PotatoDiseaseDetection;

