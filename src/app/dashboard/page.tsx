import { initialProfile } from "@/lib/initial-profile";
import DashboardModel from "@/components/dashboard-model";
import Setup from "@/components/Setup";

export default async function Page() {
    const { data, isFound } = await initialProfile();
    if (isFound) {
        return <DashboardModel profile={data}/>;
    } else {
        return <Setup user_id={data.user_id} first_name={data.first_name} last_name={data.last_name} username={data.username} email_id={data.email_id}/>;
    }
}
