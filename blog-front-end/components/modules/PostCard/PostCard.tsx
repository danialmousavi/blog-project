import { ArticleType } from '@/types/Article'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../FormData/FormDate'

type PostCardProps={
  post:ArticleType
}
export default function PostCard({ post }:PostCardProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${post.image}`;
  return (
    <Link
      href={`/blogs/${post.id}`}
      className="
        group block
        rounded-xl
        border border-gray-200
        overflow-hidden
        hover:shadow-lg
        hover:border-blue-500
        transition
      "
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        {/* Title */}
        <h3
          className="
            mb-3
            text-lg md:text-xl
            font-semibold
            text-gray-800
            group-hover:text-blue-600
            transition
          "
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
          {post.content}
        </p>
      </div>
    </Link>
  )
}


