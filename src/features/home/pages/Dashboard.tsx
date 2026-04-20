import { usePermission } from '@/hooks/usePermission';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { ACTIONS } from '@/constants/permissions';

const Dashboard = () => {
    const { user } = useAuth();
    const canDeleteFile = usePermission(ACTIONS.DELETE_FILE);
    const canCreateFile = usePermission(ACTIONS.CREATE_FILE);
    const logout = useLogout();

    const handleDelete = () => {
        console.log("Delete button clicked! Permission allowed:", canDeleteFile);
        if (canDeleteFile) alert("File deleted!");
        else alert("You don't have permission to delete files!");
    };

    return (
        <div className='w-full p-8 flex flex-col gap-6 justify-start items-start'>
            <h1 className='text-3xl font-bold'>لوحة التحكم / Dashboard</h1>
            
            <div className="bg-card p-6 rounded-lg shadow w-full max-w-2xl border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">User Information</h2>
                <div className="flex flex-col gap-2 mb-6 text-muted-foreground">
                    <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                    <p><strong>Role:</strong> <span className="text-primary font-bold">{user?.role || 'Guest'}</span></p>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Permissions Test</h2>
                <div className="flex gap-4">
                    {canCreateFile && (
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                            onClick={() => { console.log('Create allowed'); alert('File created!'); }}
                        >
                            Create File (Allowed)
                        </button>
                    )}
                    
                    <button 
                        className={`${canDeleteFile ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-2 rounded-md transition-colors`}
                        onClick={handleDelete}
                        disabled={!canDeleteFile}
                    >
                        Delete File (Restricted)
                    </button>
                </div>
            </div>

            <button 
                onClick={() => logout.mutate()}
                className='mt-8 text-red-500 hover:underline'
            >
                Logout Test
            </button>
        </div>
    )
}

export default Dashboard
