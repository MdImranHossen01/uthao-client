import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/app/api/apiSlice";
import { TUser } from "@/types";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  const handleStatusUpdate = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await updateUserStatus({ userId, status: newStatus }).unwrap();
      toast.success(`User has been ${newStatus}.`);
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load users.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user: TUser) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className="badge badge-ghost">{user.role}</span></td>
                <td>
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(user._id, user.status)}
                    className={`btn btn-sm ${user.status === 'active' ? 'btn-error' : 'btn-success'}`}
                    disabled={isUpdating}
                  >
                    {user.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}