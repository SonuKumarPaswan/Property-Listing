import React from 'react'

const SuccessfulProjects = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 px-4 py-10">Successful Projects</h1>
        <p className="text-gray-600 mb-6 px-4">
          Discover our successful real estate projects that have transformed
          landscapes and created thriving communities. From luxurious residential
          complexes to innovative commercial spaces, our portfolio showcases
          excellence in design, construction, and customer satisfaction.
         </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
            <div className="bg-white rounded-md shadow-lg overflow-hidden">
                <img    src="https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg" alt="Project 1" className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Luxury Apartment Complex</h2>
                    <p className="text-gray-600">A state-of-the-art residential complex offering unparalleled amenities and breathtaking views.</p>
                </div>
            </div>  
            {/* Project 2 */}
            <div className="bg-white rounded-md shadow-lg overflow-hidden">
                <img    src="https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg" alt="Project 2" className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Modern Office Park</h2>
                    <p className="text-gray-600">A cutting-edge commercial space designed to foster innovation and collaboration.</p>
                </div>
            </div>
            {/* Project 3 */}
            <div className="bg-white rounded-md shadow-lg overflow-hidden">
                <img    src="https://reanty.themes-studio.com/assets/img/feature/feature-img5.jpg" alt="Project 3" className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly Housing Development</h2>
                    <p className="text-gray-600">A sustainable housing project that combines modern living with environmental responsibility.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuccessfulProjects
