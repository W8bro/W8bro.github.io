export interface Principle{
    label: string;
    line: string;
}

export const philosophy = {
    sub: "No broken windows: the small defect you walk past today is the line stop you own next quarter",
    sub2: "If the test is painful to write, the operator living with that interface will have a worse day than you",
    principle: [
        { 
            label: 'DRY', 
            line: 'One source of truth per fact — a signal defined twice will disagree on the day it matters',
        },
        {
            label: 'Orthogonality',
            line: "Decouple the cell from the recipe from the reporting, so changing one doesn't re-validate the other three",
        },
        {
            label: 'Tracer bullets',
            line: 'One thin path working end-to-end first; the rest of the system grows around a thing that already runs',
        },
        {
            label: 'Crash early',
            line: 'A controller that fails loudly at 03:00 costs less than one that quietly logs bad data for a week',
        },
        {
            label: 'Good-enough software',
            line: 'Scope and quality are negotiated with the people who run the line, not decided alone at a desk',
        },
        {
            label: 'Automate everything',
            line: 'If a human does it twice, it becomes a script — builds, deploys, test sweeps, commissioning checks',
        }, 
        {
            label: 'Knowledge portfolio',
            line: "Learn one new language or toolchain a year; the plant floor doesn't stand still either",
        },
        {
            label: 'Dig for requirements',
            line: 'Nobody hands you a spec — you find it by watching the operator work around the current system',
        },

        /* {
            label: 'Broken windows',
            line: 'The undocumented workaround becomes the process everybody follows — fix it while it is still just a defect',
        },
        {
            label: 'Be a catalyst',
            line: 'Nobody approves a rewrite; everybody approves the small working thing you already built to show them',
        },
        {
            label: 'Knowledge portfolio',
            line: "Learn one new language or toolchain a year; the plant floor doesn't stand still either",
        },
        {
            label: 'Easy to change',
            line: 'The measure of a design is not how it looks but what the second furnace costs to add',
        },
        {
            label: 'Easy to reuse',
            line: 'If borrowing the module costs more than rewriting it, the next project will rewrite it',
        },
        {
            label: 'No final decisions',
            line: "Today's PLC vendor, fieldbus and database are all temporary — build so that being wrong about one is survivable",
        },
        {
            label: 'Prototype to learn',
            line: 'Build the throwaway rig to answer one question, then throw it away — the answer was the deliverable, not the code',
        },
        {
            label: 'No perfect software',
            line: 'Every system ships with defects; the professional question is which ones you chose to leave in',
        },
        {
            label: 'Crash early',
            line: 'A controller that fails loudly at 03:00 costs less thanta for a week',
        },
        {
            label: 'Decoupling',
            line: "When the reporting module knows the robot's joint angles, changing the robot means re-testing the reports",
        },
        {
            label: 'Refactor early',
            line: 'Structural debt comes due at commissioning, when every change needs the line stopped to verify it',
        },
        {
            label: 'Why we test',
            line: 'Tests are less a net for catching defects than a written statement of what the system is supposed to do',
        },
        {
            label: 'Tests are the first user',
            line: 'If the test is painful to write, the operator living with that interface will have a worse day than you',
        },
        {
            label: 'End to end first',
            line: 'A thin slice from sensor to HMI that actually runs beats four finished layers that have never met',
        },
        {
            label: 'Nobody knows what they want',
            line: 'The spec describes the system they imagined; the walkthrough shows you the one they need',
        },
        {
            label: 'Requirements are a loop',
            line: 'Show something running early and often — requirements arrive as reactions, not as documents',
        },
        {
            label: 'Automate the testing',
            line: 'A test that only runs when a human remembers it is a test that stops running the week it matters',
        },
 */
    ] satisfies Principle[],
}