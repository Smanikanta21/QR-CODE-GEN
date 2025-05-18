import React from 'react'
import './App.css'
import { QrCode, Sun, Moon } from 'lucide-react'

function App() {

  const handleQrCodeGeneration = (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('input').value.trim();
    if (!inputValue) {
      alert('Please enter some text');
      return;
    }

    let qrData = inputValue;
    if (!/^https?:\/\//.test(inputValue) && !inputValue.includes('@')) {
      qrData = `text:${inputValue}`;
    }

    const qrResult = document.getElementById('qrResult');
    qrResult.style.opacity = '0';
    qrResult.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}" alt="QR Code">`;
    
    setTimeout(() => {
      qrResult.style.opacity = '1';
    }, 100);
  }


  return (
    <div>
      <nav className='flex flex-row justify-between items-center text-black p-4 shadow-md'>
        <div>
          <a href="#">QR-GEN</a>
        </div>
        <div className='flex flex-row gap-4 '>
          <a href="#">Text</a>
          <a href="#">URL</a>
          <a href="#">Email</a>
        </div>
      </nav>
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='flex md:flex-row flex-col p-12 justify-between md:px-12 items-center md:w-[700px] md:h-[400px] border-2 border-white shadow-2xl'>
          <form className='flex flex-col gap-4 items-center'>
            <h1 className='text-4xl font-bold '>Qr Generator</h1>
            <input type="text" onChange={handleQrCodeGeneration} className='border px-2' id="input" placeholder='Enter Text'/>
            <button type="submit" className='border-white bg-[#0c67e7] text-white w-40' id="generate">Generate QR Code</button>
            <button type="button" id="download">Download</button>
          </form>
          <div className='h-56 w-56 rounded-2xl border-white shadow-lg items-center flex justify-center' id='qrResult'>
            {<QrCode className=' text-black opacity-25 hover:transform-' size={200} />}
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
