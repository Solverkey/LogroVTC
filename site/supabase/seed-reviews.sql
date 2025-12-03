-- Script para añadir opiniones de clientes a la base de datos
-- Ejecuta este script en el SQL Editor de Supabase o usa el panel admin

-- OPINIONES PARA LA PÁGINA PRINCIPAL (HOME)
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('María García', 5, 'Excelente servicio. Muy puntuales y el conductor muy amable. El coche impecable y muy cómodo para el viaje hasta Bilbao.', true, 'home', null),
('Carlos Fernández', 5, 'Contraté el servicio para ir al aeropuerto de Madrid. Todo perfecto, precio cerrado sin sorpresas y el conductor muy profesional.', true, 'home', null),
('Ana Martínez', 5, 'Los recomiendo 100%. Nos llevaron al Camino de Santiago con todas nuestras mochilas. Servicio impecable.', false, 'home', null),
('Javier López', 5, 'Servicio de mensajería urgente perfecto. Entrega rápida y seguimiento en todo momento. Muy recomendable para empresas.', false, 'home', null),
('Laura Sánchez', 5, 'Contraté el traslado desde el aeropuerto de Pamplona. Me esperaron con cartel y me ayudaron con las maletas. Genial.', false, 'home', null),
('Pedro Ruiz', 5, 'Excelente atención y puntualidad. El conductor conocía perfectamente la zona y nos dio buenos consejos para nuestra visita.', false, 'home', null);

-- OPINIONES PARA SERVICIO DE AEROPUERTO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Isabel Torres', 5, 'Servicio de traslado al aeropuerto perfecto. Seguimiento del vuelo en tiempo real, me esperaron aunque llegué con retraso.', true, 'service', 'aeropuerto'),
('Miguel Ángel Díaz', 5, 'Uso LogroVTC habitualmente para mis viajes de trabajo. Siempre puntuales, vehículos limpios y conductores profesionales.', true, 'service', 'aeropuerto'),
('Carmen Jiménez', 5, 'Traslado familiar al aeropuerto de Bilbao. Cabíamos todos con las maletas sin problema. Precio muy competitivo.', false, 'service', 'aeropuerto'),
('Roberto Moreno', 5, 'Contraté el servicio para recoger a unos clientes en el aeropuerto. Todo perfecto, muy serios y profesionales.', false, 'service', 'aeropuerto'),
('Lucía Navarro', 5, 'Viaje muy cómodo hasta Madrid. El conductor fue muy amable y el coche impecable. Sin duda repetiré.', false, 'service', 'aeropuerto');

-- OPINIONES PARA SERVICIO DEL CAMINO DE SANTIAGO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Antonio Gil', 5, 'Hicimos el Camino Francés y LogroVTC nos trasladó las mochilas cada día. Servicio increíble, muy recomendable.', true, 'service', 'camino'),
('Marta Blanco', 5, 'Gracias al servicio de traslado de mochilas pudimos disfrutar del Camino sin cargar peso. Todo perfecto.', true, 'service', 'camino'),
('Francisco Serrano', 5, 'Nos recogieron en Santo Domingo de la Calzada y nos llevaron hasta Logroño. Muy atentos y conocedores de la zona.', false, 'service', 'camino'),
('Elena Castro', 5, 'Servicio flexible y adaptado a nuestras necesidades. Nos ayudaron mucho durante nuestra peregrinación.', false, 'service', 'camino'),
('David Ortega', 5, 'Transfer de bicicletas perfecto. Remolque adecuado y conductor experimentado. Muy profesionales.', false, 'service', 'camino');

-- OPINIONES PARA SERVICIO DE MENSAJERÍA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Empresa Construcción S.L.', 5, 'Necesitábamos documentación urgente en Barcelona. Servicio directo y rápido. Llegó todo perfecto.', true, 'service', 'mensajeria'),
('Javier Romero', 5, 'Mensajería urgente para prototipo industrial. Custodia directa y entrega con prueba. Excelente servicio.', true, 'service', 'mensajeria'),
('Sandra Molina', 5, 'Entrega express desde Logroño a Pamplona. Muy rápido y eficiente. El seguimiento en tiempo real es genial.', false, 'service', 'mensajeria'),
('Alberto Vega', 5, 'Servicio de mensajería para nuestra empresa. Siempre puntuales y con factura al momento. Muy profesionales.', false, 'service', 'mensajeria');

-- OPINIONES ESPECÍFICAS PARA AEROPUERTO DE BILBAO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Patricia León', 5, 'Traslado desde Logroño hasta el aeropuerto de Bilbao. Viaje muy cómodo y precio cerrado sin sorpresas.', true, 'airport', 'bilbao'),
('Jorge Campos', 5, 'Me recogieron en el aeropuerto de Bilbao con cartel. Muy profesionales y el coche impecable.', false, 'airport', 'bilbao'),
('Cristina Vargas', 5, 'Uso este servicio cada vez que vuelo desde Bilbao. Siempre puntuales y muy amables.', false, 'airport', 'bilbao');

