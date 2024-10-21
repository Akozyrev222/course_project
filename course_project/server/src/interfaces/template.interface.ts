export interface TemplateAttributes {
    id: number;
    title: string;
    description?: string;
    isPublic: boolean;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    allowedUsers?: number[]
}

export type TemplateCreationAttributes = Omit<TemplateAttributes, 'id' | 'createdAt' | 'updatedAt'>;
