const DashboardHeader = ({ title, desc, mb = "mb-8" }: { title: string, desc: string, mb?: string }) => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;
    return (
        <div className={`${mb} flex justify-between items-center`}>
            <div>
                <h1 className="text-[18px] md:text-3xl font-bold"><span className="text-foreground/60">لوحه التحكم/</span>{title}</h1>
                <p className=" text-sm md:text-[17px] mt-2 text-foreground/60">{desc}</p>
            </div>
            <p className="text-[16px] md:text-xl lg:text-2xl p-2">{formattedDate}</p>
        </div>
    )
}


export default DashboardHeader
