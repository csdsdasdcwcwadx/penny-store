import React, { useRef, useEffect } from 'react';
import defaultImage from '../../../imgs/notfound.jpg';

const OptimizedImage: React.FC<{ imageData?: { type: string, data: any[] } }> = ({ imageData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageData) {
      // 若 imageData 為 undefined，則直接顯示預設圖片
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (canvas && context) {
        const image = new Image();
        image.src = defaultImage;

        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
        };
      }
    } else {
      // 若 imageData 不為 undefined，則處理優化後的圖片顯示
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (canvas && context) {
        const image = new Image();
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          URL.revokeObjectURL(image.src);
        };

        const blob = new Blob([Buffer.from(imageData.data)], { type: 'image/jpeg' });
        image.src = URL.createObjectURL(blob);
      }
    }
  }, [imageData]);

  return <canvas ref={canvasRef} />;
};

export default OptimizedImage;

