import React, {useRef, useState} from "react";
import {centerCrop, convertToPixelCrop, Crop, makeAspectCrop, ReactCrop} from "react-image-crop";

export const ModalUsername1 = () => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgFile, setImgFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState<string>('');

    const handleImageUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImgFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const handleImageLoad = () => {
        if (imgRef.current) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Cannot get canvas context");
            const size = Math.min(imgRef.current.width, imgRef.current.height);
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(imgRef.current, (imgRef.current.width - size) / 2, (imgRef.current.height - size) / 2, size, size, 0, 0, size, size);
            const croppedImgSrc = canvas.toDataURL();
            setImgSrc(croppedImgSrc);
        }
    };

    return (
        <div className=' left-[380px] top-[50px] h-[1500px] right-[380px] border-[1px] border-solid'>
            <div className='text-xl' onClick={handleImageUpload}>
                Upload Profile image
            </div>
            <input onChange={handleImageUpload} type='file'/>
            {imgSrc &&
                <img
                    src={imgSrc}
                    alt='profile'
                    ref={imgRef}
                    onLoad={handleImageLoad}
                    style={{maxWidth: '40px', maxHeight: '40px', borderRadius: '50%'}}
                />
            }
        </div>
    );
}
export const setCanvasPreview = (canvas: HTMLCanvasElement, image: HTMLImageElement, crop: Crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No 2d context");
    }

    // Calculate the scale factors for the image
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to match the crop size
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Clear the canvas before drawing the cropped image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped portion of the image onto the canvas
    ctx.drawImage(
        image,
        crop.x * scaleX, // Adjust x-coordinate based on scale
        crop.y * scaleY, // Adjust y-coordinate based on scale
        crop.width * scaleX, // Adjust width based on scale
        crop.height * scaleY, // Adjust height based on scale
        0, // Destination x-coordinate on canvas
        0, // Destination y-coordinate on canvas
        crop.width, // Destination width on canvas
        crop.height // Destination height on canvas
    );
};


export const drawImagePreview = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No 2d context");
    }

    // Clear the canvas before drawing the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a 40x40 portion of the image onto the canvas
    ctx.drawImage(
        image,
        0, // Start x-coordinate of the portion to draw from the image
        0, // Start y-coordinate of the portion to draw from the image
        40, // Width of the portion to draw from the image
        40, // Height of the portion to draw from the image
        0, // Destination x-coordinate on canvas
        0, // Destination y-coordinate on canvas
        40, // Destination width on canvas
        40 // Destination height on canvas
    );
};

export const ModalUsername123 = () => {
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [imgFile, setImgFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState<string>('');
    const [crop, setCrop] = useState<Crop>();

    const handleImageUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    }
    const onImageLoad = (e: any) => {
        const {width, height} = e.currentTarget;
        const cropWidthPercentage = (40 / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthPercentage,

            }, 1, width, height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }

    return (
        <div className=' left-[380px] top-[50px] h-[1500px] right-[380px] border-[1px] border-solid'>
            <div className='text-xl' onClick={handleImageUpload}>
                Upload Profile image
            </div>
            <input onChange={handleImageUpload} type='file'/>
            {imgSrc &&
                <ReactCrop
                    circularCrop
                    crop={crop}
                    keepSelection
                    aspect={1}
                    onChange={
                        (pixelCrop, percentCrop) => setCrop(percentCrop)
                    }
                >
                    <img src={imgSrc} alt='profile'
                         ref={imgRef}
                         onLoad={onImageLoad}/>
                </ReactCrop>}
            <button onClick={() => {
                if (imgRef.current && previewCanvasRef.current && crop) {
                    setCanvasPreview(
                        previewCanvasRef.current, imgRef.current, convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                        )
                    )
                }
            }}>Crop image
            </button>
            {crop && <canvas ref={previewCanvasRef} className='w-[40px] h-[40px] rounded-3xl'/>}
            <button onClick={() => {
                if (imgRef.current && previewCanvasRef.current && crop) {
                    // Get the canvas context
                    const canvas = previewCanvasRef.current;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        throw new Error("No 2d context");
                    }

                    // Draw the cropped image onto the canvas
                    const pixelCrop = convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                    );
                    ctx.drawImage(
                        imgRef.current,
                        pixelCrop.x,
                        pixelCrop.y,
                        pixelCrop.width,
                        pixelCrop.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    // Convert canvas content to Blob
                    canvas.toBlob((blob) => {
                        // Create a file from the Blob
                        if (blob) {
                            const file = new File([blob], 'cropped-image.png', {type: 'image/png'});
                            setImgFile(file);
                        }
                        // Now you can do whatever you want with the file
                        // For example, you can upload it using FormData or send it via AJAX
                        // Here, you can log it to the console for demonstration

                    }, 'image/png');
                }
            }}>Crop image to File
            </button>
            {imgFile && <img src={URL.createObjectURL(imgFile)} className='w-[32px] h-[32px] rounded-3xl' />}
        </div>
    )
}