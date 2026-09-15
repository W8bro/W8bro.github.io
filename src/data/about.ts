export interface About {
    firstName: string;
    lastName: string;
    role: string;
    bio: string;
    flavourText: string;
}

// Placeholder bio, merged from the two source CVs (#01) — Tom to rewrite.
export const about: About = {
    firstName: "Tom",
    lastName: "Andersson",
    role: "System/Software Developer",
    bio: `Systems and software developer with {years}+ years of experience building test systems and control software for heavy industry.\n 
  Tom holds a M.Sc. degree in Robotic and began his career as a systems developer for test systems in laboratory and production environments, delivering both hardware and software solutions.
  His interests for programming and control technology led him into working with C# development. He contributed to Prevas control products: Cell Manager, an inhouse MES platform for advanced robot cells, and FOCS, a fuel-optimization solution for reheating furnaces.\n`,
    //bio: 'Systems and software developer with 6+ years of experience building test systems and control software for heavy industry — including robot cell management platforms and furnace optimization control systems. M.Sc. in Engineering (Robotics) from Mälardalen University, specializing in signal processing, control theory, electronics, and machine learning.',
    flavourText:
        "{nrOfProjects} completed project/assignments across steel, robotics, medical and process industry — {nrOfPositions} positions since {careerStart}.",
};
