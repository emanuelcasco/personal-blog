import Link from 'next/link'

import Heading from '@components/UI/Heading'
import PostTimeData from '@components/Posts/PostTime/PostTime'
import { Post } from '@entities'

import styles from './PostPreviewItem.css'
import PostImage from '../PostImage'

interface PostPreviewItemProps {
  post: Post
}

function PostPreviewItem({ post }: PostPreviewItemProps) {
  return (
    <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
      <li className={styles.postPreview}>
        <PostImage post={post} size={'small'} />
        <PostTimeData
          date={post.date}
          readTime={post.readTime}
          className={styles.postPreview__date}
        />
        <aside className={styles.postPreview__content}>
          <Heading type="h3">{post.title}</Heading>
          <p className={styles.postPreview__excerpt}>{post.excerpt}</p>
        </aside>
      </li>
    </Link>
  )
}

export default PostPreviewItem
