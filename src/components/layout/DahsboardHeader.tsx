
const DashboardHeader = ({ title, desc }: { title: string, desc: string }) => {
    const date = new Date();
    return (
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold"><span className="text-foreground/60">لوحه التحكم/</span>{title}</h1>
                <p className=" text-sm md:text-[17px] mt-2 text-foreground/60">{desc}</p>
            </div>
            <p className="text-[16px] md:text-xl lg:text-2xl p-2">{date.toLocaleDateString('ar-SA')}</p>
        </div>
    )
}


export default DashboardHeader