import { BrowserRouter, Routes, Route } from "react-router-dom"

import AddPassage from "pages/AddPassage"
import AttemptPassage from "pages/AttemptPassage"
import ListPassages from "pages/ListPassages"
import ViewPassage from "pages/ViewPassage"

function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-300 h-full">
      <div className="container mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<ListPassages />} />
              <Route path="passages">
                <Route index element={<ListPassages />} />
                <Route path=":passage">
                  <Route index element={<ViewPassage />} />
                  <Route path="attempt" element={<AttemptPassage />} />
                </Route>
                <Route path="add" element={<AddPassage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
