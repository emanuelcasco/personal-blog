import { Post } from '@entities'

import styles from './PostBody.css'

type PostBodyProps = {
  content: Post['content']
}

const PostBody = ({ content }: PostBodyProps) => {
  return (
    <section
      className={styles.postBody}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostBody
