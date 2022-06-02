import FlexContainer from '@components/UI/Containers/FlexContainer'
import StackContainer from '@components/UI/Containers/StackContainer'
import { Post } from '@entities'
import { useTranslation } from '@i18n'

import styles from './PostAuthor.css'

type PostAuthorProps = {
  post: Post
}

const PostAuthor = ({ post }: PostAuthorProps) => {
  const { t } = useTranslation('post')
  return (
    <FlexContainer tag="aside">
      <img
        loading="lazy"
        decoding="async"
        className={styles.author__image}
        src="/assets/avatar_photo.png"
        alt={`Author, Emanuel Casco`}
      />
      <StackContainer>
        <div>Thanks</div>
        <div>Contact</div>
      </StackContainer>
    </FlexContainer>
  )
}

export default PostAuthor
