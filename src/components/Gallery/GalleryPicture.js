import { useParams, useSearchParams } from "react-router-dom"
import Card from "../UI/Card/Card"
import styles from './GalleryPicture.module.css'

function GalleryPicture() {
  const { imageId } = useParams()
  const [ searchParams ] = useSearchParams()
  const useGrayScale = searchParams.get('grayscale') === 'true'

  const url = `https://picsum.photos/id/${imageId}/300/300${useGrayScale ? '?grayscale' : ''}`

  return (
    <Card className={styles.picture}>
      <img alt='imagen de picsum' src={url} />
    </Card>
  )
}

export default GalleryPicture
