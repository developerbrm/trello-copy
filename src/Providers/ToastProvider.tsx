import React from 'react'
import { Flip, ToastContainer } from 'react-toastify'

const ToastProvider = () => {
  return <ToastContainer autoClose={1500} transition={Flip} />
}

export default ToastProvider
