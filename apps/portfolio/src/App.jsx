import { useState } from 'react'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import Layout from './components/Layout.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('work')

  return (
    <>
      <NoiseOverlay />
      <Layout activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  )
}
