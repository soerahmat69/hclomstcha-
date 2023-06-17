-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Jun 2023 pada 07.47
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hclomstchadb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `acessories_anime`
--

CREATE TABLE `acessories_anime` (
  `acessories_id` int(11) NOT NULL,
  `chara_id` int(4) NOT NULL,
  `acessories_name` varchar(11) NOT NULL,
  `acessories_size` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `acessories_anime`
--

INSERT INTO `acessories_anime` (`acessories_id`, `chara_id`, `acessories_name`, `acessories_size`) VALUES
(12, 23, 'wig', NULL),
(13, 23, 'shoes', '33'),
(14, 23, 'other', NULL),
(15, 24, 'wig', NULL),
(16, 24, 'other', NULL),
(17, 24, 'bag', NULL),
(18, 24, 'shoes', '33'),
(19, 25, 'Shotgun', NULL),
(20, 25, 'acc other', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `blacklist_user`
--

CREATE TABLE `blacklist_user` (
  `user_id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `last_blacklist` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `character_anime`
--

CREATE TABLE `character_anime` (
  `chara_id` int(11) NOT NULL,
  `chara_img` varchar(1000) NOT NULL,
  `chara_name` varchar(111) NOT NULL,
  `chara_size` char(4) NOT NULL,
  `chara_weight` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `character_anime`
--

INSERT INTO `character_anime` (`chara_id`, `chara_img`, `chara_name`, `chara_size`, `chara_weight`, `price`) VALUES
(23, 'chara_img-1675959881053.jpg', 'krul tapes', 'L', 1200, 130000),
(24, 'chara_img-1675960292522.jpeg', 'klee', 'L', 1000, 100000),
(25, 'chara_img-1675994497153.png', 'raiden shog', 'L', 1001, 120000),
(26, 'chara_img-1676210719967.png', 'hinata', 'M', 900, 100000),
(27, 'chara_img-1676210809316.png', 'hinata', 'M', 900, 100000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `character_order`
--

CREATE TABLE `character_order` (
  `order_id` int(11) NOT NULL,
  `chara_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tgl_rental` varchar(50) DEFAULT NULL,
  `biaya_ongkir` int(11) DEFAULT NULL,
  `bukti_payment` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `character_order`
--

INSERT INTO `character_order` (`order_id`, `chara_id`, `user_id`, `tgl_rental`, `biaya_ongkir`, `bukti_payment`) VALUES
(55, 23, 46, '2022-12-26', 1212, 'sasas'),
(56, 23, 46, '2023-02-09', 78000, 'bukti_payment-1676259277632.jpg'),
(57, 23, 46, NULL, NULL, NULL);

--
-- Trigger `character_order`
--
DELIMITER $$
CREATE TRIGGER `rejected` AFTER DELETE ON `character_order` FOR EACH ROW INSERT INTO order_rejected VALUES(old.order_id,old.user_id,old.chara_id,current_timestamp())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `warn_chat` AFTER DELETE ON `character_order` FOR EACH ROW INSERT INTO chat VALUES(null,old.user_id,"pesanan kamu di tolak",01,CURRENT_TIME(),old.order_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `character_order_acc`
--

CREATE TABLE `character_order_acc` (
  `order_id` int(4) NOT NULL,
  `no_resi` varchar(50) NOT NULL,
  `status_order` varchar(50) NOT NULL,
  `pengembalian` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `character_order_acc`
--

INSERT INTO `character_order_acc` (`order_id`, `no_resi`, `status_order`, `pengembalian`) VALUES
(55, 'jne_xxxx', 'telah di kembalikan', '2023-02-10'),
(56, 'JNEXXX', 'sedang dikirim', '2023-02-11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chat` varchar(300) NOT NULL,
  `tag_user_id` int(11) DEFAULT NULL,
  `last_chat` time NOT NULL,
  `warn_chat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `chat`
--

INSERT INTO `chat` (`id_chat`, `user_id`, `chat`, `tag_user_id`, `last_chat`, `warn_chat`) VALUES
(62, 7, 'apa ya', 1, '22:40:21', NULL),
(63, 46, 'ka', NULL, '16:49:50', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_diri`
--

CREATE TABLE `data_diri` (
  `user_id` int(11) NOT NULL,
  `akun_sos` varchar(100) DEFAULT NULL,
  `no_wa` int(12) DEFAULT NULL,
  `no_sdr` int(12) DEFAULT NULL,
  `alamat` varchar(600) NOT NULL,
  `img_ktp` varchar(200) DEFAULT NULL,
  `img_personal` varchar(300) DEFAULT NULL,
  `img_kk` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `data_diri`
--

INSERT INTO `data_diri` (`user_id`, `akun_sos`, `no_wa`, `no_sdr`, `alamat`, `img_ktp`, `img_personal`, `img_kk`) VALUES
(46, 'oiSAXU', 3434, 3434, 'EDEDE', 'RTRGFR343', 'EDFDF', 'RE43R');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_rejected`
--

CREATE TABLE `order_rejected` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chara_id` int(11) NOT NULL,
  `last_reject` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `order_rejected`
--

INSERT INTO `order_rejected` (`order_id`, `user_id`, `chara_id`, `last_reject`) VALUES
(44, 6, 15, '2023-02-07 17:48:46'),
(46, 7, 15, '2023-02-09 03:04:31'),
(47, 7, 16, '2023-02-09 03:04:27'),
(48, 7, 20, '2023-02-08 12:33:31'),
(50, 6, 22, '2023-02-10 05:14:15'),
(53, 46, 22, '2023-02-12 12:22:02');

--
-- Trigger `order_rejected`
--
DELIMITER $$
CREATE TRIGGER `clearing chat` AFTER DELETE ON `order_rejected` FOR EACH ROW DELETE FROM chat WHERE warn_chat = old.order_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengembalian_barang`
--

CREATE TABLE `pengembalian_barang` (
  `order_id` int(11) NOT NULL,
  `pengiriman` varchar(111) NOT NULL,
  `no_resi` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pengembalian_barang`
--

INSERT INTO `pengembalian_barang` (`order_id`, `pengiriman`, `no_resi`) VALUES
(55, 'tiki', 'tikutuku384');

--
-- Trigger `pengembalian_barang`
--
DELIMITER $$
CREATE TRIGGER `pengembalian` AFTER INSERT ON `pengembalian_barang` FOR EACH ROW UPDATE character_order_acc
SET
  status_order = "telah di kembalikan"
WHERE
  order_id = NEW.order_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `role` char(5) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `role`, `username`, `password`, `email`) VALUES
(1, 'admin', 'rahmat', 'rahmat', 'rahmat'),
(7, 'user', 'tuan', 'atheis', 'tuan@yahoo'),
(9, 'user', 'gayus', 'tambunan', 'gayustod@gmail.com'),
(40, 'user', 'surahmat', 'surahmat', 'surahmat@gmail.com'),
(44, 'user', 'tuhan', 'ketuhanan', 'tuhan@yahoo'),
(45, 'user', 'giselanyoknyok', 'nyoknyok', 'giselnyok@gmail.com'),
(46, 'user', 'mustika', 'mumus', 'musolod@gmail.com'),
(47, 'user', 'tuhan', 'ketuhanan', 'tuhan@g');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `acessories_anime`
--
ALTER TABLE `acessories_anime`
  ADD PRIMARY KEY (`acessories_id`),
  ADD KEY `acessories_anime_ibfk_1` (`chara_id`);

--
-- Indeks untuk tabel `blacklist_user`
--
ALTER TABLE `blacklist_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeks untuk tabel `character_anime`
--
ALTER TABLE `character_anime`
  ADD PRIMARY KEY (`chara_id`);

--
-- Indeks untuk tabel `character_order`
--
ALTER TABLE `character_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `character_order_ibfk_2` (`chara_id`),
  ADD KEY `character_order_ibfk_1` (`user_id`);

--
-- Indeks untuk tabel `character_order_acc`
--
ALTER TABLE `character_order_acc`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `tag_user_id` (`tag_user_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `warn_chat` (`warn_chat`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Indeks untuk tabel `data_diri`
--
ALTER TABLE `data_diri`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeks untuk tabel `order_rejected`
--
ALTER TABLE `order_rejected`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `pengembalian_barang`
--
ALTER TABLE `pengembalian_barang`
  ADD PRIMARY KEY (`order_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `acessories_anime`
--
ALTER TABLE `acessories_anime`
  MODIFY `acessories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `character_anime`
--
ALTER TABLE `character_anime`
  MODIFY `chara_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `character_order`
--
ALTER TABLE `character_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT untuk tabel `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `acessories_anime`
--
ALTER TABLE `acessories_anime`
  ADD CONSTRAINT `acessories_anime_ibfk_1` FOREIGN KEY (`chara_id`) REFERENCES `character_anime` (`chara_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `blacklist_user`
--
ALTER TABLE `blacklist_user`
  ADD CONSTRAINT `blacklist_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `character_order`
--
ALTER TABLE `character_order`
  ADD CONSTRAINT `character_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `character_order_ibfk_2` FOREIGN KEY (`chara_id`) REFERENCES `character_anime` (`chara_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `character_order_acc`
--
ALTER TABLE `character_order_acc`
  ADD CONSTRAINT `character_order_acc_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `character_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`tag_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `data_diri`
--
ALTER TABLE `data_diri`
  ADD CONSTRAINT `data_diri_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengembalian_barang`
--
ALTER TABLE `pengembalian_barang`
  ADD CONSTRAINT `pengembalian_barang_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `character_order_acc` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