-- OPINIONES PARA AEROPUERTO DE PAMPLONA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Fernando Pascual', 5, 'Traslado perfecto desde Logroño a Pamplona. Conductor muy profesional y vehículo muy cómodo.', true, 'airport', 'pamplona'),
('Rosa Ibáñez', 5, 'Llegué con retraso pero me esperaron sin problema. Servicio excelente y muy recomendable.', false, 'airport', 'pamplona');

-- OPINIONES PARA AEROPUERTO DE MADRID-BARAJAS
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Andrés Medina', 5, 'Viaje desde Logroño hasta Madrid perfectamente organizado. Precio justo y conductor muy profesional.', true, 'airport', 'madrid-barajas'),
('Beatriz Cortés', 5, 'Contraté el servicio para un viaje familiar. Cabíamos todos con equipaje. Muy cómodo y puntual.', false, 'airport', 'madrid-barajas'),
('Luis Prieto', 5, 'Servicio impecable. Me recogieron puntualmente y llegamos con tiempo de sobra al aeropuerto.', false, 'airport', 'madrid-barajas');

-- OPINIONES PARA AEROPUERTO DE ZARAGOZA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Silvia Ramírez', 5, 'Traslado rápido y eficiente desde Logroño a Zaragoza. Muy buen servicio y precio competitivo.', true, 'airport', 'zaragoza'),
('Ricardo Núñez', 5, 'Conductor muy amable y puntual. El trayecto hasta Zaragoza fue muy cómodo.', false, 'airport', 'zaragoza');

-- OPINIONES PARA AEROPUERTO DE BARCELONA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Mónica Guerrero', 5, 'Viaje largo pero muy cómodo hasta Barcelona. El conductor hizo parada para descansar. Excelente servicio.', true, 'airport', 'barcelona-el-prat'),
('Pablo Delgado', 5, 'Contraté el servicio para ir al aeropuerto de Barcelona. Todo perfecto, precio cerrado y sin sorpresas.', false, 'airport', 'barcelona-el-prat');

-- OPINIONES PARA ESTACIÓN DE ZARAGOZA-DELICIAS
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Teresa Santos', 5, 'Me llevaron a coger el AVE en Zaragoza. Servicio puntual y muy profesional. Lo recomiendo.', true, 'station', 'zaragoza-delicias'),
('Ignacio Cabrera', 5, 'Traslado perfecto a la estación del AVE. Llegué con tiempo de sobra gracias a su puntualidad.', false, 'station', 'zaragoza-delicias');

-- OPINIONES PARA LAGUARDIA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Victoria Márquez', 5, 'Nos llevaron a visitar bodegas en Laguardia. El conductor conocía perfectamente la zona y nos dio excelentes recomendaciones.', true, 'airport', 'laguardia'),
('Raúl Soler', 5, 'Servicio impecable para nuestra ruta del vino en Laguardia. Muy atentos y profesionales.', false, 'airport', 'laguardia');

-- OPINIONES PARA ELCIEGO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Natalia Peña', 5, 'Traslado perfecto a Elciego para visitar bodegas. Conductor muy amable y conocedor de la zona.', true, 'airport', 'elciego'),
('Sergio Herrera', 5, 'Excelente servicio para nuestra visita a la Ciudad del Vino. Muy recomendable.', false, 'airport', 'elciego');

-- OPINIONES GENERALES ADICIONALES PARA HOME
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Raquel Domínguez', 5, 'Servicio de 10. Puntualidad, limpieza y profesionalidad. No puedo poner ninguna pega.', false, 'home', null),
('Ángel Muñoz', 5, 'He usado LogroVTC varias veces y siempre perfecto. Precios justos y conductores excelentes.', false, 'home', null),
('Nuria Iglesias', 5, 'Reservamos con poco tiempo y nos atendieron enseguida. Muy profesionales y atentos.', false, 'home', null),
('Guillermo Ramos', 5, 'El mejor servicio VTC de La Rioja sin duda. Totalmente recomendable para cualquier traslado.', false, 'home', null);

-- OPINIONES PARA AEROPUERTO DE LOGROÑO-AGONCILLO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Tomás Herrera', 5, 'Traslado perfecto al aeropuerto de Agoncillo. Muy cerca de Logroño y servicio impecable.', true, 'airport', 'logrono-agoncillo'),
('Pilar Martín', 5, 'Servicio local excelente. Conocen muy bien la zona y son super puntuales.', false, 'airport', 'logrono-agoncillo'),
('Javier Soto', 5, 'Ideal para vuelos desde el aeropuerto local. Precio muy competitivo y servicio de calidad.', false, 'airport', 'logrono-agoncillo');

-- OPINIONES PARA AEROPUERTO DE SANTANDER
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Alicia Fernández', 5, 'Viaje cómodo desde Logroño hasta Santander. El conductor fue muy profesional y amable.', true, 'airport', 'santander'),
('Rubén Castillo', 5, 'Contraté el servicio para un viaje de trabajo. Todo perfecto, precio justo y vehículo impecable.', false, 'airport', 'santander'),
('Verónica Gil', 5, 'Excelente servicio para ir al aeropuerto de Santander. Recomendable 100%.', false, 'airport', 'santander');

