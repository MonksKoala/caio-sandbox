import { useState, Component } from 'react'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import Layout from './components/Layout.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('React Error:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', color: 'red' }}>
          <h1>Render Error</h1>
          <pre>{this.state.error.message}</pre>
          <pre>{this.state.error.stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('cv')

  return (
    <ErrorBoundary>
      <NoiseOverlay />
      <Layout activeTab={activeTab} onTabChange={setActiveTab} />
    </ErrorBoundary>
  )
}
