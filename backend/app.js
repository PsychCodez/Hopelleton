const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db.js'); // Assumes db.js has connection configuration
const setupDatabase = require('./setup/setup.js');
const userRoutes = require('./routes/user.js');
const propertyRoutes = require('./routes/property.js');
const bookingRoutes = require('./routes/booking.js');
const reviewRoutes = require('./routes/review.js');
const paymentRoutes = require('./routes/payment.js');
const amenityRoutes = require('./routes/amenity.js');
const propertyAmenityRoutes = require('./routes/propertyAmenity.js');
const supportTicketRoutes = require('./routes/support.js');
const hostRoutes = require('./routes/host.js');
const guestRoutes = require('./routes/guest.js');
const calendarRoutes = require('./routes/calendar.js');
const locationRoutes = require('./routes/location.js');
const identityVerificationRoutes = require('./routes/identityVerification.js');
const queryRoute = require('./routes/queries.js');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
      origin: 'http://localhost:3000',  // Allow only requests from localhost:3000
    }));

app.use(bodyParser.json());
app.use(express.static('public'));

// Route Definitions
app.use('/users', userRoutes);
app.use('/amenities', amenityRoutes);
app.use('/hosts', hostRoutes);
app.use('/guests', guestRoutes);
app.use('/properties', propertyRoutes);
app.use('/locations', locationRoutes);
app.use('/calendar', calendarRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/property-amenities', propertyAmenityRoutes);
app.use('/reviews', reviewRoutes);
app.use('/support-tickets', supportTicketRoutes);
app.use('/identity-verifications', identityVerificationRoutes);
app.use('/query',queryRoute);

// Root route for serving the index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

setupDatabase()
    .then(() => console.log('Database setup completed successfully.'))
    .catch((err) => console.error('Error during database setup:', err));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

