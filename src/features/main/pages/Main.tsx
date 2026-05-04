import { usePermission } from '@/hooks/usePermission';
import { useAuth } from '@/hooks/useAuth';
import { ACTIONS } from '@/constants/permissions';
import { toast } from 'sonner';

const Main = () => {
    const { user } = useAuth();
    const canDeleteFile = usePermission(ACTIONS.DELETE_FILE);
    const canCreateFile = usePermission(ACTIONS.CREATE_FILE);
    const canUpdateFile = usePermission(ACTIONS.UPDATE_FILE);
    const canViewFile = usePermission(ACTIONS.VIEW_FILE);

    const handleDelete = () => {
        if (canDeleteFile) {
            toast.success("تم حذف الملف بنجاح")
        }
        else {
            toast.error("ليس لديك صلاحية حذف الملفات")
        }
    };
    const handleView = () => {
        if (canViewFile) {
            toast.success("تم عرض الملف بنجاح")
        }
        else {
            toast.error("ليس لديك صلاحية عرض الملفات")
        }
    };
    const handleUpdate = () => {
        if (canUpdateFile) {
            toast.success("تم تعديل الملف بنجاح")
        }
        else {
            toast.error("   ليس لديك صلاحية تعديل الملفات")
        }
    };
    const handleCreate = () => {
        if (canCreateFile) {
            toast.success("تم إنشاء الملف بنجاح")
        }
        else {
            toast.error("ليس لديك صلاحية إنشاء الملفات")
        }
    };

    return (
        <div className='w-full p-8 flex flex-col gap-6 justify-start items-start animate-in fade-in duration-500'>
            <h1 className='text-3xl font-bold'>لوحة التحكم / Dashboard</h1>

            <div className="bg-card p-6 rounded-lg shadow w-full max-w-2xl border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">User Information</h2>
                <div className="flex flex-col gap-2 mb-6 text-muted-foreground">
                    <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                    <p><strong>Role:</strong> <span className="text-primary font-bold">{user?.role || 'Guest'}</span></p>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Permissions Test</h2>
                <div className="flex gap-4">
                    <button
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition-colors"
                        onClick={handleView}
                    >
                        عرض ملف
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                        onClick={handleCreate}
                    >
                        إنشاء ملف
                    </button>
                    <button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors"
                        onClick={handleUpdate}
                    >
                        تعديل ملف
                    </button>
                    <button
                        className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors`}
                        onClick={handleDelete}
                    >
                        حذف ملف
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main
