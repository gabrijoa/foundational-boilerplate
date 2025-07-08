function page() {
  return (
    <>
      <div
        className="flex flex-col h-screen relative"
        style={{
          backgroundImage: "url(/texure2.png)",
          backgroundSize: "cover",
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "difference"
        }}
      >
        {/* Primeira seção - 50% da altura */}
        <div
          className="flex-1 w-full flex items-end justify-start "
          style={{
            boxShadow: "0px 15px 25px 2px #000000",
            backgroundImage: "url(/plantac.png), linear-gradient(#2F5D79, #2F5D79)",
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            /* O efeito 'difference' é aplicado usando backgroundBlendMode */
            backgroundBlendMode: "difference"
          }}
        >
        
          <p className="text-white text-3xl tracking-[0.2rem] font-light pb-2 ">
            every plan that you <strong>build</strong> needs a{" "}
            <strong>foundation.</strong>
          </p>
        </div>

        {/* Segunda seção - 50% da altura */}
        <div className="flex-1 w-full flex flex-col items-end justify-top ">
          <p className="text-[#77E1ED] text-4xl text-right pt-4 pr-8 font-bold">
            FullStack Boilerplate with::
          </p>
          <div className="text-white text-2xl text-right pr-8 font-light ">
            Typescript, React <br /> Express, Prisma, Jest,
            <br /> Github Actions, Docker
          </div>
        </div>
        {/* Parágrafo fixo no canto inferior direito */}
        <p className="absolute bottom-0 right-4 text-white text-lg text-right font-bold "
        style={{
         fontFamily: "Space Mono",
        }}
        >
          more infos at
          <br /> gabrijoa/foundational-boilerplate/readme.md
        </p>
      </div>
    </>
  );
}

export default page;
