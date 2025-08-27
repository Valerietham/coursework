import Stack from '../components/ui/Components/Stack/Stack';

// Note: This hero section uses the Stack component to display a stack of cat images with swipe functionality.
// Replace the image URLs in the images array with actual cat images as needed.
// Documentation: https://reactbits.dev/components/stack

const Hero = () => {
  const images = [
    {
      id: 1,
      img: 'https://static.mothership.sg/1/2022/06/285018314_10159884996169297_1885004649878329417_n.jpeg',
    },
    {
      id: 2,
      img: 'https://image.petmd.com/files/inline-images/american-curl-2.jpg?VersionId=rZcNj9HcX4pSKwzN.ttrcJOWt806I7Hu',
    },
    {
      id: 3,
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhI0dw1rQ-FsVVAB521jsS3zyXRSFDLLvk575sUqM8Hzo3hUqzEOVxp7sQXSiMho_mA8SsFcxpwFnN3jayFD25YH6CoaWXE-pJT8IVaL2YV-000rQeIYkb6u50lQZgT8Old3ahcZvjZKJA/s1600/003.JPG',
    },
    {
      id: 4,
      img: 'https://southeastasiaglobe.com/wp-content/uploads/2021/06/photo_2021-06-10_02-02-47.jpg',
    },
  ];

  return (
    <>
      <section className="w-full py-6 md:py=12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">
                Swipe. Fur. Love.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Singapore's first swipe-based cat adoption platform that makes
                finding your perfect cat companion fun, simple, and rewarding.
              </p>
            </div>
            <div className="md:w-1/2 mb-16 flex justify-center order-1 md:order-2">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 200, height: 300 }}
                cardsData={images}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
