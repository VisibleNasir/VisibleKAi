import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import WriteArticle from "./pages/WriteArticle"
import BlogTitles from "./pages/BlogTitles"
import GenerateImages from "./pages/GenerateImages"
import RemoveBackground from "./pages/RemoveBackground"
import REmoveObject from "./pages/REmoveObject"
import ReviewResume from "./pages/ReviewResume"
import Community from "./pages/Community"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='ai' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route index path='write-article' element={<WriteArticle/>} />
          <Route index path='blog-titles' element={<BlogTitles/>} />
          <Route index path='generate-images' element={<GenerateImages/>} />
          <Route index path='remove-background' element={<RemoveBackground/>} />
          <Route index path='remove-object' element={<REmoveObject/>} />
          <Route index path='review-resume' element={<ReviewResume/>} />
          <Route index path='community' element={<Community/>} />
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
