import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import MemoryRouter and Routes
import { UserSearchList } from "./userSearchList";
import { EditSearchItem } from "./editSearchItem";
import { createRoot } from 'react-dom/client';
import '../css/options.css'
import '../css/button.css'

const Options = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<UserSearchList />} />
        <Route path='/edit' element={<EditSearchItem />} />
      </Routes>
    </MemoryRouter>
  );
}
const container = document.querySelector("#react-target") 
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container)
root.render(<Options />);
