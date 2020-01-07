
import InstructorLayout from "../../components/Layouts/InstructorLayout";
import ProfileComponent from "../../components/profile/ProfileComponent";
import {withInstructorAuthSync} from "../../components/routers/instructorAuth";

const Profile = () => {
    return (
        <InstructorLayout>
            <ProfileComponent/>
        </InstructorLayout>
    );
};

export default withInstructorAuthSync(Profile);