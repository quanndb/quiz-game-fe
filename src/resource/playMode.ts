export const PLAY_MODE = {
  titleImage: "/assets/playModeTitle.png",
  modes: [
    {
      id: "STORY_MODE",
      name: "Story Mode",
      image: "/assets/storyMode.svg",
      description: "Experience the game through a narrative-driven journey.",
      isAvailable: true,
    },
    {
      id: "FIGHTING_MODE",
      name: "Fighting Mode",
      image: "/assets/fightingMode.svg",
      description: "Test your skills in a thrilling combat scenario.",
      isAvailable: false,
    },
    {
      id: "EVENT_MODE",
      name: "Event Mode",
      image: "/assets/eventMode.svg",
      description: "Join special events and challenges for unique rewards.",
      isAvailable: false,
    },
  ],
};
