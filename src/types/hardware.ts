export interface Hardware {
    id: number;
    date: string;
    category: string;
    title: string;
    subtitle?: string;
    description?: string;
    tags: string;
    hideTag: string;
    solutionTag: string;
    form: string;
    imageSrc: string;
    slug?: string;
    path: string;
    use: boolean;
}
