import Tentativa from "@/components/Tentativa";
import usePalavraAleatoria from "@/hooks/usePalavraAleatoria";
import listaDePalavras from "@/utils/palavras";
import { useRef, useState } from "react";

export default function Home() {
  const { palavraAleatoria, palavraFormatada, sortearPalavra } =
    usePalavraAleatoria();
  const [tentativas, setTentativa] = useState([]);
  const [values, setValues] = useState(["", "", "", "", ""]);
  const [inputsLocked, setInputsLocked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [win, setWin] = useState(false);

  const handleSorteio = () => {
    setValues(["", "", "", "", ""]);
    setTentativa([]);
    setInputsLocked([false, false, false, false, false]);
    setWin(false);

    sortearPalavra();
  };

  const handleSubmit = () => {
    // Pega cada input e junta pra formar a palavra
    const tentiva = values.join("");

    // Pega verifica se a existe alguma palavra na base de dados que corresponde a palavra da tentiva,
    // caso houver ele atribui a palavra correspondendo em maisculos e com acentos a uma variavel
    const palavraCorrespondente = listaDePalavras.find((palavra) => {
      const palavraSemAcentos = palavra
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return palavraSemAcentos === tentiva;
    });

    // Verifica se existe uma palavra atribuida, caso nao houver ele da um alert e para a funcao
    if (!palavraCorrespondente) {
      alert("Palavra não está na minha base de dados limitadaissima!");
      return;
    }

    // Se a palavra existe, entao foi uma tentativa valida, ele adiciona a palavra encontrada numa lista de tentativas
    const newtentativas = [...tentativas];
    newtentativas.push(palavraCorrespondente.toUpperCase());

    // Aqui ele pega cada input e verifica se a letra do input corresponde com o letra no mesmo indice da palavra sorteada
    // se corrresponder, entao aquele input trava e voce sabe que aquela letra esta correta
    const newInputsLocked = [...inputsLocked];
    for (let i = 0; i < palavraAleatoria.length; i++) {
      if (palavraFormatada[i] === values[i]) {
        newInputsLocked[i] = true;
      } else {
        values[i] = "";
      }
    }

    // Verifica se todos os inputs estao travados, se todos estao travados significa que todas as letras estao corretas, portanto vitoria vira true
    if (!newInputsLocked.includes(false)) {
      setWin(true);
      alert("PARABENS!");
    }

    // Atualiza os states
    setTentativa(newtentativas);
    setInputsLocked(newInputsLocked);
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
        <Tentativa
          palavraFormatada={palavraFormatada}
          tentativas={tentativas}
        />
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
              className="bg-orange-500 w-full m-4 py-5 text-4xl font-extrabold rounded-xl"
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
    </main>
  );
}
