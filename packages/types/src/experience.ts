// ✅ TYPES
export type Experience = {
  id?: number
  companyName: string
  role: string
  desc: string
  workingDate: string
}

// ✅ COMMON RESPONSE
export type EXPERIENCE_COMMON_RESPONSE = {
  message: string
}

// ➕ CREATE
export interface CREATE_EXPERIENCE_REQUEST {
  companyName: string
  role: string
  desc: string
  workingDate: string
}

export interface CREATE_EXPERIENCE_RESPONSE {
  message: string
  result?: Experience | undefined
}

// 👀 READ
export interface READ_EXPERIENCE_RESPONSE {
  message: string
  result: Experience[]
}

// ✏️ UPDATE
export interface UPDATE_EXPERIENCE_REQUEST {
  id: number
  companyName: string
  role: string
  desc: string
  workingDate: string
}

export interface UPDATE_EXPERIENCE_RESPONSE {
  message: string
  result?: Experience | undefined
}

// ❌ DELETE
export interface DELETE_EXPERIENCE_REQUEST {
  id: number
}

export interface DELETE_EXPERIENCE_RESPONSE {
  message: string
}