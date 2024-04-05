const Tentativa = ({ palavraAleatoria, palavraFormatada, tentativas }) => {
  return (
    <div className="flex flex-col gap-4 my-4">
      {tentativas.length > 0 &&
        tentativas.map((tentativa, index) => (
          <div key={index} className="flex gap-1">
            {tentativa.split("").map((letra, index) => (
              <div
                key={index}
                className={`w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] text-6xl text-black sm:text-8xl rounded-xl text-center align-middle
                  ${
                    letra === palavraFormatada[index]
                      ? "bg-green-800"
                      : palavraFormatada.includes(letra)
                      ? "bg-yellow-600"
                      : "bg-neutral-900"
                  }`}
              >
                {letra}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Tentativa;
