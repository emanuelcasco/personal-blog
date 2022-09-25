import FlexContainer from '@components/UI/Containers/FlexContainer'
import StackContainer from '@components/UI/Containers/StackContainer'

import styles from './PostAuthor.css'

const PostAuthor = () => {
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
