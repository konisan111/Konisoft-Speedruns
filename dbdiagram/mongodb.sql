CREATE TABLE `users` (
  `_id` objectId PRIMARY KEY,
  `userId` string UNIQUE,
  `username` string,
  `email` string UNIQUE,
  `password` string,
  `avatarUrl` string,
  `nationality` string,
  `modViewEnabled` bool,
  `accountCreation` date,
  `videos` object[] COMMENT 'Embedded array of video objects'
);

CREATE TABLE `videos` (
  `_id` objectId,
  `videoId` string,
  `videoUrl` string,
  `speedrunTime` int,
  `approved` bool,
  `uploadDate` date
);

ALTER TABLE `users` ADD FOREIGN KEY (`videos`) REFERENCES `videos` (`_id`);
