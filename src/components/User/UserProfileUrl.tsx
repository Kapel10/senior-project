import {useEffect, useRef, useState} from "react";
import {Crop} from "react-image-crop";
import {setCanvasPreview1} from "../Authorization/SignUp";
import {UserPhotoProps} from "./UserProfilePhoto";


const UserProfileUrl: React.FC<UserPhotoProps> = ({username, width, height, rounded}) => {
    const [userPhoto, setUserPhoto] = useState<string | null>();
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setUserPhoto(username);
    }, [username]);
    const onImageLoad = (e: any) => {
        const {width, height} = e.currentTarget;

        // Calculate crop dimensions to center and make it 40x40 pixels
        const cropWidth = Math.min(width, height);
        const cropHeight = cropWidth;
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
            {userPhoto && <img ref={imgRef} src={username} onLoad={onImageLoad} className='hidden' alt='user-img'/>}
            <canvas
                ref={previewCanvasRef}
                className={`w-[${width}px] h-[${height}px] ${rounded ? '' : 'rounded-full'}  `}
            />
        </>
    )

}

export default UserProfileUrl;