export interface Resource {
    id: number;
    date: string;
    contentType: string;
    title: string;
    subtitle?: string;
    tags: string; // "a, b, c"
    hideTag: string;
    solutionTag: string;
    form: string;
    image: string;
    path: string;
    use: boolean;
    html?: string;
}

// 프론트에서만 사용할 form 상태 타입
export interface ResourceFormState extends Omit<Resource, 'tags' | 'hideTag' | 'solutionTag'> {
    tags: string[];
    hideTag: string[];
    solutionTag: string[];
    createdAt?: string;
    updatedAt?: string;
}
