import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/redux/slices/accountSlice";

export interface Class {
  code: string;
  id: number;
  teacherId: number;
  name: string;
  numberOfStudent: number;
  students: User[];
}

export interface allClasses {
  classesList: Class[];
}

export interface Notification {
  id: number;
  authorId: number;
  content: string;
  postTime: string;
}

export interface currentClass {
  classInfo: Class;
  notifications: Notification[];
  // assignments: Assignment[],
  member: User[];
}

const initialState = {
  classesList: [],
  currentClass: {
    classInfo: {},
    notifications: [],
    assignments: {
      total: 0,
      assignmentsList: [],
    },
    members: [
      {
        studentInfo: {},
        assignmentStatus: [],
      },
    ],
    appendingPosts: {
      total: 0,
      postsList: [],
    },
  },
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    getAllClassAction: (state, action) => {
      state.classesList = action.payload;
    },
    getCurrentClassAction: (state, action) => {
      state.currentClass.classInfo = action.payload;
    },
    getNotificationsAction: (state, action) => {
      console.log(">>> check payload: ", action.payload);
      state.currentClass.notifications = action.payload;
    },
    getAssignmentsAction: (state, action) => {
      state.currentClass.assignments.assignmentsList = action.payload;
      state.currentClass.assignments.total = action.payload.length;
    },
    getMembersAction: (state, action) => {
      state.currentClass.members = action.payload;
    },
    getAppendingPostsAction: (state, action) => {
      state.currentClass.appendingPosts.total = action.payload.length;
      state.currentClass.appendingPosts.postsList = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  getAllClassAction,
  getCurrentClassAction,
  getAssignmentsAction,
  getMembersAction,
  getNotificationsAction,
  getAppendingPostsAction,
} = classSlice.actions;

export default classSlice.reducer;
