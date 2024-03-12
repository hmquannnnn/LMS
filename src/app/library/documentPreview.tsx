import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import { ShareIcon, HeartLikeIcon, HeartUnLikeIcon, PracticeIcon } from './DocumentPreviewIcon';

const DocumentPreview = ({ props }) => {
    const router = useRouter()
    const document = props.data;
    return (
        // <div className={`min-w-[${props.imgWidth}] max-w-[${props.imgWidth}] `} >
        <div className={`w-full flex gap-[4vw] px-[8vw] ${props.isOddIndex ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* <div className={`flex content-center w-1/2 min-h-[${props.imgHeight}] cursor-pointer  `}> */}
            <div className='w-[45%] hover:opacity-80 transition duration-300'>
                <Link href={`library/${document.id}`}>
                    <Image
                        width={props.imgWidth.substring(0, props.imgWidth.length - 2)}
                        height={props.imgHeight.substring(0, props.imgHeight.length - 2)}
                        // width="auto"
                        // height="auto"
                        oject-fit="contain"
                        src={props.imgUrl}
                        alt="cover"
                        className="w-full h-full object-cover rounded-2xl"
                        loading="lazy"
                    />
                </Link>
            </div>
            {/* </div> */}
            <div className='mt-4 w-[55%] flex flex-col'>
                <h1 className={`text-[1.4em] font-timesNewRoman cursor-pointer  font-bold leading-[1.5em] mb-2 hover:text-blue_3 hover:duration-300 ${props.isOddIndex ? 'text-right' : ''}`}><Link href={`library/${document.id}`}>{document?.title}</Link></h1>
                <p className={`text-[1em] font-[350] leading-[1.5em] line-clamp-3  ${props.isOddIndex ? 'text-right' : ''}`}>{document?.veryFirstText}</p>

                <div className={`w-full flex ${props.isOddIndex ? 'justify-end' : 'justify-start'}`}>
                    <button className='mt-5 mb-5 px-6 hover:bg-opacity-80  py-1.5 rounded-3xl bg-purple_3 text-white font-josefin text-sm'>Đọc tiếp -----></button>
                </div>

                <div className={`flex flex-1 w-full gap-5 items-end  ${props.isOddIndex ? 'justify-end' : 'justify-start'}`}>
                    <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] bg-purple_2 px-4 py-4 rounded-2xl'>
                        <div className='mb-2'>
                            <HeartLikeIcon />
                        </div>
                        <div className="font-josefin font-bold text-white">Yêu thích</div>
                        <div className='font-light text-xs'>Thêm vào bộ sưu tập yêu thích để lưu lại những thông tin hữu ích!</div>
                    </div>
                    <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] sha px-4 py-4 rounded-2xl'>
                        <div className='mb-2'>
                            <PracticeIcon />
                        </div>
                        <div className="font-josefin font-bold text-white">Yêu thích</div>
                        <div className='font-light text-xs'>Thêm vào bộ sưu tập yêu thích để lưu lại những thông tin hữu ích!</div>
                    </div>
                    <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] sha px-4 py-4 rounded-2xl'>
                        <div className='mb-2'>
                            <HeartLikeIcon />
                        </div>
                        <div className="font-josefin font-bold text-white">Yêu thích</div>
                        <div className='font-light text-xs'>Thêm vào bộ sưu tập yêu thích để lưu lại những thông tin hữu ích!</div>
                    </div>
                </div>




            </div>
        </div>
        // </div>
    );
}

export default DocumentPreview;