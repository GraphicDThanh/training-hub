export interface AvatarCard {
  avatar: string;
  id?: number;
  name?: string;
}

export interface ToolCard {
  image: string;
}

export interface Project {
  id: number;
  createdAt?: string;
  name: string;
  description: string;
  participants: number[];
  participantsData?: AvatarCard[];
  dueDate: Date | string;
  tools: number[];
  toolsData?: ToolCard[];
}

export interface ProjectFormData {
  id?: number;
  name: string;
  description: string;
  participants: number[];
  dueDate: Date | string;
  tools: number[];
}

export interface ImageProject {
  id: number;
  name: string;
  image?: string;
  description?: string;
}
