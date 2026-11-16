import React, { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import AgentPipeline from './components/AgentPipeline'

export default function App() {
  // Sync view with URL hash for seamless browser navigation
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#pipeline' ? 'pipeline' : 'landing'
  })

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#pipeline' ? 'pipeline' : 'landing')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectWorkflow = (workflowId) => {
    if (workflowId === 'quant-finance') {
      window.location.hash = '#pipeline'
      setCurrentView('pipeline')
    }
  }

  const handleBackToLanding = () => {
    window.location.hash = ''
    setCurrentView('landing')
  }

  if (currentView === 'pipeline') {
    return <AgentPipeline onBack={handleBackToLanding} />
  }

  return <LandingPage onSelectWorkflow={handleSelectWorkflow} />
}
