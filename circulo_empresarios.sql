-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 23.229.204.167    Database: alio_circulo_empresarios
-- ------------------------------------------------------
-- Server version	5.6.36-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `fk_tipo_usuario` (`idtipo`),
  CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`idtipo`) REFERENCES `tipousuario` (`idtipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `canjeocodigo`
--

DROP TABLE IF EXISTS `canjeocodigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `canjeocodigo` (
  `emailanfitrion` varchar(150) DEFAULT NULL,
  `emailinvitado` varchar(150) DEFAULT NULL,
  KEY `anfitrion_codigo` (`emailanfitrion`),
  KEY `invitado_codigo` (`emailinvitado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `idgiro` int(11) NOT NULL,
  `nombrecategoria` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`),
  KEY `fk_id_giro` (`idgiro`),
  CONSTRAINT `fk_id_giro` FOREIGN KEY (`idgiro`) REFERENCES `giro` (`idgiro`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categoriaencuesta`
--

DROP TABLE IF EXISTS `categoriaencuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoriaencuesta` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombrecategoria` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categoriaproducto`
--

DROP TABLE IF EXISTS `categoriaproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoriaproducto` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `categoriaproducto` varchar(250) DEFAULT NULL,
  `rutaimagen` text,
  PRIMARY KEY (`idcategoria`)
) ENGINE=MyISAM AUTO_INCREMENT=108 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clientepreferencia`
--

DROP TABLE IF EXISTS `clientepreferencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientepreferencia` (
  `usuarioemail` varchar(150) NOT NULL DEFAULT '',
  `prefid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`usuarioemail`,`prefid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracion` (
  `restriction` enum('') NOT NULL,
  `multiplicadortickets` int(11) DEFAULT NULL,
  `ofertarproductos` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`restriction`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `detallecompra`
--

DROP TABLE IF EXISTS `detallecompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallecompra` (
  `emailempresaventa` varchar(150) DEFAULT NULL,
  `emailusuariocompra` varchar(150) DEFAULT NULL,
  `idproducto` int(11) DEFAULT NULL,
  `codigo` char(4) DEFAULT NULL,
  `idestatus` int(11) DEFAULT NULL,
  `fechacanjeo` date DEFAULT NULL,
  `fechacompra` date DEFAULT NULL,
  KEY `fk_email_venta` (`emailempresaventa`),
  KEY `fk_email_compra` (`emailusuariocompra`),
  KEY `fk_estatus` (`idestatus`),
  CONSTRAINT `fk_email_compra` FOREIGN KEY (`emailusuariocompra`) REFERENCES `empresa` (`email`),
  CONSTRAINT `fk_email_venta` FOREIGN KEY (`emailempresaventa`) REFERENCES `empresa` (`email`),
  CONSTRAINT `fk_estatus` FOREIGN KEY (`idestatus`) REFERENCES `estatuscompra` (`idestatus`),
  CONSTRAINT `id_estatus_compra` FOREIGN KEY (`idestatus`) REFERENCES `estatuscompra` (`idestatus`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `email` varchar(150) NOT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `latitud` decimal(10,6) DEFAULT NULL,
  `longitud` decimal(10,6) DEFAULT NULL,
  `puntosentrega` int(11) DEFAULT NULL,
  `codigo` text,
  `porcentaje` int(11) NOT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  `idgiro` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `fk_categoria` (`idgiro`,`idcategoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`idgiro`, `idcategoria`) REFERENCES `categoria` (`idgiro`, `idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empresaoferta`
--

DROP TABLE IF EXISTS `empresaoferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresaoferta` (
  `email` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuesta` (
  `idencuesta` int(11) NOT NULL AUTO_INCREMENT,
  `nombreencuesta` varchar(30) DEFAULT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  `puntos` int(11) NOT NULL,
  `activa` tinyint(1) NOT NULL,
  PRIMARY KEY (`idencuesta`),
  KEY `fk_idcategoria_encuesta` (`idcategoria`),
  CONSTRAINT `fk_idcategoria_encuesta` FOREIGN KEY (`idcategoria`) REFERENCES `categoriaencuesta` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `encuestaempresa`
--

DROP TABLE IF EXISTS `encuestaempresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuestaempresa` (
  `email` varchar(150) DEFAULT NULL,
  `idencuesta` int(11) DEFAULT NULL,
  UNIQUE KEY `pk_encuestaempresa` (`email`,`idencuesta`),
  KEY `fk_idencuesta` (`idencuesta`),
  CONSTRAINT `fk_idempresa` FOREIGN KEY (`email`) REFERENCES `empresa` (`email`),
  CONSTRAINT `fk_idencuesta` FOREIGN KEY (`idencuesta`) REFERENCES `encuesta` (`idencuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `encuestapreguntas`
--

DROP TABLE IF EXISTS `encuestapreguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuestapreguntas` (
  `idencuesta` int(11) DEFAULT NULL,
  `idpregunta` int(11) DEFAULT NULL,
  UNIQUE KEY `pk_encuesta_preguntas` (`idencuesta`,`idpregunta`),
  KEY `fk_encuestapreguntas_idpregunta` (`idpregunta`),
  CONSTRAINT `fk_encuestapreguntas_idencuesta` FOREIGN KEY (`idencuesta`) REFERENCES `encuesta` (`idencuesta`),
  CONSTRAINT `fk_encuestapreguntas_idpregunta` FOREIGN KEY (`idpregunta`) REFERENCES `pregunta` (`idpregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estatuscompra`
--

DROP TABLE IF EXISTS `estatuscompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estatuscompra` (
  `idestatus` int(11) NOT NULL AUTO_INCREMENT,
  `estatus` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idestatus`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `giro`
--

DROP TABLE IF EXISTS `giro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giro` (
  `idgiro` int(11) NOT NULL AUTO_INCREMENT,
  `nombregiro` varchar(200) NOT NULL,
  PRIMARY KEY (`idgiro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opcion`
--

DROP TABLE IF EXISTS `opcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opcion` (
  `idopcion` int(11) NOT NULL AUTO_INCREMENT,
  `inciso` char(1) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idopcion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opcionpregunta`
--

DROP TABLE IF EXISTS `opcionpregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opcionpregunta` (
  `idpregunta` int(11) DEFAULT NULL,
  `idopcion` int(11) DEFAULT NULL,
  UNIQUE KEY `unique_opcion_pregunta` (`idpregunta`,`idopcion`),
  KEY `fk_idopcion_opcion` (`idopcion`),
  CONSTRAINT `fk_idopcion_opcion` FOREIGN KEY (`idopcion`) REFERENCES `opcion` (`idopcion`),
  CONSTRAINT `fk_idpregunta_opcion` FOREIGN KEY (`idpregunta`) REFERENCES `pregunta` (`idpregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona` (
  `email` varchar(150) DEFAULT NULL,
  `idsexo` char(1) DEFAULT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `codigopostal` char(5) DEFAULT NULL,
  `nombre` varchar(250) NOT NULL,
  KEY `pk_usuario_persona` (`email`),
  KEY `fk_sexo` (`idsexo`),
  CONSTRAINT `fk_sexo` FOREIGN KEY (`idsexo`) REFERENCES `sexo` (`idsexo`),
  CONSTRAINT `pk_usuario_persona` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `idpregunta` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(50) DEFAULT NULL,
  `idtipo` int(11) NOT NULL,
  UNIQUE KEY `primary_key_pregunta` (`idpregunta`),
  KEY `fk_tipo_pregunta` (`idtipo`),
  CONSTRAINT `fk_tipo_pregunta` FOREIGN KEY (`idtipo`) REFERENCES `tipopregunta` (`idtipo`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `idproducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) DEFAULT NULL,
  `costoreal` decimal(10,2) DEFAULT NULL,
  `emailempresa` varchar(150) DEFAULT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  KEY `id_producto_categoria` (`idcategoria`),
  KEY `empresa_producto` (`emailempresa`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productoofertado`
--

DROP TABLE IF EXISTS `productoofertado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productoofertado` (
  `email` varchar(150) DEFAULT NULL,
  `idproducto` int(11) DEFAULT NULL,
  UNIQUE KEY `unique_producto_por_empresa` (`email`),
  KEY `id_producto_oferta` (`idproducto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `puntosacumulados`
--

DROP TABLE IF EXISTS `puntosacumulados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `puntosacumulados` (
  `email` varchar(150) DEFAULT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `unique_puntos_usuario` (`email`),
  KEY `fk_puntos_usuario` (`email`),
  CONSTRAINT `fk_puntos_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `puntoscodigo`
--

DROP TABLE IF EXISTS `puntoscodigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `puntoscodigo` (
  `email` varchar(150) DEFAULT NULL,
  `codigo` char(8) DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `canjeos` int(11) DEFAULT NULL,
  KEY `codigo_puntos` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rango`
--

DROP TABLE IF EXISTS `rango`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rango` (
  `idrango` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `limiteinferior` decimal(12,2) DEFAULT NULL,
  `limitesuperior` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`idrango`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rangopregunta`
--

DROP TABLE IF EXISTS `rangopregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rangopregunta` (
  `idpregunta` int(11) DEFAULT NULL,
  `idrango` int(11) DEFAULT NULL,
  UNIQUE KEY `unique_range` (`idpregunta`),
  KEY `fk_idrango` (`idrango`),
  CONSTRAINT `fk_idpregunta` FOREIGN KEY (`idpregunta`) REFERENCES `pregunta` (`idpregunta`),
  CONSTRAINT `fk_idrango` FOREIGN KEY (`idrango`) REFERENCES `rango` (`idrango`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `respuestasencuesta`
--

DROP TABLE IF EXISTS `respuestasencuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respuestasencuesta` (
  `idencuesta` int(11) NOT NULL AUTO_INCREMENT,
  `emailempresa` varchar(150) DEFAULT NULL,
  `emailusuario` varchar(150) DEFAULT NULL,
  `idpregunta` int(11) DEFAULT NULL,
  `respuesta` tinytext,
  UNIQUE KEY `unique_answer` (`idencuesta`,`emailempresa`,`emailusuario`,`idpregunta`),
  KEY `fk_email_de_empresa` (`emailempresa`),
  KEY `fk_email_del_cliente` (`emailusuario`),
  KEY `fk_idpregunta_encuesta` (`idencuesta`,`idpregunta`),
  KEY `idpregunta` (`idpregunta`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sexo`
--

DROP TABLE IF EXISTS `sexo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sexo` (
  `idsexo` char(1) NOT NULL,
  `nombre` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idsexo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `cadenaticket` char(64) NOT NULL DEFAULT '',
  `idempresaventa` varchar(150) DEFAULT NULL,
  `idusuariocompra` varchar(150) DEFAULT NULL,
  `concepto` text NOT NULL,
  `importe` decimal(12,2) NOT NULL DEFAULT '0.00',
  `porcentaje` int(11) NOT NULL DEFAULT '0',
  `puntos` int(11) NOT NULL,
  `fecharegistro` date DEFAULT NULL,
  `fechavalidacion` date DEFAULT NULL,
  `idestatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`cadenaticket`),
  KEY `fk_empresa_venta` (`idempresaventa`),
  KEY `fk_usuario_compra` (`idusuariocompra`),
  KEY `fk_estatus_ticket` (`idestatus`),
  CONSTRAINT `fk_empresa_venta` FOREIGN KEY (`idempresaventa`) REFERENCES `empresa` (`email`),
  CONSTRAINT `fk_estatus_ticket` FOREIGN KEY (`idestatus`) REFERENCES `ticketestatus` (`idestatus`),
  CONSTRAINT `fk_usuario_compra` FOREIGN KEY (`idusuariocompra`) REFERENCES `usuario` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticketestatus`
--

DROP TABLE IF EXISTS `ticketestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticketestatus` (
  `idestatus` int(11) NOT NULL AUTO_INCREMENT,
  `estatus` varchar(100) NOT NULL,
  PRIMARY KEY (`idestatus`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipopregunta`
--

DROP TABLE IF EXISTS `tipopregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipopregunta` (
  `idtipo` int(11) NOT NULL,
  `tipopregunta` varchar(50) NOT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipousuario` varchar(100) NOT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usertokens`
--

DROP TABLE IF EXISTS `usertokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertokens` (
  `email` varchar(150) DEFAULT NULL,
  `identifier` int(11) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `email` varchar(150) NOT NULL DEFAULT '',
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`email`),
  KEY `fk2_tipo_usuario` (`idtipo`),
  CONSTRAINT `fk2_tipo_usuario` FOREIGN KEY (`idtipo`) REFERENCES `tipousuario` (`idtipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ws_users`
--

DROP TABLE IF EXISTS `ws_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ws_users` (
  `username` char(64) NOT NULL DEFAULT '',
  `password` char(32) DEFAULT NULL,
  `identifier` int(11) DEFAULT '0',
  PRIMARY KEY (`username`),
  UNIQUE KEY `unique_identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-14 10:33:14
