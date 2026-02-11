import React, {useContext} from 'react'
import { LoginContext} from '../context/LoginContextProvider'

const SearchChild = () => {
  const myValue = useContext(LoginContext);
  console.log(myValue);
  return (
    <div>
      <h2>Hi guys</h2>
    </div>
  )
}

export default SearchChild
