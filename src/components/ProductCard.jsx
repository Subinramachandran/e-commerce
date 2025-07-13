
const ProductCard = ({ product, onAddToCart }) => {

  return (
    <div className="">
      <div className="bg-white border border-blue-100 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col items-center">
        <img src={product.image} alt={product.name} className="mb-4 w-40 h-40 object-cover rounded-xl shadow-sm border border-blue-50" />
        <h3 className="font-bold text-lg text-gray-800 mb-1 text-center">{product.name}</h3>
        <p className="text-cyan-700 font-semibold text-xl mb-3">₹{product.price}</p>
        <button
          className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer w-full"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
