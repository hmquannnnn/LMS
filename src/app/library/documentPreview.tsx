import { useRouter } from 'next/navigation'

const DocumentPreview = ({ props }) => {
    const router = useRouter()
    const document = props.data;
    return (
        <div className={`min-w-[${props.imgWidth}] max-w-[${props.imgWidth}] cursor-pointer`} onClick={() => {
            router.push(`/library/${document.notionPageId}`)
        }}>
            <div className={``}>
                <img
                    oject-fit="contain"
                    src={props.imgUrl}
                    alt="cover"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className='mt-4'>
                <h1 className="text-[1.5em]  font-bold leading-[1.5em] mb-2">{document?.title}</h1>
                <p className="text-[1.25em] leading-[1.5em] line-clamp-3">{document?.veryFirstText}</p>
            </div>
        </div>
    );
}

export default DocumentPreview;