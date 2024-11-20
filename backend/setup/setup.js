const db = require('../db/db.js'); // Database connection

const setupDatabase = () => {
    return new Promise((resolve, reject) => {
        const triggers = [
            {
                name: 'UpdateAverageRatingAfterInsert',
                sql: `
                CREATE TRIGGER updateAverage AFTER INSERT ON Review
                FOR EACH ROW
                BEGIN
                    DECLARE avgRating DECIMAL(2,1);
                    
                    SELECT PropertyID 
                    INTO @PropertyID
                    FROM Booking 
                    WHERE BookingID = NEW.BookingID;
                    
                    SELECT AVG(Rating) 
                    INTO avgRating
                    FROM Review
                    WHERE BookingID IN (SELECT BookingID FROM Booking WHERE PropertyID = @PropertyID);
                
                    UPDATE Property
                    SET AverageRating = avgRating
                    WHERE PropertyID = @PropertyID;
                END ;
                `,
            },
            // {
            //     name: 'UpdateCalendarAvailabilityAfterBooking',
            //     sql: `
            //     CREATE TRIGGER UpdateCalendarAvailabilityAfterBooking
            //     AFTER INSERT ON Booking
            //     FOR EACH ROW
            //     BEGIN
            //         UPDATE Calendar
            //         SET IsAvailable = 0
            //         WHERE PropertyID = NEW.PropertyID
            //         AND BookingDate BETWEEN NEW.CheckInDate AND NEW.CheckOutDate;
            //     END;
            //     `,
            // },
        ];

        // Execute each trigger
        const triggerPromises = triggers.map(({ name, sql }) =>
            new Promise((resolveTrigger, rejectTrigger) => {
                db.query(sql, (err) => {
                    if (err) {
                        if (err.code === 'ER_TRG_ALREADY_EXISTS') {
                            console.log(`Trigger '${name}' already exists. Skipping creation.`);
                            return resolveTrigger();
                        }
                        console.error(`Error creating trigger '${name}':`, err);
                        return rejectTrigger(err);
                    }
                    console.log(`Trigger '${name}' created successfully.`);
                    resolveTrigger();
                });
            })
        );

        Promise.all(triggerPromises)
            .then(() => {
                console.log('All triggers created successfully.');
                resolve();
            })
            .catch((err) => {
                console.error('Error setting up triggers:', err);
                reject(err);
            });
    });
};

module.exports = setupDatabase;
