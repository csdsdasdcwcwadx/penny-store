import React, { useRef, useEffect } from 'react';
import defaultImage from '../../../imgs/notfound.jpg';
import domain from '@utils/domainByEnv';
import notFoundImg from '../../../imgs/notfound.jpg';

interface OptimizedImageProps {
  src: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new Image();

    const drawImage = (imgSrc: string) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
    };

    image.onload = () => {
      drawImage(`${domain()}${src}`);
    };

    image.onerror = () => {
      drawImage(notFoundImg);
    };

    image.src = `${domain()}${src}`;
  }, [src]);

  return <canvas ref={canvasRef}/>;
};

export default OptimizedImage;

