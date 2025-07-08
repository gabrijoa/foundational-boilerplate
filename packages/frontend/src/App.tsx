function App() {
  return (
    <>
    <div className="flex flex-col h-screen relative" style={{backgroundImage: 'url(/texure2.png)', backgroundSize: 'fit', backgroundBlendMode: 'overlay', backgroundPosition:'bottom left'}}>
      {/* Primeira seção - 50% da altura */}
      <div className="flex-1 w-full flex items-end justify-start" style={{boxShadow: '0px 15px 25px 2px #000000', backgroundImage: 'url(/plantaw.png)', backgroundSize: 'auto 180%', backgroundPosition:' center'}}>
        <p className="text-black text-3xl">every plan you <strong>build</strong> needs a <strong>foundation.</strong></p>
      </div>

      {/* Segunda seção - 50% da altura */}
      <div className="flex-1 w-full flex flex-col items-end justify-start">
        <p className="text-[#77E1ED] text-4xl text-right pt-8 pr-8" >FullStack Boilerplate with::</p> 
        <div className="text-white text-3xl text-right pt-4 pr-8 ">Typescript, React <br/> Express, Prisma, Jest,<br/> Github Actions, Docker</div>
      </div>

      {/* Parágrafo do GitHub fixo no canto inferior direito */}
      <p className="absolute bottom-4 right-4 text-white text-lg text-right ">more infos at<br/> gabrijoa/foundational-boilerplate/readme.md</p>
    </div>
    </>
  );
}

export default App;
