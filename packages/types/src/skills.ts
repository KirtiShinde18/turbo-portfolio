export type Skill = {
  id?: number
  skill: string
}


// ✅ COMMON RESPONSE
export type SKILL_COMMON_RESPONSE = {
  message: string
}


// ➕ CREATE
export interface CREATE_SKILL_REQUEST {
  skill: string
}

export interface CREATE_SKILL_RESPONSE {
  message: string
  result?: Skill | undefined
}


// 👀 READ
export interface READ_SKILL_RESPONSE {
  message: string

  result: Skill[]
}


// ✏️ UPDATE
export interface UPDATE_SKILL_REQUEST {
  id: number
  skill: string
}

export interface UPDATE_SKILL_RESPONSE {
  message: string
  result?: Skill | undefined
}


// ❌ DELETE
export interface DELETE_SKILL_REQUEST {
  id: number
}

export interface DELETE_SKILL_RESPONSE {
  message: string
}