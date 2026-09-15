export interface Link {
    /** Platform or source name, shown in the left column. */
    where: string;
    title: string;
    icon: string;
    /** One short line of context. */
    note: string;
    url: string;
}

// The "Elsewhere" section. It renders only when this array is non-empty, so it is safe to
// leave short.
//
// TODO (Tom): add the two Spotify links. Kept out for now because inventing playlist names
// on a public CV would be making things up — the section is wired and waiting.
//   { where: 'Spotify', title: '<real playlist name>', note: '<one line>', url: 'https://open.spotify.com/playlist/...' },
export const links: Link[] = [
    {
        where: "linkedin",
        title: "Tom Andersson",
        icon: "ph:linkedin-logo-duotone",
        note: "Linkedin profile",
        url: "https://se.linkedin.com/in/tom-andersson-e321/sv",
    },
    {
        where: "GitHub",
        title: "Tom Andersson (W8bro)",
        icon: "ph:github-logo-duotone",
        note: "My Github Profile",
        url: "https://github.com/W8bro",
    },
    {
        where: "Spotify",
        title: "Feed me to the waves",
        icon: "ph:spotify-logo-duotone",
        note: "Spotify link to Feed me to the waves",
        url: "https://open.spotify.com/artist/3m84oWj5JZhlWwoypldba2?si=x2alSq7CSbynJj6tXYKczQ",
    },
    {
        where: "Spotify",
        title: "E 321",
        icon: "ph:spotify-logo-duotone",
        note: "Spotify link to E321",
        url: "https://open.spotify.com/artist/4iJPYMoMRr2VzHj3MOaW5E?si=3UMJigiMT9aEMJNJf0s1uw",
    },
];
