import { createRoot } from 'react-dom/client';
import '../css/options.css'
import '../css/button.css'

const Popup = () => {
  return (
    <>
      popup page
    </>
  );
}
const container = document.querySelector("#react-target") 
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container)
root.render(<Popup />);
