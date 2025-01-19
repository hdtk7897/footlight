import { createRoot } from 'react-dom/client';
import '../css/index.css'
import '../css/button.css'

const Popup = () => {
  const handleSettingsClick = () => {
    chrome.runtime.openOptionsPage()
  };

  return (
    <>
      <a href="#" className="option_text no-underline hover:underline" onClick={handleSettingsClick}>	&#x2699;settings</a>
    </>
  );
}
const container = document.querySelector("#react-target") 
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container)
root.render(<Popup />);
