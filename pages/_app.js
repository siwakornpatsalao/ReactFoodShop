import '@/styles/globals.css'
import Navbar from '../components/Navbar'
import LeftTab from '../components/LeftTab'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar/>
      <LeftTab/>
  <Component {...pageProps} />
    </div>
  )
}
