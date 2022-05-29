import { Post } from '@entities'
import styles from './PostImage.css'

type PostImageProps = {
  post: Post
  size: 'small' | 'large'
}

const PostBody = ({ post, size = 'small' }: PostImageProps) => {
  const Image = (
    <img
      loading="lazy"
      decoding="async"
      className={styles.image[size]}
      src={post.coverImage}
      alt={`Cover for the post "${post.title}"`}
    />
  )
  return size === 'large' ? (
    <figure className={styles.container}>{Image}</figure>
  ) : (
    Image
  )
}

export default PostBody