-- OPINIONES PARA AEROPUERTO DE VITORIA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Marcos López', 5, 'Traslado rápido y eficiente a Vitoria. Muy buen servicio y conductor muy atento.', true, 'airport', 'vitoria'),
('Elena Prieto', 5, 'Uso este servicio para ir a Vitoria habitualmente. Siempre puntuales y profesionales.', false, 'airport', 'vitoria'),
('Daniel Vega', 5, 'Servicio impecable. El conductor conocía muy bien la ruta y llegamos con tiempo de sobra.', false, 'airport', 'vitoria');

-- OPINIONES PARA AEROPUERTO DE BIARRITZ
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Adriana Morales', 5, 'Viaje internacional perfecto hasta Biarritz. El conductor hablaba francés y todo fue muy fácil.', true, 'airport', 'biarritz'),
('Óscar Ruiz', 5, 'Traslado transfronterizo sin problemas. Muy profesionales y conocedores de los trámites.', false, 'airport', 'biarritz'),
('Claudia Santos', 5, 'Excelente servicio para vuelos internacionales. Recomendable para ir a Francia.', false, 'airport', 'biarritz');

-- OPINIONES PARA ESTACIÓN DE HENDAYA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Gabriel Torres', 5, 'Me llevaron a la estación de Hendaya para coger el tren a París. Servicio perfecto.', true, 'station', 'hendaya'),
('Lorena Campos', 5, 'Traslado internacional excelente. Llegamos con tiempo de sobra y sin complicaciones.', false, 'station', 'hendaya'),
('Francisco Díaz', 5, 'Servicio impecable para conexiones internacionales. Muy recomendable.', false, 'station', 'hendaya');

-- OPINIONES ADICIONALES PARA ESTACIONES
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Beatriz Navarro', 5, 'Servicio de traslados a estaciones muy fiable. Siempre llego a tiempo a mis trenes.', false, 'station', 'zaragoza-delicias'),
('Alberto Sánchez', 5, 'Uso este servicio para mis viajes de trabajo en AVE. Nunca me han fallado.', false, 'station', 'zaragoza-delicias');

-- OPINIONES PARA LOCALIDAD DE LOGROÑO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Rafael Gómez', 5, 'Servicio VTC en Logroño de primera. Perfectos para traslados locales y al aeropuerto.', true, 'home', 'logrono'),
('Irene Blanco', 5, 'Los uso siempre en Logroño para mis desplazamientos. Muy profesionales y atentos.', false, 'home', 'logrono'),
('Sergio Ortega', 5, 'Mejor opción en Logroño para traslados. Precio justo y servicio excelente.', false, 'home', 'logrono');

-- OPINIONES PARA LOCALIDAD DE LAGUARDIA
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Victoria Márquez', 5, 'Nos llevaron a visitar bodegas en Laguardia. El conductor conocía perfectamente la zona y nos dio excelentes recomendaciones.', true, 'home', 'laguardia'),
('Raúl Soler', 5, 'Servicio impecable para nuestra ruta del vino en Laguardia. Muy atentos y profesionales.', false, 'home', 'laguardia'),
('Cristina Varela', 5, 'Experiencia fantástica visitando bodegas. El conductor fue como un guía turístico.', false, 'home', 'laguardia');

-- OPINIONES PARA LOCALIDAD DE ELCIEGO
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Natalia Peña', 5, 'Traslado perfecto a Elciego para visitar bodegas. Conductor muy amable y conocedor de la zona.', true, 'home', 'elciego'),
('Sergio Herrera', 5, 'Excelente servicio para nuestra visita a la Ciudad del Vino. Muy recomendable.', false, 'home', 'elciego'),
('Marta Domínguez', 5, 'Visitamos el Marqués de Riscal con este servicio. Todo perfecto, conductor experto en enoturismo.', false, 'home', 'elciego');

-- OPINIONES ADICIONALES VARIADAS
INSERT INTO public.reviews (author, rating, content, featured, context, slug) VALUES
('Juan Carlos Ruiz', 5, 'He probado varios servicios VTC y este es el mejor de La Rioja sin duda.', false, 'home', null),
('Rocío Mendoza', 5, 'Servicio familiar y cercano. Te tratan como si fueras de la familia.', false, 'home', null),
('Enrique Salas', 5, 'Puntualidad absoluta. Nunca he tenido un retraso con ellos.', false, 'home', null),
('Carolina Flores', 5, 'Vehículos siempre impecables y conductores muy profesionales. Totalmente recomendable.', false, 'home', null),
('David Romero', 5, 'Relación calidad-precio excelente. Los recomiendo a todos mis amigos.', false, 'home', null),
('Miriam Castro', 5, 'Servicio adaptado a mis necesidades. Muy flexibles y atentos.', false, 'home', null);

