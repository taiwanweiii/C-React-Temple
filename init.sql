-- MariaDB dump 10.19-11.2.2-MariaDB, for osx10.18 (arm64)
--
-- Host: localhost    Database: line_order
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `line_user_data`
--

DROP TABLE IF EXISTS `line_user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_user_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_user_data`
--

LOCK TABLES `line_user_data` WRITE;
/*!40000 ALTER TABLE `line_user_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `line_user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shopping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shopping`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime GENERATED ALWAYS AS (`created_at` + interval 30 day) STORED,
  `status` int(2) NOT NULL DEFAULT 0 COMMENT '0:尚未完成付款|1:完成付款｜2.過期\r\n',
  `paid_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
(34,'867g1mqmpdal263bcvie43be26','[{\"product_id\":1,\"number\":1}]','2025-06-14 11:51:52','2025-07-14 19:51:52',1,NULL),
(38,'867g1mqmpdal263bcvie43be26','[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]','2025-06-14 13:53:24','2025-07-14 21:53:24',1,'2025-06-14 21:55:02'),
(39,'867g1mqmpdal263bcvie43be26','[{\"product_id\":2,\"number\":1},{\"product_id\":1,\"number\":1}]','2025-06-14 16:08:17','2025-07-15 00:08:17',1,'2025-06-15 00:08:50'),
(40,'867g1mqmpdal263bcvie43be26','[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]','2025-06-14 16:23:21','2025-07-15 00:23:21',1,'2025-06-15 00:29:39'),
(41,'sr06kvhk1qh3d6t71t2itslnmr','[{\"product_id\":1,\"number\":1}]','2025-06-14 16:29:45','2025-07-15 00:29:45',1,'2025-06-15 00:30:12'),
(42,'867g1mqmpdal263bcvie43be26','[{\"product_id\":2,\"number\":1}]','2025-06-14 16:31:00','2025-07-15 00:31:00',1,'2025-06-15 00:31:23'),
(43,'vvgc9dkdov6pngtu37i0urcrmn','[{\"product_id\":1,\"number\":1}]','2025-06-14 16:33:50','2025-07-15 00:33:50',1,'2025-06-15 00:34:12'),
(44,'5h5q3u13kqhbs96ov7fsm5u9op','[{\"product_id\":1,\"number\":3},{\"product_id\":2,\"number\":2}]','2025-06-14 16:36:01','2025-07-15 00:36:01',1,'2025-06-15 00:40:36'),
(45,'n36t5bh8etcikjoe1dhg25uc9n','[{\"product_id\":1,\"number\":1}]','2025-06-14 16:41:42','2025-07-15 00:41:42',1,'2025-06-15 00:42:12'),
(46,'sr06kvhk1qh3d6t71t2itslnmr','[{\"product_id\":1,\"number\":1}]','2025-06-14 16:42:04','2025-07-15 00:42:04',0,NULL),
(47,'8','[{\"product_id\":1,\"number\":1}]','2025-06-14 17:03:50','2025-07-15 01:03:50',1,'2025-06-15 02:03:01'),
(48,'dh8cp7m6ss8gmanbrkv9ln4qlo','[{\"product_id\":1,\"number\":4}]','2025-06-14 17:14:50','2025-07-15 01:14:50',0,NULL),
(49,'pf730pqnn49udfj68hdi8bjici','[{\"product_id\":1,\"number\":1}]','2025-06-14 17:16:09','2025-07-15 01:16:09',0,NULL),
(50,'njtg8qn2f319r7d761b9cjmjkq','[{\"product_id\":1,\"number\":2}]','2025-06-14 18:07:16','2025-07-15 02:07:16',0,NULL),
(53,'8','[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":6}]','2025-06-14 18:41:26','2025-07-15 02:41:26',1,'2025-06-15 02:41:49'),
(54,'0qs7gpa4dn7griqj1fhkcngj51','[{\"product_id\":2,\"number\":1}]','2025-06-14 18:44:38','2025-07-15 02:44:38',0,NULL),
(55,'rstcp2499q1e14oanvopvfdd6p','[{\"product_id\":2,\"number\":1}]','2025-06-14 18:56:06','2025-07-15 02:56:06',1,'2025-06-15 02:57:19'),
(56,'b0ra31jfk38d6achu2g9gnq2vh','[{\"product_id\":1,\"number\":1}]','2025-06-14 18:57:52','2025-07-15 02:57:52',0,NULL),
(57,'bla1jouab3sbihlmngrdqjeu45','[{\"product_id\":1,\"number\":1}]','2025-06-14 19:07:58','2025-07-15 03:07:58',0,NULL),
(58,'8','[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]','2025-06-14 19:10:37','2025-07-15 03:10:37',2,NULL),
(59,'a2s6hm5rgeccg8gcgb33a2g8np','[{\"product_id\":1,\"number\":3}]','2025-07-03 15:51:16','2025-08-02 23:51:16',0,NULL),
(60,'8psn0mt62e7gsjk2nrnsk7971j','[{\"product_id\":1,\"number\":1}]','2025-08-04 14:27:41','2025-09-03 22:27:41',0,NULL),
(61,'8','[]','2025-08-04 16:22:00','2025-09-04 00:22:00',0,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_log`
--

DROP TABLE IF EXISTS `pay_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `order_id` int(11) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `shopping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shopping`)),
  `method` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_log`
--

LOCK TABLES `pay_log` WRITE;
/*!40000 ALTER TABLE `pay_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `descript` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `customize` int(1) NOT NULL COMMENT '是否客製化',
  `category` varchar(100) NOT NULL,
  `online` int(1) NOT NULL COMMENT '是否上線',
  `status` varchar(10) NOT NULL COMMENT '目前狀況\r\n補貨|完售|上架中',
  `shop` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'招牌肉絲飯','嚴選上等雞肉，搭配香Q白飯與秘製醬汁。','https://i.imgur.com/OJrUPbr.jpeg',60,0,'[\"all\",\"hot\",\"main_food\"]',1,'','0','2025-05-31 16:39:13'),
(2,'經典牛肉堡','特選澳洲牛肉搭配新鮮蔬菜和特製醬料。','https://i.imgur.com/OJrUPbr.jpeg',180,0,'[\'all\']',1,'stock','1','2025-06-01 13:52:36');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `birthday` timestamp NOT NULL,
  `gender` varchar(1) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'member',
  `pw` varchar(100) NOT NULL,
  `creat_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(8,'admin','$2y$11$HajsEeJtm2i9cBDAfvyAher36mLaqCpGkxnDhzjgHVoYnbk.npTxW','0932523116','mb190208@gmail.com','2025-05-12 16:00:00','m','member','123456','2025-05-28 03:25:53'),
(17,'124124','$2a$11$V5z1UZBcwk1BtJoTvM/5ge/D/Ffzi9qioAJZZ.425bjQ2/Gn3cau.','0932523116','mb190208@office.stust.edu.tw','2025-09-16 16:00:00','女','member','1124WEAW@$#a','2025-09-28 16:40:36'),
(20,'阿偉','$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6','0932523116','a','2025-09-22 16:00:00','男','member','123!QAZws','2025-09-30 12:27:39');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 23:30:20
