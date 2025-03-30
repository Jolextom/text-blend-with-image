import { motion } from 'framer-motion';

interface Example {
  id: number;
  image: string;
  text: string;
  textColor: string;
}

const examples: Example[] = [
  {
    id: 1,
    image: '/examples/travel.jpg',
    text: 'Travel',
    textColor: '#4CAF50'
  },
  {
    id: 2,
    image: '/examples/weeknd.jpg',
    text: 'THEWEEKND',
    textColor: '#00BCD4'
  },
  {
    id: 3,
    image: '/examples/cool.jpg',
    text: 'Cool',
    textColor: '#FFA726'
  },
  {
    id: 4,
    image: '/examples/bear.jpg',
    text: 'bear',
    textColor: '#FF5252'
  },
  {
    id: 5,
    image: '/examples/bold.jpg',
    text: 'Bold',
    textColor: '#E0E0E0'
  }
];

const ExampleGallery = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Inspiring Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example) => (
            <motion.div
              key={example.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={example.image}
                alt={example.text}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3
                  className="text-4xl font-bold"
                  style={{ color: example.textColor }}
                >
                  {example.text}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleGallery; 