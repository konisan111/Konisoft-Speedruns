CREATE TABLE `Browser_Frontend` (
  `actions` string PRIMARY KEY,
  `interface` string,
  `scripts` string
);

CREATE TABLE `Render_NodeJS_Server` (
  `endpoints` string PRIMARY KEY,
  `logic` string,
  `auth` string
);

CREATE TABLE `Cloudflare_R2` (
  `file_key` string PRIMARY KEY,
  `bucket` string,
  `content` binary
);

CREATE TABLE `users` (
  `_id` objectId PRIMARY KEY,
  `__v` int,
  `userId` string UNIQUE,
  `username` string,
  `email` string UNIQUE,
  `password` string,
  `avatarUrl` string,
  `nationality` string,
  `modViewEnabled` bool,
  `accountCreation` date,
  `videos` object[]
);

CREATE TABLE `videos` (
  `_id` objectId PRIMARY KEY,
  `videoId` string,
  `videoUrl` string,
  `speedrunTime` int,
  `approved` bool,
  `uploadDate` date
);

ALTER TABLE `Browser_Frontend` ADD FOREIGN KEY (`actions`) REFERENCES `Render_NodeJS_Server` (`endpoints`);

ALTER TABLE `Render_NodeJS_Server` ADD FOREIGN KEY (`endpoints`) REFERENCES `users` (`_id`);

ALTER TABLE `Render_NodeJS_Server` ADD FOREIGN KEY (`endpoints`) REFERENCES `Cloudflare_R2` (`file_key`);

ALTER TABLE `users` ADD FOREIGN KEY (`videos`) REFERENCES `videos` (`_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`avatarUrl`) REFERENCES `Cloudflare_R2` (`file_key`);

ALTER TABLE `videos` ADD FOREIGN KEY (`videoUrl`) REFERENCES `Cloudflare_R2` (`file_key`);
