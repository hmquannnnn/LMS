import {useRef, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import {FcAddImage} from "react-icons/fc";
import {Modal, Slider} from "antd";
import {callChangeAvatar} from "@/apis/userAPI";
import {useDispatch} from "react-redux";
import {doGetAccountAction} from "@/redux/slices/accountSlice";
// import "antd/dist/antd.css";

const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      console.log(dataUrl.slice(22));
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      await setPreview(URL.createObjectURL(blob));
      let newFile = new File([blob], "newAvatar.jpg");
      const formData = new FormData();
      formData.append("file", newFile);
      const res = await callChangeAvatar(formData);
      dispatch(doGetAccountAction(res));
      // console.log(res);
      setModalOpen(false);
    }
  };

  return (
    <Modal
      style={modalStyle}
      visible={modalOpen}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <div style={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* Ant Design Slider */}
        <Slider
          min={10}
          max={50}
          style={{
            margin: "0 auto",
            width: "80%",
            // color: "cyan",
          }}
          defaultValue={slideValue}
          onChange={(value) => setSlideValue(value)}
        />
        <div
          style={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            // background: "black",
          }}
        >
          <button onClick={() => setModalOpen(false)} className={"bg-green"}>
            cancel
          </button>
          <button onClick={handleSave} className={"bg-red-500"}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Cropper = ({ imgSrc }) => {
  // console.log("check img: ", imgSrc);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <>
      {/*<header>*/}
      {/*  <h1>React Avatar Cropper</h1>*/}
      {/*  <hr />*/}
      {/*</header>*/}
      <main className="container">
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
        />
        <a href="/" onClick={handleInputClick}>
          <FcAddImage className="add-icon" />
        </a>
        <small>Click to select image</small>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
          style={{ display: "none" }}
        />
        <div className="img-container">
          <img
            src={
              // preview ||
              // "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
              imgSrc
            }
            alt=""
            width="200"
            height="200"
            style={{
              borderRadius: "50%",
              border: "2px solid black",
              height: "200px",
              width: "200px",
            }}
          />
        </div>
      </main>
      {/*<img*/}
      {/*  src={*/}
      {/*    preview ||*/}
      {/*    "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"*/}
      {/*  }*/}
      {/*  width="200"*/}
      {/*  height="200"*/}
      {/*  style={{ borderRadius: "50%", border: "2px solid black" }}*/}
      {/*/>*/}

      {/*<footer>*/}
      {/*  <hr />*/}
      {/*  <a href="https://github.com/mrAJAY1">*/}
      {/*    <AiFillGithub />*/}
      {/*    &#160; Github*/}
      {/*  </a>*/}
      {/*</footer>*/}
    </>
  );
};

export default Cropper;
