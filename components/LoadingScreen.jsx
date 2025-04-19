import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white">
		<div className="flex flex-col items-center gap-4">
			<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-accent" />
			<p className="text-sm text-gray-400">Loading Verifi...</p>
		</div>
	</div>
  )
}

export default LoadingScreen
