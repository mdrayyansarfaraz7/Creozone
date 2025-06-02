import React from 'react';

function Feature() {
  const features = [
    {
      title: "Stash",
      headline: "Your Central Creative Hub.",
      description:
        "Stash is where all your design assets live. Organize, manage, and showcase your creative work with clarity and control.",
      image: "/stash.png",
      phrase: "Organize and Showcase Your Creative Work with ",
    },
    {
      title: "StyleChain",
      headline: "Link Your Visual Language.",
      description:
        "StyleChain helps you maintain design consistency across projects. Connect shared elements, update in sync, and simplify your creative process.",
      image: "/styleChain.png",
      phrase: "Link Your Visual Language with ",
    },
    {
      title: "OutLooks",
      headline: "Feedback That Drives Design.",
      description:
        "OutLooks organizes ideas, discussions, and reviews in one space. Gain perspectives, refine your vision, and collaborate meaningfully.",
      image: "/outlooks.png",
      phrase: "Gather Insightful Feedback through ",
    },
    {
      title: "Refinements",
      headline: "Turn Feedback Into Function.",
      description:
        "Refinements let collaborators suggest changes with clarity. Track revisions, upload improvements, and evolve designs with confidence.",
      image: "/refinements.png",
      phrase: "Turn Feedback Into Action with ",
    },
  ];

  return (
    <div className="flex flex-col gap-20 py-16 px-8 md:px-20 bg-white">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className={`flex flex-col-reverse md:flex-row items-center justify-between gap-10 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-oswald text-4xl sm:text-5xl text-black font-bold">
              {feature.phrase}
              <span className="text-rose-500">{feature.title}</span>
            </h2>
            <p className="text-lg text-slate-700 mt-3 font-semibold">{feature.headline}</p>
            <p className="font-lato text-slate-600 mt-2 leading-relaxed max-w-xl">
              {feature.description}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feature;
