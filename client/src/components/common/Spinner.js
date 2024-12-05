import React from 'react'; 
import spinner from './spinner.gif'; 

// Defining the functional component
export default () => {
  return (
    <div> 
      {/* Wrapping the spinner image in a div */}
      <img 
        src={spinner}  // Set the source of the image to the imported spinner GIF
        style={{ width: '200px', margin: 'auto', display: 'block' }}  // Inline styles to control the size and centering of the spinner
        alt="Loading..."  // Alt text for accessibility, displayed if the image fails to load
      />
    </div>
  )
}

