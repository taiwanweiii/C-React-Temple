-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025 年 11 月 22 日 03:19
-- 伺服器版本： 11.2.2-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `line_order`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(18, 20, 1, 41, 60.00, '2025-11-18 15:49:54', '2025-11-18 15:49:54', '2025-11-21 11:24:33'),
(19, 20, 2, 25, 200.00, '2025-11-18 16:00:41', '2025-11-18 16:00:41', '2025-11-21 11:21:04'),
(20, 20, 1, 1, 60.00, '2025-11-21 11:24:22', '2025-11-21 11:24:22', '2025-11-21 11:25:12'),
(21, 20, 2, 1, 200.00, '2025-11-21 11:25:15', '2025-11-21 11:25:15', '2025-11-21 11:25:18'),
(22, 20, 1, 1, 60.00, '2025-11-21 11:28:21', '2025-11-21 11:28:21', '2025-11-21 11:30:57'),
(23, 20, 1, 1, 60.00, '2025-11-21 11:38:13', '2025-11-21 11:38:13', '2025-11-21 11:38:15'),
(24, 20, 1, 1, 60.00, '2025-11-21 11:39:24', '2025-11-21 11:39:24', '2025-11-21 11:39:26'),
(25, 20, 1, 1, 60.00, '2025-11-21 11:39:30', '2025-11-21 11:39:30', '2025-11-21 11:45:34'),
(26, 20, 1, 1, 60.00, '2025-11-21 11:45:42', '2025-11-21 11:45:42', '2025-11-21 11:45:44'),
(27, 20, 1, 1, 60.00, '2025-11-21 11:46:24', '2025-11-21 11:46:24', '2025-11-21 11:49:42'),
(28, 20, 1, 1, 60.00, '2025-11-21 11:50:29', '2025-11-21 11:50:29', '2025-11-21 11:50:42'),
(29, 20, 1, 4, 60.00, '2025-11-21 11:50:47', '2025-11-21 11:50:47', '2025-11-21 12:47:33'),
(30, 20, 1, 5, 60.00, '2025-11-22 01:32:34', '2025-11-22 01:32:34', NULL),
(31, 21, 1, 1, 60.00, '2025-11-22 01:39:29', '2025-11-22 01:39:29', NULL),
(32, 21, 2, 1, 200.00, '2025-11-22 01:40:05', '2025-11-22 01:40:05', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL COMMENT '公司名稱',
  `tax_number` varchar(10) NOT NULL COMMENT '統編',
  `address` varchar(50) NOT NULL DEFAULT '' COMMENT '地址',
  `tel` varchar(10) NOT NULL DEFAULT '' COMMENT '市話',
  `phone` varchar(10) NOT NULL DEFAULT '' COMMENT '手機',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '信箱',
  `website` varchar(100) NOT NULL DEFAULT '' COMMENT '網址',
  `status` varchar(10) NOT NULL COMMENT 'Active活躍\r\nInactive 不活躍',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `company`
--

INSERT INTO `company` (`id`, `name`, `tax_number`, `address`, `tel`, `phone`, `email`, `website`, `status`, `created_at`, `update_at`, `delete_at`) VALUES
(1, 'Z人學', '', '台南市', '', '', 'rvkeyghtrp@gmail.com', 'https://zrenstudy.com/', 'active', '2025-11-12 03:17:55', '2025-11-12 03:17:55', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `line_user_data`
--

CREATE TABLE `line_user_data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shopping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shopping`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime GENERATED ALWAYS AS (`created_at` + interval 30 day) STORED,
  `status` int(2) NOT NULL DEFAULT 0 COMMENT '0:尚未完成付款|1:完成付款｜2.過期\r\n',
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `shopping`, `created_at`, `status`, `paid_at`) VALUES
(34, '867g1mqmpdal263bcvie43be26', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 11:51:52', 1, NULL),
(38, '867g1mqmpdal263bcvie43be26', '[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]', '2025-06-14 13:53:24', 1, '2025-06-14 21:55:02'),
(39, '867g1mqmpdal263bcvie43be26', '[{\"product_id\":2,\"number\":1},{\"product_id\":1,\"number\":1}]', '2025-06-14 16:08:17', 1, '2025-06-15 00:08:50'),
(40, '867g1mqmpdal263bcvie43be26', '[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]', '2025-06-14 16:23:21', 1, '2025-06-15 00:29:39'),
(41, 'sr06kvhk1qh3d6t71t2itslnmr', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 16:29:45', 1, '2025-06-15 00:30:12'),
(42, '867g1mqmpdal263bcvie43be26', '[{\"product_id\":2,\"number\":1}]', '2025-06-14 16:31:00', 1, '2025-06-15 00:31:23'),
(43, 'vvgc9dkdov6pngtu37i0urcrmn', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 16:33:50', 1, '2025-06-15 00:34:12'),
(44, '5h5q3u13kqhbs96ov7fsm5u9op', '[{\"product_id\":1,\"number\":3},{\"product_id\":2,\"number\":2}]', '2025-06-14 16:36:01', 1, '2025-06-15 00:40:36'),
(45, 'n36t5bh8etcikjoe1dhg25uc9n', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 16:41:42', 1, '2025-06-15 00:42:12'),
(46, 'sr06kvhk1qh3d6t71t2itslnmr', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 16:42:04', 0, NULL),
(47, '8', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 17:03:50', 1, '2025-06-15 02:03:01'),
(48, 'dh8cp7m6ss8gmanbrkv9ln4qlo', '[{\"product_id\":1,\"number\":4}]', '2025-06-14 17:14:50', 0, NULL),
(49, 'pf730pqnn49udfj68hdi8bjici', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 17:16:09', 0, NULL),
(50, 'njtg8qn2f319r7d761b9cjmjkq', '[{\"product_id\":1,\"number\":2}]', '2025-06-14 18:07:16', 0, NULL),
(53, '8', '[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":6}]', '2025-06-14 18:41:26', 1, '2025-06-15 02:41:49'),
(54, '0qs7gpa4dn7griqj1fhkcngj51', '[{\"product_id\":2,\"number\":1}]', '2025-06-14 18:44:38', 0, NULL),
(55, 'rstcp2499q1e14oanvopvfdd6p', '[{\"product_id\":2,\"number\":1}]', '2025-06-14 18:56:06', 1, '2025-06-15 02:57:19'),
(56, 'b0ra31jfk38d6achu2g9gnq2vh', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 18:57:52', 0, NULL),
(57, 'bla1jouab3sbihlmngrdqjeu45', '[{\"product_id\":1,\"number\":1}]', '2025-06-14 19:07:58', 0, NULL),
(58, '8', '[{\"product_id\":1,\"number\":1},{\"product_id\":2,\"number\":1}]', '2025-06-14 19:10:37', 2, NULL),
(59, 'a2s6hm5rgeccg8gcgb33a2g8np', '[{\"product_id\":1,\"number\":3}]', '2025-07-03 15:51:16', 0, NULL),
(60, '8psn0mt62e7gsjk2nrnsk7971j', '[{\"product_id\":1,\"number\":1}]', '2025-08-04 14:27:41', 0, NULL),
(61, '8', '[]', '2025-08-04 16:22:00', 0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `pay_log`
--

CREATE TABLE `pay_log` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `order_id` int(11) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `shopping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shopping`)),
  `method` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `descript` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `customize` int(1) NOT NULL COMMENT '是否客製化',
  `category` varchar(100) NOT NULL COMMENT 'ASP.Net 已棄用',
  `online` int(1) NOT NULL COMMENT '是否上線\r\n１上限\r\n０不開放\r\n',
  `status` varchar(10) NOT NULL COMMENT '目前狀況\r\n補貨|完售|上架中',
  `company_id` varchar(100) DEFAULT NULL COMMENT '對應表company \r\n欄位：ＩＤ',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`id`, `title`, `descript`, `img`, `price`, `customize`, `category`, `online`, `status`, `company_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '招牌肉絲飯', '嚴選上等雞肉，搭配香Q白飯與秘製醬汁。', 'https://i.imgur.com/OJrUPbr.jpeg', 60, 0, '[\"all\",\"hot\",\"main_food\"]', 1, '', '1', '2025-05-31 16:39:13', '2025-11-19 14:36:49', NULL),
(2, '經典牛肉堡', '特選澳洲牛肉搭配新鮮蔬菜和特製醬料。', 'https://i.imgur.com/OJrUPbr.jpeg', 200, 0, '[\'all\']', 1, 'stock', '1', '2025-06-01 13:52:36', '2025-11-15 05:37:30', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `products_categories`
--

CREATE TABLE `products_categories` (
  `product_id` int(11) NOT NULL COMMENT '連結表格:product \r\n欄位:ID',
  `products_group_id` int(11) NOT NULL COMMENT '連結表格:products_groupId \r\n欄位: category_id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `products_categories`
--

INSERT INTO `products_categories` (`product_id`, `products_group_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, '2025-11-11 17:45:14', '2025-11-11 17:45:14', NULL),
(1, 3, '2025-11-11 17:53:49', '2025-11-11 17:53:49', NULL),
(2, 3, '2025-11-13 14:07:14', '2025-11-13 14:07:14', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `products_group`
--

CREATE TABLE `products_group` (
  `category_id` int(11) NOT NULL,
  `category_name_en` varchar(50) NOT NULL DEFAULT ' ',
  `category_name_zh` varchar(50) NOT NULL DEFAULT ' ',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `products_group`
--

INSERT INTO `products_group` (`category_id`, `category_name_en`, `category_name_zh`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, ' all', '全部 ', '2025-11-11 17:25:51', '2025-11-11 17:26:38', NULL),
(2, ' hot', '🔥熱銷', '2025-11-11 17:38:49', '2025-11-12 04:23:44', NULL),
(3, ' mainFood', '主食', '2025-11-11 17:43:05', '2025-11-12 04:23:48', NULL),
(4, ' drink', '飲品', '2025-11-14 12:31:46', '2025-11-14 12:31:46', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `birthday` timestamp NOT NULL,
  `gender` varchar(1) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'member',
  `pw` varchar(100) NOT NULL,
  `creat_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `phone`, `email`, `birthday`, `gender`, `role`, `pw`, `creat_time`) VALUES
(8, 'admin', '$2y$11$HajsEeJtm2i9cBDAfvyAher36mLaqCpGkxnDhzjgHVoYnbk.npTxW', '0932523116', 'mb190208@gmail.com', '2025-05-12 16:00:00', 'm', 'member', '123456', '2025-05-28 03:25:53'),
(17, '124124', '$2a$11$V5z1UZBcwk1BtJoTvM/5ge/D/Ffzi9qioAJZZ.425bjQ2/Gn3cau.', '0932523116', 'mb190208@office.stust.edu.tw', '2025-09-16 16:00:00', '女', 'member', '1124WEAW@$#a', '2025-09-28 16:40:36'),
(20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '0932523116', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-09-30 12:27:39'),
(21, 'admin', '$2a$11$oKPBogZBRbt9/YspCTD1iem6raZQL/5we00pGag1QCy2cWdW2qqmW', '0932523116', 'rvkeyghtrp@gmail.com', '2025-10-05 16:00:00', '男', 'member', 'Aa2469697.', '2025-10-18 18:08:41'),
(22, 'Wei', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-01-08 16:00:00', '男', 'member', 'Aa2469697.', '2025-11-09 06:57:52');

-- --------------------------------------------------------

--
-- 資料表結構 `user_update_log`
--

CREATE TABLE `user_update_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `birthday` timestamp NOT NULL,
  `gender` varchar(1) NOT NULL,
  `role` varchar(50) NOT NULL,
  `pw` varchar(100) NOT NULL,
  `creat_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `add_user_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_update_log`
--

INSERT INTO `user_update_log` (`id`, `user_id`, `username`, `password`, `phone`, `email`, `birthday`, `gender`, `role`, `pw`, `creat_time`, `add_user_id`) VALUES
(1, 20, '阿偉', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '0932523116', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:37:17', 20),
(2, 20, '阿偉', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '093252311', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:53:23', 20),
(3, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '093252311', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:54:41', 20),
(4, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '0932523116', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:54:53', 20),
(5, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '嗨', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:55:09', 20),
(6, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '嗨', 'b', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:55:27', 20),
(7, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '嗨', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:56:15', 20),
(8, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '093252311', 'a', '2025-09-22 16:00:00', '男', 'member', '123!QAZws', '2025-11-09 06:56:50', 20),
(9, 22, 'test', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-11-08 16:00:00', '男', 'member', 'Aa2469697.', '2025-11-09 06:58:16', 22),
(10, 22, 'test', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-11-08 16:00:00', '女', 'member', 'Aa2469697.', '2025-11-09 07:01:03', 22),
(11, 22, 'testttestttestttestt', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-11-08 16:00:00', '女', 'member', 'Aa2469697.', '2025-11-09 07:01:19', 22),
(12, 22, 'testttestttestttestt', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-01-08 16:00:00', '女', 'member', 'Aa2469697.', '2025-11-09 07:41:17', 22),
(13, 22, 'Wei', '$2a$11$CK/iPvnkTDND8UQOij0.aeXz3ymjhyw/BqL4g2zXQgTRYhUShZlXW', '0932523116', 'a@a', '2025-01-08 16:00:00', '女', 'member', 'Aa2469697.', '2025-11-09 08:13:57', 22),
(14, 20, '張', '$2y$11$c57sN59z7MQ7tUdEEcnD2edI6NNRYiM1lbT481FWR8OozHJ8YrIc6', '093252311', 'a', '2025-09-22 16:00:00', '女', 'member', '123!QAZws', '2025-11-11 16:04:15', 20);

-- --------------------------------------------------------

--
-- 替換檢視表以便查看 `v_products_category`
-- (請參考以下實際畫面)
--
CREATE TABLE `v_products_category` (
`id` int(11)
,`title` varchar(50)
,`descript` varchar(100)
,`img` varchar(100)
,`price` int(10)
,`customize` int(1)
,`category` varchar(100)
,`online` int(1)
,`status` varchar(10)
,`company_id` varchar(100)
,`created_at` timestamp
,`updated_at` timestamp
,`deleted_at` timestamp
,`category_name_en` mediumtext
,`category_name_zh` mediumtext
,`category_id` mediumtext
);

-- --------------------------------------------------------

--
-- 檢視表結構 `v_products_category`
--
DROP TABLE IF EXISTS `v_products_category`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_products_category`  AS SELECT `p`.`id` AS `id`, `p`.`title` AS `title`, `p`.`descript` AS `descript`, `p`.`img` AS `img`, `p`.`price` AS `price`, `p`.`customize` AS `customize`, `p`.`category` AS `category`, `p`.`online` AS `online`, `p`.`status` AS `status`, `p`.`company_id` AS `company_id`, `p`.`created_at` AS `created_at`, `p`.`updated_at` AS `updated_at`, `p`.`deleted_at` AS `deleted_at`, group_concat(distinct `pg`.`category_name_en` separator ',') AS `category_name_en`, group_concat(distinct `pg`.`category_name_zh` separator ',') AS `category_name_zh`, group_concat(distinct `pg`.`category_id` separator ',') AS `category_id` FROM ((`products` `p` left join `products_categories` `pc` on(`p`.`id` = `pc`.`product_id`)) left join `products_group` `pg` on(`pc`.`products_group_id` = `pg`.`category_id`)) GROUP BY `p`.`id` ;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `line_user_data`
--
ALTER TABLE `line_user_data`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `pay_log`
--
ALTER TABLE `pay_log`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`product_id`,`products_group_id`);

--
-- 資料表索引 `products_group`
--
ALTER TABLE `products_group`
  ADD PRIMARY KEY (`category_id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_update_log`
--
ALTER TABLE `user_update_log`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `line_user_data`
--
ALTER TABLE `line_user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `pay_log`
--
ALTER TABLE `pay_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products_group`
--
ALTER TABLE `products_group`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_update_log`
--
ALTER TABLE `user_update_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
