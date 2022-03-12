import { BrowserRouter, Routes, Route } from "react-router-dom"

import AddPassage from "pages/AddPassage"
import AttemptPassage from "pages/AttemptPassage"
import ListPassages from "pages/ListPassages"
import ViewPassage from "pages/ViewPassage"
import { useDarkMode } from "hooks/useDarkMode"

function App() {
  useDarkMode()

  return (
    <main className="container mx-auto pb-4">
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
    </main>
  )
}

export default App
