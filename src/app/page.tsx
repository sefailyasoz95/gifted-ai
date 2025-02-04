import { UploadZone } from "@/components/upload-zone";
import { FloatingPosts } from "@/components/floating-posts";
import { Navbar } from "@/components/navbar";

export default function Home() {
	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center p-3 gap-y-3'>
			{/* Background blur and gradient */}
			<div className='fixed inset-0 bg-gradient-to-br from-rose-200 via-pink-200 to-red-100 dark:from-rose-950 dark:via-pink-900 dark:to-red-900 opacity-80' />

			{/* Romantic pattern overlay */}
			<div className='fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none' />

			{/* Navigation */}
			<Navbar />

			{/* Title */}
			<div className='relative z-10 text-center space-y-4 bg-background/60 p-8 backdrop-blur-xl rounded-xl drop-shadow-lg'>
				<h1 className='text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent dark:from-pink-400 dark:via-purple-400 dark:to-orange-400'>
					Gifted-AI
				</h1>

				<p className='text-lg text-gray-600 dark:text-gray-400'>Get personalized Valentine's Day gift ideas based on your photos and context</p>
			</div>

			{/* Floating posts in background */}
			<FloatingPosts />

			{/* Upload zone in foreground */}
			<div className='relative z-10 flex items-center justify-center w-full'>
				<UploadZone />
			</div>

			{/* Footer */}
			<div className="fixed bottom-4 z-10 text-sm text-muted-foreground">
				An app by{' '}
				<a 
					href="https://softwarify.co" 
					target="_blank" 
					rel="noopener noreferrer"
					className="font-medium hover:text-primary transition-colors"
				>
					Softwarify
				</a>
			</div>
		</main>
	);
}
