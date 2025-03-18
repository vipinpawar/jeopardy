// import { PrismaClient } from "@prisma/client";

// const prisma =  new PrismaClient();

// const questions = [
//   // SCIENCE Questions
// {
//   category: 'SCIENCE',
//   points: 100,
//   question: 'What is H2O?',
//   options: ['Water', 'Oxygen', 'Hydrogen', 'Helium'],
//   correctAnswer: 'Water',
// },
// {
//   category: 'SCIENCE',
//   points: 200,
//   question: 'What planet is closest to the sun?',
//   options: ['Venus', 'Earth', 'Mercury', 'Mars'],
//   correctAnswer: 'Mercury',
// },
// {
//   category: 'SCIENCE',
//   points: 300,
//   question: 'What gas do plants absorb from the atmosphere?',
//   options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
//   correctAnswer: 'Carbon Dioxide',
// },
// {
//   category: 'SCIENCE',
//   points: 400,
//   question: 'What part of the cell contains DNA?',
//   options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'],
//   correctAnswer: 'Nucleus',
// },
// {
//   category: 'SCIENCE',
//   points: 500,
//   question: 'What is the chemical symbol for gold?',
//   options: ['Ag', 'Au', 'Gd', 'Go'],
//   correctAnswer: 'Au',
// },
// {
//   category: 'SCIENCE',
//   points: 600,
//   question: 'What is the largest planet in our solar system?',
//   options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
//   correctAnswer: 'Jupiter',
// },

// // HISTORY', Questions
// {
//   category: 'HISTORY',
//   points: 100,
//   question: 'Who was the first president of the US?',
//   options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
//   correctAnswer: 'George Washington',
// },
// {
//   category: 'HISTORY',
//   points: 200,
//   question: 'In what year did World War II end?',
//   options: ['1942', '1945', '1939', '1950'],
//   correctAnswer: '1945',
// },
// {
//   category: 'HISTORY',
//   points: 300,
//   question: 'Which ancient civilization built the pyramids?',
//   options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'],
//   correctAnswer: 'Egyptians',
// },
// {
//   category: 'HISTORY',
//   points: 400,
//   question: 'Who was known as the "Maid of Orléans"?',
//   options: ['Cleopatra', 'Marie Curie', 'Joan of Arc', 'Queen Elizabeth I'],
//   correctAnswer: 'Joan of Arc',
// },
// {
//   category: 'HISTORY',
//   points: 500,
//   question: 'What year did the Berlin Wall fall?',
//   options: ['1987', '1989', '1991', '1993'],
//   correctAnswer: '1989',
// },
// {
//   category: 'HISTORY',
//   points: 600,
//   question: 'Who was the leader of the Soviet Union during WWII?',
//   options: ['Vladimir Lenin', 'Nikita Khrushchev', 'Joseph Stalin', 'Leon Trotsky'],
//   correctAnswer: 'Joseph Stalin',
// },

// // SPORTS', Questions
// {
//   category: 'SPORTS',
//   points: 100,
//   question: 'How many players are on a soccer team on the field?',
//   options: ['9', '10', '11', '12'],
//   correctAnswer: '11',
// },
// {
//   category: 'SPORTS',
//   points: 200,
//   question: 'Which country won the FIFA World Cup in 2018?',
//   options: ['Germany', 'Brazil', 'France', 'Argentina'],
//   correctAnswer: 'France',
// },
// {
//   category: 'SPORTS',
//   points: 300,
//   question: 'In tennis, what is the term for 0 points?',
//   options: ['Love', 'Zero', 'Nil', 'Nothing'],
//   correctAnswer: 'Love',
// },
// {
//   category: 'SPORTS',
//   points: 400,
//   question: 'How many rings are there on the Olympic flag?',
//   options: ['4', '5', '6', '7'],
//   correctAnswer: '5',
// },
// {
//   category: 'SPORTS',
//   points: 500,
//   question: 'Which country has won the most Olympic gold medals?',
//   options: ['China', 'Russia', 'USA', 'Germany'],
//   correctAnswer: 'USA',
// },
// {
//   category: 'SPORTS',
//   points: 600,
//   question: 'Who holds the record for the most home runs in a single MLB season?',
//   options: ['Barry Bonds', 'Babe Ruth', 'Mark McGwire', 'Sammy Sosa'],
//   correctAnswer: 'Barry Bonds',
// },

