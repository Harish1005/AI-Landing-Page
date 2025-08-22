import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const Home = () => {


  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("AI SaaS")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)


  const handleGenerate = async () => {
    setLoading(true)
    setResult("")
    toast.loading("Talking to AI")

    try{
      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model:"openai/gpt-3.5-turbo",
      messages:[
        {
          role:"user",
          content: `Write a clean responsive HTML landing page for a ${category} product called "${idea}".
          The page should include:
          -A bold heading
          -A short subheading
          -Three feature cards
          -The Cards should be Horizontal
          -A call-to-action button
          -Basic contact information
          -Below the contact information need a button called Contact US
          Use plain HTML and Tailwind CSS. Return only valid HTML`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
        "Content-type":"application/json",
        "HTTP-Referer":"http://localhost:5173"
      }
    }
    
  )
      setResult(response.data.choices[0].message.content);
      toast.dismiss()
      toast.success(`${idea} Landing Page Generated`)
    } catch(err){
      toast.dismiss();
      toast.error("Failed to generate. Check API key or headers")
    } finally {
      setLoading(false);
    }
  

  
  
  }

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    toast.success("Code Copied !!")
  }


  return (
    <div>
      <div className='min-h-screen bg-[#F6F5FF] px-4 py-10 font-mono'>
        <div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
          <h1 className='text-3xl font-bold text-center text-purple-800 mb-4'>
          AI Landing Page Generator
        </h1>

        <input type="text"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder='Enter your product idea (e.g: Shopping, Sports...)'
        className='w-full border p-3 border-gray-300 rounded-lg mb-4'/>

        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='w-full p-3 border border-gray-300 rounded-lg mb-4 bg-gray-300'>
          <option value="AI SaaS">AI SaaS</option>
          <option value="Productivity Tool">Productivity Tool</option>
          <option value="StartUp">StartUp</option>
        </select>
        <button className='bg-purple-700 text-white font-bold p-3 w-full cursor-pointer hover:bg-purple-800 rounded-lg shadow-lg'
        onClick={handleGenerate}>
          {loading ? "Generating..." : "Generate Landing Page"}
        </button>

        {result && (
          <div className='mt-10'>
            <h2 className='text-xl font-bold mb-3'>Live Preview</h2>
            <div className='border p-5 rounded-lg mb-2' dangerouslySetInnerHTML={{__html:result}}/>

            <div className='mt-6'>
              <h3 className='text-lg font-semibold mb-2'>HTML Code:</h3>
              <button className='bg-gray-700 text-white font-bold px-6 py-2 mb-4 cursor-pointer hover:bg-gray-800 rounded-lg shadow-lg'
              onClick={copyCode}
              >Code</button>
              <pre className='bg-black text-white p-4 text-sm rounded-lg overflow-x-auto'>
                {result}
              </pre>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Home
