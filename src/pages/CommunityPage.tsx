'use client'

import { useState, useEffect, useCallback } from 'react'
import { postApi, imageApi, type CreatePostRequest } from '@/api/post'
import { Login403Error, SessionExpired403Error, Server500Error } from '@/constants/Erros'

interface Post {
  id: number
  author: {
    name: string
    avatar?: string
  }
  title: string
  content: string
  createdAt: string | null
  likes: number
  comments: number
  images?: string[]
}

interface ModalState {
  isOpen: boolean
  postId: number | null
  images: string[]
}

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // 이미지 상태
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Modal 상태
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    postId: null,
    images: [],
  })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  // Pagination 상태
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // 파일 검증 함수
  const validateImage = (file: File): string | null => {
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return `허용되지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')}만 지원)`
    }

    if (file.size > MAX_FILE_SIZE) {
      return `파일 크기가 10MB를 초과합니다. (현재: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
    }

    return null
  }

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || [])

    if (files.length === 0) return

    for (const file of files) {
      const error = validateImage(file)
      if (error) {
        setUploadError(error)
        e.currentTarget.value = ''
        return
      }
    }

    const newUrls = files.map((file) => URL.createObjectURL(file))
    setSelectedImages((prev) => [...prev, ...files])
    setImagePreviewUrls((prev) => [...prev, ...newUrls])
    setUploadError(null)
  }

  // 미리보기 제거
  const removeImagePreview = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index])
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // 게시글 목록 불러오기
  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setFetchError(null)

    try {
      const response = await postApi.getPosts({
        page: currentPage,
        size: pageSize,
        sort: ['createdAt,desc'],
      })

      const fetchedPosts: Post[] = response.content.map((post) => ({
        id: post.id,
        author: { name: '익명', avatar: '👤' },
        title: post.title,
        content: post.content,
        createdAt: post.createdAt || null,
        likes: 0,
        comments: 0,
        images: [],
      }))

      setPosts(fetchedPosts)
      setTotalPages(response.page.totalPages)
      setTotalElements(response.page.totalElements)
    } catch (err) {
      console.error('❌ 게시글 불러오기 실패:', err)

      if (err instanceof SessionExpired403Error) {
        setFetchError('세션이 만료되었습니다. 다시 로그인해주세요.')
      } else if (err instanceof Login403Error) {
        setFetchError('로그인이 필요합니다.')
      } else if (err instanceof Server500Error) {
        setFetchError('서버 오류가 발생했습니다.')
      } else {
        setFetchError('게시글을 불러오는데 실패했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // 이미지 조회
  const openImageModal = async (postId: number) => {
    setIsLoadingImages(true)
    try {
      const images = await imageApi.getImages(postId)
      setModal({
        isOpen: true,
        postId,
        images,
      })
      setCurrentImageIndex(0)
    } catch (err) {
      console.error('❌ 이미지 조회 실패:', err)
      alert('이미지를 불러오는데 실패했습니다.')
    } finally {
      setIsLoadingImages(false)
    }
  }

  // Modal 닫기
  const closeImageModal = () => {
    setModal({
      isOpen: false,
      postId: null,
      images: [],
    })
    setCurrentImageIndex(0)
  }

  // 다음/이전 이미지
  const nextImage = () => {
    if (currentImageIndex < modal.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  // 이미지 업로드
  const uploadImages = async (postId: number): Promise<boolean> => {
    if (selectedImages.length === 0) return true

    setIsUploadingImage(true)
    let uploadCount = 0

    try {
      for (const image of selectedImages) {
        try {
          await imageApi.uploadImage(postId, image)
          uploadCount++
        } catch (imgError) {
          console.error('❌ 이미지 업로드 실패:', imgError)
        }
      }

      if (uploadCount === 0 && selectedImages.length > 0) {
        setError('이미지 업로드에 실패했습니다.')
        return false
      }

      if (uploadCount < selectedImages.length) {
        setError(`${uploadCount}/${selectedImages.length}개 이미지만 업로드되었습니다.`)
      }

      return true
    } finally {
      setIsUploadingImage(false)
    }
  }

  // 게시글 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim() || !newPost.content.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const requestData: CreatePostRequest = {
        title: newPost.title,
        content: newPost.content,
      }

      const postResponse = await postApi.createPost(requestData)

      const imageUploadSuccess = await uploadImages(postResponse.id)

      if (!imageUploadSuccess && selectedImages.length > 0) {
        console.warn('⚠️ 이미지 업로드 실패했지만 게시글은 저장됨')
      }

      setNewPost({ title: '', content: '' })
      setSelectedImages([])
      setImagePreviewUrls([])
      setIsWriting(false)

      if (currentPage === 0) {
        await fetchPosts()
      } else {
        setCurrentPage(0)
      }
    } catch (err) {
      console.error('❌ 게시글 작성 실패:', err)

      if (err instanceof SessionExpired403Error) {
        setError('세션이 만료되었습니다. 다시 로그인해주세요.')
      } else if (err instanceof Login403Error) {
        setError('로그인이 필요합니다.')
      } else if (err instanceof Server500Error) {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } else {
        setError('게시글 작성에 실패했습니다.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // 게시글 삭제
  const handlePostDelete = async (postId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      try {
        await imageApi.deleteImages(postId)
      } catch (_) {}

      await postApi.deletePost(postId)

      await fetchPosts()
    } catch (err) {
      console.error('❌ 삭제 실패:', err)
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    setIsWriting(false)
    setNewPost({ title: '', content: '' })
    setSelectedImages([])
    setImagePreviewUrls([])
    setError(null)
    setUploadError(null)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return null

      const now = new Date()
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diff < 0) return '방금 전'
      if (diff < 60) return '방금 전'
      if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
      if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
      if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`

      return date.toLocaleDateString('ko-KR')
    } catch (e) {
      console.error('날짜 변환 오류:', e)
      return null
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-full bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">커뮤니티</h1>
          <p className="mt-2 text-neutral-400">반려동물 이야기를 자유롭게 나눠보세요</p>
          {totalElements > 0 && (
            <p className="mt-1 text-sm text-neutral-500">총 {totalElements}개의 게시글</p>
          )}
        </div>

        {/* Fetch Error Message */}
        {fetchError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {fetchError}
          </div>
        )}

        {/* Write Button */}
        {!isWriting && (
          <button
            onClick={() => setIsWriting(true)}
            className="w-full mb-6 p-4 bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-lg text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 transition-colors"
          >
            + 새 글 작성하기
          </button>
        )}

        {/* Write Form */}
        {isWriting && (
          <div className="mb-6 bg-neutral-900 rounded-lg shadow-lg border border-neutral-800 p-6">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              {uploadError && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                  {uploadError}
                </div>
              )}

              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full mb-4 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting || isUploadingImage}
              />

              <textarea
                placeholder="내용을 입력하세요 (최소 10자)"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={6}
                className="w-full mb-4 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting || isUploadingImage}
              />

              <div className="mb-4">
                <label className="block text-sm text-neutral-400 mb-2">
                  이미지 추가 (JPG, PNG, WebP • 최대 10MB)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageSelect}
                  disabled={isSubmitting || isUploadingImage}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-400 cursor-pointer hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {imagePreviewUrls.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-neutral-400 mb-2">
                    미리보기 ({imagePreviewUrls.length})
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {imagePreviewUrls.map((url, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt={`preview-${idx}`}
                          className="w-20 h-20 object-cover rounded-lg border border-neutral-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(idx)}
                          disabled={isSubmitting || isUploadingImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-neutral-400 hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
                  disabled={isSubmitting || isUploadingImage}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={
                    !newPost.title.trim() ||
                    !newPost.content.trim() ||
                    isSubmitting ||
                    isUploadingImage
                  }
                >
                  {isSubmitting || isUploadingImage ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{isUploadingImage ? '이미지 업로드 중...' : '작성 중...'}</span>
                    </>
                  ) : (
                    '작성하기'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-neutral-700 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-neutral-500">게시글을 불러오는 중...</p>
          </div>
        )}

        {/* Post List */}
        {!isLoading && (
          <div className="space-y-4">
            {posts.map((post) => {
              const formattedDate = formatDate(post.createdAt)

              return (
                <article
                  key={post.id}
                  className="bg-neutral-900 rounded-lg shadow-lg border border-neutral-800 p-6 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-xl">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{post.author.name}</p>
                        {formattedDate && (
                          <p className="text-sm text-neutral-500">{formattedDate}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePostDelete(post.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                  <p className="text-neutral-300 mb-4">{post.content}</p>

                  <div className="flex items-center gap-6 text-sm text-neutral-400">
                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => openImageModal(post.id)}
                      className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                    >
                      <span>📷</span>
                      <span>사진 보기</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-neutral-900 text-neutral-400 rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              이전
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i
                } else if (currentPage < 3) {
                  pageNum = i
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 5 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-neutral-900 text-neutral-400 rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              다음
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && !isWriting && (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">아직 작성된 글이 없습니다</p>
            <button
              onClick={() => setIsWriting(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              첫 글 작성하기
            </button>
          </div>
        )}

        {/* Image Modal */}
        {/* Image Modal - 웹앱 최적화 */}
        {modal.isOpen && modal.images.length > 0 && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3"
            onClick={closeImageModal}
          >
            <div
              className="bg-neutral-900 rounded-lg w-80 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-2 border-b border-neutral-800">
                <p className="text-white font-semibold text-xs">
                  {currentImageIndex + 1} / {modal.images.length}
                </p>
                <button
                  onClick={closeImageModal}
                  className="text-neutral-400 hover:text-white text-base"
                >
                  ✕
                </button>
              </div>

              {/* Image Display */}
              {isLoadingImages ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-5 h-5 border-2 border-neutral-700 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="relative w-full flex items-center justify-center h-48 overflow-hidden p-2">
                  <img
                    src={modal.images[currentImageIndex]}
                    alt={`post-image-${currentImageIndex}`}
                    className="max-w-full max-h-full object-contain"
                  />

                  {modal.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className="absolute left-0.5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed text-white p-0.5 rounded-full transition-colors text-xs"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={currentImageIndex === modal.images.length - 1}
                        className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed text-white p-0.5 rounded-full transition-colors text-xs"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Thumbnail List */}
              {modal.images.length > 1 && (
                <div className="flex gap-1 p-1.5 border-t border-neutral-800 overflow-x-auto bg-neutral-900">
                  {modal.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex
                          ? 'border-blue-500'
                          : 'border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