// ];

// async function main() {
//   console.log('Seeding questions...');

//   for (const q of questions) {
//     const existing = await prisma.question.findFirst({
//       where: {
//         question: q.question,
//       },
//     });

//     if (!existing) {
//       await prisma.question.create({
//         data: {
//           category: q.category,
//           points: q.points,
//           question: q.question,
//           options: q.options,
//           correctAnswer: q.correctAnswer,
//         },
//       });
//       console.log(`Added: ${q.question}`);
//     } else {
//       console.log(`Skipped (already exists): ${q.question}`);
//     }
//   }

//   console.log('Seeding completed!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const categories = [
//     {
//       id: 1,
//       name: "Technology",
//       blogs: [
//         {
//           id: 101,
//           title: "The Rise of AI: Opportunities & Challenges",
//           image:
//             "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=60",
//           content: `Artificial Intelligence (AI) has rapidly evolved from a futuristic concept into an integral part of our daily lives. From virtual assistants like Siri and Alexa to self-driving cars and advanced healthcare diagnostics, AI is reshaping industries, improving efficiencies, and transforming the way we live and work. While the opportunities AI presents are vast and promising, it also brings along a set of challenges that society must address to ensure ethical and responsible adoption.
          
//   Opportunities
  
//   1. Automation & Efficiency  
//   AI-driven automation is streamlining repetitive tasks in industries like manufacturing, logistics, and customer service. This not only reduces operational costs but also increases productivity, allowing businesses to focus on innovation and strategy.
  
//   2. Healthcare Revolution  
//   AI is revolutionizing healthcare by improving diagnostics, predicting diseases, and personalizing treatments. Machine learning algorithms can analyze medical data at incredible speed, assisting doctors in early detection of diseases like cancer and enabling faster, more accurate diagnoses.
  
//   3. Enhanced Customer Experiences  
//   Chatbots and AI-powered recommendation engines are transforming customer service and e-commerce. By understanding user preferences, AI systems offer personalized recommendations, improving customer satisfaction and driving sales.
  
//   4. Smart Cities & Transportation  
//   AI plays a vital role in developing smart cities by optimizing traffic management, energy consumption, and public services. Autonomous vehicles, powered by AI, promise safer and more efficient transportation in the near future.
  
//   5. Data-Driven Decision Making  
//   Businesses leverage AI to gain actionable insights from large datasets, enabling data-driven decision-making. Predictive analytics helps companies anticipate market trends and customer needs, giving them a competitive edge.
  
//   ---
  
//   Challenges
  
//   1. Job Displacement  
//   One of the most significant concerns surrounding AI is job displacement. Automation threatens to replace certain jobs, particularly those involving routine tasks. While AI creates new opportunities, it also requires reskilling and upskilling the workforce to adapt to changing roles.
  
//   2. Ethical and Bias Issues  
//   AI systems can inadvertently perpetuate biases present in training data, leading to unfair and discriminatory outcomes. Ensuring fairness, transparency, and accountability in AI decision-making is an ongoing challenge for developers and policymakers.
  
//   3. Privacy and Security  
//   The vast amounts of data required to train AI models raise concerns about privacy and data security. Unauthorized access or misuse of sensitive data can have serious consequences, highlighting the need for robust data protection measures.
  
//   4. Regulation and Governance  
//   The rapid pace of AI development has outstripped the creation of regulatory frameworks. Governments and international organizations are working to establish guidelines that ensure responsible AI deployment while encouraging innovation.
  
