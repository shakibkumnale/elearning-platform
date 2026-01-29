import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Video from './src/models/Video.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Video.deleteMany();
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });
    console.log('Regular user created');

    // Create sample videos with adaptive streaming
    // const videos = [
    //   {
    //     title: 'Introduction to JavaScript Basics',
    //     description: 'Learn the fundamentals of JavaScript programming language. Covers variables, data types, functions, loops, conditionals, and best practices for beginners.',
    //     videoUrl: 'http://localhost:5000/uploads/video-1769669832942-362983524/master.m3u8',
    //     thumbnailUrl: 'https://via.placeholder.com/320x180?text=JavaScript+Basics',
    //     videoType: 'hls',
    //     duration: 1800,
    //     category: 'Programming',
    //     createdBy: admin._id,
    //     views: 125,
    //     videoId: 'video-1769669832942-362983524',
    //     adaptiveStreamQualities: ['480p', '720p', '1080p'],
    //     masterPlaylistUrl: 'http://localhost:5000/uploads/video-1769669832942-362983524/master.m3u8',
    //     isPublished: true
    //   },
    //   {
    //     title: 'Advanced React Patterns & Hooks',
    //     description: 'Master advanced React patterns including custom hooks, Context API, performance optimization, and state management techniques for production applications.',
    //     videoUrl: 'http://localhost:5000/uploads/video-1769671354323-356483495/master.m3u8',
    //     thumbnailUrl: 'https://via.placeholder.com/320x180?text=React+Patterns',
    //     videoType: 'hls',
    //     duration: 2400,
    //     category: 'Frontend',
    //     createdBy: admin._id,
    //     views: 89,
    //     videoId: 'video-1769671354323-356483495',
    //     adaptiveStreamQualities: ['480p', '720p', '1080p'],
    //     masterPlaylistUrl: 'http://localhost:5000/uploads/video-1769671354323-356483495/master.m3u8',
    //     isPublished: true
    //   },
    //   {
    //     title: 'Node.js & Express Backend Development',
    //     description: 'Complete guide to building scalable backend applications with Node.js and Express framework. Includes routing, middleware, authentication, and database integration.',
    //     videoUrl: 'http://localhost:5000/uploads/video-1769671501970-398157721/master.m3u8',
    //     thumbnailUrl: 'https://via.placeholder.com/320x180?text=Node.js+Express',
    //     videoType: 'hls',
    //     duration: 3000,
    //     category: 'Backend',
    //     createdBy: admin._id,
    //     views: 156,
    //     videoId: 'video-1769671501970-398157721',
    //     adaptiveStreamQualities: ['480p', '720p', '1080p'],
    //     masterPlaylistUrl: 'http://localhost:5000/uploads/video-1769671501970-398157721/master.m3u8',
    //     isPublished: true
    //   }
    // ];

    await Video.insertMany(videos);
    console.log('3 Adaptive Streaming Videos Created');

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log('\nLogin Credentials:');
    console.log('-------------------');
    console.log('Admin:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('\nUser:');
    console.log('  Email: user@example.com');
    console.log('  Password: user123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB().then(() => seedData());
