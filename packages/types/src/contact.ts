export type Contact = {
  id?: number
  name: string
  email: string
  message: string
  createdAt?: Date
}

export type CONTACT_COMMON_RESPONSE = {
  message: string
}

// ➕ CREATE CONTACT
export interface CREATE_CONTACT_REQUEST {
  name: string
  email: string
  message: string
}

export interface CREATE_CONTACT_RESPONSE {
  message: string
  result?: Contact | undefined
}

// 👀 READ CONTACTS
export interface READ_CONTACT_RESPONSE {
  message: string
  result: Contact[]
}

// ✏️ UPDATE CONTACT
export interface UPDATE_CONTACT_REQUEST {
  id: number
  name: string
  email: string
  message: string
}

export interface UPDATE_CONTACT_RESPONSE {
  message: string
  result?: Contact | undefined
}

// ❌ DELETE CONTACT
export interface DELETE_CONTACT_REQUEST {
  id: number
}

export interface DELETE_CONTACT_RESPONSE {
  message: string
}

// ----------- Send Email ---------------
export interface SendEmailParams {
  email: string;
  subject: string;
  message: string;
}