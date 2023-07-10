import '@/styles/globals.css'
import Navbar from '../components/Navbar'
import LeftTab from '../components/LeftTab'

export default function App({ Component, pageProps }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <LeftTab />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
