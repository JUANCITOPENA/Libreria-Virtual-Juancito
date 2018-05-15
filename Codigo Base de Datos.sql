-- phpMyAdmin SQL Dump
-- version 3.2.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 08-03-2012 a las 02:54:09
-- Versión del servidor: 5.1.37
-- Versión de PHP: 5.2.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de datos: `demo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE IF NOT EXISTS `libro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `precio` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1020 ;

--
-- Volcar la base de datos para la tabla `libro`
--

INSERT INTO `libro` (`id`, `titulo`, `autor`, `precio`) VALUES
(900, 'EL QUE NO LE SE MUERE', 'JUANCITO', 200),
(600, 'EL CORONEL CHUECHO', 'GABRIEL', 3500),
(700, 'EL ALQUIMISTA II', 'PAULO', 1500),
(800, 'EL ZAHIR', 'PAULO COELO', 5000);