//   5. Dependence on AI Systems  
//   Increasing reliance on AI systems may lead to a loss of human oversight and critical thinking in decision-making processes. It is essential to maintain human involvement in high-stakes situations where ethical considerations are paramount.
  
//   ---
  
//   Conclusion
  
//   AI has immense potential to enhance human capabilities, drive economic growth, and solve complex global challenges. However, to fully realize its benefits, society must address the ethical, social, and technical challenges it presents. By fostering collaboration between technologists, policymakers, and the public, we can build an AI-powered future that is fair, inclusive, and beneficial for all.`
//         },
//         {
//           id: 102,
//           title: "Web Development Trends 2025",
//           image:
//             "https://images.unsplash.com/photo-1700508709314-762d6b5a4d82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb3JmdWwlMjBjb21wdXRlcnxlbnwwfHwwfHx8MA%3D%3D",
//           content: `Web development in 2025 is evolving rapidly with modern technologies and frameworks. Next.js leads the charge with features like server-side rendering (SSR), improved performance, and better SEO support.
  
//   Key Trends
  
//   1. Server-Side Rendering (SSR)  
//   Next.js enables SSR out of the box, ensuring faster load times and improved SEO for web applications.
  
//   2. Jamstack & Serverless Architecture  
//   Jamstack has gained traction for its speed and scalability. Coupled with serverless functions, it allows developers to build modern, efficient, and cost-effective applications.
  
//   3. Headless CMS  
//   Content management is becoming more flexible with headless CMS options like Strapi and Sanity, allowing seamless content delivery through APIs.
  
//   4. Improved User Experience  
//   Progressive Web Apps (PWAs), responsive design, and micro-interactions are redefining user experiences, making applications more interactive and user-friendly.
  
//   5. Enhanced Security  
//   As cyber threats increase, developers prioritize security by implementing HTTPS, Content Security Policies (CSP), and best practices for secure authentication.
  
//   Conclusion
  
//   Staying updated with these trends empowers developers to build cutting-edge applications that meet user expectations and deliver high performance.`
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: "Health & Wellness",
//       blogs: [
//         {
//           id: 201,
//           title: "10 Proven Tips for Healthy Living",
//           image:
//             "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=60",
//           content: `Living a healthy life doesn't have to be complicated. Implementing small but consistent habits can make a significant difference.
  
//   Tips for Healthy Living
  
//   1. Stay Hydrated  
//   Drink at least 8 glasses of water daily to maintain hydration and support bodily functions.
  
//   2. Regular Exercise  
//   Engage in at least 30 minutes of physical activity most days of the week. It boosts cardiovascular health, strengthens muscles, and improves mood.
  
//   3. Balanced Diet  
//   Consume a variety of nutrient-rich foods including fruits, vegetables, lean proteins, and whole grains.
  
//   4. Quality Sleep  
//   Aim for 7-8 hours of quality sleep each night to allow your body to recover and rejuvenate.
  
//   5. Mindfulness Practices  
//   Incorporate meditation, deep breathing, or yoga into your routine to reduce stress and enhance mental well-being.
  
//   6. Limit Processed Foods  
//   Reduce intake of processed foods high in sugar, sodium, and unhealthy fats.
  
//   7. Regular Health Checkups  
//   Schedule regular medical checkups for early detection of health issues.
  
//   8. Stay Socially Connected  
//   Maintain relationships with family and friends to foster emotional health.
  
//   9. Personal Hygiene  
//   Practice good hygiene to prevent infections and illnesses.
  
//   10. Positive Attitude  
//   Maintain a positive outlook towards life to improve overall well-being.
  
//   Conclusion
  
//   Consistency is key. Adopt these healthy habits to lead a balanced and fulfilling life.`
//         },
//         {
//           id: 202,
//           title: "The Power of Mindfulness Meditation",
//           image:
//             "https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
//           content: `Mindfulness meditation is a powerful practice that can enhance mental clarity, reduce stress, and promote emotional well-being.
  
