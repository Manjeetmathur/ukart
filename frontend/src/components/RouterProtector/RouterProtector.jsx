import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const RouterProtector = ({ children }) => {
  const { status } = useSelector(st => st.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if (!status) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default RouterProtector
