const db = require('../db/db.js'); // Database connection

const setupDatabase = () => {
    return new Promise((resolve, reject) => {
        const triggers = [
            {
                name: 'updateAverage',
                sql: `
                CREATE TRIGGER updateAverage
                AFTER INSERT ON Review
                FOR EACH ROW
                BEGIN
                    UPDATE Property
                    SET AverageRating = (
                        SELECT AVG(Rating)
                        FROM Review
                        WHERE PropertyID = NEW.PropertyID
                    )
                    WHERE PropertyID = NEW.PropertyID;
                END ;
                `,
            },
            {
                name: 'incHostPropCount',
                sql: `
                CREATE TRIGGER incHostPropCount
                AFTER INSERT ON Property
                FOR EACH ROW
                BEGIN
                    UPDATE Host
                    SET NumberOfProperties = NumberOfProperties + 1
                    WHERE HostID = NEW.HostID;
                END ;
                `,
            },
            {
                name: 'incGuestBookCount',
                sql: `
                CREATE TRIGGER incGuestBookCount
                AFTER INSERT ON Booking
                FOR EACH ROW
                BEGIN
                    UPDATE Guest
                    SET NumberOfBookings = NumberOfBookings+ 1
                    WHERE UserID = NEW.UserID;
                END ;
                `,
            },
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
