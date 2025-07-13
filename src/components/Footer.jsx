function Footer() {
    return (
        <div>
            <footer className="bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-800 text-cyan-100 py-6 px-4 mt-12 shadow-inner">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg flex items-center gap-2">
                        &copy; {new Date().getFullYear()} My store. All rights reserved.
                    </span>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
