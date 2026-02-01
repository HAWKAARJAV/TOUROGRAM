/**
 * Delhi Hidden Gems Seed Script
 * Creates production-grade realistic data for LocaleLens
 * 
 * Features:
 * - 5 Delhi-based storytellers with authentic profiles
 * - 20+ stories covering hidden gems, artisans, food spots, and secret hangouts
 * - Real GPS coordinates for Delhi locations
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourogram';

// Import models
const User = require('../models/User');
const Location = require('../models/Location');
const Story = require('../models/Story');

// ============================================
// DELHI STORYTELLERS
// ============================================
const delhiUsers = [
    {
        email: 'rahul.sharma@localelens.app',
        password: 'DelhiExplorer2024!',
        username: 'rahul_olddelhi',
        displayName: 'Rahul Sharma',
        avatar: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
        bio: 'Born and raised in Chandni Chowk. 4th generation shopkeeper turned street food explorer. I know every gali of Old Delhi.',
        homeCity: 'Old Delhi',
        location: { type: 'Point', coordinates: [77.2311, 28.6562] }
    },
    {
        email: 'priya.verma@localelens.app',
        password: 'HeritageWalks2024!',
        username: 'priya_heritage',
        displayName: 'Priya Verma',
        avatar: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
        bio: 'Art historian and certified heritage walk guide. Specializing in Nizamuddin, Mehrauli, and Mughal monuments most tourists miss.',
        homeCity: 'Nizamuddin East',
        location: { type: 'Point', coordinates: [77.2431, 28.5921] }
    },
    {
        email: 'amit.singh@localelens.app',
        password: 'ArtisanAdvocate2024!',
        username: 'amit_crafts',
        displayName: 'Amit Singh',
        avatar: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
        bio: 'Supporting local artisans for 12 years. From Dilli Haat to hidden workshops in Shahpur Jat, I connect travelers with master craftspeople.',
        homeCity: 'Shahpur Jat',
        location: { type: 'Point', coordinates: [77.2167, 28.5667] }
    },
    {
        email: 'neha.kapoor@localelens.app',
        password: 'MusicScene2024!',
        username: 'neha_nightowl',
        displayName: 'Neha Kapoor',
        avatar: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
        bio: 'Music journalist and nightlife blogger. Finding Delhi\'s best jazz bars, poetry nights, and underground gigs since 2015.',
        homeCity: 'Hauz Khas',
        location: { type: 'Point', coordinates: [77.2001, 28.5494] }
    },
    {
        email: 'vikram.chauhan@localelens.app',
        password: 'NeighborhoodSecrets2024!',
        username: 'vikram_explorer',
        displayName: 'Vikram Chauhan',
        avatar: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
        bio: 'Delhi-born photographer. I hunt for hidden cafés, secret rooftops, and neighborhoods tourists never see. Let me show you my city.',
        homeCity: 'Defence Colony',
        location: { type: 'Point', coordinates: [77.2295, 28.5733] }
    }
];

// ============================================
// DELHI LOCATIONS WITH REAL GPS AND DESCRIPTIONS
// ============================================
const delhiLocations = [
    // Street Food Areas
    { coords: [77.2303, 28.6560], address: { formatted: 'Paranthe Wali Gali, Chandni Chowk, Delhi', neighborhood: 'Chandni Chowk', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'A narrow 150-year-old lane famous for stuffed paranthas. Over 20 varieties from rabri to dry fruits, served with spicy chole and sweet imli chutney. Best visited early morning.' },
    { coords: [77.2336, 28.6507], address: { formatted: 'Jama Masjid, Old Delhi', neighborhood: 'Jama Masjid', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'India\'s largest mosque built by Shah Jahan in 1656. The surrounding lanes hide legendary kebab shops and midnight food stalls known only to locals.' },
    { coords: [77.2340, 28.6500], address: { formatted: 'Karim\'s Restaurant Lane, Jama Masjid', neighborhood: 'Jama Masjid', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'The lane behind Jama Masjid where Karim\'s has been serving Mughlai cuisine since 1913. Their underground kitchen uses recipes from the royal court.' },
    { coords: [77.2297, 28.6563], address: { formatted: 'Natraj Dahi Bhalle Corner, Chandni Chowk', neighborhood: 'Chandni Chowk', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'Same family, same spot since 1940. Three generations serving the city\'s best curd-soaked lentil dumplings with secret family spices.' },
    { coords: [77.2310, 28.6575], address: { formatted: 'Old Famous Jalebi Wala, Dariba Kalan', neighborhood: 'Chandni Chowk', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'Frying jalebis since 1884 – older than most countries. The morning batch (fermented overnight) is crispier and tangier than the evening tourist version.' },

    // Artisan Workshops
    { coords: [77.2312, 28.6580], address: { formatted: 'Kinari Bazaar, Chandni Chowk', neighborhood: 'Chandni Chowk', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'The wedding shopping heart of Delhi. Hidden above shops are 400-year-old zari workshops where real gold thread is still made by hand.' },
    { coords: [77.2167, 28.5667], address: { formatted: 'Shahpur Jat Village, South Delhi', neighborhood: 'Shahpur Jat', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'poi', description: 'An urban village hiding Delhi\'s indie fashion scene. Behind crumbling Mughal walls and graffitied doors are designer studios that dress Bollywood.' },
    { coords: [77.1945, 28.5731], address: { formatted: 'Sarojini Nagar Market, Delhi', neighborhood: 'Sarojini Nagar', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'India\'s most famous street fashion market. Look beyond the stalls for hidden master tailors who can replicate any design for a fraction of mall prices.' },
    { coords: [77.2280, 28.6545], address: { formatted: 'Chawri Bazaar, Old Delhi', neighborhood: 'Chawri Bazaar', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'Delhi\'s paper district since Mughal times. Craftsmen still make handmade paper from cotton rags, restoring century-old documents and creating wedding invitations with gold dust.' },
    { coords: [77.2089, 28.6127], address: { formatted: 'Dilli Haat, INA, Delhi', neighborhood: 'INA', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'A curated craft bazaar featuring artisans from every Indian state. Unlike Janpath, prices are fair and artists rotate bi-weekly – different crafts every visit.' },

    // Secret Hangouts
    { coords: [77.2159, 28.5283], address: { formatted: 'Champa Gali, Saket, Delhi', neighborhood: 'Saket', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'poi', description: 'Delhi\'s worst-kept secret – a jasmine-scented alley hidden between furniture warehouses. Quirky cafés, Bihari rooftop feasts, and Thursday night poetry readings.' },
    { coords: [77.2001, 28.5494], address: { formatted: 'Hauz Khas Village, Delhi', neighborhood: 'Hauz Khas', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'poi', description: 'Built around a 13th-century reservoir and tomb. Behind the boutiques is an unofficial network of artist rooftops overlooking Mughal ruins.' },
    { coords: [77.2284, 28.7041], address: { formatted: 'Majnu Ka Tila, North Delhi', neighborhood: 'Majnu Ka Tila', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'poi', description: 'Little Tibet in Delhi – a Tibetan refugee settlement with prayer flags, hand-pinched momos, monastery prayers open to visitors, and genuine community warmth.' },
    { coords: [77.2248, 28.5931], address: { formatted: 'Lodhi Art District, Delhi', neighborhood: 'Lodhi Colony', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'poi', description: 'India\'s first open-air art district with 50+ murals on government housing. The hidden gems are off the main route – look for the disappearing elephant that only appears at 4 PM.' },
    { coords: [77.2285, 28.6263], address: { formatted: 'Agrasen Ki Baoli, Connaught Place', neighborhood: 'Connaught Place', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'A 14th-century stepwell with 108 steps. By day, an Instagram spot. After midnight, acoustic musicians gather for secret concerts in its natural amphitheater.' },

    // Heritage Sites
    { coords: [77.2578, 28.5128], address: { formatted: 'Tughlaqabad Fort, Delhi', neighborhood: 'Tughlaqabad', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'Delhi\'s most haunted, most ignored monument. 6 km of 14th-century ruins with secret tunnels, hidden temples, and a Sufi curse that has kept it desolate for 800 years.' },
    { coords: [77.2466, 28.6337], address: { formatted: 'Feroz Shah Kotla, Delhi', neighborhood: 'Feroz Shah Kotla', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'A ruined fortress where Delhiites come every Thursday to correspond with djinns. Letters tied to walls, incense lit, and an 800-year-old tradition that science cannot explain.' },
    { coords: [77.1816, 28.5192], address: { formatted: 'Mehrauli Archaeological Park, Delhi', neighborhood: 'Mehrauli', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: '1,000 years of history in 200 acres – pre-Mughal temples, Sultanate tombs, Mughal gardens, and British follies. Delhi\'s densest concentration of medieval ruins, ignored by most.' },
    { coords: [77.1425, 28.4892], address: { formatted: 'Sultan Ghari Tomb, Vasant Kunj', neighborhood: 'Vasant Kunj', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'India\'s first Islamic tomb (1231 AD), now surrounded by suburbs and forgotten. A stunning fusion of Hindu temple and Islamic architecture with almost no visitors.' },
    { coords: [77.1751, 28.5267], address: { formatted: 'Jahaz Mahal, Mehrauli', neighborhood: 'Mehrauli', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'landmark', description: 'A 15th-century pleasure palace that floats like a ship when monsoon fills the reservoir. Rowboat rides at sunset, surrounded by motorcycle shops and vegetable vendors.' },

    // Underground Scenes
    { coords: [77.2190, 28.6315], address: { formatted: 'The Piano Man Jazz Club, Safdarjung', neighborhood: 'Safdarjung', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'Delhi\'s jazz sanctuary since 2006, hidden in an office building basement. Grammy winners play for 100 people. No phones, no talking, no songs under 7 minutes.' },
    { coords: [77.2295, 28.6289], address: { formatted: 'Akshara Theatre, Baba Kharak Singh Marg', neighborhood: 'Connaught Place', city: 'Delhi', state: 'Delhi', country: 'India' }, type: 'establishment', description: 'A 50-seat theatre hosting Delhi\'s rawest poetry nights since 2009. Pay-what-you-want, languages mixing mid-sentence, and strangers becoming family over chai outside.' }
];

// ============================================
// DELHI HIDDEN GEM STORIES
// ============================================
const createStories = (users, locations) => [
    // === STREET FOOD STORIES ===
    {
        title: 'The Secret Recipe of Paranthe Wali Gali',
        content: {
            type: 'text',
            text: {
                body: `Most tourists come to Paranthe Wali Gali and queue at the famous shops. But walk 50 meters deeper into the gali, past the jewelry stores, and you'll find Babu Ram's 6-seater stall. His family has been making paranthas since 1886 – that's 15 years before the "famous" ones opened.

The secret? He still uses a 140-year-old iron tawa that's never been washed with soap, only scraped with lime. His rabri parantha isn't on any menu – you have to know to ask for "purani wali." Trust me, once you taste the caramelized milk solids folded into crispy dough, you'll never queue at the tourist traps again.

Go between 7-9 AM when the chai next door is still being made in the original brass kettle. That's when the real Old Delhi wakes up.`
            },
            snippet: 'Most tourists queue at famous shops. But walk 50 meters deeper and find Babu Ram\'s secret stall, making paranthas since 1886...'
        },
        authorIndex: 0,
        locationIndex: 0,
        tags: ['street-food', 'hidden-gem', 'old-delhi'],
        engagement: { views: 1847, likes: 423, comments: 89, shares: 156, unlocks: 234 }
    },
    {
        title: 'Midnight Kebabs at Jama Masjid\'s Hidden Lane',
        content: {
            type: 'text',
            text: {
                body: `Everyone knows Karim's. But at 1 AM, when Karim's closes, the real magic happens in the lane behind the mosque.

There's a man named Aslam Bhai who sets up just 6 chairs next to a tiny coal grill. No signboard, no menu. He only makes one thing: beef seekh kebabs with a 200-year-old family recipe using 23 spices, hand-ground daily.

Here's the secret: Look for the green door with peeling paint. Knock twice. Someone will peek out and say "Kitne?" Tell them your count. Wait 20 minutes. The kebabs come with a mint chutney made with kachri (wild melon) that you simply cannot find anywhere else in Delhi.

Only open Thursday to Sunday, 12 AM to 4 AM. No photos allowed – Aslam Bhai is superstitious about camera flashes affecting the meat.`
            },
            snippet: 'At 1 AM, when Karim\'s closes, the real magic happens. Look for the green door with peeling paint. Knock twice...'
        },
        authorIndex: 0,
        locationIndex: 1,
        tags: ['street-food', 'midnight-eats', 'secret-spot'],
        engagement: { views: 2341, likes: 567, comments: 134, shares: 289, unlocks: 445 }
    },
    {
        title: 'Karim\'s Underground Kitchen Tour',
        content: {
            type: 'text',
            text: {
                body: `I've been coming to Karim's for 30 years. But last month, the current owner Shamim finally let me see the underground kitchen that's been feeding Delhi since 1913.

Beneath the restaurant floor, reached by a narrow staircase hidden behind the cash counter, is where the real cooking happens. Six massive deghs (cauldrons), some dating back to 1920, simmer 24/7. The mutton for tomorrow's nihari starts cooking at 4 PM today – 16 hours of slow cooking.

The sheermal bread? Made in a tandoor that was built by Shamim's great-great-grandfather and has never gone cold. They literally keep the fire alive across generations.

Shamim doesn't offer tours, but if you eat there regularly for a few months and show genuine respect for the craft, he might just invite you down. That's how Old Delhi works – trust earned, not demanded.`
            },
            snippet: 'Beneath the restaurant floor, reached by a narrow staircase hidden behind the cash counter, is where the real cooking happens...'
        },
        authorIndex: 0,
        locationIndex: 2,
        tags: ['heritage', 'cooking', 'behind-scenes'],
        engagement: { views: 1567, likes: 389, comments: 78, shares: 145, unlocks: 201 }
    },

    // === ARTISAN STORIES ===
    {
        title: 'The Last Zari Masters of Kinari Bazaar',
        content: {
            type: 'text',
            text: {
                body: `In the narrow lanes of Kinari Bazaar, I found Mohammad Iqbal – one of the last 12 people in India who can create real gold zari embroidery.

At 78, his fingers still move like a musician's. The craft his family has practiced for 400 years – creating thread from actual beaten gold – is dying. "Gold thread today is plastic coated copper," he says sadly. "Real zari takes 3 months to make. Who has patience now?"

His workshop is hidden above a button shop. Climb the wooden staircase (third door on left after the corner mosque), and you'll enter a room frozen in time. Embroidery frames, magnifying glasses from the 1940s, and spools of thread that shimmer like captured sunlight.

Iqbal doesn't sell to tourists. But if you bring tea and genuine curiosity, he'll spend hours teaching you to distinguish real zari from fake. "The real gold sings when you rub it," he says. "Plastic stays silent."

Note: He works Tuesday to Saturday, 11 AM to 5 PM. Bring sweet biscuits – he has a weakness for Parle-G.`
            },
            snippet: 'At 78, Mohammad Iqbal is one of the last 12 people in India who can create real gold zari embroidery...'
        },
        authorIndex: 2,
        locationIndex: 5,
        tags: ['artisan', 'craft', 'heritage'],
        engagement: { views: 2134, likes: 512, comments: 98, shares: 234, unlocks: 367 }
    },
    {
        title: 'Shahpur Jat: Where Delhi Designers Hide',
        content: {
            type: 'text',
            text: {
                body: `Forget the overpriced boutiques of Khan Market. The real Delhi fashion scene is hidden in the crumbling urban village of Shahpur Jat.

Between ancient Mughal-era walls, behind rusted iron gates and graffitied doors, are the studios of designers who dress Bollywood but refuse mainstream attention. I've spent 3 years mapping this place.

Start at Lane 14. Behind the red door with the brass knocker is Rina Dhaka's sample sale room – pieces that never made it to stores at 70% off. Two lanes down, Suket Dhir's atelier occupies a converted cow shed. Yes, really. His menswear won at Lakme Fashion Week, but you'd never know from the entrance.

The real gem? Studio 47 in the back lanes – no social media, no website. Just word of mouth. They do custom block printing on vintage fabric, same techniques used for Mughal court dress. Starting at ₹800 for a scarf that would cost ₹15,000 in a mall.

Pro tip: The lanes are confusing. Hire a cycle rickshaw driver named Bunty (sits near the main chowk). He knows every studio and takes commission from no one.`
            },
            snippet: 'Between ancient Mughal-era walls, behind rusted iron gates, are studios of designers who dress Bollywood but refuse attention...'
        },
        authorIndex: 2,
        locationIndex: 6,
        tags: ['fashion', 'artisan', 'hidden-gem'],
        engagement: { views: 3456, likes: 789, comments: 167, shares: 423, unlocks: 567 }
    },
    {
        title: 'The Paper Magicians of Chawri Bazaar',
        content: {
            type: 'text',
            text: {
                body: `In the age of digital invitations, there's a lane in Chawri Bazaar where craftsmen still make paper by hand from cotton rags, exactly as they did in 1650.

I discovered this world by accident – my grandfather's wedding album was falling apart, and someone mentioned "go to Chawri, ask for Paperwala Sharma."

Sharma ji runs a 4-generation paper restoration workshop. The space smells of cotton and glue and history. He showed me their technique: cotton rags soaked for weeks, then pressed through wooden frames, sun-dried on terraces overlooking Old Delhi's rooftops.

But here's what tourists don't know: if you bring old family documents or photographs, Sharma ji's team will restore them using traditional methods. The cost? Whatever you feel like paying. "Paper holds memory," he says. "Money is temporary."

They also make custom wedding invitations using Mughal-era techniques – hand-pressed paper with real gold dust edges. Starting at ₹50 per invite. Yes, really.

Location: Gali Qasim Jaan, Chawri Bazaar. Look for the shop with paper drying on the balcony.`
            },
            snippet: 'In the age of digital invitations, there\'s a lane in Chawri Bazaar where craftsmen still make paper by hand from cotton rags...'
        },
        authorIndex: 2,
        locationIndex: 8,
        tags: ['artisan', 'paper-craft', 'restoration'],
        engagement: { views: 1789, likes: 445, comments: 89, shares: 178, unlocks: 289 }
    },

    // === SECRET HANGOUTS ===
    {
        title: 'Champa Gali: Delhi\'s Hidden Café Alley',
        content: {
            type: 'text',
            text: {
                body: `There's a narrow gap between two furniture warehouses in Saket. Most people walk right past it. That gap leads to Champa Gali – Delhi's worst-kept secret that still feels like a secret.

The name means "Jasmine Alley" and in April, the air really does smell like champa flowers from the vines covering the brick walls. But it's not the flowers that keep me coming back – it's the community.

My favorites:
- **Jugmug Thela**: A quirky café run by two sisters who serve chai in cutting glasses and sandwiches named after Bollywood songs. Their "Chalte Chalte" (walk-walk) is spiced paneer that'll make you stay.
- **Potbelly Rooftop**: Climb to the top for Bihari food cooked by actual Bihari grandmothers. The litti chokha here is better than Patna.
- **People & Co**: A publishing house-café where traveling writers hold readings every Thursday night.

Come after 5 PM when the fairy lights turn on and the whole alley transforms. But avoid weekends – Delhi's Instagram crowd has discovered it, and the magic dilutes.`
            },
            snippet: 'There\'s a narrow gap between two furniture warehouses in Saket. That gap leads to Champa Gali – Delhi\'s worst-kept secret...'
        },
        authorIndex: 4,
        locationIndex: 10,
        tags: ['cafe', 'hidden-gem', 'community'],
        engagement: { views: 4567, likes: 1023, comments: 234, shares: 567, unlocks: 789 }
    },
    {
        title: 'The Secret Rooftops of Hauz Khas Village',
        content: {
            type: 'text',
            text: {
                body: `Every travel guide mentions Hauz Khas Village. None of them mention the rooftops.

Behind the boutiques and bars, there's an unofficial network of rooftop spaces that Delhi's artists have claimed over decades. You can't find them on Google Maps. You have to know people.

My favorite: the unmarked door next to the tattoo parlor on the main lane. Climb 4 flights of narrow stairs, knock on the blue door, and you'll find a rooftop garden with views of the 13th-century tomb and lake. A French sculptor named Jean-Pierre has been living here since 1998, growing vegetables and hosting impromptu dinners for artists passing through.

He asks for no money but appreciates wine. Bring a bottle of red and honest conversation, and you'll eat ratatouille overlooking Mughal ruins while hearing stories about when Hauz Khas was just a village.

Other secret rooftops: the one above the bookstore (access from the back stairs), and the art gallery on the 3rd floor of the building with the peeling pink paint – they host open studios on the terrace every full moon.

Best time: sunset, obviously. But midnight is when the real magic happens – the ruins across the lake, lit up, with almost no one around.`
            },
            snippet: 'Behind the boutiques and bars, there\'s an unofficial network of rooftop spaces that Delhi\'s artists have claimed over decades...'
        },
        authorIndex: 4,
        locationIndex: 11,
        tags: ['rooftop', 'secret-spot', 'art'],
        engagement: { views: 3234, likes: 756, comments: 145, shares: 389, unlocks: 512 }
    },
    {
        title: 'Majnu Ka Tila: Little Tibet in North Delhi',
        content: {
            type: 'text',
            text: {
                body: `Twenty minutes from central Delhi, there's a Tibetan settlement that feels like you've crossed a border without a visa.

Majnu Ka Tila (named after a Sufi saint, not a lovesick person) is home to 3,000 Tibetan refugees. The narrow lanes, strung with prayer flags, smell of thukpa and butter tea. Monks in maroon robes share space with backpackers and students from nearby Delhi University.

Here's my curated route:
1. **Start at Ama Café** – the oldest in the colony, run by three generations of women. Their momos are hand-pinched, not machine-made.
2. **Walk to the monastery** at the heart of the settlement. Visitors can sit in on evening prayers (5 PM). No one asks your religion.
3. **Shop for singing bowls** at the store run by the old monk near the community center. He'll tune each bowl to your voice – seriously.
4. **End at Tee Dee's** for Tibetan beer and conversation with travelers from 50 countries.

Pro tips:
- Don't bargain aggressively. These are refugee families, not Sarojini Nagar.
- The public toilet near the vegetable market is surprisingly clean.
- During Losar (Tibetan New Year), the whole colony does a street party. Add your name to the monastery notice board to get invited.`
            },
            snippet: 'Twenty minutes from central Delhi, there\'s a Tibetan settlement that feels like you\'ve crossed a border without a visa...'
        },
        authorIndex: 4,
        locationIndex: 12,
        tags: ['cultural', 'tibetan', 'community'],
        engagement: { views: 2876, likes: 623, comments: 134, shares: 312, unlocks: 423 }
    },
    {
        title: 'Delhi\'s Open-Air Street Art Gallery',
        content: {
            type: 'text',
            text: {
                body: `Forget formal galleries. Delhi's best art is on the walls of Lodhi Colony – India's first open-air art district.

In 2015, St+Art India started painting the walls of this government housing colony. What began as 5 murals has become 50+, and the collection keeps growing.

But here's what the guided tours won't tell you: the best murals aren't on the main route.

My secret favorites:
- **The Blue Lady** by Tankpetrol (Spanish artist) – hidden behind the market on Block 17. You'll see her peeking from between delivery trucks.
- **The Disappearing Elephant** by Hanif Kureshi – painted on a surface that only catches light between 4-5 PM. Any other time, it's just a grey wall.
- **The Children's Wall** – not technically art, but Block 12's back wall is where neighborhood kids have been drawing for decades. More honest than any mural.

Walk: Start at Market #2, go left into the housing blocks (not right toward the cafés). The oldest, most weathered murals tell better stories than the fresh Instagram-friendly ones.

Best time: Early morning for photos. Sunset for vibes. The chai stall near Block 8 is where the colony's artists actually hang out – they might tell you about pieces in progress.`
            },
            snippet: 'Delhi\'s best art is on the walls of Lodhi Colony. But the best murals aren\'t on the guided tour route...'
        },
        authorIndex: 4,
        locationIndex: 13,
        tags: ['street-art', 'photography', 'hidden-gem'],
        engagement: { views: 3789, likes: 867, comments: 178, shares: 456, unlocks: 601 }
    },

    // === HERITAGE SITES ===
    {
        title: 'The Secret Tunnels of Tughlaqabad Fort',
        content: {
            type: 'text',
            text: {
                body: `Tughlaqabad is Delhi's most haunted, most ignored monument. The 14th-century fort sprawls over 6 km, and I've spent years exploring its forgotten corners.

The official path shows you maybe 10% of the structure. For the rest, you need to climb, crawl, and occasionally bribe the guards with chai.

Here's what I've found:
- **The Underground Passage**: From the southeast corner, there's a tunnel that locals claim runs 4 km to the adjoining Adilabad Fort. I've walked 800 meters of it before hitting a collapse. Bring a strong flashlight and tell someone where you're going.
- **The Royal Baths**: Hidden behind thick vegetation on the north side. The water channels still visible were fed by a sophisticated system from the nearby lake.
- **The Secret Temple**: Yes, there's a tiny Shiva temple built into the ruins. Local villagers still worship there. Reach it by climbing the broken wall near the main gate's eastern end.

Warning: The fort is genuinely dangerous. Walls collapse, snakes live in the ruins, and after sunset, the local wildlife (jackals, mainly) takes over. Go with a guide who knows the terrain – I can recommend a few from the village.

Why is it ignored? Legend says Sufi saint Nizamuddin cursed Ghiyasuddin Tughlaq and his fort. "Ya rahe ujad, ya rahe gujar" – "May it stay desolate, or be inhabited by wild herdsmen." Eight centuries later, the curse holds.`
            },
            snippet: 'Tughlaqabad is Delhi\'s most haunted, most ignored monument. The official path shows you maybe 10% of the structure...'
        },
        authorIndex: 1,
        locationIndex: 15,
        tags: ['heritage', 'exploration', 'history'],
        engagement: { views: 2567, likes: 534, comments: 112, shares: 267, unlocks: 378 }
    },
    {
        title: 'Feroz Shah Kotla: Where Delhi Writes to Djinns',
        content: {
            type: 'text',
            text: {
                body: `Every Thursday, hundreds of Delhiites come to a ruined 14th-century fortress to leave letters for djinns.

Feroz Shah Kotla isn't just a Mughal monument – it's an active shrine where people seek favors from supernatural beings. The practice horrifies religious purists but has been going on for centuries.

I've been documenting this tradition for 5 years. Here's how it works:

People write letters to djinns (specifically to "Lat Wale Baba," the djinn believed to live near the Ashokan pillar), asking for solutions to problems – court cases, marriages, health issues, business troubles. They tie these letters to the walls with red thread, light incense, and wait.

The belief: if your djinn accepts your request, the candle you light won't blow out. Thousands swear by miraculous interventions.

Beyond the supernatural, the site is architecturally stunning – a stepped pyramid of ruins with an intact Ashokan pillar (3rd century BC) that predates the fort by 1,700 years.

For the authentic experience:
- Visit on a Thursday after 5 PM
- Buy marigolds and incense from the vendors outside
- Sit quietly and observe – don't photograph people praying
- The caretakers can share stories if you bring chai

Whether you believe in djinns or not, watching an entire city maintain this 800-year-old tradition is humbling.`
            },
            snippet: 'Every Thursday, hundreds of Delhiites come to a ruined 14th-century fortress to leave letters for djinns...'
        },
        authorIndex: 1,
        locationIndex: 16,
        tags: ['spiritual', 'heritage', 'tradition'],
        engagement: { views: 3456, likes: 789, comments: 234, shares: 445, unlocks: 567 }
    },
    {
        title: 'Mehrauli: 1,000 Years in One Neighborhood',
        content: {
            type: 'text',
            text: {
                body: `Everyone visits Qutub Minar. Almost no one walks 500 meters north into Mehrauli Archaeological Park – Delhi's densest concentration of medieval ruins.

This neighborhood holds 1,000 years of history: pre-Mughal Hindu temples, early Sultanate tombs, Mughal pleasure gardens, and British-era renovations. All in a 200-acre urban forest that most Delhiites have never entered.

My walking route (3 hours minimum):

1. **Balban's Tomb** (1287): India's first true dome. Sit inside and test the acoustics – a whisper from one corner reaches the opposite corner perfectly.

2. **Jamali Kamali Mosque** (1528): The most beautiful tile-work in Delhi, hidden because it's never promoted. The poetry inscribed in Persian on the walls is haunting.

3. **Rajon Ki Baoli** (1516): A stepwell with three levels. The bottom chamber stays 15 degrees cooler than the surface – natural AC from 500 years ago.

4. **Madhi Masjid** (1500s): A ruined mosque being slowly consumed by a Banyan tree. Photogenic but please don't climb the roots.

5. **Metcalfe's Folly**: A British officer in the 1830s built himself a fantasy retreat inside a Mughal tomb. The blend of Victorian and Mughal aesthetics is bizarre and beautiful.

Avoid weekends (too crowded). Best time: Tuesday or Wednesday, enter by 8 AM to beat the heat. The guards know me – mention you're documenting heritage and they'll sometimes open locked gates.`
            },
            snippet: 'Almost no one walks 500 meters north of Qutub Minar into Mehrauli Archaeological Park – Delhi\'s densest concentration of medieval ruins...'
        },
        authorIndex: 1,
        locationIndex: 17,
        tags: ['heritage', 'walking-trail', 'photography'],
        engagement: { views: 2890, likes: 634, comments: 145, shares: 356, unlocks: 478 }
    },
    {
        title: 'Sultan Ghari: India\'s Forgotten First Tomb',
        content: {
            type: 'text',
            text: {
                body: `In 1231, Iltutmish – slave-turned-Sultan – built India's first Islamic tomb for his son. It's now surrounded by a suburb and visited by almost no one.

Sultan Ghari sits in a dusty field near Vasant Kunj, reachable by metro but ignored by tourism. That's exactly why I love it.

Unlike the polished monuments of Mughal Delhi, this is raw, early, experimental. The tomb combines Hindu temple architecture (carved pillars, dome shape) with Islamic elements (arabesque inscriptions, directional alignment). It's history caught in the act of transitioning.

What makes it special:
- **The octagonal chamber** at the center, where the prince is buried, has unusual carved brackets that predate any similar structures in India by 200 years.
- **Evening prayers**: A small community still uses the mosque attached to the tomb. They welcome visitors who sit respectfully.
- **The surrounding village**: Sultan Ghari village is an urban village frozen in time. Tea shops, cows, and 13th-century ruins coexisting.

Getting there: Take Metro to Chatarpur, then auto-rickshaw 10 minutes toward Vasant Kunj. The driver might not know it – show them on GPS. No entry fee, no guards, often no other visitors.

Best time: Late afternoon when the stone glows golden. Bring water – there are no facilities.`
            },
            snippet: 'In 1231, Iltutmish built India\'s first Islamic tomb for his son. It\'s now surrounded by a suburb and visited by almost no one...'
        },
        authorIndex: 1,
        locationIndex: 18,
        tags: ['heritage', 'off-beat', 'history'],
        engagement: { views: 1234, likes: 289, comments: 67, shares: 145, unlocks: 189 }
    },
    {
        title: 'Jahaz Mahal: The Floating Palace of Mehrauli',
        content: {
            type: 'text',
            text: {
                body: `When the monsoon fills the Hauz-i-Shamsi reservoir, Jahaz Mahal appears to float on water like a stone ship. It's the most romantic sight in Delhi, and almost no tourists know about it.

This 15th-century pleasure palace was built by the Lodi dynasty for royal picnics. Today, it sits in Mehrauli's village market, surrounded by motorcycle repair shops and vegetable vendors. The contrast is jarring and wonderful.

Here's my ritual:
- Visit during or just after monsoon (July-October) when the lake is full
- Hire a rowboat from the vendor on the north side (₹50 for 30 minutes – yes, really)
- Row to the palace steps and watch the sun set behind the domes

The palace itself is accessible but dangerous – floors have holes, stairs are steep, nothing is maintained. If you climb to the upper terrace, you'll see views of Qutub Minar to the east and Mehrauli village spreading below.

At night during Phool Walon Ki Sair (October): the whole area is lit with lanterns for a festival that dates back 200 years. It started as Hindu-Muslim unity celebration after Mughal prince Mirza Jahangir's mother prayed at both a dargah and temple for her son's release from British captivity. When he was freed, she held a festival for both faiths. It still happens.

Timing: Sunset for photos. Full moon nights for magic. Phool Walon Ki Sair for culture.`
            },
            snippet: 'When the monsoon fills the reservoir, Jahaz Mahal appears to float on water like a stone ship. It\'s the most romantic sight in Delhi...'
        },
        authorIndex: 1,
        locationIndex: 19,
        tags: ['heritage', 'romantic', 'monsoon'],
        engagement: { views: 2345, likes: 567, comments: 123, shares: 278, unlocks: 345 }
    },

    // === UNDERGROUND SCENES ===
    {
        title: 'Delhi\'s Secret Jazz Basement',
        content: {
            type: 'text',
            text: {
                body: `In the basement of a building that was once a printing press, Delhi's jazz scene has been growing quietly since 2006.

The Piano Man Jazz Club doesn't need to advertise. The 100-seat basement fills every weekend with musicians, diplomats, and serious jazz fans who've found their way through word of mouth.

What makes it special:
- **No celebrity DJs, no EDM, no bottle service.** Just jazz. The owner, Arjun, turned down Bollywood events that would have paid his rent for a year because "jazz needs a sanctuary."
- **The artists**: International musicians make this a stop on their Asia tours. I've seen Grammy winners play for 100 people here, intimacy impossible in larger venues.
- **The rules**: No talking during performances. No bright phone screens. No songs under 7 minutes. This isn't background music – it's an experience.

Practical info:
- Location: B-6/3, Safdarjung Enclave – the building looks like offices, the basement feels like 1920s New York
- Reservations essential on weekends, call directly
- Entry includes a drink, which is how they keep prices low
- Jam sessions on Wednesdays are free and open to musicians

The community: regulars know each other by name. Stay long enough and you'll end up at 2 AM discussions about Coltrane versus Coleman. Not a scene for casual visitors, but if jazz is your language, this is your home.`
            },
            snippet: 'In the basement of a building that was once a printing press, Delhi\'s jazz scene has been growing quietly since 2006...'
        },
        authorIndex: 3,
        locationIndex: 20,
        tags: ['music', 'nightlife', 'jazz'],
        engagement: { views: 2678, likes: 545, comments: 134, shares: 289, unlocks: 389 }
    },
    {
        title: 'Spoken Word Nights: Poetry Underground',
        content: {
            type: 'text',
            text: {
                body: `Every second Friday, a 50-seat theatre near Connaught Place transforms into Delhi's most raw, honest space.

Akshara Theatre's "Talking Heads" spoken word night started in 2009. No famous poets, no awards, no gatekeeping. Just a microphone and whoever has the courage to use it.

I've been attending for 8 years. Here's what I've witnessed:
- A Kashmiri student whose poem about checkpoints made the room silent for 3 full minutes after
- A 67-year-old grandfather performing his first piece about partition, written 50 years ago but never shared
- Anonymous love poems for people in the audience, handed to them by the host
- Languages mixing mid-sentence: Hindi, English, Punjabi, Urdu, occasionally Bengali

The format:
- 7 PM doors, 7:30 PM start
- First half: featured poet (usually a name in the Delhi circuit)
- Second half: open mic (5 minutes max, sign up at the door)
- No heckling. Snapping fingers instead of clapping. It's intimate.

Entry is pay-what-you-want. I've seen students give ₹20 and businesspeople give ₹500. The money goes directly to poets, not the venue.

The after-party happens at the chai stall outside. More conversations start there than during the event. Bring a poem in your pocket. Even if you don't read it, the energy might pull it out of you.`
            },
            snippet: 'Every second Friday, a 50-seat theatre near Connaught Place transforms into Delhi\'s most raw, honest space...'
        },
        authorIndex: 3,
        locationIndex: 21,
        tags: ['poetry', 'culture', 'community'],
        engagement: { views: 1890, likes: 423, comments: 98, shares: 189, unlocks: 267 }
    },
    {
        title: 'The Dahi Bhalle Man Who Never Moved',
        content: {
            type: 'text',
            text: {
                body: `Natraj's dahi bhalle wala has been standing at the exact same spot in Chandni Chowk since 1940. Three generations of his family have served curd-soaked lentil dumplings from the same cart.

I asked him once: "Why not expand? Open a restaurant?" He laughed. "This spot finds me 500 customers a day. Why would I need more?"

The business wisdom of Old Delhi is different from MBA textbooks.

His recipe hasn't changed in 80+ years:
- Dahi from a specific milkman in Sadar Bazaar (the family has bought from the same family for 4 generations)
- Tamarind chutney from his wife, made fresh at 4 AM daily
- Secret masala that I watched him make once: 14 spices including black salt, dried mango powder, and something he refused to name

What tourists don't know: if you go between 3-4 PM (after lunch rush, before evening crowd), he'll talk. About Chandni Chowk before Partition, when the lane was mostly Punjabi families. About the 1984 riots when Hindu neighbors hid Muslim shopkeepers. About how malls are killing bazaar culture.

His son went to college, works in IT in Gurgaon. Comes to help on weekends. "He's too educated for this," the old man says. But last month, I saw the son teaching his own daughter to fold bhallas. Maybe tradition survives.

Location: Right side of Chandni Chowk main road, just before the Gurudwara.`
            },
            snippet: 'Natraj\'s dahi bhalle wala has been standing at the exact same spot in Chandni Chowk since 1940. Three generations serving from the same cart...'
        },
        authorIndex: 0,
        locationIndex: 3,
        tags: ['street-food', 'heritage', 'family-business'],
        engagement: { views: 4123, likes: 934, comments: 213, shares: 534, unlocks: 678 }
    },
    {
        title: 'The 140-Year-Old Jalebi Wala',
        content: {
            type: 'text',
            text: {
                body: `"Old Famous Jalebi Wala" is a name, not a description. The shop has been frying swirls of fermented batter since 1884, making it older than most countries.

But here's what Google reviews won't tell you: the jalebis at 6 AM are different from the jalebis at 6 PM.

Morning jalebis are made with batter that's fermented overnight – tangier, crispier, less sweet. By evening, fresh batches are sweeter, softer, catering to tourists. The regulars of Chandni Chowk? They come at dawn.

I spent a morning watching:
- The batter is poured from a height of exactly one foot (try it higher, it won't spiral properly)
- The oil is never changed completely – a portion of yesterday's oil is always kept for flavor continuity
- The sugar syrup is infused with kewra and saffron, but only a splash – enough for aroma, not color
- The serving isn't random: first from the edge, where jalebis are crispiest

The family drama: There are now two shops, both claiming to be the original. Dispute goes back decades. One is on the corner, one is 20 feet away. The corner one has the original equipment. The other has the original family. I go to the corner.

Practical tip: Take a plate of hot jalebis to the lassi wala next door. He'll pour his cardamom-thick lassi over them. That combination doesn't exist on any menu anywhere. You're welcome.`
            },
            snippet: 'The shop has been frying swirls of fermented batter since 1884. But the jalebis at 6 AM are different from the ones at 6 PM...'
        },
        authorIndex: 0,
        locationIndex: 4,
        tags: ['street-food', 'heritage', 'sweets'],
        engagement: { views: 3567, likes: 812, comments: 178, shares: 423, unlocks: 545 }
    },
    {
        title: 'Agrasen Ki Baoli at Midnight',
        content: {
            type: 'text',
            text: {
                body: `During the day, Agrasen Ki Baoli is an Instagram spot. At night, it becomes something else entirely.

The 14th-century stepwell near Connaught Place is officially closed after sunset. But the lock on the back gate is easily bypassed if you know which bar to push. (I'm not telling you to trespass. I'm just telling you.)

Here's what happens after midnight:

The 108 steps down to the dry well create an amplification chamber that ancient builders understood intuitively. Whisper at the bottom, and someone at the top hears you clearly. Stamp your foot, and the echo returns 7 times.

A group of acoustic musicians discovered this years ago. Now, irregular late-night sessions happen – someone plays harmonium, another sings Sufi kalams, the stepwell becomes a natural concert hall.

How to know when: follows are dropped on a Telegram group (ask at the chai stall opposite Jantar Mantar, someone will know). No announcements on social media – police shut down anything that gets too popular.

The energy: standing at the bottom at 2 AM, looking up at 700-year-old walls carved with geometric patterns, listening to live ghazals, will recalibrate your understanding of Delhi.

Note: Bats. Many bats. Also, the local story is that the baoli is haunted by a woman who drowned herself. I've never seen her. The bats are scarier.`
            },
            snippet: 'During the day, Agrasen Ki Baoli is an Instagram spot. At night, it becomes something else entirely...'
        },
        authorIndex: 3,
        locationIndex: 14,
        tags: ['midnight', 'heritage', 'music'],
        engagement: { views: 4789, likes: 1034, comments: 256, shares: 589, unlocks: 723 }
    }
];

// ============================================
// SEED FUNCTION
// ============================================
async function seedDelhiData() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Create users
        console.log('👤 Creating Delhi storytellers...');
        const createdUsers = [];
        for (const userData of delhiUsers) {
            let user = await User.findOne({ email: userData.email });
            if (!user) {
                user = await User.create(userData);
                console.log(`   ✅ Created user: ${userData.displayName}`);
            } else {
                console.log(`   ⏭️  User exists: ${userData.displayName}`);
            }
            createdUsers.push(user);
        }

        // Create locations
        console.log('\n📍 Creating Delhi locations...');
        const createdLocations = [];
        for (const locData of delhiLocations) {
            const locationDoc = {
                coordinates: {
                    type: 'Point',
                    coordinates: locData.coords
                },
                address: locData.address,
                description: locData.description,
                metadata: {
                    type: locData.type,
                    source: 'manual',
                    accuracy: 'high'
                }
            };

            // Check if similar location exists
            let location;
            try {
                location = await Location.findOne({
                    'address.formatted': locData.address.formatted
                });
            } catch (e) {
                location = null;
            }

            if (!location) {
                location = await Location.create(locationDoc);
                console.log(`   ✅ Created location: ${locData.address.neighborhood}`);
            } else {
                // Update existing location with description if missing
                if (!location.description && locData.description) {
                    location.description = locData.description;
                    await location.save();
                    console.log(`   📝 Updated description: ${locData.address.neighborhood}`);
                } else {
                    console.log(`   ⏭️  Location exists: ${locData.address.neighborhood}`);
                }
            }
            createdLocations.push(location);
        }

        // Create stories
        console.log('\n📖 Creating Delhi hidden gem stories...');
        const storiesToCreate = createStories(createdUsers, createdLocations);
        let storiesCreated = 0;

        for (const storyData of storiesToCreate) {
            const existingStory = await Story.findOne({ title: storyData.title });

            if (!existingStory) {
                const story = await Story.create({
                    title: storyData.title,
                    content: storyData.content,
                    author: createdUsers[storyData.authorIndex]._id,
                    location: createdLocations[storyData.locationIndex]._id,
                    tags: storyData.tags,
                    status: 'published',
                    visibility: 'public',
                    publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
                    engagement: storyData.engagement,
                    swapSettings: {
                        isLocked: false,
                        requiresSwap: false
                    },
                    moderation: {
                        moderationStatus: 'approved'
                    }
                });
                console.log(`   ✅ Created story: ${storyData.title.substring(0, 50)}...`);
                storiesCreated++;
            } else {
                console.log(`   ⏭️  Story exists: ${storyData.title.substring(0, 50)}...`);
            }
        }

        // Update user stats
        console.log('\n📊 Updating user statistics...');
        for (const user of createdUsers) {
            const storyCount = await Story.countDocuments({ author: user._id });
            await User.findByIdAndUpdate(user._id, {
                'stats.storiesPublished': storyCount
            });
        }

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('🎉 SEED COMPLETED SUCCESSFULLY');
        console.log('='.repeat(50));
        console.log(`   Users: ${createdUsers.length}`);
        console.log(`   Locations: ${createdLocations.length}`);
        console.log(`   New Stories: ${storiesCreated}`);

        const totalStories = await Story.countDocuments({ status: 'published' });
        console.log(`   Total Published Stories: ${totalStories}`);
        console.log('='.repeat(50));

        await mongoose.disconnect();
        console.log('\n✅ Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    seedDelhiData();
}

module.exports = { seedDelhiData, delhiUsers, delhiLocations };
