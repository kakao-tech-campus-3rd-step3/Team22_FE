import { api } from './api'

// Request/Response 타입 정의
export interface CreatePostRequest {
  title: string
  content: string
}

export interface PostResponse {
  id: number
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
  authorId?: number
}

export interface CreatePostResponse {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: number
}

// Pagination 파라미터
export interface GetPostsParams {
  page?: number
  size?: number
  sort?: string[]
}

// Pagination 응답
export interface PageResponse<T> {
  content: T[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

// 이미지 타입
export interface ImageUploadResponse {
  id: number
  postId: number
  imageUrl: string
  uploadedAt: string
}

export interface DeleteImageResponse {
  success: boolean
  message: string
}

// 게시글 API
export const postApi = {
  // 게시글 작성
  createPost: async (data: CreatePostRequest): Promise<CreatePostResponse> => {
    const response = await api.post<CreatePostResponse>('/posts', data)
    return response.data
  },

  // 게시글 목록 조회 (페이지네이션)
  getPosts: async (params?: GetPostsParams): Promise<PageResponse<PostResponse>> => {
    const response = await api.get<PageResponse<PostResponse>>('/posts', {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? 10,
        sort: params?.sort ?? ['createdAt,desc'],
      },
    })
    return response.data
  },

  // 게시글 삭제
  deletePost: async (postId: number): Promise<void> => {
    await api.delete(`/posts/${postId}`)
  },
}

// 이미지 API
export const imageApi = {
  // 이미지 업로드
  uploadImage: async (postId: number, file: File): Promise<ImageUploadResponse> => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post<ImageUploadResponse>(`/images/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // 게시글의 모든 이미지 조회
  getImages: async (postId: number): Promise<string[]> => {
    const response = await api.get<string[]>(`/images/${postId}`)
    return response.data
  },

  // 게시글의 모든 이미지 삭제
  deleteImages: async (postId: number): Promise<DeleteImageResponse> => {
    const response = await api.delete<DeleteImageResponse>(`/images/${postId}`)
    return response.data
  },
}
