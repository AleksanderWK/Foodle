import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FoodApp } from './FoodApp'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <FoodApp />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