//   Benefits of Mindfulness Meditation
  
//   1. Stress Reduction  
//   Mindfulness helps reduce the production of stress hormones like cortisol, promoting relaxation.
  
//   2. Enhanced Focus  
//   Regular practice improves attention span and cognitive function.
  
//   3. Emotional Balance  
//   It encourages acceptance and self-awareness, reducing emotional reactivity.
  
//   4. Better Sleep  
//   Meditation calms the mind, leading to improved sleep quality and duration.
  
//   5. Pain Management  
//   Mindfulness can help manage chronic pain by changing the perception and response to discomfort.
  
//   How to Practice
  
//   1. Find a Quiet Space  
//   Choose a calm and quiet place free from distractions.
  
//   2. Focus on Your Breath  
//   Pay attention to your breathing pattern, observing each inhale and exhale.
  
//   3. Accept Thoughts Without Judgment  
//   Allow thoughts to come and go without clinging to them or pushing them away.
  
//   Conclusion
  
//   Start with just 5-10 minutes a day and gradually increase the duration. Mindfulness meditation can transform your life by cultivating inner peace and emotional resilience.`
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: "Travel & Adventure",
//       blogs: [
//         {
//           id: 301,
//           title: "Top 5 Places to Visit in 2025",
//           image:
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
//           content: `Looking for your next travel destination in 2025? Here are the top 5 places you shouldn't miss.
  
//   Destinations
  
//   1. Bali, Indonesia  
//   Famous for its beaches, temples, and vibrant culture, Bali offers something for everyone.
  
//   2. Switzerland  
//   Experience the majestic Alps, picturesque villages, and world-class skiing in Switzerland.
  
//   3. Kyoto, Japan  
//   Step back in time in Kyoto with its ancient temples, traditional tea houses, and stunning cherry blossoms.
  
//   4. Santorini, Greece  
//   Known for its white-washed buildings and beautiful sunsets, Santorini is a dream destination for many.
  
//   5. Patagonia, Argentina  
//   A paradise for adventure seekers, Patagonia boasts breathtaking landscapes, glaciers, and hiking trails.
  
//   Conclusion
  
//   Whether you seek relaxation or adventure, these destinations offer unforgettable experiences in 2025.`
//         },
//         {
//           id: 302,
//           title: "Embrace the Adventure: Tips for First-Time Travelers",
//           image:
//             "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
//           content: `Traveling for the first time can be both exciting and daunting. Here are some tips to make your journey smoother.
  
//   Tips for First-Time Travelers
  
//   1. Plan Ahead  
//   Research your destination, book accommodations in advance, and create an itinerary.
  
//   2. Pack Light  
//   Bring only the essentials. A lighter bag makes traveling more convenient and stress-free.
  
//   3. Secure Important Documents  
//   Keep passports, visas, and travel insurance documents safe and accessible.
  
//   4. Stay Connected  
//   Have a communication plan in place and share your itinerary with family or friends.
  
//   5. Be Open-Minded  
//   Embrace new cultures, try local cuisines, and step out of your comfort zone.
  
//   Conclusion
  
//   Travel broadens your perspective and enriches your life. With proper planning and an open mind, your first adventure will be memorable and rewarding.`
//         }
//       ]
//     }
//   ];
  

// async function main() {
//   console.log('🌱 Seeding...');

//   for (const category of categories) {
//     const createdCategory = await prisma.category.create({
//       data: {
//         name: category.name,
//         blogs: {
//           create: category.blogs.map(blog => ({
//             title: blog.title,
//             image: blog.image,
//             content: blog.content
//           }))
//         }
//       }
//     });

//     console.log(`✅ Created category: ${createdCategory.name}`);
//   }

//   console.log('✅ Seeding complete!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

