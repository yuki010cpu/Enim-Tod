// animeAPI.ts

export class Sankavollerei {
    static getOngoingAnime(): Promise<any> {
        // Implementation to fetch ongoing anime from Sankavollerei API
        return fetch('https://sankavollerei.com/api/ongoing-anime')
            .then(response => response.json());
    }

    static getAnimeStreamLinks(animeId: string): Promise<any> {
        // Implementation to fetch stream links for the specific anime ID from Sankavollerei API
        return fetch(`https://sankavollerei.com/api/anime/${animeId}/streams`)
            .then(response => response.json());
    }
}