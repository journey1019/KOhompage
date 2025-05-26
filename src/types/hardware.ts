import { Resource } from '@/types/resource';

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

export interface HardwareFormState extends Omit<Resource, 'tags' | 'hideTag' | 'solutionTag'> {
    tags: string[];
    hideTag: string[];
    solutionTag: string[];
    createdAt?: string;
    updatedAt?: string;
}
