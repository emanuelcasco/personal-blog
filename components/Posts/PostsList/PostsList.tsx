import PostPreviewItem from '@components/Posts/PostPreviewItem'
import FlexContainer from '@components/UI/Containers/FlexContainer'
import { Post } from '@entities'

import styles from './PostsList.css'

interface PostsList {
  posts: Post[]
}

function PostsList({ posts = [] }: PostsList) {
  return (
    <FlexContainer tag="ul" className={styles.postUl}>
      {posts.map((post) => (
        <PostPreviewItem key={post.title} post={post} />
      ))}
    </FlexContainer>
  )
}

export default PostsList
