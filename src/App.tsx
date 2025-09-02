import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/styles/Layout.tsx'
import LocationSetting from '@/pages/LocationSetting.tsx'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LocationSetting />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
