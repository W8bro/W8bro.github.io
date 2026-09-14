export interface Principle{
    label: string;
    line: string;
}

export const philosophy = {
    sub: "No broken windows: the small defect you walk past today is the line stop you own next quarter",
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

    ] satisfies Principle[],
}