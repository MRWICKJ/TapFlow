interface Profile {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  username: string;
}

export default function DashboardModel({profile}: {profile: Profile}) {
  return (
    <div>
      <h1>Dashboard Model: {profile.first_name} {profile.last_name}</h1>
    </div>
  );
}