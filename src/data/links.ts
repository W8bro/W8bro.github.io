export interface Link {
  /** Platform or source name, shown in the left column. */
  where: string;
  title: string;
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
    where: 'GitHub',
    title: 'W8bro',
    note: 'This site, and whatever else is half-finished',
    url: 'https://github.com/W8bro',
  },
];
