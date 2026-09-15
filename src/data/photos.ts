export interface Photo {
    /** Path under /public, an imported asset URL, or an absolute URL. Null renders the
     *  graded ground alone. */
    src: string | null;
    alt: string;
}

export const photos: Record<"hero" | "split", Photo> = {
    hero: {
        src: "/photos/rene-reichelt-Mountain.jpg",
        alt: "Snow-covered mountain ridge in low cloud, birds in flight",
    },
    split: {
        src: "/photos/sebastien-marchand-LongRoad.jpg",
        alt: "Empty road running through a dense pine plantation",
    },
};
