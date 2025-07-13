import ProductCard from './ProductCard'

const products = [
  { id: 1, name: 'Shirts', price: 499, image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg' },

  { id: 2, name: 'T-shirt', price: 1499, image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg' },

  { id: 3, name: 'Graphical Tee', price: 140, image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg' }
]

const ProductList = ({onAddToCart}) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}/>)}
        </div>
      </div>
      {/* Footer with same color as navbar */}
      
    </>
  )
}

export default ProductList
