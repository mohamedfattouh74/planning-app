export interface Task {
    id: string;
    content: string;
    dueDate: string;
    priority: string;
    labels: string[];
    metaData: { 
        createdAt: Date,
        createdBy: number,
        lastUpdated: Date
    }
}