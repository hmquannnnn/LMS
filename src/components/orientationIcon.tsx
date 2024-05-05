import { Orientations } from "@/utils/constant";

const OrientationIcon = ({ orientation, color }) => {
  const colorStyle = {
    color: color,
    fontSize: "40px",
    marginRight: "8px",
  };
  const imgStyle = {
    height: "40px",
    width: "40px",
    marginRight: "8px",
  };
  return (
    <>
      {orientation === Orientations.MAJOR ? (
        // <FaChartBar style={colorStyle} />
        <img src={"/major.svg"} style={imgStyle} />
      ) : orientation === Orientations.TECHNIQUE ? (
        <img src={"/technique.svg"} style={imgStyle} />
      ) : orientation === Orientations.RESEARCH ? (
        <img src={"/research.svg"} style={imgStyle} />
      ) : orientation === Orientations.MANAGEMENT ? (
        <img src={"/management.svg"} style={imgStyle} />
      ) : orientation === Orientations.SOCIAL ? (
        <img src={"/social.svg"} style={imgStyle} />
      ) : orientation === Orientations.ART ? (
        <img src={"/art.svg"} style={imgStyle} />
      ) : null}
    </>
  );
};

export default OrientationIcon;
