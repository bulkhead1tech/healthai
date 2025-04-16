"use client";
import { useState } from "react";
import React from "react";
const page = () => {
  const data = [
    "I couldn’t seem to experience any positive feeling at all.",
    "I found it difficult to work up the initiative to do things.",
    "I felt that I had nothing to look forward to.",
    "I felt down-hearted and blue.",
    "I was unable to become enthusiastic about anything.",
    "I felt I was not worth much as a person.",
    "I felt that life was meaningless.",
    "I felt I was close to panic.",
    "I was aware of dryness in my mouth.",
    "I experienced breathing difficulty (e.g., excessively rapid breathing or breathlessness).",
    "I experienced trembling (e.g., in the hands).",
    "I was worried about situations in which I might panic and make a fool of myself.",
    "I felt that I was using a lot of nervous energy.",
    "I found myself getting agitated.",
    "I found it hard to wind down.",
    "I found myself getting agitated.",
    "I found it difficult to relax.",
    "I felt that I was rather touchy.",
    "I felt that I was intolerant of anything that kept me from getting on with what I was doing.",
    "I found myself in situations that made me so stressed I felt I was going to explode.",
    "I found it difficult to tolerate interruptions to what I was doing.",
  ];

  const options = [
    {"option":"Did not apply to me at all", "val":0},
    {"option":"Applied to me to some degree", "val":0},
    {"option": "Applied to me to a considerable degree", "val":0},
    {"option":"Applied to me very much", "val":0},
  ];
  const [formData, setFormData] = useState({});
  const [state, setstate] = useState(false);
  const [result, setresult] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
      setFormData((prevData) => [...prevData, value]);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    setstate(!state);

    try {
      const response = await fetch("api/psych", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: formData }),
      });

      const result = await response.json();
      setresult(result.result.response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="h-28 w-full"></div>
      <div className="h-[80vh] w-full flex flex-col justify-center px-5 py-5  overflow-y-scroll">
        {state ? (
          <>
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-1/2 w-5/6 flex flex-col px-2 py-2 gap-y-10">
                {result != "" ? (
                  <h1 className="text-md text-green-600 ">{result}</h1>
                ) : (
                  <h1 className="text-4xl text-green-600 ">Loading...</h1>
                )}
                <button
                  onClick={() => {
                    setstate(!state);
                  }}
                  className=" bg-white text-black py-2 px-5 rounded-lg"
                >
                  Back
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
          <div className="h-full w-full">
          <form className="flex flex-col" onSubmit={handleSubmit}>

{data.map((data, key) => (
  <div key={key} className="mb-4">
    <label className="block text-white text-md font-bold mb-2">
      {data}
    </label>
    <div className="flex flex-col space-y-4">
      {options.map((option, index) => (
        <label
          key={index}
          className="flex "
        >
          <input
            type="radio"
            name={data}
            value={option.val}
            onChange={handleChange}
            required
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="ml-2">{option.option}</span>
        </label>
      ))}
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
          </div>
           
          </>
        )}
      </div>
    </>
  );
};

export default page;
