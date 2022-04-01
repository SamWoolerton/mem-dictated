import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useDarkMode } from "hooks/useDarkMode"
import AddPassage from "pages/AddPassage"
import AttemptPassage from "pages/AttemptPassage"
import ListPassages from "pages/ListPassages"
import ViewPassage from "pages/ViewPassage"
import Copyright from "pages/Copyright"

function App() {
  useDarkMode()

  return (
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
          <Route path="copyright" element={<Copyright />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
