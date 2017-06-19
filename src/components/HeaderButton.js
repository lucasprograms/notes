import React from 'react'

const HeaderButton = ({ width, content }) => {
  return (
    <div className={`header__button col-${width || 1}`}>
      { content }
    </div>
  )
}

export default HeaderButton