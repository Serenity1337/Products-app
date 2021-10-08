import React, { useState } from 'react'
import Select from 'react-select'
import ErrorMsg from '../../components/Shared/ErrorMsg'
import ModalBtnContainer from '../../components/Shared/ModalBtnContainer'
import classes from './EditProductModal.module.scss'
export const EditProductModal = (props) => {
  const [values, setValues] = useState({
    quantity: `${props.product.quantity}`,
    name: '',
  })
  const [msgError, setMsgError] = useState('')
  const inputProfileHandler = (event) => {
    const valuesCopy = { ...values }

    !event.label
      ? (valuesCopy[event.target.name] = event.target.value)
      : (valuesCopy.name = event.label)

    setValues(valuesCopy)
  }

  const editNodeHandler = (event) => {
    event.preventDefault()
    if (values.name && values.quantity) {
      const newProduct = props.allProducts.find(
        (product) => product.name === values.name
      )
      const currentProductsCopy = [...props.currentProducts]
      if (props.product.name === values.name) {
        currentProductsCopy[props.productIndex].quantity = values.quantity
      } else {
        const foundIndex = currentProductsCopy.findIndex(
          (product) => product.name === values.name
        )
        if (foundIndex !== -1) {
          currentProductsCopy[foundIndex].quantity =
            Number(currentProductsCopy[foundIndex].quantity) +
            Number(values.quantity)
          currentProductsCopy.splice(props.productIndex, 1)
        } else {
          newProduct.quantity = values.quantity
          currentProductsCopy[props.productIndex] = newProduct
        }
      }

      props.setCurrentProducts(currentProductsCopy)
      props.setProductEditId(null)
    } else {
      setMsgError('Please do not leave any empty fields')
    }
  }
  const cancelEditNodeHandler = () => {
    props.setProductEditId(null)
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
      onClick: cancelEditNodeHandler,
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
        onSubmit={(event) => editNodeHandler(event)}
      >
        <Select options={options} onChange={inputProfileHandler} />
        <input
          type='number'
          placeholder='Enter New Quantity'
          onChange={inputProfileHandler}
          name='quantity'
          value={values.quantity}
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
