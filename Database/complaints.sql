-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2025 at 05:58 PM
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
  `complaint_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `grievance_name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `address` text DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `complaint_id`, `user_id`, `grievance_name`, `description`, `address`, `dept_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'C001', NULL, 'Scholarship Delay', 'Scholarship not credited even after approval.', 'Delhi, India', 'education', 'Done', '2025-07-09 15:13:26', '2025-07-09 15:57:58'),
(2, 'C002', 'U002', 'Pension Issue', 'Pension payment not received for last 2 months.', 'Mumbai, India', 'finance', 'Pending', '2025-07-09 15:13:26', '2025-07-09 15:13:26'),
(3, 'C003', 'U003', 'Fertilizer Shortage', 'Fertilizer not available in local stores.', 'Lucknow, India', 'agriculture', 'Resolved', '2025-07-09 15:13:26', '2025-07-09 15:13:26'),
(4, 'C004', 'U004', 'Hospital Staff Issue', 'Negligence by staff at government hospital.', 'Chennai, India', 'health', 'In Progress', '2025-07-09 15:13:26', '2025-07-09 15:13:26'),
(5, 'C005', 'U005', 'Loan Subsidy Delay', 'Subsidy on agriculture loan not processed.', 'Bengaluru, India', 'finance', 'Pending', '2025-07-09 15:13:26', '2025-07-09 15:13:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `complaint_id` (`complaint_id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
