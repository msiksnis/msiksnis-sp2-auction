export default function Hero() {
  return (
    <div className="flex relative py-10 px-6 sm:px-20 md:px-24 lg:px-32 xl:px-40">
      <h1 className="text-fluid font-bold uppercase font-bangers tracking-wider leading-fluid z-10 mt-10 xl:mt-20 whitespace-nowrap">
        Discover Treasures,
        <br />
        Buy Dreams!
        <br />
        Enjoy Winnings!
      </h1>
      <div className="absolute right-5 top-8 md:right-40 h-[50vw] md:h-[35vw] w-[60vw] md:w-[45vw] bg-cover bg-right bg-[url('/assets/hero-img.png')]"></div>
      <div className="absolute left-20 md:left-60 top-4 rounded-full size-10 md:size-14 bg-indigo-50"></div>
      <div className="absolute left-44 md:left-[550px] top-32 md:top-[17rem] rotate-6 size-5 md:size-10 bg-gray-300/40"></div>
      <div className="absolute left-10 md:left-[320px] -bottom-4 md:-bottom-10 -rotate-3 scale-50 md:scale-100 custom-triangle"></div>
    </div>
  );
}
