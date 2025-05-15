
import { useParams } from 'react-router-dom'

function  ViewStash() {
    const { id } = useParams();
    console.log(id);
  return (
    <div>{id}</div>
  )
}

export default ViewStash;