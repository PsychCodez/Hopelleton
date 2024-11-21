drop database hopelletonv1;
create database hopelletonv1;
use hopelletonv1;

-- 1. Create User table
CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(100),
    PhoneNumber VARCHAR(15),
    ProfilePicture VARCHAR(255),
    VerificationStatus BOOLEAN,
    DateJoined DATE
);

-- 2. Create Amenity table
CREATE TABLE IF NOT EXISTS Amenity (
    AmenityID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Description TEXT,
    AdditionalInfo VARCHAR(255)
);

-- 3. Create Host table
CREATE TABLE IF NOT EXISTS Host (
    HostID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    VerificationStatus BOOLEAN,
    HostRating DECIMAL(2,1),
    NumberOfProperties INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- 4. Create Guest table
CREATE TABLE IF NOT EXISTS Guest (
    GuestID INT PRIMARY KEY AUTO_INCREMENT ,
    UserID INT UNIQUE,
    GuestRating DECIMAL(2,1),
    NumberOfBookings INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- 5. Create Property table
CREATE TABLE IF NOT EXISTS Property (
    PropertyID INT PRIMARY KEY AUTO_INCREMENT,
    HostID INT,
    Title VARCHAR(255),
    Description TEXT,
    AverageRating DECIMAL(10,2),
    MaxGuests INT,
    PricePerNight DECIMAL(10, 2),
    Rules TEXT,
    CreatedDate DATE,
    UpdatedDate DATE,
    FOREIGN KEY (HostID) REFERENCES Host(HostID)
);

-- 6. Create Location table
CREATE TABLE IF NOT EXISTS Location (
    PropertyID INT PRIMARY KEY,
    City VARCHAR(50),
    State VARCHAR(50),
    Country VARCHAR(50),
    Latitude DECIMAL(9, 6),
    Longitude DECIMAL(9, 6),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);

-- 7. Create CalendarAvailability table
CREATE TABLE IF NOT EXISTS CalendarAvailability (
    AvailabilityID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    Date DATE,
    IsAvailable BOOLEAN,
    Notes VARCHAR(255),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);

-- 8. Create Booking table
CREATE TABLE IF NOT EXISTS Booking (
    BookingID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    UserID INT,
    CheckInDate DATE,
    CheckOutDate DATE,
    TotalCost DECIMAL(10, 2),
    BookingStatus VARCHAR(50),
    CreatedDate DATE,
    UpdatedDate DATE
);

-- 9. Create Payment table
CREATE TABLE IF NOT EXISTS Payment (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    BookingID INT,
    PaymentMethod VARCHAR(50),
    TransactionID VARCHAR(100),
    PaymentAmount DECIMAL(10, 2),
    PaymentDate DATE,
    PaymentStatus VARCHAR(50)
    
);

-- 4. Add foreign key constraint to Payment table referencing Booking
ALTER TABLE Payment
ADD FOREIGN KEY (BookingID) REFERENCES Booking(BookingID);

-- 10. Create PropertyAmenity table
CREATE TABLE IF NOT EXISTS PropertyAmenity (
    PropertyAmenityID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    AmenityID INT,
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID),
    FOREIGN KEY (AmenityID) REFERENCES Amenity(AmenityID)
);

-- 11. Create Review table
CREATE TABLE IF NOT EXISTS Review (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    BookingID INT,
    PropertyID INT,
    UserID INT,
    Rating DECIMAL(2,1),
    Comment TEXT,
    ReviewDate DATE,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);

-- 12. Create SupportTicket table
CREATE TABLE IF NOT EXISTS SupportTicket (
    TicketID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    IssueDescription TEXT,
    IssueType VARCHAR(50),
    Status VARCHAR(50),
    CreatedDate DATE,
    ResolutionDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- 13. Create IdentityVerification table
CREATE TABLE IF NOT EXISTS IdentityVerification (
    VerificationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    DocumentType VARCHAR(50),
    DocumentNumber VARCHAR(100),
    VerificationDate DATE,
    VerificationStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);


-- Insert into User table
INSERT INTO User (Name, Email, Password, PhoneNumber, ProfilePicture, VerificationStatus, DateJoined)
VALUES
('John Doe', 'john.doe@example.com', 'password123', '1234567890', 'john_doe.jpg', TRUE, '2023-01-01'),
('Jane Smith', 'jane.smith@example.com', 'password456', '1234567891', 'jane_smith.jpg', TRUE, '2023-02-01'),
('Alice Johnson', 'alice.johnson@example.com', 'password789', '1234567892', 'alice_johnson.jpg', FALSE, '2023-03-01'),
('Bob Brown', 'bob.brown@example.com', 'password321', '1234567893', 'bob_brown.jpg', TRUE, '2023-04-01'),
('Emily Davis', 'emily.davis@example.com', 'password654', '1234567894', 'emily_davis.jpg', TRUE, '2023-05-01'),
('David Wilson', 'david.wilson@example.com', 'password987', '1234567895', 'david_wilson.jpg', FALSE, '2023-06-01');

-- Insert into Amenity table
INSERT INTO Amenity (Name, Description, AdditionalInfo)
VALUES
('WiFi', 'Wireless internet connection', 'Free for all guests'),
('Air Conditioning', 'Cooling system for hot weather', 'Available in all rooms'),
('Kitchen', 'Fully equipped kitchen', 'Includes stove, oven, fridge'),
('Parking', 'On-site parking available', 'Free for guests'),
('Swimming Pool', 'Outdoor pool for relaxation', 'Open from 9 AM to 9 PM'),
('Gym', 'Fitness center with exercise machines', 'Access available 24/7');

-- Insert into Host table
INSERT INTO Host (UserID, VerificationStatus, HostRating, NumberOfProperties)
VALUES
(1, TRUE, 4.5, 2),
(2, TRUE, 4.7, 3),
(3, FALSE, 3.8, 1),
(4, TRUE, 5.0, 4),
(5, TRUE, 4.2, 1),
(6, FALSE, 4.0, 2);

-- Insert into Guest table
INSERT INTO Guest (UserID, GuestRating, NumberOfBookings)
VALUES
(1, 4.8, 5),
(2, 4.6, 3),
(3, 3.9, 2),
(4, 4.9, 6),
(5, 4.1, 4),
(6, 4.5, 7);

-- Insert into Property table
INSERT INTO Property (HostID, Title, Description, AverageRating, MaxGuests, PricePerNight, Rules, CreatedDate, UpdatedDate)
VALUES
(1, 'Cozy Cottage', 'A small cozy cottage in the countryside', 4.5, 4, 150.00, 'No smoking, No pets', '2023-01-01', '2023-01-01'),
(2, 'Luxury Villa', 'Spacious villa with pool and garden', 4.7, 6, 300.00, 'No parties, No pets', '2023-02-01', '2023-02-01'),
(3, 'Modern Apartment', '2-bedroom apartment in the city center', 4.2, 4, 120.00, 'No smoking', '2023-03-01', '2023-03-01'),
(4, 'Beachfront House', 'Stunning house with sea view', 5.0, 8, 500.00, 'No loud music after 10 PM', '2023-04-01', '2023-04-01'),
(5, 'Charming Studio', 'Compact studio near shopping district', 4.1, 2, 80.00, 'No pets', '2023-05-01', '2023-05-01'),
(6, 'Mountain Retreat', 'Secluded cabin with mountain views', 4.4, 5, 200.00, 'No parties, No pets', '2023-06-01', '2023-06-01');

-- Insert into Location table
INSERT INTO Location (PropertyID, City, State, Country, Latitude, Longitude)
VALUES
(1, 'Countryside', 'Texas', 'USA', 32.7767, -96.7970),
(2, 'Beverly Hills', 'California', 'USA', 34.0696, -118.4053),
(3, 'New York City', 'New York', 'USA', 40.7128, -74.0060),
(4, 'Miami', 'Florida', 'USA', 25.7617, -80.1918),
(5, 'Chicago', 'Illinois', 'USA', 41.8781, -87.6298),
(6, 'Aspen', 'Colorado', 'USA', 39.1911, -106.8175);

-- Insert into CalendarAvailability table
INSERT INTO CalendarAvailability (PropertyID, Date, IsAvailable, Notes)
VALUES
(1, '2023-01-01', TRUE, 'Available'),
(2, '2023-02-01', FALSE, 'Booked'),
(3, '2023-03-01', TRUE, 'Available'),
(4, '2023-04-01', TRUE, 'Available'),
(5, '2023-05-01', FALSE, 'Booked'),
(6, '2023-06-01', TRUE, 'Available');

-- Insert into Booking table
INSERT INTO Booking (PropertyID, UserID, CheckInDate, CheckOutDate, TotalCost, BookingStatus, CreatedDate, UpdatedDate)
VALUES
(1, 1, '2023-06-01', '2023-06-07', 900.00, 'Completed', '2023-05-15', '2023-06-01'),
(2, 2, '2023-07-01', '2023-07-07', 2100.00, 'Completed', '2023-06-15', '2023-07-01'),
(3, 3, '2023-08-01', '2023-08-05', 600.00, 'Pending', '2023-07-10', '2023-07-10'),
(4, 4, '2023-09-01', '2023-09-07', 3500.00, 'Completed', '2023-08-20', '2023-09-01'),
(5, 5, '2023-10-01', '2023-10-03', 240.00, 'Cancelled', '2023-09-05', '2023-09-10'),
(6, 6, '2023-11-01', '2023-11-07', 1400.00, 'Completed', '2023-10-15', '2023-11-01');

-- Insert into Payment table
INSERT INTO Payment (BookingID, PaymentMethod, TransactionID, PaymentAmount, PaymentDate, PaymentStatus)
VALUES
(1, 'Credit Card', 'TX123456', 900.00, '2023-05-15', 'Completed'),
(2, 'PayPal', 'TX789012', 2100.00, '2023-06-15', 'Completed'),
(3, 'Credit Card', 'TX345678', 600.00, '2023-07-10', 'Pending'),
(4, 'Bank Transfer', 'TX901234', 3500.00, '2023-08-20', 'Completed'),
(5, 'PayPal', 'TX567890', 240.00, '2023-09-05', 'Cancelled'),
(6, 'Credit Card', 'TX234567', 1400.00, '2023-10-15', 'Completed');

-- Insert into PropertyAmenity table
INSERT INTO PropertyAmenity (PropertyID, AmenityID)
VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 4),
(4, 5);

-- Insert into Review table
INSERT INTO Review (BookingID, UserID, PropertyID, Rating, Comment, ReviewDate)
VALUES
(1, 1, 1, 4.5, 'Great stay! Highly recommended.', '2023-06-10'),
(2, 2, 2, 4.7, 'Luxurious villa, perfect for families.', '2023-07-05'),
(3, 3, 3, 4.2, 'Nice apartment, but a bit small.', '2023-08-10'),
(4, 4, 4, 5.0, 'Incredible experience, will come again.', '2023-09-07'),
(5, 5, 5, 4.1, 'Good location, but the property was smaller than expected.', '2023-10-04'),
(6, 6, 6, 4.4, 'Very quiet and peaceful, just what I needed.', '2023-11-06');

-- Insert into SupportTicket table
INSERT INTO SupportTicket (UserID, IssueDescription, IssueType, Status, CreatedDate, ResolutionDate)
VALUES
(1, 'Lost access to the property', 'Booking Issue', 'Resolved', '2023-06-02', '2023-06-03'),
(2, 'Payment was not processed correctly', 'Payment Issue', 'Pending', '2023-07-02', NULL),
(3, 'Found cleanliness issues in the apartment', 'Property Issue', 'Resolved', '2023-08-05', '2023-08-06'),
(4, 'Requested an earlier check-in', 'Booking Issue', 'Resolved', '2023-09-03', '2023-09-04'),
(5, 'Overcharged for booking', 'Payment Issue', 'Resolved', '2023-10-02', '2023-10-03'),
(6, 'Problems with the check-in procedure', 'Booking Issue', 'Resolved', '2023-11-02', '2023-11-03');

-- Insert into IdentityVerification table
INSERT INTO IdentityVerification (UserID, DocumentType, DocumentNumber, VerificationDate, VerificationStatus)
VALUES
(1, 'Passport', 'A12345678', '2023-01-15', 'Verified'),
(2, 'Driver\'s License', 'B12345678', '2023-02-15', 'Verified'),
(3, 'ID Card', 'C12345678', '2023-03-15', 'Not Verified'),
(4, 'Passport', 'D12345678', '2023-04-15', 'Verified'),
(5, 'ID Card', 'E12345678', '2023-05-15', 'Verified'),
(6, 'Driver\'s License', 'F12345678', '2023-06-15', 'Not Verified');


-- Query 1: Nested Query:
SELECT p.PropertyID, p.Title, p.Description, p.AverageRating, p.MaxGuests, p.PricePerNight, p.Rules,
       l.City, l.State, l.Country, l.Latitude, l.Longitude
FROM Property p
JOIN Location l ON p.PropertyID = l.PropertyID
WHERE p.MaxGuests >= 2 -- replace '?' with the maxGuests from the request
AND NOT EXISTS (
    SELECT 1
    FROM Booking b
    WHERE b.PropertyID = p.PropertyID
    AND b.BookingStatus = 'Confirmed' -- or any active status that blocks availability
    AND (
        (b.CheckInDate <= '2023-04-01' AND b.CheckOutDate >= '2023-04-02') -- Overlaps with the start of the range
        OR (b.CheckInDate <= '2023-04-01' AND b.CheckOutDate >= '2023-04-02') -- Overlaps with the end of the range
        OR (b.CheckInDate >= '2023-04-01' AND b.CheckOutDate <= '2023-04-02') -- Fully within the range
    )
);


-- Query 2 : Trigger - Increase No. Property of Host
INSERT INTO Property (HostID, Title, Description, AverageRating, MaxGuests, PricePerNight, Rules, CreatedDate, UpdatedDate)
VALUES (1, 'Cottage Galore', 'A cozy cottage in the countryside', 4.5, 5, 1250.00, 'No smoking', '2023-01-01', '2023-01-04');

drop trigger incHostPropCount;
--
DELIMITER $$

CREATE TRIGGER incHostPropCount
AFTER INSERT ON Property
FOR EACH ROW
BEGIN
    UPDATE Host
    SET NumberOfProperties = NumberOfProperties + 1
    WHERE HostID = NEW.HostID;
END$$

DELIMITER ;

-- Query 3 : Trigger - Increase Bookings of User
INSERT INTO Booking (PropertyID, UserID, CheckInDate, CheckOutDate, TotalCost, BookingStatus, CreatedDate, UpdatedDate)
VALUES (1, 1, '2023-06-09', '2023-06-12', 250.00, 'Completed', '2023-05-17', '2023-06-01');

drop trigger incGuestBookCount;
--
DELIMITER $$

CREATE TRIGGER incGuestBookCount
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
    UPDATE Guest
    SET NumberOfBookings = NumberOfBookings+ 1
    WHERE UserID = NEW.UserID;
END$$

DELIMITER ;

-- Query 4 : Trigger - Update Property Ratings after Review
INSERT INTO Review (BookingID, UserID, PropertyID, Rating, Comment, ReviewDate)
VALUES (1, 1, 1, 2.5, 'Mid! But okay recommended.', '2023-06-12');
drop trigger updateAverage;
--
DELIMITER $$

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
END$$

DELIMITER ;

-- Query 5: Procedure - Get Top Rated Property , Rating and Host Name
CALL GetTopRatedProperty();
DROP PROCEDURE GetTopRatedProperty;
--
DELIMITER $$

CREATE PROCEDURE GetTopRatedProperty()
BEGIN
    SELECT 
        p.PropertyID,
        p.Title AS PropertyTitle,
        p.AverageRating,
        u.Name AS HostName
    FROM 
        Property p
    JOIN 
        Host h ON p.HostID = h.HostID
    JOIN 
        User u ON h.UserID = u.UserID
    WHERE 
        p.AverageRating = (SELECT MAX(AverageRating) FROM Property)
    LIMIT 1; -- In case of a tie, only one property is returned
END$$

DELIMITER ;

-- Query 6: Procedure - Cancel an existing Booking
CALL CancelBooking(7);
DROP PROCEDURE CancelBooking;
--
DELIMITER $$
CREATE PROCEDURE CancelBooking(IN BookID INT)
BEGIN
UPDATE Booking SET BookingStatus = 'Cancelled' WHERE BookingID = BookID;
END $$

DELIMITER ;


-- Roles and User Creation:

CREATE ROLE GuestUser;
CREATE ROLE HostUser;
CREATE ROLE AdminUser;

GRANT SELECT ON hopelletonv1.user TO GuestUser;
GRANT SELECT ON hopelletonv1.Property TO GuestUser;
GRANT SELECT ON hopelletonv1.Booking TO GuestUser;
GRANT SELECT ON hopelletonv1.uest TO GuestUser;
GRANT SELECT, INSERT ON hopelletonv1.Review TO GuestUser; 

GRANT SELECT ON hopelletonv1.User TO HostUser;
GRANT SELECT, INSERT, UPDATE ON hopelletonv1.Booking TO HostUser; 
GRANT SELECT ON hopelletonv1.Guest TO HostUser;
GRANT SELECT, INSERT, UPDATE ON hopelletonv1.Host TO HostUser; 
GRANT SELECT, INSERT, UPDATE ON hopelletonv1.Property TO HostUser; 
GRANT SELECT, INSERT, UPDATE ON hopelletonv1.PropertyAmenity TO HostUser; 
GRANT SELECT, INSERT, UPDATE ON hopelletonv1.Review TO HostUser; 

GRANT ALL PRIVILEGES ON hopelletonv1.* TO AdminUser;

GRANT GuestUser TO 'guest_user'@'localhost';
GRANT HostUser TO 'host_user'@'localhost';
GRANT AdminUser TO 'admin_user'@'localhost';
