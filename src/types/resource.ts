export interface Resource {
    id: number;
    date: string;
    contentType: string;
    title: string;
    subtitle?: string;
    tags: string;
    hideTag: string;
    solutionTag: string;
    form: string;
    image: string;
    path: string;
    use: boolean;
    html?: string;
}
