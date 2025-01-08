export interface IMovie {
    id: number;
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    title: string;
    genres: { id: number; name: string }[];    
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    runtime: number;
}