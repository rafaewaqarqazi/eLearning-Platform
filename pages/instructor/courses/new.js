import InstructorLayout from "../../../components/Layouts/InstructorLayout";
import {withInstructorAuthSync} from "../../../components/routers/instructorAuth";
import CreateCourseComponent from "../../../components/instructor/CreateCourseComponent";

const New = () => {
    return (
        <InstructorLayout>
            <CreateCourseComponent/>
        </InstructorLayout>
    );
};

export default withInstructorAuthSync(New);