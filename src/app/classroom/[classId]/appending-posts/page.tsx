"use client"

import { getAllPosts, handleAppendingPost } from "@/apis/classAPI";
import { getAppendingPostsAction } from "@/redux/slices/classSlice";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppendingPosts = (props: any) => {
    const classId = props.params.classId;
    const dispatch = useDispatch();
    const appendingLists = useSelector(state => state?.classes?.currentClass?.appendingPosts?.postsList || []);
    const [isUpdate, setIsUpdate] = useState(true)
    const getAllAppendingPosts = async() => {
        setIsUpdate(false);
        const res = await getAllPosts(classId);
        if(res?.length) {
            const appendingLists = res.filter(post => post.type === "PENDING")
            dispatch(getAppendingPostsAction(appendingLists));
        }
        console.log(" check res: ", res);
    }
    useEffect(() => {
        getAllAppendingPosts();
    }, [isUpdate]);
    const handlePost = async(postId: number, action: string) => {
        const res = await handleAppendingPost(postId, action);
        setIsUpdate(true);
        console.log(">> check res: ", res);
    } 
    return(
        <>
            {appendingLists.map(post => (
                <>
                    <Col>
                        <Row>
                            {post.id}
                            <button className="bg-grey border-[1px] border-black" onClick={() => handlePost(post.id, "approve")}>Approve</button>
                            <button className="bg-grey border-[1px] border-black" onClick={() => handlePost(post.id, "reject")}>Reject</button>
                        </Row>
                    </Col>
                </>
            ))}
        </>
    )
}

export default AppendingPosts;