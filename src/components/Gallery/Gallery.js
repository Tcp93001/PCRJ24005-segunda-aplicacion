import { Routes, Route, Link, useSearchParams } from "react-router-dom"
import Card from '../UI/Card/Card'
import Button from "../UI/Button/Button"
import GalleryPicture from "./GalleryPicture"
import styles from './Gallery.module.css'

const pictureIds = [
  {id: 1001},
  {id: 1002},
  {id: 1003},
  {id: 1004},
  {id: 1005}
]

function Gallery() {
  const [ searchParams, setSearchParams ] = useSearchParams()

  return (
    <div className={styles.container}>
      <Card className={styles.gallery}>
        <h1>
          Galería
        </h1>
        <ul>
          {pictureIds.map(({ id }) => (
            <li key={id}>
              <Link to={`${id}`}>Imagen #{id}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <Button onClick={() => setSearchParams({ grayscale: true })}>B/N</Button>
        <Button onClick={() => setSearchParams({ grayscale: false })}>Color</Button>
      </Card>
      <Routes>
        <Route path=':imageId' element={<GalleryPicture />} />
      </Routes>

    </div>
  )
}

export default Gallery
