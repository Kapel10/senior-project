import React, { useRef} from 'react';
import {Crop} from "react-image-crop";
import {setCanvasPreview1} from "../Authorization/SignUp";

interface EventCardProp {
    url: string,
    width: number,
    height: number,
    rounded?: boolean,
}

const EventPhoto: React.FC<EventCardProp> = ({url, width, height, rounded}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const onImageLoad = (e: any) => {
        const { width, height } = e.currentTarget;

        // Calculate crop dimensions to center and match the specified width and height
        const aspectRatio = width / height;
        let cropWidth = width;
        let cropHeight = height;

        if (aspectRatio > width / height) {
            cropWidth = Math.min(width, height * (width / height));
            cropHeight = cropWidth / (width / height);
        } else {
            cropHeight = Math.min(height, width * (height / width));
            cropWidth = cropHeight / (height / width);
        }

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

export default EventPhoto;