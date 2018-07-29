//
// From http://steveholgado.com/posts/react-component-fixed-aspect-ratio/
//

import React from 'react'


const FixedAspectRatio = ({ ratio = '1:1', children }) => {
  // Destructure resulting array into 'width' and 'height'
  const [ width, height ] = ratio.split(':');

  // Calculate percentage value using 'width' and 'height'
  const percentage = (height / width) * 100;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'auto',
      paddingTop: percentage + '%',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }}>
        { children }
      </div>
    </div>
  )
};

export default FixedAspectRatio;
