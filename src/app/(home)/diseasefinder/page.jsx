'use client'
import { useState } from 'react'
import React from 'react'

const page = () => {
    
  const userFriendlyMap = {
    'cold': 'chills',
    'tiredness': 'fatigue',
    'joint pain': 'joint_pain',
    'runny nose': 'runny_nose',
    'sore throat': 'throat_irritation',
    'sneezing': 'continuous_sneezing',
    'body ache': 'muscle_pain',
    'head pain': 'headache',
    'high temperature': 'fever',
  };

  const [formData, setFormData] = useState([]);
  const [state, setstate]= useState(false)
  const [result, setresult]= useState("")
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(value !=='no'){
        setFormData((prevData) => ([
            ...prevData,
             value,
        ]))
   
  };}

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    setstate(!state)

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: formData }),
      });

      const result = await response.json();
      setresult(result.predicted_disease)
      console.log('Prediction result:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  return (
   <>
    <div className='h-22 w-full'></div>
    <div className='h-[80vh] w-full flex flex-col justify-center px-5 py-5 shrink-0'>
   {state?<>
   <div className='h-full w-full flex justify-center items-center'>

    <div className='h-1/2 w-5/6 border-white border-2 flex flex-col px-5 py-5 gap-y-10'>
    <h1 className='text-3xl'>You can have this disease:</h1>
    {result!=""?    <h1 className='text-4xl text-green-600 '>{result}</h1>
:    <h1 className='text-4xl text-green-600 '>Loading...</h1>
}
    <button onClick={()=>{setstate(!state)}} className=' bg-white text-black py-2 px-5 rounded-lg'>Back</button>

    </div>
   </div>
   </>:<>
    <form onSubmit={handleSubmit}>
        {Object.keys(userFriendlyMap).map((symptom) => (
          <div key={symptom} className="mb-4">
            <label className="block text-white text-md font-bold mb-2">Do you have {symptom} ?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={symptom}
                  value={symptom}
                  onChange={handleChange}
                  required
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={symptom}
                  required
                  value="no"
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-red-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-white bg-white-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
</>}
        </div></>
  )
}

export default page