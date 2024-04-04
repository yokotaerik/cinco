import usePalavraAleatoria from "@/hooks/usePalavraAleatoria";
import { useRef, useState } from "react";

export default function Home() {
  const { palavraAleatoria, sortearPalavra } = usePalavraAleatoria();
  const [tentativas, setTentativa] = useState([]);
  const [values, setValues] = useState(["", "", "", "", ""]);
  const [inputsLocked, setInputsLocked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [exists, setExists] = useState([false, false, false, false, false]);
  const [win, setWin] = useState(false);

  const handleSorteio = () => {
    setValues(["", "", "", "", ""]);
    setTentativa([]);
    setInputsLocked([false, false, false, false, false]);
    setExists([false, false, false, false, false]);
    setWin(false);

    sortearPalavra();
  };

  const handleSubmit = () => {
    const newInputsLocked = [...inputsLocked];
    const newExists = [...exists];

    for (let i = 0; i < palavraAleatoria.length; i++) {
      if (palavraAleatoria[i].toUpperCase() === values[i]) {
        newInputsLocked[i] = true;
      }
      if (palavraAleatoria.includes(palavraAleatoria[i])) {
        newExists[i] = true;
      }
    }

    const newtentativas = [...tentativas];

    const tentiva = values.join("");
    newtentativas.push(tentiva);

    if (!newInputsLocked.includes(false)) {
      setWin(true);
      alert("PARABENS!");
    }

    setTentativa(newtentativas);
    setExists(newExists);
    setInputsLocked(newInputsLocked);
    console.log(palavraAleatoria[0]);
    console.log(values[0])
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
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
    if (e.key === "ArrowRight") {
      e.preventDefault(); // Evita que a seta direita mova o cursor para o final do campo
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault(); // Evita que a seta esquerda mova o cursor para o início do campo
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <main className="bg-slate-900 h-screen flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl sm:text-8xl font-bold my-10 ">CINCO</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {tentativas.length > 0 &&
              tentativas.map((tentativa, index) => (
                <div key={index} className="flex gap-1">
                  {tentativa.split("").map((letra, index) => (
                    <input
                      key={index}
                      type="text"
                      className={`w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] text-6xl text-black sm:text-8xl rounded-xl text-center align-middle
                      ${
                        letra === palavraAleatoria[index]
                          ? "bg-green-800"
                          : palavraAleatoria.includes(letra)
                          ? "bg-yellow-600"
                          : "bg-neutral-900"
                      }`}
                      maxLength={1}
                      value={letra}
                      disabled={true}
                    />
                  ))}
                </div>
              ))}
          </div>
          {!win ? (
            <>
              <div className="flex gap-1">
                {inputRefs.map((inputRef, index) => (
                  <input
                    key={index}
                    type="text"
                    ref={inputRef}
                    className={`w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] text-6xl text-black sm:text-8xl rounded-xl text-center align-middle
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${inputsLocked[index] ? "bg-green-800" : ""} `}
                    maxLength={1}
                    value={values[index]}
                    name={`letter_${index}`}
                    onChange={(e) =>
                      handleChange(index, e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={inputsLocked[index]}
                  />
                ))}
              </div>
              <button
                onClick={(e) => handleSubmit()}
                className="bg-orange-500 w-full py-5 text-4xl font-extrabold rounded-xl"
              >
                Tentar
              </button>
            </>
          ) : null}
          <button
            className="bg-orange-500 w-full py-5 text-4xl font-extrabold rounded-xl"
            onClick={(e) => handleSorteio()}
          >
            Sortear 
          </button>
        </div>
      </div>
    </main>
  );
}
