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
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `user_id`, `username`, `description`, `location`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'USR_001', 'rahul_sharma', 'PM-KISAN installment for June 2025 not credited to my bank account despite eligibility confirmation SMS received', 'Green Park, New Delhi', 'kisan_complaint.jpg', 'Pending', '2025-07-09 06:59:48', '2025-07-09 06:59:48'),
(2, 'USR_002', 'priya_patel', 'Ayushman Bharat card rejected at Mumbai General Hospital citing invalid registration, though I have approval message', 'MG Road, Mumbai', 'ayushman_rejection.pdf', 'In Progress', '2025-07-09 06:59:48', '2025-07-09 06:59:48'),
(3, 'USR_003', 'amit_kumar', 'PM-SVANidhi loan application pending for over 8 weeks, no update from local Udyam Mitra office', 'Sector 15, Noida', NULL, 'Pending', '2025-07-09 06:59:48', '2025-07-09 06:59:48'),
(4, 'USR_004', 'neha_verma', 'PM-SHRI school admission portal not accepting documents upload for past 3 days, technical error persists', 'Richmond Road, Bangalore', 'portal_error.png', 'Escalated', '2025-07-09 06:59:48', '2025-07-09 06:59:48'),
(5, 'USR_002', 'priya_patel', 'Second complaint: CSC center charging ₹200 extra for PM-JAY registration which should be free as per guidelines', 'Andheri East, Mumbai', 'csc_receipt.jpg', 'Pending', '2025-07-09 06:59:48', '2025-07-09 06:59:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
