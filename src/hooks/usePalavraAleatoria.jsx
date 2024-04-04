import { useState } from "react";
import listaDePalavras from "@/utils/palavras";

const usePalavraAleatoria = () => {
  const [palavraAleatoria, setPalavraAleatoria] = useState("CINCO");
  const [palavras, setListaDePalavras] = useState(listaDePalavras);

  const sortearPalavra = () => {
    console.log(palavras)
    const indiceAleatorio = Math.floor(Math.random() * listaDePalavras.length);
    const novaPalavraAleatoria = listaDePalavras[indiceAleatorio];
    setPalavraAleatoria(novaPalavraAleatoria);
    console.log(novaPalavraAleatoria)
  };

  return { palavraAleatoria, sortearPalavra };
};

export default usePalavraAleatoria;
