import React, { useState, useEffect } from 'react'
import ErrorMsg from '../../components/Shared/ErrorMsg'
import ModalBtnContainer from '../../components/Shared/ModalBtnContainer'
import classes from './AddNewCategoryModal.module.scss'
import Select from 'react-select'
export const AddNewProductModal = (props) => {
  const [values, setValues] = useState({ name: '', quantity: '' })
  const [msgError, setMsgError] = useState('')

  const inputProfileHandler = (event) => {
    const valuesCopy = { ...values }

    !event.label
      ? (valuesCopy[event.target.name] = event.target.value)
      : (valuesCopy.name = event.label)

    setValues(valuesCopy)
    console.log(valuesCopy)
  }
  const cancelNodeHandler = () => {
    props.setNewProduct(false)
  }

  const addNewCategory = (event) => {
    event.preventDefault()
    if (values.name && values.quantity) {
      const newProduct = props.allProducts.find(
        (product) => product.name === values.name
      )
      let currentProductsCopy = [...props.currentProducts]
      newProduct.quantity = values.quantity
      const foundIndex = props.currentProducts.findIndex(
        (product) => product.name === newProduct.name
      )

      if (foundIndex !== -1) {
        console.log(foundIndex)
        currentProductsCopy[foundIndex].quantity =
          Number(currentProductsCopy[foundIndex].quantity) +
          Number(newProduct.quantity)
      } else {
        currentProductsCopy.push(newProduct)
      }

      props.setCurrentProducts(currentProductsCopy)
      props.setNewProduct(false)
    } else {
      setMsgError('Please do not leave any empty fields')
    }
  }

  const btnArray = [
    {
      type: 'submit',
      text: 'Save',
      stylesClass: 'save',
    },
    {
      type: '',
      text: 'Cancel',
      stylesClass: 'cancel',
      onClick: cancelNodeHandler,
    },
  ]
  const options = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'dishwasher', label: 'Dishwasher' },
    { value: 'coffeemaker', label: 'Coffee Maker' },
    { value: 'smartphone', label: 'Smartphone' },
  ]
  return (
    <div className={classes.formContainer}>
      <form
        action=''
        className={classes.addNodeModalForm}
        onSubmit={(event) => addNewCategory(event)}
      >
        <Select options={options} onChange={inputProfileHandler} />

        <input
          type='number'
          placeholder='Enter the amount'
          onChange={inputProfileHandler}
          name='quantity'
        />
        <ModalBtnContainer
          buttons={btnArray}
          containerType='modalBtnContainer'
        />
        <ErrorMsg msg={msgError} />
      </form>
    </div>
  )
}
