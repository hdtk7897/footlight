import { createRoot } from 'react-dom/client';
import '../css/options.css'
import '../css/button.css'

const Popup = () => {
  const handleSettingsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    chrome.runtime.openOptionsPage()
  };

  return (
    <>
      <a href="#" onClick={handleSettingsClick}>footlight settings</a>
    </>
  );
}
const container = document.querySelector("#react-target") 
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container)
root.render(<Popup />);
