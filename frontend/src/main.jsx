import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import ContextProvider from './Context/Context.jsx'
let persis = persistStore(store)
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor = {persis}  >
        <ContextProvider> 
          <RouterProvider router={router}/>
        </ContextProvider>
      </PersistGate>
    </Provider>
  // </StrictMode>,
)
