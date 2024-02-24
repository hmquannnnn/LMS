import { useRouter } from 'next/navigation'
import Image from 'next/image';

const DocumentPreview = ({ props }) => {
    const router = useRouter()
    const document = props.data;
    return (
        <div className={`min-w-[${props.imgWidth}] max-w-[${props.imgWidth}] `} >
            <div className={`flex content-center min-h-[${props.imgHeight}] cursor-pointer  `} onClick={() => {
                router.push(`/library/${document.id}`)
            }}>
                <div className='hover:opacity-80 transition duration-300 '>
                    <Image
                        width={props.imgWidth.substring(0, props.imgWidth.length - 2)}
                        height={props.imgHeight.substring(0, props.imgHeight.length - 2)}
                        // width="auto"
                        // height="auto"
                        oject-fit="contain"
                        src={props.imgUrl}
                        alt="cover"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className='mt-4'>
                <h1 className="text-[1.5em] cursor-pointer font-bold leading-[1.5em] mb-2 hover:text-blue_3 hover:duration-300" onClick={() => {
                    router.push(`/library/${document.id}`)
                }}>{document?.title}</h1>
                <p className="text-[1.25em] leading-[1.5em] line-clamp-3">{document?.veryFirstText}</p>
            </div>
        </div>
    );
}

export default DocumentPreview;