// ================= BASE =================
export type BaseProfile = {
  name: string;
  title: string;
  bio: string;
  journey: string;
  work: string;
  dob: string;
  location: string;
  email: string;
  mobile: string;
  language: string;
  yearExp: number;
  projectsCompleted: number;
  technologies: number;
  happyClients: number;
  githubURL : string;
  linkedin: string;
};

export type Profile = BaseProfile & {
  id: number;
  profileImage: string;
  cv: string;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
};

// ================= CREATE =================
// Using mapped types for the request payload since numbers might be sent as strings in FormData
export type CREATE_PROFILE_REQUEST = {
  [K in keyof BaseProfile]: BaseProfile[K] | string;
};

export type CREATE_PROFILE_RESPONSE = {
  message: string;
};

// ================= READ =================
export type READ_PROFILE_REQUEST = void;

export type READ_PROFILE_RESPONSE = {
  message: string;
  result: Profile | null;
};

// ================= UPDATE =================
export type UPDATE_PROFILE_REQUEST = Partial<CREATE_PROFILE_REQUEST> & {
  id?: number | string;
};

export type UPDATE_PROFILE_RESPONSE = {
  message: string;
};

// ================= DELETE =================
export type DELETE_PROFILE_REQUEST = {
  id: number;
};

export type DELETE_PROFILE_RESPONSE = {
  message: string;
};