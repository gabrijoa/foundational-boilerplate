/**
 * @fileoverview Landing page component with project showcase
 * @description This component renders the main landing page with project information,
 * featuring a visual design showcasing the fullstack boilerplate technologies.
 * @author Joa Gabri
 * @version 1.0.0
 */

/**
 * Landing page component
 * @description Main page component that displays project information and technologies used.
 * Features a split-screen design with custom backgrounds and typography styling.
 * @component
 * @returns {JSX.Element} Landing page with project showcase and technology stack
 * @example
 * // This component is rendered when user visits the root "/" route
 * // Displays:
 * // - Project motto/tagline
 * // - Technology stack information
 * // - Link to project documentation
 */
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
        {/* Top section - 50% height with project motto */}
        <div
          className="flex-1 w-full flex items-end justify-start "
          style={{
            boxShadow: "0px 15px 25px 2px #000000",
            backgroundImage: "url(/plantac.png), linear-gradient(#2F5D79, #2F5D79)",
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            /* The 'difference' blend mode effect is applied using backgroundBlendMode */
            backgroundBlendMode: "difference"
          }}
        >
        
          <p className="text-white text-3xl tracking-[0.2rem] font-light pb-2 ">
            every plan that you <strong>build</strong> needs a{" "}
            <strong>foundation.</strong>
          </p>
        </div>

        {/* Bottom section - 50% height with technology stack */}
        <div className="flex-1 w-full flex flex-col items-end justify-top ">
          <p className="text-[#77E1ED] text-4xl text-right pt-4 pr-8 font-bold">
            FullStack Boilerplate with::
          </p>
          <div className="text-white text-2xl text-right pr-8 font-light ">
            Typescript, React <br /> Express, Prisma, Jest,
            <br /> Github Actions, Docker
          </div>
        </div>
        {/* Fixed paragraph in bottom right corner with documentation link */}
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
