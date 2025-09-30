import BackButton from '@components/UI/BackButton'
import Heading from '@components/UI/Heading'
import PostTime from '@components/Posts/PostTime'
import PostImage from '@components/Posts/PostImage'
import { Post } from '@entities'

import styles from './PostHeader.css'

type PostHeaderProps = {
  post: Post
}

function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <BackButton />
        <PostTime date={post.date} readTime={post.readTime} />
      </div>
      <Heading type="h1" style={{ textAlign: 'center' }}>
        {post.title}
      </Heading>
      <PostImage post={post} size="large" />
    </div>
  )
}

export default PostHeader
