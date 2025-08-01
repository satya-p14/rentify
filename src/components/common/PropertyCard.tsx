import { useKeenSlider } from "keen-slider/react";

export default function PropertyCard({ property, router }: { property: Property; router: any; }) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
        },
    });

    return (
        <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-[1.02] flex flex-col">
            <div ref={sliderRef} className="keen-slider rounded-t-lg overflow-hidden">
                {property.images?.map((img, idx) => (
                    <div key={idx} className="keen-slider__slide">
                        <img src={img} alt="Property" className="w-full h-48 object-cover" />
                    </div>
                ))}
            </div>

            {/* Info */}
            <div className="p-2 flex flex-col justify-between h-full">
                <div>
                    <h2 className="text-lg font-semibold">{property.title}</h2>
                    <p className="text-sm font-medium">{property.description}</p>
                    <p className="text-gray-600 text-sm">{property.city}</p>
                    <p className="text-sm mt-1">
                        <span className="font-medium">Type:</span> {property.type || 'N/A'}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Price:</span> ${property.price ?? 'N/A'}
                    </p>
                    <p className="text-sm mt-1">
                        <span className="font-medium">Date:</span> {property.datePosted || 'N/A'}
                    </p>                  
                    <p className="text-sm">
                        <span className="font-medium">Availabality:</span> {property.availability ?? 'N/A'}
                    </p>
                </div>

                <button
                    onClick={() => router.push(`/properties/${property.id}`)}
                    className="mt-2 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
                >
                    View
                </button>
            </div>
        </div>
    );
}