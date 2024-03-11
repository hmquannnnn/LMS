import Orientations from "@/types/orientations";
import AssignmentStatus from "@/types/assignmentStatus";

export const ROLE_TEACHER: string = "ROLE_TEACHER";
export const ROLE_STUDENT: string = "ROLE_STUDENT";
export const ROLE_ADMIN: string = "ROLE_ADMIN";

export const colors = {
  blue_1: "#b9e6f6",
  blue_2: "#d9edfb",
  blue_3: "#56aed1",
  blue_4: "#246c8b",
  blue_5: "#072251",
  blue_6: "#dcf3fb",
  blue_7: "#126b8c",
  blue_8: "#4fc1e9",
  blue_9: "#b6cff9",
  blue_10: "#0b4582",
  pink_1: "#fec5b9",
  pink_2: "#f49ba2",
  pink_3: "#f8bbc1",
  pink_4: "#ed5565",
  pink_5: "#aa280e",
  yellow_1: "#ffe5b5",
  yellow_2: "#a26900",
  yellow_3: "#fff2da",
  green_1: "#c6e5a4",
  green_2: "#0fb251",
  green_3: "#517b23",
  green_4: "#b6c8a3",
  green_5: "#d9eec3",
  green_6: "#ecf4d0",
  grey_1: "#d9d9d9",
  grey_2: "#404040",
};

export const assignmentStatus: AssignmentStatus = {
  APPROVED: "APPROVED",
  NOT_SUBMITTED: "NOT_SUBMITTED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};

export const Orientations: Orientations = {
  SOCIAL: "SOCIAL",
  RESEARCH: "RESEARCH",
  TECHNIQUE: "TECHNIQUE",
  ART: "ART",
  MANAGEMENT: "MANAGEMENT",
  MAJOR: "MAJOR",
};
