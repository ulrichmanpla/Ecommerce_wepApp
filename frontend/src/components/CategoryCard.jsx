export default function CategoryCard({ category }) {
    return (
        <div className="flex w-45 min-w-45 items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md">

            
            <div className="h-14 w-14 shrink-0">
                <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                />
            </div>

           
            <div>
                <h3 className="text-sm font-semibold text-[#005078]">
                    {category.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                    ({category.items} items)
                </p>
            </div>

        </div>
    );
}