import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { persistor, store } from './redux/store.ts'
import router from './routes/routes.tsx'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
       </PersistGate>
    </Provider>
  </React.StrictMode>,
)
