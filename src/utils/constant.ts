import Orientations from "@/types/orientations";
import AssignmentStatus from "@/types/assignmentStatus";
import testTypes from "@/types/testTypes";

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
  blue_11: "#5e86b4",
  blue_12: "#d6e4fc",
  pink_1: "#fec5b9",
  pink_2: "#f49ba2",
  pink_3: "#f8bbc1",
  pink_4: "#920f1d",
  pink_5: "#aa280e",
  yellow_1: "#ffe5b5",
  yellow_2: "#a26900",
  green_1: "#c6e5a4",
  green_2: "#0fb251",
  green_3: "#517b23",
  green_4: "#b6c8a3",
  green_5: "#d9eec3",
  green_6: "#ecf4d0",
  grey_1: "#d9d9d9",
  grey_2: "#404040",
  purple_1: "#367ff0",
  purple_2: "#b3cbfb",
  purple_3: "#6d9ef3",
  purple_4: "#dbe7fc",
  purple_5: "#072251",
  purple_6: "#e9f1fd",
  purple_7: "#97b0ec",
};

export const assignmentStatus: AssignmentStatus = {
  APPROVED: "APPROVED",
  NOT_SUBMITTED: "NOT_SUBMITTED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
};

export const Orientations: Orientations = {
  MAJOR: "MAJOR",
  TECHNIQUE: "TECHNIQUE",
  RESEARCH: "RESEARCH",
  MANAGEMENT: "MANAGEMENT",
  SOCIAL: "SOCIAL",
  ART: "ART",
};

export const testTypes: testTypes = {
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  WRITING: "WRITING",
};
