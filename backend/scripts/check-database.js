const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourogram';

async function checkDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const Story = mongoose.connection.collection('stories');
        const User = mongoose.connection.collection('users');
        const Location = mongoose.connection.collection('locations');

        // Count all stories
        const totalStories = await Story.countDocuments({});
        console.log(`📊 Total stories in database: ${totalStories}`);

        if (totalStories > 0) {
            // Count by status
            const byStatus = await Story.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]).toArray();

            console.log('\nStories by status:');
            byStatus.forEach(item => {
                console.log(`  - ${item._id || 'null/undefined'}: ${item.count}`);
            });

            // Sample some stories
            const sampleStories = await Story.find({}).limit(3).toArray();
            console.log('\n📝 Sample stories:');
            sampleStories.forEach((story, index) => {
                console.log(`\n  Story ${index + 1}:`);
                console.log(`    ID: ${story._id}`);
                console.log(`    Title: ${story.title}`);
                console.log(`    Status: ${story.status}`);
                console.log(`    Author: ${story.author}`);
                console.log(`    PublishedAt: ${story.publishedAt}`);
            });
        }

        // Check users and locations
        const totalUsers = await User.countDocuments({});
        const totalLocations = await Location.countDocuments({});

        console.log(`\n👥 Total users: ${totalUsers}`);
        console.log(`📍 Total locations: ${totalLocations}`);

        await mongoose.disconnect();
        console.log('\n✅ Check completed!');
    } catch (error) {
        console.error('❌ Check failed:', error);
        process.exit(1);
    }
}

checkDatabase();
