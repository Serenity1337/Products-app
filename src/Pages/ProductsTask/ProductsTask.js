import React, { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Shared/Button'
import AddNewProductModal from '../../Modals/AddNewProductModal'

export const ProductsTask = () => {
  const allProducts = [
    { name: 'Laptop', price: 800, quantity: 1 },
    { name: 'Dishwasher', price: 600, quantity: 1 },
    { name: 'Coffee Maker', price: 400, quantity: 1 },
    { name: 'Smartphone', price: 200, quantity: 1 },
  ]

  const [currentProducts, setCurrentProducts] = useState([])
  const [newProduct, setNewProduct] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const newProductHandler = () => {
    setNewProduct(true)
  }

  useEffect(() => {
    let totalPriceCopy = 0

    for (let index = 0; index < currentProducts.length; index++) {
      const productTotalPrice =
        Number(currentProducts[index].price) *
        Number(currentProducts[index].quantity)
      const taxedProductPrice = (21 * productTotalPrice) / 100
      totalPriceCopy = totalPriceCopy + productTotalPrice + taxedProductPrice
    }
    setTotalPrice(totalPriceCopy)
    console.log(totalPriceCopy)
  }, [currentProducts])
  return (
    <div>
      <Button
        type=''
        text='Add Product'
        stylesClass='addProduct'
        onClick={newProductHandler}
      />
      <div style={{ display: 'flex' }}>
        {currentProducts.length > 0
          ? currentProducts.map((product, productIndex) => (
              <ProductCard
                currentProducts={currentProducts}
                setCurrentProducts={setCurrentProducts}
                product={product}
                productIndex={productIndex}
                allProducts={allProducts}
              />
            ))
          : null}
      </div>

      {totalPrice > 0 ? (
        <h1 style={{ marginLeft: '10px' }}>Total price: {totalPrice} €</h1>
      ) : null}
      {newProduct ? (
        <AddNewProductModal
          setNewProduct={setNewProduct}
          allProducts={allProducts}
          currentProducts={currentProducts}
          setCurrentProducts={setCurrentProducts}
        />
      ) : null}
    </div>
  )
}
