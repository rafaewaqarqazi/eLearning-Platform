import React from 'react';
import StudentPanelLayout from "../../../components/Layouts/StudentPanelLayout";
import {withStudentAuthSync} from "../../../components/routers/studentAuth";

const Index = () => {
    return (
        <StudentPanelLayout>
            <div>Student All Courses</div>
        </StudentPanelLayout>
    );
};

export default withStudentAuthSync(Index);