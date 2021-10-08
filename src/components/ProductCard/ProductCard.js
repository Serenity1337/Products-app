import React, { useState, useEffect } from 'react'
import classes from './ProductCard.module.scss'
import EditProductModal from '../../Modals/EditProductModal'
import Button from '../Shared/Button'
export const ProductCard = (props) => {
  const { categories, setCategories, categoryIndex, category } = props
  const [productEditId, setProductEditId] = useState(Number)

  const toggleEditFormModal = (product) => {
    setProductEditId(product.name)
  }

  const deleteProductHandler = () => {
    const productsClone = [...props.currentProducts]
    productsClone.splice(props.productIndex, 1)
    props.setCurrentProducts(productsClone)
  }

  return (
    <div className={classes.container}>
      <div className={classes.product}>
        <h1 className={classes.productHeading}>
          Product: {props.product.name}
        </h1>
        <h1 className={classes.productPrice}>
          Product price: {props.product.price}€
        </h1>
        <h1 className={classes.productQuantity}>
          Amount of products: {props.product.quantity}
        </h1>
        <div className={classes.buttonsContainer}>
          <Button
            type=''
            stylesClass='delete'
            onClick={() => deleteProductHandler()}
            text='Delete A Product'
          />
          <Button
            type=''
            stylesClass='edit'
            onClick={() => toggleEditFormModal(props.product)}
            text='Edit A Product'
          />
        </div>
      </div>
      {productEditId === props.product.name ? (
        <EditProductModal
          allProducts={props.allProducts}
          currentProducts={props.currentProducts}
          setCurrentProducts={props.setCurrentProducts}
          product={props.product}
          productIndex={props.productIndex}
          setProductEditId={setProductEditId}
        />
      ) : null}
    </div>
  )
}
