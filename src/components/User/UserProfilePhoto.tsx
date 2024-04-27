import {useEffect, useRef, useState} from "react";
import {Crop} from "react-image-crop";
import {setCanvasPreview1} from "../Authorization/SignUp";
import {UserService} from "../../service/User/UserService";
import {useSelector} from "react-redux";
import {RootState} from "../../stores/store";

export interface UserPhotoProps {
    username: string,
    width: number,
    height: number,
    rounded?: boolean,
}

const UserProfilePhoto: React.FC<UserPhotoProps> = ({username, width, height, rounded}) => {
    const [userPhoto, setUserPhoto] = useState<string | null>();
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const myUsername = useSelector((state: RootState) => state.userSlice.username);
    const myPhoto = useSelector((state: RootState) => state.userSlice.profileImage);



    const getUserProfile = async () => {
        try{
            const response = await UserService.getUserProfile(username);
            setUserPhoto(response.data.data.user.profileImage);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(myUsername === username) {
            setUserPhoto(myPhoto);
        } else {
            getUserProfile();
        }
    }, []);

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
            {userPhoto && <img ref={imgRef} src={userPhoto} onLoad={onImageLoad} className='hidden' alt='user-img'/>}
            <canvas
                ref={previewCanvasRef}
                className={`w-[${width}px] h-[${height}px] ${rounded ? '' : 'rounded-full'}  `}
            />
        </>
    )

}

export default UserProfilePhoto;