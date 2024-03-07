import { Orientations } from "@/utils/constant";

export const isManagementPost = (post) => {
  return post.orientation === Orientations.MANAGEMENT;
};

export const displayGroupAuthor = (post) => {
  return post.user.students.map((student, index: number) =>
    index != post.user.students.length - 1
      ? student.lastName + " " + student.firstName + ", "
      : student.lastName + " " + student.firstName,
  );
};
