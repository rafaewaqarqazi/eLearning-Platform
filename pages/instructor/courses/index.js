import InstructorLayout from "../../../components/Layouts/InstructorLayout";
import {withInstructorAuthSync} from "../../../components/routers/instructorAuth";

const Index = () => {
    return (
        <InstructorLayout>

        </InstructorLayout>
    );
};

export default withInstructorAuthSync(Index);