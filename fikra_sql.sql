-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 30, 2022 at 01:55 PM
-- Server version: 5.7.37
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meat_fikra`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_prod_dtl`
--

CREATE TABLE `add_prod_dtl` (
  `sno` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `add_prod_dtl`
--

INSERT INTO `add_prod_dtl` (`sno`, `type`, `data`, `date`) VALUES
(104, 'prod_type', 'HEEL', '2021-12-19 15:13:34'),
(105, 'prod_type', 'FLAT', '2021-12-19 15:13:46'),
(106, 'prod_type', 'FLAT PUMPY', '2021-12-19 15:14:01'),
(108, 'prod_type', 'MIDDLE HEEL PUMPY', '2021-12-19 15:14:45'),
(109, 'prod_type', 'HIGH HEEL PUMPY', '2021-12-19 15:14:59'),
(124, 'banwar_type', 'FULL ( CHORA )', '2021-12-19 15:34:41'),
(125, 'banwar_type', 'NAKI PATI ( CHORA )', '2021-12-19 15:35:36'),
(126, 'banwar_type', 'NAKI PATI ( PATLA )', '2021-12-19 15:36:21'),
(127, 'banwar_type', 'GOAT ', '2021-12-19 15:36:57'),
(128, 'banwar_color', 'BLACK ( VELVET )', '2021-12-19 15:38:09'),
(129, 'banwar_color', 'BLACK ( RAGZINE )', '2021-12-19 15:38:17'),
(130, 'banwar_color', 'PINK ( VELVET )', '2021-12-19 15:38:27'),
(131, 'banwar_color', 'PINK ( RAGZINE )', '2021-12-19 15:38:36'),
(132, 'banwar_color', 'SKIN QG ( RAGZINE )', '2021-12-19 15:38:51'),
(133, 'banwar_color', 'SKIN ( PAK ) ( RAGZINE )', '2021-12-19 15:38:59'),
(134, 'banwar_color', 'SKIN ( VELVET )', '2021-12-19 15:39:23'),
(135, 'banwar_color', 'SNAKE ( WHITE )', '2021-12-19 15:39:34'),
(136, 'banwar_color', 'WHITE ( RAGZINE )', '2021-12-19 15:39:57'),
(137, 'banwar_color', 'SNAKE ( BROWN )', '2021-12-19 15:40:08'),
(138, 'banwar_color', 'BLUE ( VELVET )', '2021-12-19 15:40:16'),
(139, 'banwar_color', 'BLUE ( RAGZINE )', '2021-12-19 15:40:25'),
(140, 'prod_color', 'WHITE', '2021-12-19 15:40:47'),
(141, 'prod_color', 'BLACK', '2021-12-19 15:40:52'),
(142, 'prod_color', 'BLUE', '2021-12-19 15:41:10'),
(143, 'prod_color', 'SKIN', '2021-12-19 15:41:30'),
(144, 'prod_color', 'GOLDEN', '2021-12-19 15:42:52'),
(145, 'prod_color', 'PINK', '2021-12-19 15:43:00'),
(146, 'prod_color', 'PURPLE', '2021-12-19 15:43:13'),
(147, 'banwar_color', 'BLUE ( MALI PAPER )', '2021-12-19 15:52:07'),
(148, 'banwar_color', 'PINK ( MODELA)', '2021-12-19 15:52:35'),
(149, 'sole_type', 'CUT ', '2021-12-19 15:57:06'),
(150, 'sole_type', 'PATLA', '2021-12-19 15:57:25'),
(151, 'sole_type', 'CHORA', '2021-12-19 15:57:35'),
(154, 'heel_color', 'BLACK ( VELVET )', '2021-12-19 16:03:27'),
(155, 'heel_color', 'BLACK ( RAGZINE )', '2021-12-19 16:03:34'),
(156, 'heel_color', 'PINK ( VELVET )', '2021-12-19 16:03:42'),
(157, 'heel_color', 'PINK ( RAGZINE )', '2021-12-19 16:03:57'),
(158, 'heel_color', 'SKIN QG ( RAGZINE )', '2021-12-19 16:04:08'),
(159, 'heel_color', 'SKIN ( PAK ) ( RAGZINE )', '2021-12-19 16:04:15'),
(160, 'heel_color', 'SKIN ( VELVET )', '2021-12-19 16:04:23'),
(161, 'heel_color', 'SNAKE ( WHITE )', '2021-12-19 16:04:38'),
(162, 'heel_color', 'WHITE ( RAGZINE )', '2021-12-19 16:05:03'),
(163, 'heel_color', 'SNAKE ( BROWN )', '2021-12-19 16:05:15'),
(164, 'heel_color', 'BLUE ( VELVET )', '2021-12-19 16:05:26'),
(165, 'heel_color', 'BLUE ( RAGZINE )', '2021-12-19 16:05:35'),
(166, 'heel_color', 'BLUE ( MALI PAPER )', '2021-12-19 16:05:59'),
(167, 'heel_color', 'PINK ( MODELA)', '2021-12-19 16:06:09'),
(171, 'heel_type', '6504', '2021-12-19 16:13:55'),
(172, 'heel_type', '707', '2021-12-19 16:13:58'),
(173, 'heel_type', 'TRANSPARENT ( BIG )', '2021-12-19 16:19:43'),
(174, 'heel_type', 'TRANSPARENT ( SMALL )', '2021-12-19 16:20:06'),
(175, 'heel_type', 'TRANSPARENT ( SCREW )', '2021-12-19 16:20:25'),
(176, 'banwar_type', 'NAKI PATI ( CUT )', '2021-12-22 12:26:32'),
(178, 'banwar_type', 'FULL ( CUT )', '2021-12-22 12:27:14'),
(179, 'sole_type', 'FLAT BANTO', '2021-12-22 12:44:34'),
(180, 'sole_type', 'MIDDLE HEEL  ( BANTO )', '2021-12-22 12:44:58'),
(181, 'sole_type', 'HIGH HEEL ( BANTO )', '2021-12-22 12:45:12'),
(182, 'prod_color', 'MEHROON', '2021-12-22 13:10:41'),
(183, 'heel_color', 'MEHROON ( VELVET )', '2021-12-22 13:11:14'),
(184, 'heel_color', 'MEHROON ( RAGZINE )', '2021-12-22 13:11:33'),
(185, 'heel_color', 'FOAN  ( JUTE )', '2021-12-22 13:18:34'),
(186, 'heel_color', 'BLUE ( JUTE )', '2021-12-22 13:18:45'),
(187, 'prod_color', 'SKIN ( JUTE)', '2021-12-22 13:22:25'),
(188, 'prod_color', 'BLUE ( JUTE )', '2021-12-22 13:22:39'),
(189, 'heel_color', 'LINE JUTE ( BLACK )', '2021-12-22 14:18:06'),
(190, 'heel_color', 'LINE JUTE ( BROWN )', '2021-12-22 14:18:21'),
(191, 'prod_color', 'BROWN', '2021-12-22 14:20:26');

-- --------------------------------------------------------

--
-- Table structure for table `chqdata`
--

CREATE TABLE `chqdata` (
  `sno` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `consignmentnum` bigint(20) NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sub_status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status_reason` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chqname`
--

CREATE TABLE `chqname` (
  `chqName_id` int(11) NOT NULL,
  `chqName_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citylist`
--

CREATE TABLE `citylist` (
  `sno` int(11) NOT NULL,
  `city_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city_short` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `citylist`
--

INSERT INTO `citylist` (`sno`, `city_name`, `city_short`) VALUES
(8, 'KARACHI', 'KHI'),
(9, 'LAHORE', 'LHE'),
(10, 'ISLAMABAD', 'ISB'),
(11, 'RAWALPINDI', 'RWP'),
(12, 'SAILKOT', 'SKT');

-- --------------------------------------------------------

--
-- Table structure for table `deleted_orders`
--

CREATE TABLE `deleted_orders` (
  `ord_id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `color` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `design_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reason` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `myguests`
--

CREATE TABLE `myguests` (
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ord_id` int(11) NOT NULL,
  `Date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ord_id` int(11) NOT NULL,
  `consignmentnum` bigint(20) NOT NULL,
  `cust_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `design_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `delete_ord` tinyint(1) DEFAULT NULL,
  `reason` longtext COLLATE utf8_unicode_ci,
  `category` text COLLATE utf8_unicode_ci NOT NULL,
  `replacementRcvd` tinyint(1) DEFAULT NULL,
  `returnRcvd` tinyint(1) DEFAULT NULL,
  `paymentrcvd` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `ord_id` int(11) NOT NULL,
  `status_date` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `type` text COLLATE utf8_unicode_ci,
  `color` text COLLATE utf8_unicode_ci,
  `pic_url` longtext COLLATE utf8_unicode_ci,
  `sole_type` text COLLATE utf8_unicode_ci,
  `b_color` text COLLATE utf8_unicode_ci,
  `b_type` text COLLATE utf8_unicode_ci,
  `h_type` text COLLATE utf8_unicode_ci,
  `h_color` text COLLATE utf8_unicode_ci,
  `p_heel` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `name`, `type`, `color`, `pic_url`, `sole_type`, `b_color`, `b_type`, `h_type`, `h_color`, `p_heel`) VALUES
(93, 'ONE STRIPE', 'HEEL', '[\"BLACK\",\"WHITE\",\"SKIN\",\"PINK\"]', '[\"https://meatncuts.com.pk/products/815360-black.png\",\"https://meatncuts.com.pk/products/414372-white.png\",\"https://meatncuts.com.pk/products/31629-skin.png\",\"https://meatncuts.com.pk/products/654800-pink.png\"]', '[\"PATLA\",\"PATLA\",\"PATLA\",\"PATLA\"]', '[\"BLACK ( VELVET )\",\"WHITE ( RAGZINE )\",\"SKIN ( VELVET )\",\"PINK ( VELVET )\"]', '[\"NAKI PATI ( PATLA )\",\"NAKI PATI ( PATLA )\",\"NAKI PATI ( PATLA )\",\"NAKI PATI ( PATLA )\"]', '[\"6504\",\"6504\",\"6504\",\"6504\"]', '[\"BLACK ( VELVET )\",\"WHITE ( RAGZINE )\",\"SKIN ( VELVET )\",\"PINK ( VELVET )\"]', '[\"NIL\",\"NIL\",\"NIL\",\"NIL\"]'),
(95, 'OVAL ', 'HEEL', '[\"BLACK\",\"PINK\"]', '[\"https://meatncuts.com.pk/products/19536-black.png\",\"https://meatncuts.com.pk/products/377311-pink.png\"]', '[\"PATLA\",\"PATLA\"]', '[\"BLACK ( VELVET )\",\"PINK ( VELVET )\"]', '[\"NAKI PATI ( PATLA )\",\"NAKI PATI ( PATLA )\"]', '[\"6504\",\"6504\"]', '[\"BLACK ( VELVET )\",\"PINK ( VELVET )\"]', '[\"NIL\",\"NIL\"]'),
(96, 'DOUBLE ROPE ( HEEL )', 'HEEL', '[\"WHITE\",\"BLACK\",\"BLUE\"]', '[\"https://meatncuts.com.pk/products/586304-white.png\",\"https://meatncuts.com.pk/products/567311-black.png\",\"https://meatncuts.com.pk/products/35106-blue.png\"]', '[\"CUT \",\"CUT \",\"CUT \"]', '[\"WHITE ( RAGZINE )\",\"BLACK ( RAGZINE )\",\"BLUE ( RAGZINE )\"]', '[\"NAKI PATI ( CUT )\",\"NAKI PATI ( CUT )\",\"NAKI PATI ( CUT )\"]', '[\"TRANSPARENT ( SMALL )\",\"TRANSPARENT ( SMALL )\",\"TRANSPARENT ( SMALL )\"]', '[\"NIL\",\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\",\"NIL\"]'),
(97, 'SP', 'FLAT', '[\"BLACK\",\"WHITE\"]', '[\"https://meatncuts.com.pk/products/307213-black.png\",\"https://meatncuts.com.pk/products/68792-snapchat-1043343776.jpg\"]', '[\"CHORA\",\"CHORA\"]', '[\"BLACK ( RAGZINE )\",\"WHITE ( RAGZINE )\"]', '[\"FULL ( CHORA )\",\"FULL ( CHORA )\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]'),
(98, 'TP', 'FLAT', '[\"SKIN\",\"BLACK\"]', '[\"https://meatncuts.com.pk/products/991080-skin.png\",\"https://meatncuts.com.pk/products/29746-black.png\"]', '[\"CHORA\",\"CHORA\"]', '[\"SKIN ( PAK ) ( RAGZINE )\",\"BLACK ( RAGZINE )\"]', '[\"FULL ( CHORA )\",\"FULL ( CHORA )\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]'),
(99, 'KP THIN', 'FLAT', '[\"GOLDEN\",\"BLACK\"]', '[\"https://meatncuts.com.pk/products/685625-golden.png\",\"https://meatncuts.com.pk/products/834662-black.png\"]', '[\"CHORA\",\"CHORA\"]', '[\"SKIN ( PAK ) ( RAGZINE )\",\"SKIN ( PAK ) ( RAGZINE )\"]', '[\"FULL ( CHORA )\",\"FULL ( CHORA )\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]'),
(100, 'FOLD PUMPY', 'FLAT PUMPY', '[\"SKIN\",\"BLUE\"]', '[\"https://meatncuts.com.pk/products/214947-screenshot_20210104-221504_2.png\",\"https://meatncuts.com.pk/products/206844-screenshot_20201026-121835.png\"]', '[\"FLAT BANTO\",\"FLAT BANTO\"]', '[\"SKIN ( VELVET )\",\"BLUE ( VELVET )\"]', '[\"GOAT \",\"GOAT \"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]', '[\"NIL\",\"NIL\"]'),
(101, 'TALL HEEL PUMPY', 'HIGH HEEL PUMPY', '[\"MEHROON\",\"BLACK\"]', '[\"https://meatncuts.com.pk/products/499807-img_20211130_131444_385.jpg\",\"https://meatncuts.com.pk/products/648519-img_20211130_205743_967.jpg\"]', '[\"HIGH HEEL ( BANTO )\",\"HIGH HEEL ( BANTO )\"]', '[\"SKIN QG ( RAGZINE )\",\"SKIN QG ( RAGZINE )\"]', '[\"GOAT \",\"GOAT \"]', '[\"707\",\"707\"]', '[\"MEHROON ( VELVET )\",\"BLACK ( VELVET )\"]', '[\"NIL\",\"NIL\"]'),
(102, 'VX JEANS ( PUMPY )', 'HIGH HEEL PUMPY', '[\"SKIN ( JUTE)\",\"BLUE ( JUTE )\"]', '[\"https://meatncuts.com.pk/products/562185-img_20211104_125128_425.jpg\",\"https://meatncuts.com.pk/products/749923-img_20211103_114558_358.jpg\"]', '[\"HIGH HEEL ( BANTO )\",\"HIGH HEEL ( BANTO )\"]', '[\"SKIN QG ( RAGZINE )\",\"SKIN QG ( RAGZINE )\"]', '[\"GOAT \",\"GOAT \"]', '[\"707\",\"707\"]', '[\"FOAN  ( JUTE )\",\"NIL\"]', '[\"NIL\",\"NIL\"]'),
(103, 'LINE HEEL ( PUMPY )', 'MIDDLE HEEL PUMPY', '[\"BLACK\",\"BROWN\"]', '[\"https://meatncuts.com.pk/products/36590-img_20211112_134806_420.jpg\",\"https://meatncuts.com.pk/products/20043-img_20211112_183447_300.jpg\"]', '[\"MIDDLE HEEL  ( BANTO )\",\"MIDDLE HEEL  ( BANTO )\"]', '[\"SKIN QG ( RAGZINE )\",\"SKIN QG ( RAGZINE )\"]', '[\"GOAT \",\"GOAT \"]', '[\"6504\",\"6504\"]', '[\"LINE JUTE ( BLACK )\",\"LINE JUTE ( BROWN )\"]', '[\"NIL\",\"NIL\"]'),
(104, 'TPH', 'MIDDLE HEEL PUMPY', '[\"BLACK\",\"PINK\"]', '[\"https://meatncuts.com.pk/products/730039-img_20211019_213649_841.jpg\",\"https://meatncuts.com.pk/products/409482-img_20211021_181155_959.jpg\"]', '[\"MIDDLE HEEL  ( BANTO )\",\"MIDDLE HEEL  ( BANTO )\"]', '[\"BLACK ( VELVET )\",\"PINK ( VELVET )\"]', '[\"GOAT \",\"GOAT \"]', '[\"707\",\"707\"]', '[\"BLACK ( VELVET )\",\"PINK ( VELVET )\"]', '[\"NIL\",\"NIL\"]');

-- --------------------------------------------------------

--
-- Table structure for table `shipper_detail`
--

CREATE TABLE `shipper_detail` (
  `sno` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city_short` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shipper_detail`
--

INSERT INTO `shipper_detail` (`sno`, `name`, `email`, `address`, `city`, `city_short`, `phone`) VALUES
(1, 'Fahad', 'ahmedtahir@gmail.com', 'asdasdas', 'KARACHI', 'KHI', 3212575665);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_prod_dtl`
--
ALTER TABLE `add_prod_dtl`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `chqdata`
--
ALTER TABLE `chqdata`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `chqname`
--
ALTER TABLE `chqname`
  ADD PRIMARY KEY (`chqName_id`);

--
-- Indexes for table `citylist`
--
ALTER TABLE `citylist`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `deleted_orders`
--
ALTER TABLE `deleted_orders`
  ADD PRIMARY KEY (`ord_id`);

--
-- Indexes for table `myguests`
--
ALTER TABLE `myguests`
  ADD PRIMARY KEY (`ord_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ord_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`ord_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `shipper_detail`
--
ALTER TABLE `shipper_detail`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_prod_dtl`
--
ALTER TABLE `add_prod_dtl`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `chqdata`
--
ALTER TABLE `chqdata`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chqname`
--
ALTER TABLE `chqname`
  MODIFY `chqName_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citylist`
--
ALTER TABLE `citylist`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `myguests`
--
ALTER TABLE `myguests`
  MODIFY `ord_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ord_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `shipper_detail`
--
ALTER TABLE `shipper_detail`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
