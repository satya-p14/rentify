export default function Footer() {
    return (
        <footer className="bg-gray-100 py-4 mt-10">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} RentifyApp. All rights reserved.
            </div>
        </footer>
    );
}
