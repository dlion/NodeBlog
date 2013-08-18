-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Ago 18, 2013 alle 15:01
-- Versione del server: 5.5.31-MariaDB-log
-- Versione PHP: 5.4.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `NodeBlog`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `descr` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_categoria` tinyint(11) NOT NULL,
  `testo` text NOT NULL,
  `autore` tinyint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE IF NOT EXISTS `utenti` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `last_login` bigint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nick`, `email`, `password`, `hash`, `last_login`) VALUES
(1, 'DLion', 'domenicoleoneluciani@gmail.com', '44035a34624b866086d5c67de7e5a8eec104439f', '4ba84e9293cb54e01c761c41d4ea8fa5b0b4dcbd', 20130816030307);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
