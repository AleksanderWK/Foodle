import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FoodApp } from './FoodApp'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <FoodApp />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)
