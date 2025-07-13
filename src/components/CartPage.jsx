
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ items, onRemove }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center relative px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute -top-4 -right-4 bg-white border border-gray-300 shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Close Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Cart items={items} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default CartPage;
