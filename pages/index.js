import styles from '../styles/Home.module.css'
import Todolist from '../Components/Todolist'

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
