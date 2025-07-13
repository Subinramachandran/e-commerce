

const Cart = ({ items, onRemove, onEdit }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return (
    <div>
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>
        {items.length === 0 ? (
          <p className="text-gray-600">Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2 gap-2">
                <span className="font-medium truncate max-w-[120px]">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-semibold">₹{item.price}</span>
                  <button
                    className="p-1.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
                    onClick={() => onRemove && onRemove(index)}
                    aria-label="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Total summary section */}
        {items.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-between shadow-sm">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-xl font-bold text-blue-700">₹{total}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
