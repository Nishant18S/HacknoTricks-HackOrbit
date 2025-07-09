-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2025 at 10:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `janai-mitra`
--

-- --------------------------------------------------------

--
-- Table structure for table `schemes`
--

CREATE TABLE `schemes` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `scheme_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `eligibility_desc` text DEFAULT NULL,
  `benefits_desc` text DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schemes`
--

INSERT INTO `schemes` (`id`, `user_id`, `scheme_name`, `description`, `address`, `dept_name`, `status`, `eligibility_desc`, `benefits_desc`, `amount`, `created_at`, `updated_at`) VALUES
(1, 'USR_001', 'PM-SHRI Schools', 'Upgradation of schools to model schools with modern infrastructure', 'Ministry of Education, New Delhi', 'Education', 'Active', 'Government and aided schools meeting criteria', 'Modern infrastructure, smart classrooms, vocational education', 5000000.00, '2025-07-09 06:42:20', '2025-07-09 06:42:20'),
(2, 'USR_002', 'Ayushman Bharat', 'National health protection scheme for poor families', 'Ministry of Health, New Delhi', 'Health', 'Active', 'Families in SEC categories as per SECC data', 'Health cover of ₹5 lakh per family per year', 500000.00, '2025-07-09 06:42:20', '2025-07-09 06:42:20'),
(3, 'USR_003', 'PM-KISAN', 'Income support scheme for farmers', 'Ministry of Agriculture, New Delhi', 'Agriculture', 'Active', 'Landholding farmer families', '₹6,000 per year in 3 equal installments', 6000.00, '2025-07-09 06:42:20', '2025-07-09 06:42:20'),
(4, 'USR_004', 'PM-SVANidhi', 'Micro credit scheme for street vendors', 'Ministry of Finance, New Delhi', 'Finance', 'Active', 'Street vendors operating before March 24, 2020', 'Working capital loan up to ₹10,000', 10000.00, '2025-07-09 06:42:20', '2025-07-09 06:42:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schemes`
--
ALTER TABLE `schemes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schemes`
--
ALTER TABLE `schemes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schemes`
--
ALTER TABLE `schemes`
  ADD CONSTRAINT `schemes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
