import { useRef, useState } from 'react';

export default function Home() {

  const [palavra, setPalavra] = useState("CINCO");
  const [trys, setTrys] = useState([]);
  const [values, setValues] = useState(['', '', '', '', '']);
  const [inputsLocked, setInputsLocked] = useState([false, false, false, false, false]); 
  const [exists, setExists] = useState([false, false, false, false, false]); 


  const handleSubmit = () => {
    const newInputsLocked = [...inputsLocked]; 
    const newExists = [...exists];
    
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === values[i]) {
        newInputsLocked[i] = true;
      }
      if (palavra.includes(palavra[i])){
        newExists[i] = true;
      }
    }

    const newTrys = [...trys]

    const tentiva = values.join('')
    newTrys.push(tentiva);

    if(!newInputsLocked.includes(false)){
      alert("PARABENS!")
    }

    setTrys(newTrys)
    setExists(newExists);
    setInputsLocked(newInputsLocked);
    console.log(inputsLocked);
  };
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault(); // Evita que a seta direita mova o cursor para o final do campo
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); // Evita que a seta esquerda mova o cursor para o início do campo
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <main className="bg-slate-900 h-screen flex flex-col items-center">
      <h1 className='text-8xl font-bold my-10 '>C-I-N-C-O</h1>
      <div className="">
      {trys.length > 0 && trys.map((palavra, index) => (
        <p key={index}>{palavra}</p>
      ))}
        {inputRefs.map((inputRef, index) => (
          <input
            key={index}
            type="text"
            ref={inputRef}
            className={`w-[80px] h-[100px] text-black border-2 text-8xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
            maxLength={1}
            value={values[index]}
            name={`letter_${index}`}
            onChange={(e) => handleChange(index, e.target.value.toUpperCase())}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={inputsLocked[index]} 
          />
        ))}
      </div>
      <button onClick={(e) => handleSubmit()}>Tentar</button>
    </main>
  );
}
