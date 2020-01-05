import InstructorLayout from "../../../components/Layouts/InstructorLayout";
import {withInstructorAuthSync} from "../../../components/routers/instructorAuth";

const New = () => {
    return (
        <InstructorLayout>

        </InstructorLayout>
    );
};

export default withInstructorAuthSync(New);