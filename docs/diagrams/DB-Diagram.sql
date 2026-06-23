CREATE TABLE `logs`(
    `logID` CHAR(36) NULL,
    `data` TEXT NOT NULL,
    `email` TEXT NULL,
    `loggedAt` DATETIME NOT NULL,
    `username` TEXT NOT NULL,
    PRIMARY KEY(`data`)
);
CREATE TABLE `expressionOfInterests`(
    `ID` CHAR(36) NOT NULL,
    `course` TEXT NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `details` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `userID` CHAR(36) NOT NULL,
    PRIMARY KEY(`ID`)
);
CREATE TABLE `users`(
    `sub` CHAR(36) NOT NULL,
    `email` TEXT NOT NULL,
    `username` TEXT NOT NULL,
    PRIMARY KEY(`sub`)
);
ALTER TABLE
    `expressionOfInterests` ADD CONSTRAINT `expressionofinterests_email_foreign` FOREIGN KEY(`email`) REFERENCES `users`(`email`);
ALTER TABLE
    `logs` ADD CONSTRAINT `logs_username_foreign` FOREIGN KEY(`username`) REFERENCES `users`(`username`);
ALTER TABLE
    `expressionOfInterests` ADD CONSTRAINT `expressionofinterests_userid_foreign` FOREIGN KEY(`userID`) REFERENCES `users`(`sub`);
ALTER TABLE
    `logs` ADD CONSTRAINT `logs_email_foreign` FOREIGN KEY(`email`) REFERENCES `users`(`email`);