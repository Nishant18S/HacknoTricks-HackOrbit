-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2025 at 05:59 PM
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
  `scheme_id` varchar(255) NOT NULL,
  `scheme_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `eligibility_desc` text DEFAULT NULL,
  `benefits_desc` text DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schemes`
--

INSERT INTO `schemes` (`id`, `scheme_id`, `scheme_name`, `description`, `eligibility_desc`, `benefits_desc`, `dept_name`, `amount`, `created_at`, `updated_at`) VALUES
(1, 'S001', 'Pradhan Mantri Kisan Samman Nidhi', 'Income support scheme for farmers.', 'Small and marginal farmers.', '₹6000 per year support.', 'agriculture', 6000.00, '2025-07-09 15:13:47', '2025-07-09 15:13:47'),
(2, 'S002', 'Ayushman Bharat', 'Health insurance scheme.', 'Low-income families.', 'Up to ₹5 lakh medical coverage.', 'health', 500000.00, '2025-07-09 15:13:47', '2025-07-09 15:13:47'),
(3, 'S003', 'National Scholarship', 'Scholarship for meritorious students.', 'Students with annual family income below ₹8 lakh.', 'Tuition fee waiver and stipend.', 'education', 50000.00, '2025-07-09 15:13:47', '2025-07-09 15:13:47'),
(4, 'S004', 'PM Jan Dhan Yojana', 'Financial inclusion scheme.', 'All Indian citizens.', 'Zero balance savings account.', 'finance', 0.00, '2025-07-09 15:13:47', '2025-07-09 15:13:47'),
(5, 'S005', 'Stand Up India', 'Loans for SC/ST and women entrepreneurs.', 'SC/ST or women above 18 years.', 'Loans from ₹10 lakh to ₹1 crore.', 'finance', 1000000.00, '2025-07-09 15:13:47', '2025-07-09 15:13:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schemes`
--
ALTER TABLE `schemes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `scheme_id` (`scheme_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schemes`
--
ALTER TABLE `schemes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
