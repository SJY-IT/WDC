-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: group46ver2
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `group46ver2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `group46ver2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `group46ver2`;

--
-- Table structure for table `admin_profile`
--

DROP TABLE IF EXISTS `admin_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_profile` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(30) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_profile`
--

LOCK TABLES `admin_profile` WRITE;
/*!40000 ALTER TABLE `admin_profile` DISABLE KEYS */;
INSERT INTO `admin_profile` VALUES (1,'Samuel','Jackson','Sam','sam123','45 Green Hill Road Adelaide','0440123456','samsam@gmail.com'),(2,'Joe','McDonald','Joe','joe123','345 Maroon Street Adelaide','0441123456','joejoe@gmail.com'),(3,'Timothy','Carlos','Tim','tim123','15 Rose Street Adelaide','0442123456','timtim@gmail.com'),(4,'Samuel','Jackson','Sam','sam123','45 Green Hill Road Adelaide','0440123456','samsam@gmail.com'),(5,'Joe','McDonald','Joe','joe123','345 Maroon Street Adelaide','0441123456','joejoe@gmail.com'),(6,'Timothy','Carlos','Tim','tim123','15 Rose Street Adelaide','0442123456','timtim@gmail.com');
/*!40000 ALTER TABLE `admin_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotspot`
--

DROP TABLE IF EXISTS `hotspot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotspot` (
  `hotspot_id` int NOT NULL AUTO_INCREMENT,
  `infected_people` int DEFAULT NULL,
  `venue_id` int DEFAULT NULL,
  PRIMARY KEY (`hotspot_id`),
  KEY `venue_id` (`venue_id`),
  CONSTRAINT `hotspot_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotspot`
--

LOCK TABLES `hotspot` WRITE;
/*!40000 ALTER TABLE `hotspot` DISABLE KEYS */;
INSERT INTO `hotspot` VALUES (1,5,1),(2,2,2),(3,13,3);
/*!40000 ALTER TABLE `hotspot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager_profile`
--

DROP TABLE IF EXISTS `manager_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager_profile` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(30) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `venue_id` int DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  KEY `venue_id` (`venue_id`),
  CONSTRAINT `manager_profile_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_profile`
--

LOCK TABLES `manager_profile` WRITE;
/*!40000 ALTER TABLE `manager_profile` DISABLE KEYS */;
INSERT INTO `manager_profile` VALUES (1,'Rinnei','Johnson','Rin','rin123','72 Kings Road Adelaide','0444123456','rinrin@gmail.com',1),(2,'Lynnerux','Kolaf','Lyn','Lyn123','345 Maroon Street Adelaide','0445123456','lynlyn@gmail.com',2),(3,'Beer','Cheer','Bee','Bee123','15 Rose Street Adelaide','0446123456','beebee@gmail.com',3);
/*!40000 ALTER TABLE `manager_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(30) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,'Jay','Park','Jay','123','University of Adelaide','0412345678','jayjay@gmail.com'),(2,'Bob','Taylor','Bob','bob123','55 Grote Street Adelaide','0400123456','yolo123@gmail.com'),(3,'Ryuko','Moshi','Ryu','ninja','1 Currie Street Adelaide','0430123456','ninjaryu@gmail.com'),(4,'Jay','Park','Jay','123','University of Adelaide','0412345678','jayjay@gmail.com'),(5,'Bob','Taylor','Bob','bob123','55 Grote Street Adelaide','0400123456','yolo123@gmail.com'),(6,'Ryuko','Moshi','Ryu','ninja','1 Currie Street Adelaide','0430123456','ninjaryu@gmail.com');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue` (
  `venue_id` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`venue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (1,'Rin\'s Mini Shop','31 Kings Road Adelaide',15),(2,'Ninja Accessory Adelaide','77 Midnight Road Adelaide',20),(3,'Honey Honey','82 Rose Street Adelaide',30);
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue_visits`
--

DROP TABLE IF EXISTS `venue_visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue_visits` (
  `visit_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `visit_date` datetime NOT NULL,
  `venue_id` int DEFAULT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `user_id` (`user_id`),
  KEY `venue_id` (`venue_id`),
  CONSTRAINT `venue_visits_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `venue_visits_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue_visits`
--

LOCK TABLES `venue_visits` WRITE;
/*!40000 ALTER TABLE `venue_visits` DISABLE KEYS */;
INSERT INTO `venue_visits` VALUES (1,2,'2021-06-10 15:30:30',2),(2,3,'2021-06-10 10:34:12',1),(3,1,'2021-06-10 16:29:21',3),(4,3,'2021-06-10 14:00:00',3),(5,1,'2021-06-13 11:42:14',1),(6,2,'2021-06-13 11:42:14',1),(7,3,'2021-06-13 11:42:14',1),(8,2,'2021-06-13 11:42:14',2),(9,3,'2021-06-13 11:42:14',1),(10,1,'2021-06-13 11:42:14',3),(11,3,'2021-06-13 11:42:14',3);
/*!40000 ALTER TABLE `venue_visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-13 11:45:25
