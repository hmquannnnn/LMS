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
  pink_1: "#fec5b9",
  pink_2: "#f49ba2",
  yellow_1: "#ffe5b5",
  green_1: "#c6e5a4",
  green_2: "#0fb251",
  green_3: "#517b23",
};

export const assignmentStatus: AssignmentStatus = {
  APPROVED: "APPROVED",
  NOT_SUBMITTED: "NOT_SUBMITTED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};

export const Orientations: Orientations = {
  TECHNIQUE: "TECHNIQUE",
  SOCIAL: "SOCIAL",
  ART: "ART",
  MANAGEMENT: "MANAGEMENT",
  RESEARCH: "RESEARCH",
  MAJOR: "MAJOR",
};
