import { useState } from 'react'
import './App.css'
import EmployeeForm from './components/employee-form/EmployeeForm'
import Employee from './model/Employee'
import Coffee from './model/Coffee'
import CoffeeOrder from './components/coffee-order-form/CoffeeOrder'

function App() {

  return (
    <div>
        <CoffeeOrder submitter={(coffee: Coffee) => console.log(coffee)}/>
    </div>
  )
}

export default App
