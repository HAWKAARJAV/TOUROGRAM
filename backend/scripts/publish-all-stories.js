const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourogram';

async function publishAllStories() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get the Story collection directly
        const Story = mongoose.connection.collection('stories');

        // Count draft stories
        const draftCount = await Story.countDocuments({ status: 'draft' });
        console.log(`\nFound ${draftCount} draft stories`);

        if (draftCount === 0) {
            console.log('No draft stories to publish. All done!');
            await mongoose.disconnect();
            return;
        }

        // Update all draft stories to published
        const result = await Story.updateMany(
            { status: 'draft' },
            {
                $set: {
                    status: 'published',
                    publishedAt: new Date()
                }
            }
        );

        console.log(`\n✅ Successfully published ${result.modifiedCount} stories`);

        // Verify the update
        const publishedCount = await Story.countDocuments({ status: 'published' });
        console.log(`Total published stories: ${publishedCount}`);

        await mongoose.disconnect();
        console.log('\n✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

publishAllStories();
