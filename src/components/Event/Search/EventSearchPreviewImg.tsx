import React, { useRef} from 'react';
import {Crop} from "react-image-crop";
import {setCanvasPreview1} from "../../Authorization/SignUp";

interface EventCardProp {
    url: string,
    width: number,
    height: number,
    rounded?: boolean,
}

const EventSearchPreviewImg: React.FC<EventCardProp> = ({url, width, height, rounded}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const onImageLoad = (e: any) => {
        const { width, height } = e.currentTarget;

        // Specify the desired width and height for cropping
        const desiredWidth = 400;
        const desiredHeight = 200;

        // Calculate crop dimensions to center and match the specified width and height
        let cropWidth = Math.min(desiredWidth, width);
        let cropHeight = Math.min(desiredHeight, height);

        const cropX = (width - cropWidth) / 2;
        const cropY = (height - cropHeight) / 2;

        // Set the crop directly
        const crop: Crop = {
            height: cropHeight,
            unit: 'px',
            width: cropWidth,
            x: cropX,
            y: cropY
        };
        if (previewCanvasRef?.current && imgRef?.current) {
            setCanvasPreview1(previewCanvasRef.current, imgRef.current, crop);
        }
    }


    return (
        <>
            <img ref={imgRef} src={url} onLoad={onImageLoad} className='hidden' alt='user-img'/>
            <canvas
                ref={previewCanvasRef}
                className={`w-[${width}px] h-[${height}px] ${rounded ? '' : 'rounded-full'}  `}
            />
        </>
    )
}

export default EventSearchPreviewImg;