import React, {useEffect, useState} from "react"
import {api} from "../../../utils/AxiosUtil";
import Category from "./Category";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store";
import {LocalStorageUtil} from "../../../utils/LocalStorageUtil";


const Categories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [username, setUsername] = useState('')
    const handleFunction = useSelector((state:RootState) => state.functionStore.function)

    const[imgProfile, setImgProfile] = useState<File | undefined>();

    function handleImg(e: any) {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setImgProfile(selectedFile);
        }
    }

    console.log(handleFunction)
    useEffect(() => {
        api.get('/api/v1/categories?all=1').then((data) => setCategories(data.data.data))
    }, [])

    const handleSelectedCategory = ({category}: any) => {
        const isSelected = selectedCategories.includes(category);

        if(isSelected){
            setSelectedCategories((prev : any) => prev.filter((c:any) => c!== category ))
        }else{
            setSelectedCategories((prev:any) => [...prev, category]);
        }
    }

    const registration = async() => {

        const path = "/api/v1/create/user"
        const formData = new FormData();
        formData.append('lastname', handleFunction.lastname)
        formData.append('firstname', handleFunction.firstname)
        formData.append('phone', handleFunction.phone)
        formData.append('birthdate', handleFunction.date)
        formData.append('username', username)
        if (imgProfile) {
            console.log(imgProfile)
            formData.append("images", imgProfile);
        }
        selectedCategories.forEach((category) => {
            formData.append('category_ids', category.id);
        });
        console.log(formData)
        try {
            const request = await api.post(path, formData, {
                headers: {
                    Authorization: "Bearer " + LocalStorageUtil.getJWTToken(),
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(request)
        } catch (error) {
            console.error(error);
        }

    }


    return(
        <div
            className="h-screen flex items-center justify-center flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full font-abel">
            <div className="relative pb-10">
                <div className="font-[1000] text-center flex items-center">
                    <div className="text-8xl text-text-col">NU</div>
                    <svg
                        className="w-20 h-20"
                        viewBox="0 0 56 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M52.4647 34.9356L52.5796 34.9931C55.2515 36.4871 56.2858 39.8485 54.878 42.5491C49.9939 51.8863 40.1683 58.2644 28.8774 58.1782C13.1334 58.0633 0.233603 45.2497 0.00376275 29.5057C-0.254807 13.2445 12.8461 0 29.0785 0C38.2434 0 46.4314 4.25204 51.7464 10.8887L41.3462 16.5197C38.0135 13.2732 33.388 11.3196 28.3315 11.5207C19.0517 11.8942 11.5819 19.5651 11.467 28.8736C11.3521 38.6993 19.2816 46.6862 29.0498 46.6862C35.83 46.6862 41.7197 42.8651 44.6501 37.234C46.1441 34.4185 49.6779 33.3842 52.4647 34.9356Z"
                            fill="#123499"
                        />
                        <path
                            d="M54.9643 15.83C56.2571 18.3583 55.3378 21.4611 52.8383 22.8401L46.4602 26.3739L30.6587 35.1366C28.188 36.5156 25.0851 35.8261 23.4188 33.5277L23.3613 33.4415C21.379 30.7122 22.2408 26.8336 25.2288 25.2247L41.375 16.4908L51.7753 10.8597C52.9819 12.4112 54.0449 14.0775 54.9643 15.83Z"
                            fill="#152238"
                        />
                    </svg>
                    <div className="text-text-vents text-7xl mt-auto">vents</div>
                </div>
            </div>
            <div className='text-3xl'>
                How users will see you @<input type='text'
                                               className={`bg-transparent border-b-2 border-black outline-none text-3xl w-[130px]`}
                                               value={username}
                                               onChange={(event) => {
                                                   setUsername(event.target.value)
                                               }}
                                               required/>
            </div>

            <input type="file" onChange={handleImg} id='img'/>

            <div className='w-[300px] h-[40px] mt-4 text-xl'>
                <button
                    type='button'
                    className=' w-full h-full bg-dark-blue text-center text-white rounded-xl flex justify-center items-center'
                    onClick={registration}
                >
                    Let's start
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-5 h-5 absolute ml-48'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                        />
                    </svg>
                </button>
            </div>
            <div className='w-[1100px] h-[500px] flex flex-wrap gap-x-[55px] content-evenly'>
                {categories.map(category => (
                    <Category category={category} key={category.id} isSelected={selectedCategories.includes(category)}
                              onClick={() => handleSelectedCategory({category})}/>
                ))}
            </div>
        </div>
    )
}

export default Categories;

