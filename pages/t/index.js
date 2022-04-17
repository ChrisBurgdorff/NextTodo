import Todolist from '../../Components/Todolist';
import { useRouter } from 'next/router';

export default function Home() {


  

  return (
    <>
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <Todolist />
        </div>
      </div>      
    </>
  )
}
