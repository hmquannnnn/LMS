import { notion } from "@/notion";


const rootPageId = "62996496e0fd4405a977b3f80c2f6fff";


async function getData(rootPageId: string) {
    return await notion.getPage(rootPageId);
}

const Library = async () => {
    const data = await getData(rootPageId);
    console.log(await notion.getPage(rootPageId))
    return (
        <>

        </>
    );
}

export default Library;