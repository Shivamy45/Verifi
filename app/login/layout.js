// app/login/layout.js
export default function LoginLayout({ children }) {
	return (
		<>
			{/* This layout will not include Navbar or Footer */}
			{children}
		</>
	);
}
