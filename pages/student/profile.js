
import StudentPanelLayout from "../../components/Layouts/StudentPanelLayout";
import ProfileComponent from "../../components/profile/ProfileComponent";
import {withStudentAuthSync} from "../../components/routers/studentAuth";

const Profile = () => {
    return (
        <StudentPanelLayout>
            <ProfileComponent/>
        </StudentPanelLayout>
    );
};

export default withStudentAuthSync(Profile);