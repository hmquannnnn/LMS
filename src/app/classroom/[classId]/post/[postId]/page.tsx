"use client"

import { callGetPost } from "@/apis/classAPI";
import { useEffect, useState } from "react";

const PostDetails = (props: any) => {
    console.log(props.params);
    const classId = props.params.classId;
    const postId = props.params.postId;
    const [post, setPost] = useState({});

    const getPostDetails = async() => {
        const res = await callGetPost(postId);
        console.log(res);
        setPost(res);
    }

    useEffect(() => {
        getPostDetails();
    }, []);
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: post.caption }} />
        </>
    )
}

export default PostDetails;