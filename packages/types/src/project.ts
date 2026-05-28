// 📦 Project Type
export type Project = {
    id?: number
    title: string
    desc: string
    category: string
    hero?: string
    tech: string
    liveURL: string
    githubURL: string
}

// 🌸 Common Response
export type COMMON_RESPONSE = {
    message: string
}

// 🚀 Create Project Request
export interface CREATE_PROJECT_REQUEST {
    title: string
    desc: string
    category: string
    hero?: string
    tech: string
    liveURL: string
    githubURL: string
}

// 📖 Read Project Response
export interface READ_PROJECT_RESPONSE {
    result: Project[]
}

// ✏️ Update Project Request
export interface UPDATE_PROJECT_REQUEST {
    id: number
    body: FormData
}

// 🗑️ Delete Project Request
export interface DELETE_PROJECT_REQUEST {
    id: number
}