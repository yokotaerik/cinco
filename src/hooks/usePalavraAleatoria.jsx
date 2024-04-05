import { useState } from "react";
import listaDePalavras from "@/utils/palavras";

const usePalavraAleatoria = () => {
  const [palavraAleatoria, setPalavraAleatoria] = useState("CINCO");
  const [palavraFormatada, setPalavraFormatada] = useState("CINCO");
  const [palavras, setListaDePalavras] = useState(listaDePalavras);

  const sortearPalavra = () => {
    console.log(palavras);
    const indiceAleatorio = Math.floor(Math.random() * listaDePalavras.length);
    const novaPalavraAleatoria = listaDePalavras[indiceAleatorio];
    setPalavraAleatoria(novaPalavraAleatoria.toUpperCase());
    setPalavraFormatada(
      novaPalavraAleatoria
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );
    console.log(novaPalavraAleatoria);
  };

  return { palavraAleatoria, palavraFormatada, sortearPalavra };
};

export default usePalavraAleatoria;
