// srtapi 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { READ_PROFILE_RESPONSE, CREATE_PROFILE_RESPONSE, UPDATE_PROFILE_RESPONSE, READ_PROJECT_RESPONSE, CREATE_PROJECT_REQUEST, COMMON_RESPONSE, UPDATE_PROJECT_REQUEST, DELETE_PROJECT_REQUEST, READ_SKILL_RESPONSE, SKILL_COMMON_RESPONSE, CREATE_SKILL_REQUEST, UPDATE_SKILL_REQUEST, DELETE_SKILL_REQUEST, EXPERIENCE_COMMON_RESPONSE, CREATE_EXPERIENCE_REQUEST, UPDATE_EXPERIENCE_REQUEST, DELETE_EXPERIENCE_REQUEST, READ_EXPERIENCE_RESPONSE, CONTACT_COMMON_RESPONSE, CREATE_CONTACT_REQUEST } from '@repo/types';
import { APP_URL } from '../../config/env';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ 
      // baseUrl: `${APP_URL}/api/admin`, 
      baseUrl: `/api/admin`, 
      credentials: 'include' }),
    tagTypes: ["profile", "project", "skills", "experience", "contact"],
    endpoints: (builder) => {
        return {

            // 🔎 GET Profile API
            getProfile: builder.query<READ_PROFILE_RESPONSE, void>({
                query: () => {
                    return {
                        url: '/read-profile',
                        method: 'GET',
                    }
                },
                providesTags: ["profile"]
            }),

            // ➕ CREATE Profile API
            createProfile: builder.mutation<CREATE_PROFILE_RESPONSE, FormData>({
                query: (formData) => {
                    return {
                        url: '/create-profile',
                        method: 'POST',
                        body: formData
                    }
                },
                invalidatesTags: ["profile"]
            }),

            // 🔄 UPDATE Profile API
            updateProfile: builder.mutation<UPDATE_PROFILE_RESPONSE, FormData>({
                query: (formData) => {
                    return {
                        url: '/update-profile',
                        method: 'PUT',
                        body: formData
                    }
                },
                invalidatesTags: ["profile"]
            }),


            // ================================ PROJECT ===========================

            // 🔎 GET PROJECT API
            getProject: builder.query<READ_PROJECT_RESPONSE, void>({
                query: () => {
                    return {
                        url: '/read-project',
                        method: 'GET',
                    }
                },
                providesTags: ["project"]
            }),
            
            
            // ➕ CREATE PROJECT API
            createProject: builder.mutation<COMMON_RESPONSE, FormData>({
                query: (formData) => {
                    return {
                        url: '/create-project',
                        method: 'POST',
                        body: formData
                    }
                },
            
                // ✅ refresh project list
                invalidatesTags: ["project"]
            }),
            
            
            // ✏️ UPDATE PROJECT API
            updateProject: builder.mutation< COMMON_RESPONSE, UPDATE_PROJECT_REQUEST>({
                query: ({ id, body }) => {
            
                    return {
                        url: `/update-project/${id}`,
                        method: "PUT",
                        body,
                    };
                },
            
                invalidatesTags: ["project"]
            }),
            
            
            // 🗑️ DELETE PROJECT API
            deleteProject: builder.mutation< COMMON_RESPONSE, DELETE_PROJECT_REQUEST >({
                query: ({ id }) => {
            
                    return {
                        url: `/delete-project/${id}`,
                        method: "DELETE",
                    };
                },
            
                invalidatesTags: ["project"]
            }),

            // ================================ SKILLS ===========================
            
             // 🔎 GET SKILLS API
            getSkills: builder.query<READ_SKILL_RESPONSE, void>({
              query: () => {
                return {
                  url: "/read-skill",
                  method: "GET",
                }
              },
            
              providesTags: ["skills"]
            }),
            
            
            // ➕ CREATE SKILL API
            createSkills: builder.mutation< SKILL_COMMON_RESPONSE, CREATE_SKILL_REQUEST >({
              query: (skillData) => {
                return {
                  url: "/create-skill",
                  method: "POST",
                  body: skillData,
                }
              },
            
              invalidatesTags: ["skills"]
            }),
            
            
            // ✏️ UPDATE SKILL API
            updateSkill: builder.mutation< SKILL_COMMON_RESPONSE, UPDATE_SKILL_REQUEST >({
              query: ({ id, skill }) => {
                return {
                  url: `/update-skill/${id}`,
                  method: "PUT",
                  body: { skill },
                }
              },
            
              invalidatesTags: ["skills"]
            }),
            
            
            // ❌ DELETE SKILL API
            deleteSkill: builder.mutation< SKILL_COMMON_RESPONSE, DELETE_SKILL_REQUEST>({
              query: ({ id }) => {
                return {
                  url: `/delete-skill/${id}`,
                  method: "DELETE",
                }
              },
            
              invalidatesTags: ["skills"]
            }),

            // ================================ Experience ===========================
            // 👀 GET ALL
            getExperience: builder.query<READ_EXPERIENCE_RESPONSE, void>({
              query: () => "/experience",
              providesTags: ["experience"],
            }),
        
            // ➕ CREATE
            createExperience: builder.mutation<EXPERIENCE_COMMON_RESPONSE, CREATE_EXPERIENCE_REQUEST>({
              query: (data) => ({
                url: "/experience",
                method: "POST",
                body: data,
              }),
              invalidatesTags: ["experience"],
            }),
        
            // ✏️ UPDATE
            updateExperience: builder.mutation<EXPERIENCE_COMMON_RESPONSE, UPDATE_EXPERIENCE_REQUEST>({
              query: (data) => ({
                url: `/experience`,
                method: "PUT",
                body: data,
              }),
              invalidatesTags: ["experience"],
            }),
        
            // ❌ DELETE
            deleteExperience: builder.mutation<EXPERIENCE_COMMON_RESPONSE, DELETE_EXPERIENCE_REQUEST>({
              query: (id) => ({
                url: `/experience`,
                method: "DELETE",
                body: { id },
              }),
              invalidatesTags: ["experience"],
            }),

            // ================================ contact ===========================
            // ➕ CREATE contact API
            createContact: builder.mutation< CONTACT_COMMON_RESPONSE, CREATE_CONTACT_REQUEST >({
              query: (contactData) => {
                return {
                  url: "/create-contact",
                  method: "POST",
                  body: contactData,
                }
              },
            
              invalidatesTags: ["contact"]
            }),
        }
    }
});

export const { 
    useGetProfileQuery, 
    useCreateProfileMutation, 
    useUpdateProfileMutation,

    // project 
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,

    // sksills 
    useGetSkillsQuery,
    useCreateSkillsMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation,

    // experience 
    useGetExperienceQuery,
    useCreateExperienceMutation,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,

    // contact 
    useCreateContactMutation


} = adminApi;